import React from 'react';
import { Code, Zap, Target } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <Code className="text-blue-600" size={24} />,
      title: "Performance",
      description: "Páginas otimizadas e rápidas"
    },
    {
      icon: <Target className="text-blue-600" size={24} />,
      title: "Conversão",
      description: "Foco em resultados reais"
    },
    {
      icon: <Zap className="text-blue-600" size={24} />,
      title: "Tecnologias Modernas",
      description: "Sempre atualizado com as melhores práticas"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre Mim
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Desenvolvedor web com foco em performance, experiência do usuário e estratégias de conversão. 
              Tenho facilidade em transformar ideias em páginas objetivas, leves e que entregam resultado real.
            </p>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Trabalho com tecnologias modernas, sempre buscando evoluir tanto em design quanto em estrutura técnica. 
              Minha abordagem combina criatividade com análise de dados para criar experiências que realmente convertem.
            </p>
          </div>

          <div className="grid gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;