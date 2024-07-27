import React, { useState } from "react";

interface SidebarProps {
  onFilterChange: (skill: string) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  onFilterChange,
  className = "",
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillChange = (skill: string) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updatedSkills);
    onFilterChange(skill);
  };

  return (
    <div
      className={`w-full md:w-1/4 h-full p-4 border-r border-gray-300 bg-white text-black ${className}`}
    >
      <h1 className="text-2xl font-bold mb-4">Filter</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-lg font-semibold mb-2">Experience</h2>
          {["1+ years", "3+ years", "5+ years", "10+ years"].map((exp) => (
            <div className="form-checkbox">
              <label className="inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-blue-500 focus:ring-blue-500"
                />
                <span>{exp}</span>
              </label>
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Languages</h2>
          {["JAVA", "Python", "JavaScript"].map((language) => (
            <div className="form-checkbox">
              <label className="inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-blue-500 focus:ring-blue-500"
                  onChange={() => handleSkillChange(language)}
                />
                <span>{language}</span>
              </label>
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Frameworks</h2>
          {["React", "Spring Boot", "Django", "Flask"].map((framework) => (
            <div className="form-checkbox">
              <label className="inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-blue-500 focus:ring-blue-500"
                  onChange={() => handleSkillChange(framework)}
                />
                <span>{framework}</span>
              </label>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
