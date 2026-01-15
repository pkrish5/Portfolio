import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Menu, X, ArrowUpRight, MapPin, Calendar, Award, Code2, Cpu, Database, Globe, Zap, Layers, Terminal, Leaf, Lock, Brain, Network, Gauge } from 'lucide-react';
import '@fontsource/crimson-pro/400.css';
import '@fontsource/crimson-pro/600.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import './App.css';

const projects = [
  {
    title: "Rootwise",
    subtitle: "IoT Plant Care Platform",
    description: "Full-stack IoT ecosystem featuring ESP32 sensors, automated watering systems, and AI-powered plant health analysis using Gemini Vision API. Supports 500+ plant species with 40+ Lambda functions.",
    tags: ["Flutter", "AWS Lambda", "ESP32", "Gemini API", "IoT"],
    icon: Leaf,
    color: "#2d5a3d",
    link: "#",
    featured: true
  },
  {
    title: "Hurricane Damage Detection",
    subtitle: "CNN-Based Building Analysis",
    description: "Deep learning system achieving 99.83% AUC for post-Hurricane Harvey building damage assessment. Deployed three neural network architectures as REST API with Docker containerization.",
    tags: ["PyTorch", "CNN", "Docker", "REST API", "Computer Vision"],
    icon: Brain,
    color: "#1a3a2a",
    link: "#",
    featured: true
  },
  {
    title: "Texas Guadaloop",
    subtitle: "Hyperloop Route Optimization",
    description: "Research implementation of A* pathfinding with multi-objective optimization for hyperloop routing. Balances travel time, path curvature, and operational efficiency constraints.",
    tags: ["Python", "A* Algorithm", "Multi-objective Optimization", "Research"],
    icon: Gauge,
    color: "#3d6b4d",
    link: "#",
    featured: true
  },
  {
    title: "Proxy Lock",
    subtitle: "Universal Smart Lock System",
    description: "Renter-friendly smart lock combining Arduino, Bluetooth LE, React dashboard, and Firebase backend. Non-invasive installation preserving existing lock mechanisms.",
    tags: ["Arduino", "React", "Firebase", "BLE", "IoT"],
    icon: Lock,
    color: "#2a4a3a",
    link: "#"
  },
  {
    title: "Longhorn Network",
    subtitle: "Social Graph Visualization",
    description: "Interactive social network platform implementing Gale-Shapley for roommate matching and Dijkstra's algorithm for referral pathfinding. Built with React and advanced graph algorithms.",
    tags: ["React", "Graph Algorithms", "Gale-Shapley", "Dijkstra"],
    icon: Network,
    color: "#1f3f2f",
    link: "#"
  },
  {
    title: "BrainBoard",
    subtitle: "Audio Intelligence System",
    description: "Real-time audio processing pipeline using Deepgram speech-to-text integrated with Gemini API for intelligent content analysis and summarization.",
    tags: ["Deepgram", "Gemini API", "Python", "NLP"],
    icon: Terminal,
    color: "#4a7a5a",
    link: "#"
  }
];

const experience = [
  {
    company: "Avocado",
    badge: "YC W21",
    role: "Software Engineer Intern",
    period: "Current",
    description: "Developing ML pipelines for automated menu processing. Building scalable data extraction systems using computer vision and NLP.",
    tech: ["Python", "ML Pipelines", "Computer Vision", "NLP"]
  },
  {
    company: "Citibank",
    role: "Software Engineer Intern",
    period: "Summer 2024",
    description: "Built microservices and NLP-based duplicate detection systems. Achieved 3rd place in internal innovation competition.",
    tech: ["Microservices", "NLP", "Java", "AWS"]
  }
];

const skills = [
  { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "Dart", "SQL"] },
  { category: "Frontend", items: ["React", "Flutter", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "AWS Lambda", "Firebase", "PostgreSQL", "Docker"] },
  { category: "ML/AI", items: ["PyTorch", "TensorFlow", "OpenCV", "Gemini API", "NLP"] },
  { category: "Embedded", items: ["ESP32", "Arduino", "ARM Cortex", "MQTT", "BLE"] }
];

const achievements = [
  { title: "1st Place", event: "Sony AITRIOS Hackathon", icon: Award },
  { title: "3rd Place", event: "Citi Innovation Competition", icon: Award },
  { title: "Research Lead", event: "Texas Guadaloop", icon: Zap }
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
        <motion.a 
          href="#" 
          className="nav-logo"
          whileHover={{ scale: 1.02 }}
        >
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="hero" id="hero">
      <motion.div className="hero-bg" style={{ y }}>
        <div className="grid-pattern" />
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
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
          <span className="title-line accent">Kothapalli</span>
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
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
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
              I'm a problem solver who believes the best technology is invisible—it 
              just works, delighting users without demanding their attention.
            </p>
            <p className="about-text">
              As an Electrical & Computer Engineering student at UT Austin with a minor 
              in Statistics and Data Science, I bridge the gap between hardware and 
              software. From ESP32 microcontrollers to cloud-native ML pipelines, I 
              build systems that are both technically elegant and practically impactful.
            </p>
            <p className="about-text">
              When I'm not coding, you'll find me competing in hackathons, conducting 
              hyperloop research with Texas Guadaloop, or teaching digital safety to 
              seniors in my community.
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
            </div>
          </motion.div>

          <motion.div 
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
          </motion.div>
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
                  {exp.tech.map((t, j) => (
                    <span key={j} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

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

        <div className="projects-featured">
          {featuredProjects.map((project, i) => (
            <motion.article 
              key={i}
              className="project-card featured"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div className="project-icon" style={{ background: project.color }}>
                <project.icon size={28} />
              </div>
              
              <div className="project-content">
                <div className="project-header">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                  </div>
                  <a href={project.link} className="project-link" aria-label="View project">
                    <ExternalLink size={20} />
                  </a>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="projects-grid">
          {otherProjects.map((project, i) => (
            <motion.article 
              key={i}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="project-icon small" style={{ background: project.color }}>
                <project.icon size={20} />
              </div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <a href={project.link} className="project-link" aria-label="View project">
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.slice(0, 4).map((tag, j) => (
                    <span key={j} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
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
    { icon: Github, label: "GitHub", href: "https://github.com/pranavkothapalli" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/pranavkothapalli" },
    { icon: Mail, label: "Email", href: "mailto:pranav@example.com" }
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
        <p className="footer-text">
          Designed & Built by Pranav Kothapalli
        </p>
        <p className="footer-copyright">
          © {new Date().getFullYear()} All rights reserved.
        </p>
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
