import React from "react";
import "./TechTree.css";
import {
  Code,
  Cloud,
  Database,
  Cpu,
  LayoutGrid,
} from "lucide-react";

const skills = [
  {
    category: "Core Languages",
    icon: Code,
    items: ["Python", "JavaScript", "Java", "TypeScript"],
  },
  {
    category: "Frontend & UI",
    icon: LayoutGrid,
    items: ["React.js", "HTML/CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Backend & APIs",
    icon: Cpu,
    items: ["Node.js", "Express.js", "Spring Boot", "Fast API", "Flask API"],
  },
  {
    category: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "SQL", "MongoDB (NoSQL)"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    items: ["AWS", "Docker", "Git", "CI/CD"],
  },
];

const TECH_ICONS = {
  "React.js": {
    color: "#61DAFB",
    svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
  },
  Python: { color: "#3771A5", svg: "M12 0L6 10l6 10 6-10z" },
  JavaScript: { color: "#F7DF1E", svg: "M10 0L0 20h20z" },
  Java: { color: "#E95325", svg: "M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12z" },
  TypeScript: { color: "#3178C6", svg: "M0 20h20V0z" },
  "HTML/CSS": { color: "#E44D26", svg: "M0 0h24v24H0z" },
  "Tailwind CSS": { color: "#06B6D4", svg: "M0 0h24v24H0z" },
  Bootstrap: { color: "#7952B3", svg: "M0 0h24v24H0z" },
  "Node.js": { color: "#339933", svg: "M0 0h24v24H0z" },
  "Express.js": { color: "#FFFFFF", svg: "M0 0h24v24H0z" },
  "Spring Boot": { color: "#6DB33F", svg: "M0 0h24v24H0z" },
  "Fast API": { color: "#009688", svg: "M0 0h24v24H0z" },
  "Flask API": { color: "#000000", svg: "M0 0h24v24H0z" },
  PostgreSQL: { color: "#336791", svg: "M0 0h24v24H0z" },
  MySQL: { color: "#4479A1", svg: "M0 0h24v24H0z" },
  SQL: { color: "#F29111", svg: "M0 0h24v24H0z" },
  "MongoDB (NoSQL)": { color: "#47A248", svg: "M0 0h24v24H0z" },
  AWS: { color: "#FF9900", svg: "M0 0h24v24H0z" },
  Docker: { color: "#2496ED", svg: "M0 0h24v24H0z" },
  Git: { color: "#F05032", svg: "M0 0h24v24H0z" },
  "CI/CD": { color: "#1E40AF", svg: "M0 0h24v24H0z" },
};

const TechIcon = ({ skillName }) => {
  const iconData = TECH_ICONS[skillName];
  const defaultIcon = { color: "#FFFFFF", svg: "M0 0h24v24H0z" }; // Default to white square
  const { color, svg } = iconData || defaultIcon;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      className="w-8 h-8 transition duration-300 group-hover:scale-110"
      style={{ minWidth: "2rem" }}
    >
      <title>{skillName}</title>
      <path d={svg} />
    </svg>
  );
};

const TechTree = () => {
  return (
    <div className="tech-tree-container">
      <div className="tech-tree">
        <div className="tree-root">
          <div className="tree-node-content">
            <p>My Tech Stack</p>
          </div>
        </div>
        <div className="tree-branches">
          {skills.map((skillCategory, index) => (
            <div className="tree-branch" key={index}>
              <div className="tree-node-content">
                <skillCategory.icon className="w-6 h-6 mr-2" />
                <p>{skillCategory.category}</p>
              </div>
              <div className="tree-leaves">
                {skillCategory.items.map((item, itemIndex) => (
                  <div className="tree-leaf" key={itemIndex}>
                    <div className="tree-node-content">
                      <TechIcon skillName={item} />
                      <p>{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechTree;
