import React from 'react';
import { Code, Palette, Zap, Settings } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Linguagens",
      icon: <Code className="text-blue-600" size={24} />,
      skills: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 85 }
      ]
    },
    {
      title: "Frameworks",
      icon: <Zap className="text-green-600" size={24} />,
      skills: [
        { name: "Tailwind CSS", level: 90 },
        { name: "React", level: 70 }
      ]
    },
    {
      title: "Design",
      icon: <Palette className="text-purple-600" size={24} />,
      skills: [
        { name: "Figma", level: 85 },
        { name: "UI/UX Design", level: 80 }
      ]
    },
    {
      title: "Ferramentas",
      icon: <Settings className="text-orange-600" size={24} />,
      skills: [
        { name: "Webflow", level: 85 },
        { name: "WordPress", level: 80 },
        { name: "ChatGPT", level: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Habilidades Técnicas
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;