"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../page";
import { 
  Code, 
  Palette, 
  Cpu, 
  Database, 
  Cloud, 
  Layers, 
  Zap,
  Terminal,
  Smartphone,
  Globe,
  Server,
  GitBranch,
  Shield
} from "lucide-react";

// Custom animation styles for Tailwind
const AnimationStyles = () => {
  return (
    <style jsx global>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      
      @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes pulse-ring {
        0% { transform: scale(0.95); opacity: 0.8; }
        100% { transform: scale(1.1); opacity: 0; }
      }
      
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .animate-gradient-flow {
        animation: gradientFlow 4s ease infinite;
        background-size: 200% auto;
      }
      
      .animate-pulse-ring {
        animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      .animate-shimmer {
        animation: shimmer 2s infinite linear;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255,255,255,0.8) 50%, 
          transparent 100%);
        background-size: 200% auto;
      }
      
      .gradient-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .glass-effect {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
      }
    `}</style>
  );
};

// Skill categories with icons and colors
const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    borderColor: "border-blue-100",
    skills: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 90, icon: "▲" },
      { name: "TypeScript", level: 88, icon: "📘" },
      { name: "JavaScript", level: 92, icon: "🟨" },
      { name: "Tailwind CSS", level: 94, icon: "🎨" },
      { name: "HTML5/CSS3", level: 96, icon: "🌐" },
    ]
  },
  {
    title: "UI/UX Design",
    icon: <Palette className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-100",
    skills: [
      { name: "Figma", level: 88, icon: "🎨" },
      { name: "UI Design", level: 85, icon: "✨" },
      { name: "UX Research", level: 82, icon: "🔍" },
      { name: "Prototyping", level: 84, icon: "⚡" },
      { name: "Design Systems", level: 80, icon: "📐" },
      { name: "Responsive Design", level: 95, icon: "📱" },
    ]
  },
  {
    title: "Backend & DevOps",
    icon: <Server className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    borderColor: "border-green-100",
    skills: [
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "Express.js", level: 82, icon: "🚀" },
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "REST APIs", level: 88, icon: "🔗" },
      { name: "GraphQL", level: 75, icon: "📊" },
      { name: "Docker", level: 70, icon: "🐳" },
    ]
  },
  {
    title: "AI & Tools",
    icon: <Cpu className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    borderColor: "border-orange-100",
    skills: [
      { name: "ChatGPT", level: 90, icon: "🤖" },
      { name: "AI Integration", level: 85, icon: "🧠" },
      { name: "Git", level: 88, icon: "📦" },
      { name: "VS Code", level: 95, icon: "💻" },
      { name: "Vite", level: 85, icon: "⚡" },
      { name: "Testing", level: 82, icon: "🧪" },
    ]
  }
];

// Featured skills with detailed descriptions
const featuredSkills = [
  {
    title: "React Ecosystem",
    description: "Building scalable, performant applications with modern React patterns",
    icon: <Code className="w-8 h-8" />,
    color: "bg-blue-500",
    percentage: 95
  },
  {
    title: "Next.js Framework",
    description: "Server-side rendering, static generation, and full-stack capabilities",
    icon: <Globe className="w-8 h-8" />,
    color: "bg-black",
    percentage: 90
  },
  {
    title: "TypeScript",
    description: "Type-safe development with better code maintainability",
    icon: <Terminal className="w-8 h-8" />,
    color: "bg-blue-600",
    percentage: 88
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user interfaces",
    icon: <Palette className="w-8 h-8" />,
    color: "bg-purple-500",
    percentage: 85
  }
];

// Tech stack badges
const techStack = [
  { name: "React", icon: "⚛️", color: "border-blue-200 bg-blue-50 text-blue-700" },
  { name: "Next.js", icon: "▲", color: "border-gray-200 bg-gray-50 text-gray-700" },
  { name: "TypeScript", icon: "📘", color: "border-blue-200 bg-blue-50 text-blue-700" },
  { name: "Tailwind", icon: "🎨", color: "border-cyan-200 bg-cyan-50 text-cyan-700" },
  { name: "Node.js", icon: "🟢", color: "border-green-200 bg-green-50 text-green-700" },
  { name: "MongoDB", icon: "🍃", color: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { name: "Figma", icon: "🎨", color: "border-purple-200 bg-purple-50 text-purple-700" },
  { name: "Git", icon: "📦", color: "border-orange-200 bg-orange-50 text-orange-700" },
  { name: "Vite", icon: "⚡", color: "border-yellow-200 bg-yellow-50 text-yellow-700" },
  { name: "Docker", icon: "🐳", color: "border-blue-200 bg-blue-50 text-blue-700" },
];

// Main Component
function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <>
      <AnimationStyles />
      <Header />
      
      {/* Main Container */}
      <section className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-50/50 to-transparent"></div>
          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #667eea 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-20"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100 mb-6"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">TECHNICAL EXPERTISE</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              <div className="relative inline-block">
                <span className="text-gray-900">Skills &</span>
                <br />
                <span className="relative">
                  <span className="gradient-text">Expertise</span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </span>
              </div>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              A comprehensive overview of my technical skills, tools, and capabilities 
              in modern web development and design
            </motion.p>
          </motion.div>

          {/* Featured Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-20"
          >
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${skill.color} bg-opacity-10`}>
                      <div className={skill.color.replace('bg-', 'text-')}>
                        {skill.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold gradient-text">{skill.percentage}%</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 text-sm">{skill.description}</p>
                  <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Categories Tabs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {skillCategories.map((category, index) => (
                <motion.button
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  onClick={() => setActiveCategory(index)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === index 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  {category.title}
                </motion.button>
              ))}
            </div>

            {/* Skills Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-3xl ${skillCategories[activeCategory].bgColor} p-8 border ${skillCategories[activeCategory].borderColor}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillCategories[activeCategory].skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <h3 className="font-bold text-gray-900">{skill.name}</h3>
                        </div>
                        <div className="text-lg font-bold gradient-text">{skill.level}%</div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${skillCategories[activeCategory].color}`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500 flex justify-between">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Advanced</span>
                        <span>Expert</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Tech Stack Cloud */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-16 lg:mb-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <span className="gradient-text">Technology Stack</span>
              </h2>
              <p className="text-gray-600">Technologies I work with regularly</p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl blur-3xl opacity-50"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 shadow-lg">
                <div className="flex flex-wrap justify-center gap-3">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, type: "spring" }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className={`px-4 py-3 rounded-xl border ${tech.color} flex items-center gap-2 font-medium transition-all duration-300 hover:shadow-md`}
                    >
                      <span>{tech.icon}</span>
                      <span>{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-3xl p-8 border border-gray-100"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">50+</div>
                <div className="text-gray-600 font-medium">Projects Completed</div>
                <div className="text-sm text-gray-500 mt-1">Web & Mobile Apps</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">30+</div>
                <div className="text-gray-600 font-medium">Technologies</div>
                <div className="text-sm text-gray-500 mt-1">Modern Stack</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">3+</div>
                <div className="text-gray-600 font-medium">Years Experience</div>
                <div className="text-sm text-gray-500 mt-1">Production Level</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">100%</div>
                <div className="text-gray-600 font-medium">Client Satisfaction</div>
                <div className="text-sm text-gray-500 mt-1">5-star Reviews</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16 lg:mt-20"
          >
            <div className="inline-block relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-lg max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Build Something Amazing?
                </h3>
                <p className="text-gray-600 mb-6">
                  Let's discuss how my skills and expertise can help bring your project to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    View My Work
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-full hover:border-gray-300 transition-all duration-300"
                  >
                    Contact Me
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default SkillsPage;