import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onSectionClick: (section: string) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  originalX: number;
  originalY: number;
  hue: number;
}

const Hero: React.FC<HeroProps> = ({ onSectionClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 3 + 1.5,
          opacity: Math.random() * 0.4 + 0.3,
          hue: Math.random() * 60 + 200 // Blue to cyan range
        });
      }
      
      particlesRef.current = particles;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        // Mouse/touch interaction - particles move toward cursor
        if (mouse.isActive) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 250;
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            const attractionStrength = 0.03;
            
            // Move particles toward cursor
            particle.vx += Math.cos(angle) * force * attractionStrength;
            particle.vy += Math.sin(angle) * force * attractionStrength;
            
            // Increase opacity and shift hue when near cursor
            particle.opacity = Math.min(0.9, particle.opacity + force * 0.3);
            particle.hue = Math.min(240, particle.hue + force * 20);
          } else {
            // Return to original opacity and hue
            particle.opacity = Math.max(0.3, particle.opacity - 0.02);
            particle.hue = Math.max(200, particle.hue - 1);
          }
        } else {
          // Return to original opacity and hue when cursor is not active
          particle.opacity = Math.max(0.3, particle.opacity - 0.02);
          particle.hue = Math.max(200, particle.hue - 1);
        }
        
        // Apply gentle return force to original position when not interacting
        if (!mouse.isActive || Math.sqrt((mouse.x - particle.x) ** 2 + (mouse.y - particle.y) ** 2) > 250) {
          const returnForce = 0.002;
          const dxOriginal = particle.originalX - particle.x;
          const dyOriginal = particle.originalY - particle.y;
          particle.vx += dxOriginal * returnForce;
          particle.vy += dyOriginal * returnForce;
        }
        
        // Apply friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges and update original position
        if (particle.x < 0) {
          particle.x = canvas.width;
          particle.originalX = canvas.width;
        }
        if (particle.x > canvas.width) {
          particle.x = 0;
          particle.originalX = 0;
        }
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.originalY = canvas.height;
        }
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.originalY = 0;
        }
        
        // Draw particle with glow effect
        const dynamicSize = mouse.isActive ? 
          particle.size * (1 + particle.opacity * 0.5) : 
          particle.size;
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, dynamicSize * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`);
        gradient.addColorStop(0.4, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.6})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, dynamicSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, dynamicSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${particle.opacity * 1.2})`;
        ctx.fill();
        
        // Add bright center
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, dynamicSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 85%, ${particle.opacity * 0.8})`;
        ctx.fill();
        
        // Draw connections to nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const baseOpacity = (150 - distance) / 150 * 0.2;
            const interactionBoost = mouse.isActive ? 
              Math.max(particle.opacity, otherParticle.opacity) * 0.3 : 0;
            const opacity = baseOpacity + interactionBoost;
            
            // Create gradient for connection line
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            lineGradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${opacity})`);
            lineGradient.addColorStop(1, `hsla(${otherParticle.hue}, 70%, 60%, ${opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = mouse.isActive ? 1.2 : 0.8;
            ctx.stroke();
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    // Touch event handlers
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        isActive: true
      };
    };

    const handleTouchEnd = () => {
      mouseRef.current.isActive = false;
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    return () => {
      // Remove event listeners
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white drop-shadow-lg">
              Guilherme
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto drop-shadow-md">
              Desenvolvedor Web | Especialista em Landing Pages com Foco em Conversão
            </h2>
          </div>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 max-w-2xl mx-auto drop-shadow-sm">
            Transformo ideias em experiências web de alta performance.
          </p>

          <div className="animate-bounce mt-16">
            <button
              onClick={() => onSectionClick('about')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors drop-shadow-sm"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Subtle gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 dark:to-gray-900/5 pointer-events-none" style={{ zIndex: 2 }}></div>
    </section>
  );
};

export default Hero;