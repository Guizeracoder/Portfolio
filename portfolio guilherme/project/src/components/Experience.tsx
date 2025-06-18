import React from 'react';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';

const Experience: React.FC = () => {
  const achievements = [
    "Páginas focadas em conversão e experiência do usuário",
    "Integrações com WhatsApp, automações, formulários e CRM",
    "Projetos em nichos como infoprodutos, clínicas e e-commerce"
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experiência
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-800 p-8 lg:p-12 rounded-lg">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Briefcase className="text-blue-600" size={28} />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Desenvolvedor Web Freelancer
                  </h3>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Calendar size={18} />
                    <span className="font-medium">2025 – Atual</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                  Criação de landing pages e sites responsivos com foco em performance, 
                  utilizando HTML, CSS, JavaScript, WordPress e Webflow.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Principais conquistas:
                  </h4>
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                      <p className="text-gray-600 dark:text-gray-400">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;