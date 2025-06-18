import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  const education = [
    {
      title: "Curso de Webdesigner",
      institution: "DevMedia",
      year: "2024",
      description: "HTML, CSS, JS e design responsivo aplicado em projetos reais."
    },
    {
      title: "Power BI - Planilhas Inteligentes",
      institution: "Microsoft Learn",
      year: "2024",
      description: "Análise de dados avançada, criação de dashboards interativos, modelagem de dados e automação de relatórios para tomada de decisões estratégicas."
    },
    {
      title: "Informática Avançada",
      institution: "Simtec",
      year: "2024",
      description: "Fundamentos técnicos em sistemas, pacote Office, redes e lógica de programação."
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Educação
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {education.map((item, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:scale-110 transition-transform">
                    <GraduationCap className="text-blue-600" size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">{item.year}</span>
                      </div>
                    </div>
                    
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {item.institution}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;