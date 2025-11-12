import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Briefcase,
  User,
  Mail,
  BookOpen,
  Download,
  Code,
  Cloud,
  Database,
  Cpu,
  LayoutGrid,
  Zap,
} from "lucide-react";
import TechTree from "./TechTree";

// --- Static Data Configuration ---
const DATA = {
  name: "Kgodiso Matsepe",
  title: "Full-Stack & Cloud Specialist",
  tagline:
    "Building scalable applications with a focus on performance and robust infrastructure.",
  resumeUrl: "/placeholder-resume.pdf", // Placeholder URL for the resume download
  skills: [
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
  ],
  services: [
    {
      title: "Full-Stack Development",
      description:
        "From database design to frontend deployment, specializing in React and robust Python/Java backends.",
    },
    {
      title: "Cloud Infrastructure (AWS)",
      description:
        "Designing, deploying, and managing scalable, high-availability services on Amazon Web Services.",
    },
    {
      title: "API Development & Integration",
      description:
        "Creating high-performance RESTful and GraphQL APIs using Express, Spring Boot, Flask, and FastAPI.",
    },
    {
      title: "Database Optimization",
      description:
        "Expertise in SQL query optimization and managing relational (PostgreSQL, MySQL) and NoSQL (DynamoDB) solutions.",
    },
  ],
  blogPosts: [
    {
      id: 1,
      title: "Scaling Node.js with AWS Lambda",
      date: "Oct 20, 2025",
      excerpt:
        "A deep dive into serverless architecture patterns and cost optimization.",
    },
    {
      id: 2,
      title: "The Power of Tailwind in 2025",
      date: "Sep 15, 2025",
      excerpt:
        "How utility-first CSS drastically improves development speed and design consistency.",
    },
    {
      id: 3,
      title: "Comparing Fast API vs. Flask Performance",
      date: "Aug 01, 2025",
      excerpt:
        "Benchmark analysis of modern Python web frameworks for high-throughput applications.",
    },
  ],
};

// --- Tech Stack Icon Data (SVG Paths and Colors) ---
// IMPORTANT: The React SVG path was replaced with a minimal circle SVG to prevent continuous compilation errors due to string truncation.
const TECH_ICONS = {
  "React.js": {
    color: "#61DAFB",
    svg: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
  },
  // Placeholder icons for other skills using generic shapes/letters for visual presence
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

// --- Reusable Components ---

// Component for rendering skill icons using inline SVG paths
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

const SkillIcon = ({ icon: LucideIcon, title, items }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition duration-500 transform hover:scale-[1.02] border border-gray-700 hover:border-emerald-500/80 group">
    <div className="flex items-center space-x-3 mb-4">
      {/* Use the Lucide icon for the category type if available, otherwise use a placeholder */}
      <LucideIcon className="text-emerald-400 w-6 h-6" />
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <ul className="flex flex-wrap gap-3 text-gray-400 text-sm">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full text-xs font-medium hover:bg-emerald-800 transition duration-300"
        >
          {/* Render the specific technology icon if available */}
          {TECH_ICONS[item] ? (
            <TechIcon skillName={item} />
          ) : (
            <Zap className="w-3 h-3 text-emerald-600 mr-1" />
          )}
          <span className="ml-2 text-gray-300">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ServiceCard = ({ title, description }) => (
  <div className="bg-gray-800 p-8 rounded-xl shadow-2xl transition duration-500 hover:bg-gray-700/50 border border-emerald-600/30 transform hover:scale-[1.02]">
    <Briefcase className="w-10 h-10 text-emerald-400 mb-4" />
    <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const BlogPostCard = ({ title, date, excerpt }) => (
  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col justify-between hover:border-emerald-500 transition duration-300 transform hover:scale-[1.02]">
    <div>
      <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-emerald-400 mb-3">{date}</p>
      <p className="text-gray-400 text-base">{excerpt}</p>
    </div>
    <button className="mt-4 text-emerald-400 hover:text-emerald-300 transition text-left font-medium">
      Read Article &rarr;
    </button>
  </div>
);

// --- Page Components ---

// Each page is wrapped in a section with a unique ID for scrolling
const PageSection = ({ id, children, className = "" }) => (
  <section
    id={id}
    className={`w-full min-h-screen pt-20 pb-12 snap-start flex flex-col justify-center ${className}`}
  >
    {children}
  </section>
);

const HomePage = () => (
  <PageSection id="home" className="bg-gray-900">
    <div className="max-w-6xl mx-auto text-center px-4">
      <p className="text-xl text-emerald-400 font-medium mb-3">
        Hello, I'm {DATA.name}
      </p>
      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight">
        {DATA.title}
      </h1>
      <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto">
        {DATA.tagline}
      </p>
      <a
        href="#about"
        className="bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition duration-300 transform hover:scale-105 inline-flex items-center"
      >
        View My Expertise &darr;
      </a>
    </div>
  </PageSection>
);

const AboutPage = () => (
  <PageSection id="about" className="bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 border-b-4 border-emerald-500/50 inline-block pb-1">
        About Me & Skills
      </h2>
      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="w-full aspect-square bg-gray-700 rounded-xl mb-6 flex items-center justify-center text-gray-500 text-lg shadow-xl max-w-sm mx-auto">
            <User className="w-16 h-16 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 text-center">
            A Focus on Scalability
          </h3>
          <p className="text-gray-400 text-center">
            I thrive on creating solutions that are not just functional, but
            also highly scalable and maintainable. My experience spans the
            entire development lifecycle, ensuring quality from initial design
            to final deployment on AWS.
          </p>
        </div>
        <div className="mt-12 w-full">
          <TechTree />
        </div>
      </div>
    </div>
  </PageSection>
);

const ServicesPage = () => (
  <PageSection id="services" className="bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 border-b-4 border-emerald-500/50 inline-block pb-1">
        Services
      </h2>
      <p className="text-xl text-gray-300 mt-4 mb-12">
        Solutions designed for modern digital challenges.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DATA.services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  </PageSection>
);

const BlogPage = () => (
  <PageSection id="blog" className="bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 border-b-4 border-emerald-500/50 inline-block pb-1">
        Blog & Insights
      </h2>
      <p className="text-xl text-gray-300 mt-4 mb-12">
        Sharing thoughts on technology, development, and scaling systems.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DATA.blogPosts.map((post) => (
          <BlogPostCard
            key={post.id}
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  </PageSection>
);

const ContactPage = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call for form submission
    setTimeout(() => {
      // In a real app, you'd fetch() here.
      setStatus("success");
    }, 2000);
  };

  return (
    <PageSection id="contact" className="bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 border-b-4 border-emerald-500/50 inline-block pb-1">
          Get In Touch
        </h2>
        <p className="text-xl text-gray-300 mt-4 mb-12">
          I am always open to discussing new projects, creative ideas, or
          opportunities.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-300 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-300 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-300 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              required
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-emerald-500 focus:border-emerald-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300 disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <div className="mt-4 p-3 text-center bg-emerald-900/50 text-emerald-400 rounded-lg">
              Thank you! Your message has been sent successfully.
            </div>
          )}
        </form>
      </div>
    </PageSection>
  );
};

// --- Main App Component ---

const App = () => {
  // Simple state-based navigation for mobile menu management
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Data for navigation links
  const navLinks = [
    { name: "Home", anchor: "home", icon: User },
    { name: "About", anchor: "about", icon: User },
    { name: "Services", anchor: "services", icon: Briefcase },
    { name: "Blog", anchor: "blog", icon: BookOpen },
    { name: "Contact", anchor: "contact", icon: Mail },
  ];

  const handleNavigate = (anchor) => {
    // Scroll to the element using its ID/anchor
    document.getElementById(anchor).scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Close menu on navigation
  };

  // Header Component (Responsive Navbar)
  const Header = () => {
    // Logic to determine active section based on scroll position (simple active state for visual feedback)
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
      );

      navLinks.forEach((link) => {
        const element = document.getElementById(link.anchor);
        if (element) {
          observer.observe(element);
        }
      });

      // Cleanup function
      return () => {
        navLinks.forEach((link) => {
          const element = document.getElementById(link.anchor);
          if (element) {
            observer.unobserve(element);
          }
        });
      };
    }, []);

    return (
      <header className="fixed top-0 z-50 w-full bg-gray-900/95 backdrop-blur-sm shadow-xl shadow-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
          {/* Logo/Name */}
          <button
            className="text-2xl font-bold text-white cursor-pointer hover:text-emerald-400 transition"
            onClick={() => handleNavigate("home")}
          >
            {DATA.name}.dev
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.anchor}
                onClick={() => handleNavigate(link.anchor)}
                className={`text-lg font-medium transition duration-300 relative group 
                  ${
                    activeSection === link.anchor
                      ? "text-emerald-400"
                      : "text-gray-300 hover:text-emerald-300"
                  }`}
              >
                {link.name}
                {/* Active Underline Indicator */}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 w-full bg-emerald-500 transform transition-transform duration-300 
                  ${
                    activeSection === link.anchor
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </button>
            ))}
            {/* Resume Download Button */}
            <a
              href={DATA.resumeUrl}
              download={`${DATA.name}_Resume.pdf`}
              className="ml-6 bg-emerald-600 text-white flex items-center px-4 py-2 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300 transform hover:scale-[1.02]"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-gray-900/95 shadow-xl border-t border-gray-700">
            {navLinks.map((link) => (
              <button
                key={link.anchor}
                onClick={() => handleNavigate(link.anchor)}
                className="w-full text-left flex items-center px-6 py-3 text-lg text-gray-300 hover:bg-gray-800 hover:text-emerald-400 transition"
              >
                <link.icon className="w-5 h-5 mr-3" />
                {link.name}
              </button>
            ))}
            <a
              href={DATA.resumeUrl}
              download={`${DATA.name}_Resume.pdf`}
              className="w-full text-left flex items-center px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <Download className="w-5 h-5 mr-3" />
              Download Resume
            </a>
          </div>
        )}
      </header>
    );
  };

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {DATA.name}. All rights reserved.
        </p>
        <p className="text-sm mt-2">Built with React and Tailwind CSS</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      {/* Main content container with vertical scroll snapping */}
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
        <HomePage />
        <AboutPage />
        <ServicesPage />
        <BlogPage />
        <ContactPage />
        {/* Footer placed inside the last snap section for proper flow */}
        <Footer />
      </main>
    </div>
  );
};

export default App;
