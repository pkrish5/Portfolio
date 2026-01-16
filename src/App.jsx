import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Menu, X, ArrowUpRight, MapPin, Calendar, Award, Code2, Cpu, Database, Globe, Zap, Layers, Terminal, Leaf, Lock, Brain, Network, Gauge, Gamepad2, Music, Radio, Shield, Users, GitBranch, ChevronRight } from 'lucide-react';
import '@fontsource/crimson-pro/400.css';
import '@fontsource/crimson-pro/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './App.css';

const projects = [
  {
    title: "Plant Buddi App",
    subtitle: "IoT Plant Care Platform",
    description: "Full-stack IoT platform with ESP32 sensors enabling real-time automated watering via MQTT across multiple devices.",
    longDescription: "Engineered full-stack IoT platform with ESP32 sensors. Built gamified Flutter mobile app with streak tracking, community forums, and Firebase push notifications. Developed Gemini Vision AI system analyzing plant photos to detect health issues. Implemented autonomous species identification pipeline generating 500+ botanical care profiles.",
    tags: ["Python", "Node.js", "Flutter", "ESP32", "AWS IoT", "Lambda", "DynamoDB"],
    icon: Leaf,
    color: "#10b981",
    featured: true,
    category: "fullstack",
    githubUrl: "https://plantbuddi.com" // Update this link
  },
  {
    title: "Brain Board",
    subtitle: "AI-Powered Mind Mapping",
    description: "AI-powered mind-mapping tool that transcribes live conversations and visualizes ideas as knowledge graphs.",
    longDescription: "Built AI-powered mind-mapping tool that transcribes live conversations and visualizes ideas as knowledge graphs to aid ideation. Integrated Python, Deepgram, Gemini, AWS Lambda & DynamoDB to enable real-time speech-to-visual processing on the edge.",
    tags: ["Python", "Deepgram", "Gemini", "AWS Lambda", "DynamoDB"],
    icon: Brain,
    color: "#8b5cf6",
    featured: true,
    category: "ml",
    githubUrl: "https://github.com/adiv06/HackTX-25" // Update this link
  },
  {
    title: "CrowdCast",
    subtitle: "Edge-Sensing AI System",
    description: "Edge-sensing AI system using Sony Aitrios sensors to reduce overcrowding by rerouting foot traffic.",
    longDescription: "Built an edge-sensing AI system to reduce overcrowding by rerouting tourists toward lesser-known attractions. Used Sony Aitrios sensor and real-time analytics to detect crowd density and optimize foot traffic flow. Awarded 1st place overall at Sony AITRIOS Hackathon.",
    tags: ["Python", "Edge Computing", "Real-time Analytics", "Sony Aitrios"],
    icon: Users,
    color: "#f59e0b",
    featured: true,
    category: "ml",
    githubUrl: "https://github.com/pkrish5/CrowdCast" // Update this link
  },
  {
    title: "Texas Guadaloop",
    subtitle: "Hyperloop Route Optimization",
    description: "Multi-objective A* pathfinding for hyperloop routes balancing travel time, curvature, and operational efficiency.",
    longDescription: "Research contribution to UT Austin's hyperloop team. Engineered algorithms processing Texas terrain data with elevation and infrastructure considerations for next-generation transportation planning.",
    tags: ["Python", "A* Algorithm", "Multi-objective Optimization", "GIS", "Research"],
    icon: Gauge,
    color: "#3d6b4d",
    featured: false,
    category: "algorithms",
    githubUrl: "https://github.com/pkrish5/Texas-Guadaloop" // Update this link
  },
  {
    title: "Flappy Bird Game",
    subtitle: "Embedded Gaming System",
    description: "Multiplayer side-scroller on MSP-M0 with LCD sprite rendering, DAC audio, and 60Hz physics engine.",
    longDescription: "Engineered multiplayer side-scroller on MSP-M0 with LCD sprite rendering, DAC audio, and ADC input sampling. Programmed 60Hz physics engine using SysTick interrupts for smooth scrolling and precise collision detection.",
    tags: ["C/C++", "ARM MSP-M0", "LCD", "DAC", "Interrupts"],
    icon: Gamepad2,
    color: "#2a4a3a",
    featured: false,
    category: "embedded",
    githubUrl: "https://github.com/pkrish5/ECE319H-Embedded-Systems-Honors"
  },
  {
    title: "Proxy Lock",
    subtitle: "Universal Smart Lock",
    description: "Renter-friendly smart lock with Arduino, BLE, React dashboard, and Firebase.",
    longDescription: "Built renter-friendly smart lock w/ React, Firebase, and Bluetooth LE proximity with an Arduino for secure, automatic unlocking. Designed for temporary installations preserving existing locks.",
    tags: ["React", "Firebase", "Bluetooth LE", "Arduino", "IoT"],
    icon: Lock,
    color: "#1a3a2a",
    featured: false,
    category: "iot",
    githubUrl: "https://github.com/pkrish5/Proxy-Lock" // Update this link
  },
  {
    title: "Traffic Light FSM",
    subtitle: "Real-Time Control System",
    description: "Finite state machine traffic controller on ARM Cortex with precise timing, switch debouncing, and LED sequencing.",
    longDescription: "Implemented Moore machine architecture with configurable timing intervals and sensor-triggered state transitions. Programmed in C, C++, and ARM Assembly for optimal performance on MSPM0 microcontroller.",
    tags: ["C", "ARM Assembly", "MSPM0", "FSM", "GPIO", "Timers"],
    icon: Zap,
    color: "#1f3f2f",
    featured: false,
    category: "embedded",
    githubUrl: "https://github.com/pkrish5/ECE319H-Embedded-Systems-Honors"
  },
  {
    title: "IR Communication System",
    subtitle: "Wireless Data Transmission",
    description: "Infrared serial communication with 38kHz carrier modulation, UART protocol, and real-time LCD position plotting.",
    longDescription: "Built custom FIFO buffers, implemented bit-level timing control for IR transmission, and designed receiver synchronization using timeout interrupts for reliable data transfer between microcontrollers.",
    tags: ["C++", "UART", "IR Protocol", "ADC", "SPI", "MSPM0"],
    icon: Radio,
    color: "#4a7a5a",
    featured: false,
    category: "embedded",
    githubUrl: "https://github.com/pkrish5/ECE319H-Embedded-Systems-Honors"
  },
  {
    title: "Digital Piano",
    subtitle: "DAC Audio Synthesizer",
    description: "5-bit binary-weighted DAC piano with interrupt-driven sine wave synthesis at musical frequencies.",
    longDescription: "Designed resistor ladder DAC, implemented lookup table-based waveform generation, and achieved clean audio output through careful timing control and signal filtering on MSPM0G3507.",
    tags: ["C", "DAC", "Audio", "Timers", "Interrupts", "Hardware"],
    icon: Music,
    color: "#2d5a3d",
    featured: false,
    category: "embedded",
    githubUrl: "https://github.com/pkrish5/ECE319H-Embedded-Systems-Honors"
  },
  {
    title: "Shelter Safe",
    subtitle: "Disaster Response App",
    description: "SwiftUI app connecting governments and humanitarian orgs to help users locate emergency shelters in real-time.",
    longDescription: "Led team of six developers building interactive disaster response platform with live shelter availability, capacity tracking, imagery, and turn-by-turn navigation integration for emergency situations.",
    tags: ["Swift", "SwiftUI", "MapKit", "Firebase", "iOS", "Team Lead"],
    icon: Shield,
    color: "#3d6b4d",
    featured: false,
    category: "mobile",
    githubUrl: "https://github.com/pkrish5/Shelter-Safe" // Update this link
  },
  {
    title: "Longhorn Network",
    subtitle: "Social Graph Platform",
    description: "Social network with Gale-Shapley roommate matching and Dijkstra's referral pathfinding with force-directed graphs.",
    longDescription: "Full-stack React application demonstrating classical graph algorithms in practical social networking context with real-time updates and interactive D3.js visualizations.",
    tags: ["React", "Graph Algorithms", "Gale-Shapley", "Dijkstra", "D3.js"],
    icon: Network,
    color: "#2a4a3a",
    featured: false,
    category: "fullstack",
    githubUrl: "https://github.com/pkrish5/LonghornNetwork"
  },
  {
    title: "BLIP Interpreter",
    subtitle: "Language Implementation",
    description: "Complete interpreter for BLIP language with recursive expression parsing, variable scoping, and control flow.",
    longDescription: "Built lexer, parser, and evaluator from scratch in C++. Handles prefix notation expressions, variable declarations, arithmetic/logical operators, and text output with escape sequences.",
    tags: ["C++", "Interpreters", "Parsing", "Recursion", "Compilers"],
    icon: Code2,
    color: "#4a7a5a",
    featured: false,
    category: "systems",
    githubUrl: "https://github.com/pkrish5/Software-2-Honors-ECE-312H-Labs"
  },
  {
    title: "Set ADT",
    subtitle: "Efficient Data Structure",
    description: "High-performance set with O(n) bulk operations and O(log n) membership testing via sorted arrays.",
    longDescription: "Optimized union, intersection, and difference operations using merge-based algorithms. Includes comprehensive algebraic property testing and performance benchmarks proving linear time complexity.",
    tags: ["C++", "Data Structures", "Algorithms", "Binary Search", "ADT"],
    icon: Database,
    color: "#2d5a3d",
    featured: false,
    category: "systems",
    githubUrl: "https://github.com/pkrish5/Software-2-Honors-ECE-312H-Labs"
  },
  {
    title: "Customer Database",
    subtitle: "Inventory System",
    description: "OOP inventory system with custom string class, dynamic database, and operator overloading.",
    longDescription: "Demonstrates C++ memory management, RAII principles, copy semantics, and STL-style container interfaces with proper resource cleanup and no memory leaks.",
    tags: ["C++", "OOP", "Memory Management", "Operator Overloading"],
    icon: Users,
    color: "#1a3a2a",
    featured: false,
    category: "systems",
    githubUrl: "https://github.com/pkrish5/Software-2-Honors-ECE-312H-Labs"
  },
  {
    title: "Dijkstra & Prim's",
    subtitle: "Graph Algorithms",
    description: "Optimized heap-based Dijkstra's shortest path and Prim's MST with O(log n) decrease-key operations.",
    longDescription: "Java implementation featuring custom min-heap with position tracking for efficient key updates. Applied to student networking cost optimization problem with comprehensive testing suite.",
    tags: ["Java", "Graph Algorithms", "Heaps", "Dijkstra", "Prim's MST"],
    icon: GitBranch,
    color: "#3d6b4d",
    featured: false,
    category: "algorithms",
    githubUrl: "https://github.com/pkrish5/UT-Power-Grid-Connector-Graphs"
  },
  {
    title: "Matrix Multiplication",
    subtitle: "Numerical Computing",
    description: "Optimized matrix operations with array and pointer implementations plus submatrix extraction.",
    longDescription: "Implemented cache-efficient matrix multiplication algorithms with both contiguous array and pointer-based approaches. Includes submatrix extraction for block matrix operations.",
    tags: ["C++", "Linear Algebra", "Memory Management", "Optimization"],
    icon: Layers,
    color: "#2a4a3a",
    featured: false,
    category: "systems",
    githubUrl: "https://github.com/pkrish5/Software-2-Honors-ECE-312H-Labs"
  },
  {
    title: "Recursive Algorithms",
    subtitle: "Algorithm Design Patterns",
    description: "Classic recursive solutions: knapsack, binary tree paths, linked lists, and tic-tac-toe game trees.",
    longDescription: "Implemented knapsack dynamic programming, least-weight path finding in binary trees, linked list node removal, and complete tic-tac-toe outcome enumeration with win/loss/draw counting.",
    tags: ["C++", "Recursion", "Dynamic Programming", "Trees", "Game Theory"],
    icon: Brain,
    color: "#1f4f3f",
    featured: false,
    category: "algorithms",
    githubUrl: "https://github.com/pkrish5/Software-2-Honors-ECE-312H-Labs"
  }
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'embedded', label: 'Embedded Systems' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'ml', label: 'ML / AI' },
  { id: 'iot', label: 'IoT & Hardware' },
  { id: 'systems', label: 'Systems Programming' },
  { id: 'algorithms', label: 'Algorithms' },
  { id: 'mobile', label: 'Mobile' }
];

const experience = [
  {
    company: "Avocado",
    badge: "YC W21",
    role: "Software Engineer Intern",
    period: "Current",
    description: "Building ML pipelines for automated menu processing. Developing scalable data extraction systems using computer vision and NLP to digitize restaurant operations.",
    tech: ["Python", "ML Pipelines", "Computer Vision", "NLP"]
  },
  {
    company: "Citibank",
    role: "Software Engineer Intern",
    period: "Summer 2024",
    description: "Built microservices and NLP-based duplicate detection systems. Won 3rd place in internal innovation competition for novel fraud detection approach.",
    tech: ["Microservices", "NLP", "Java", "AWS"]
  }
];

const skills = [
  { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "C", "Dart", "SQL", "ARM Assembly"] },
  { category: "Frontend", items: ["React", "Flutter", "Next.js", "SwiftUI", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "AWS Lambda", "Firebase", "PostgreSQL", "Docker", "REST APIs"] },
  { category: "ML/AI", items: ["PyTorch", "TensorFlow", "OpenCV", "Gemini API", "NLP", "Computer Vision"] },
  { category: "Embedded", items: ["ESP32", "Arduino", "ARM Cortex", "MQTT", "BLE", "I2C/SPI/UART"] }
];

const achievements = [
  { title: "1st Place", event: "Sony AITRIOS Hackathon", icon: Award },
  { title: "3rd Place", event: "Citi Innovation Competition", icon: Award },
  { title: "2nd Place", event: "ExxonMobil Case Competition", icon: Zap }
];

const coursework = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "Software Design I/II & Lab",
  "Embedded Systems",
  "Computer Architecture",
  "Machine Learning",
  "Linear Algebra & Matrices",
  "Probability",
  "Discrete Math"
];

function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-content">
        <motion.a href="#" className="nav-logo" whileHover={{ scale: 1.02 }}>
          <span className="logo-text">PK</span>
        </motion.a>

        <div className="nav-links desktop">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-mobile-link"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="hero" id="hero">
      <motion.div className="hero-bg" style={{ y }}>
        {/* Mesh gradient via CSS */}
      </motion.div>

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MapPin size={14} />
          <span>Austin, Texas</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="title-line">Pranav</span>
          <span className="title-line accent"> Krishnan</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Software Engineer & Embedded Systems Developer
        </motion.p>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          ECE student at UT Austin crafting intelligent systems at the intersection
          of hardware and software. Currently building ML pipelines at Avocado (YC W21).
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#projects" className="btn btn-primary">
            <span>View Projects</span>
            <ArrowUpRight size={18} />
          </a>
          <a href="#contact" className="btn btn-secondary">
            <span>Get in Touch</span>
          </a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <achievement.icon size={16} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{achievement.title}</span>
                <span className="stat-label">{achievement.event}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="about section" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">01</span>
          <h2 className="section-title">About</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about-lead">
              I love to build things that solve real problems.
            </p>
            <p className="about-text">
              I’m an Electrical & Computer Engineering student at UT Austin with a minor
              in Statistics and Data Science, and I like working across both hardware and software.
              I enjoy figuring things out, experimenting, and turning ideas into things that actually work.
            </p>
            <p className="about-text">
              Outside of classes, you’ll usually find me playing basketball, thrifting, working out or finding the next best thai spot
            </p>

            <div className="about-education">
              <div className="education-item">
                <div className="education-icon">
                  <Layers size={20} />
                </div>
                <div className="education-content">
                  <h4>University of Texas at Austin</h4>
                  <p>B.S. Electrical & Computer Engineering</p>
                  <p className="education-minor">Minor: Statistics & Data Science</p>
                </div>
              </div>

              <div className="coursework-container" style={{ marginTop: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>Relevant Coursework</h4>
                <div className="coursework-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {coursework.map((course, i) => (
                    <span key={i} className="tech-tag" style={{ background: 'var(--color-bg-card)', fontSize: '0.8rem' }}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="visual-card">
              <div className="visual-pattern" />
              <div className="visual-content">
                <div className="visual-stat">
                  <span className="visual-number">500+</span>
                  <span className="visual-label">Plant Species Supported</span>
                </div>
                <div className="visual-stat">
                  <span className="visual-number">99.83%</span>
                  <span className="visual-label">CNN Model AUC</span>
                </div>
                <div className="visual-stat">
                  <span className="visual-number">40+</span>
                  <span className="visual-label">Lambda Functions</span>
                </div>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="experience section" id="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">02</span>
          <h2 className="section-title">Experience</h2>
        </motion.div>

        <div className="experience-timeline">
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              className="experience-item"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <div className="experience-marker">
                <div className="marker-dot" />
                {i < experience.length - 1 && <div className="marker-line" />}
              </div>

              <div className="experience-card">
                <div className="experience-header">
                  <div className="experience-company">
                    <h3>{exp.company}</h3>
                    {exp.badge && <span className="company-badge">{exp.badge}</span>}
                  </div>
                  <span className="experience-period">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                </div>
                <p className="experience-role">{exp.role}</p>
                <p className="experience-description">{exp.description}</p>
                <div className="experience-tech">
                  {exp.tech.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onClick, isInView }) {
  const IconComponent = project.icon;

  return (
    <motion.article
      className={`project-card ${project.featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={onClick}
    >
      <div className="project-card-inner">
        <div className="project-icon" style={{ background: project.color }}>
          <IconComponent size={project.featured ? 28 : 22} />
        </div>

        <div className="project-content">
          <div className="project-header">
            <div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
            </div>
            <div className="project-arrow">
              <ChevronRight size={18} />
            </div>
          </div>

          <p className="project-description">{project.description}</p>

          <div className="project-tags">
            {project.tags.slice(0, project.featured ? 6 : 4).map((tag, j) => (
              <span key={j} className="project-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  const IconComponent = project.icon;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-icon" style={{ background: project.color }}>
            <IconComponent size={32} />
          </div>
          <div>
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-subtitle">{project.subtitle}</p>
          </div>
        </div>

        <div className="modal-body">
          <p className="modal-description">{project.longDescription}</p>

          <div className="modal-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="modal-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Github size={18} />
              <span>View Code</span>
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section ref={ref} className="projects section" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">03</span>
          <h2 className="section-title">Projects</h2>
        </motion.div>

        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className="projects-grid">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isInView={isInView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="skills section" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">04</span>
          <h2 className="section-title">Skills</h2>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skillGroup, i) => (
            <motion.div
              key={i}
              className="skill-category"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <h3 className="skill-category-title">{skillGroup.category}</h3>
              <div className="skill-items">
                {skillGroup.items.map((skill, j) => (
                  <motion.span
                    key={j}
                    className="skill-item"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/pkrish5" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/pranavkrishnan-" },
    { icon: Mail, label: "Email", href: "mailto:pranav.krishnan05@gmail.com" }
  ];

  return (
    <section ref={ref} className="contact section" id="contact">
      <div className="container">
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">05</span>
          <h2 className="section-title">Get in Touch</h2>
        </motion.div>

        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="contact-text">
            I'm always interested in hearing about new opportunities, interesting
            projects, or just connecting with fellow engineers and builders.
          </p>

          <motion.a
            href="mailto:pranav@example.com"
            className="btn btn-primary btn-large"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={20} />
            <span>Say Hello</span>
          </motion.a>

          <div className="social-links">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                className="social-link"
                aria-label={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.1 }}
              >
                <link.icon size={22} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">Designed & Built by Pranav Krishnan</p>
        <p className="footer-copyright">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
