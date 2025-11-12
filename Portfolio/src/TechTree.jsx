import React from "react";
import "./TechTree.css";
import {
  FaCode,
  FaCloud,
  FaDatabase,
  FaServer,
  FaReact,
  FaJava,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiPython,
  SiCss3,
  SiHtml5,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiExpress,
  SiSpringboot,
  SiFastapi,
  SiFlask,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiKubernetes,
  SiAmazon,
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";

// Use five categories (Languages, Frontend, Backend, Database, Cloud & DevOps) and render responsively
const skills = [
  {
    category: "Languages",
    icon: FaCode,
    items: ["Python", "JavaScript", "Java"],
  },
  {
    category: "Frontend",
    icon: FaReact,
    items: ["React.js", "HTML/CSS", "Tailwind CSS", "Bootstrap", "TypeScript"],
  },
  {
    category: "Backend",
    icon: FaServer,
    items: ["Node.js", "Express.js", "Spring Boot", "Fast API", "Flask API"],
  },
  {
    category: "Database",
    icon: FaDatabase,
    items: ["PostgreSQL", "MySQL", "SQL"],
  },
  {
    category: "Cloud & DevOps",
    icon: FaCloud,
    items: ["AWS", "EC2", "S3", "DynamoDB", "Lambda", "Docker", "Kubernetes"],
  },
];

const TECH_ICONS = {
  "React.js": { component: FaReact, color: "#61DAFB" },
  Python: { component: SiPython, color: "#3771A5" },
  JavaScript: { component: IoLogoJavascript, color: "#F7DF1E" },
  Java: { component: FaJava, color: "#E95325" },
  TypeScript: { component: SiTypescript, color: "#3178C6" },
  "HTML/CSS": { component: SiHtml5, color: "#E44D26" },
  "Tailwind CSS": { component: SiTailwindcss, color: "#06B6D4" },
  Bootstrap: { component: SiBootstrap, color: "#7952B3" },
  "Node.js": { component: FaNodeJs, color: "#339933" },
  "Express.js": { component: SiExpress, color: "#FFFFFF" },
  "Spring Boot": { component: SiSpringboot, color: "#6DB33F" },
  "Fast API": { component: SiFastapi, color: "#009688" },
  "Flask API": { component: SiFlask, color: "#000000" },
  PostgreSQL: { component: SiPostgresql, color: "#336791" },
  MySQL: { component: SiMysql, color: "#4479A1" },
  SQL: { component: FaDatabase, color: "#F29111" },
  "MongoDB (NoSQL)": { component: SiMongodb, color: "#47A248" },
  AWS: { component: FaAws, color: "#FF9900" },
  Docker: { component: FaDocker, color: "#2496ED" },
  Git: { component: FaGitAlt, color: "#F05032" },
  "CI/CD": { component: FaGitAlt, color: "#1E40AF" },
  Kubernetes: { component: SiKubernetes, color: "#326CE5" },
  S3: { component: FaAws, color: "#FF9900" },
  EC2: { component: FaAws, color: "#FF9900" },
  DynamoDB: { component: SiAmazon, color: "#527FFF" },
  Lambda: { component: FaAws, color: "#FF9900" },
  Serverless: { component: FaCloud, color: "#9AE6B4" },
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
              <div className="tree-node-content tree-node-content-glass">
                <skillCategory.icon className="w-6 h-6 mr-2" />
                <p>{skillCategory.category}</p>
              </div>
              <div className="tree-leaves">
                {skillCategory.items.map((item, itemIndex) => (
                  <div className="tree-leaf tree-leaf-glass" key={itemIndex}>
                    <div className="tree-node-content tree-node-content-glass">
                      {TECH_ICONS[item] ? (
                        React.createElement(TECH_ICONS[item].component, {
                          className: "w-8 h-8 transition duration-300 group-hover:scale-110",
                          style: { color: TECH_ICONS[item].color, minWidth: "2rem" },
                          title: item,
                        })
                      ) : (
                        <div
                          className="w-8 h-8 transition duration-300 group-hover:scale-110"
                          style={{
                            minWidth: "2rem",
                            backgroundColor: "#FFFFFF",
                          }}
                          title={item}
                        />
                      )}
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
