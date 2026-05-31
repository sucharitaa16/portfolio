import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Portfolio = () => {

  const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_7j4u499",
      "template_x91bz5l",
      e.target,
      "VwzvQMM29KOD1jHyh"
    )
    .then(() => {
      alert("Message sent successfully!");
      e.target.reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send message");
    });
};
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef(null);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Custom cursor effect
  useEffect(() => {
    let animationFrame;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setRingPosition({ x: currentX, y: currentY });
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, entry.target.id])]);
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      if (observerRef.current) {
        sections.forEach((section) => observerRef.current?.unobserve(section));
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Hide custom cursor on touch devices
  const isTouchDevice = 'ontouchstart' in window;

  // Skills data
  const skills = [
    { name: 'UI/UX Design', icon: '🎨', level: 92, description: 'Figma, Adobe XD, Prototyping' },
    { name: 'React.js', icon: '⚛️', level: 88, description: 'Hooks, Redux, Next.js' },
    { name: 'Tailwind CSS', icon: '🎨', level: 90, description: 'Responsive, Custom Design' },
    { name: 'JavaScript/ES6', icon: '𝙅𝙎', level: 89, description: 'Modern JavaScript' },
    { name: 'Node.js', icon: '🟢', level: 88, description: 'REST APIs, Microservices' },
    { name: 'Express.js', icon: '🚂', level: 87, description: 'Middleware, Routing' },
    { name: 'MongoDB', icon: '🍃', level: 85, description: 'Aggregation, Indexing' },
    { name: 'REST API Dev', icon: '🔌', level: 92, description: 'Design, Documentation' },
    { name: 'Auth & AuthZ', icon: '🔐', level: 86, description: 'JWT, OAuth, Sessions' },
    { name: 'Git & GitHub', icon: '🐙', level: 88, description: 'CI/CD, Collaboration' },
    { name: 'Full Stack Dev', icon: '🌐', level: 87, description: 'End-to-end Development' },
    { name: 'Figma', icon: '🎯', level: 91, description: 'UI/UX, Prototyping' },
  ];

  // Projects data
  const projects = [
    {
      num: '01',
      name: 'Carbon Code',
      role: 'Full Stack Developer',
      tagline: 'AI-Powered Code Optimization Platform',
      desc: 'Built an AI-powered platform to analyze and optimize source code for performance, readability, and carbon efficiency. Integrated LLM APIs with rule-based fallbacks and exposed clean REST endpoints. Features real-time code analysis, automated fix suggestions, and detailed performance metrics dashboard.',
      stack: ['React.js', 'Node.js', 'Express.js', 'LLM APIs', 'REST API', 'Tailwind CSS', 'Render', 'MongoDB'],
      color: '#00d4ff'
    },
    {
      num: '02',
      name: 'Sentinel',
      role: 'Full Stack Developer',
      tagline: 'GLOF Early Warning System',
      desc: 'End-to-end monitoring solution for Glacial Lake Outburst Flood risks. Automates satellite and sensor data collection for real-time threat analysis, generates high-precision flood warnings, and dispatches critical alerts to NGOs and local authorities. Reduced response time by 60% through optimized alert system.',
      stack: ['React.js', 'Node.js', 'MongoDB', 'WebSocket', 'Satellite Data APIs', 'Real-time Alerts', 'Tailwind CSS'],
      color: '#00ff9d'
    },
    {
      num: '03',
      name: 'Blockchain Food Supply Chain',
      role: 'Full Stack Developer',
      tagline: 'Web2.5 Integrity Platform',
      desc: 'Blockchain-based supply chain platform using cryptographic anchoring for data integrity. Hybrid Web2.5 architecture ensures fast retrieval with blockchain security. Implemented OTP-based ownership transfer, admin verification system, and real-time product tracking across the supply network.',
      stack: ['React.js', 'Node.js', 'MongoDB', 'Web3.js', 'Cryptography', 'OTP Auth', 'Tailwind CSS', 'Express.js'],
      color: '#ff6b6b'
    }
  ];

  // Experience data
  const experiences = [
    {
      date: '2024 — Present',
      role: 'Freelance Full Stack Developer',
      company: 'Independent · Remote',
      points: [
        'Designing and building production-ready full-stack applications for clients worldwide',
        'Architecting RESTful APIs with Node.js and Express.js, integrated with MongoDB databases',
        'Creating responsive, user-centered UI/UX designs using Figma and Tailwind CSS'
      ]
    },
    {
      date: '2024',
      role: 'Carbon Code — Full Stack Developer',
      company: 'AI Platform Project',
      points: [
        'Integrated LLM APIs with intelligent rule-based fallback systems for reliable code analysis',
        'Designed and exposed REST endpoints for code evaluation, scoring, and automated fix generation',
        'Built responsive React frontend with real-time code analysis visualization'
      ]
    },
    {
      date: '2024',
      role: 'Sentinel — Full Stack Developer',
      company: 'Disaster Tech Project',
      points: [
        'Built automated data pipelines ingesting satellite and sensor feeds for real-time flood risk analysis',
        'Developed WebSocket-based alert dispatch system with sub-minute latency',
        'Designed end-to-end architecture from data ingestion to notification delivery'
      ]
    },
    {
      date: '2025',
      role: 'Blockchain Food Supply Chain — Full Stack Developer',
      company: 'Web3 Supply Chain Project',
      points: [
        'Implemented cryptographic data anchoring for supply chain record immutability',
        'Built OTP-based ownership transfer mechanism for multi-participant network',
        'Designed admin-verified product gating logic with blockchain verification'
      ]
    }
  ];

  return (
    <div className="bg-[#080b10] text-[#e8edf5] font-['Inter',sans-serif] overflow-x-hidden">
      {/* Custom Cursor */}
      {!isTouchDevice && (
        <>
          <div
            className="fixed w-2 h-2 rounded-full bg-[#00d4ff] pointer-events-none z-[9999] mix-blend-screen transition-opacity duration-300 hidden lg:block"
            style={{ left: mousePosition.x, top: mousePosition.y, transform: 'translate(-50%, -50%)' }}
          />
          <div
            className="fixed w-8 h-8 rounded-full border border-[#00d4ff]/40 pointer-events-none z-[9998] transition-all duration-200 hidden lg:block"
            style={{ left: ringPosition.x, top: ringPosition.y, transform: 'translate(-50%, -50%)' }}
          />
        </>
      )}

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00d4ff] via-[#00ff9d] to-[#00d4ff] z-[200] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }} />

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E')]" />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(0,212,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        typeof window !== 'undefined' && window.scrollY > 60 ? 'py-3 bg-[#080b16]/95 backdrop-blur-xl border-b border-[#00d4ff]/15' : 'py-5 bg-[#080b10]/90 backdrop-blur-lg border-b border-[#00d4ff]/5'
      }`}>
        {/* Logo */}
        <button onClick={() => scrollToSection('hero')} className="group flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff] to-[#00ff9d] rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#080b10] font-bold text-sm font-['JetBrains_Mono',monospace]">SK</span>
            </div>
          </div>
          <span className="font-['JetBrains_Mono',monospace] text-sm font-medium text-[#e8edf5] tracking-wider hidden sm:block">
            Sucharita<span className="text-[#00d4ff]">.dev</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 list-none">
          {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item)}
                className={`font-['JetBrains_Mono',monospace] text-xs font-normal uppercase tracking-[0.1em] transition-all duration-300 relative py-1 ${
                  activeSection === item 
                    ? 'text-[#00d4ff]' 
                    : 'text-[#7a8fa8] hover:text-[#e8edf5]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gradient-to-r after:from-[#00d4ff] after:to-[#00ff9d] after:transition-all after:duration-300 hover:after:w-full ${
                  activeSection === item ? 'after:w-full' : ''
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block font-['JetBrains_Mono',monospace] text-xs font-medium tracking-[0.08em] uppercase px-5 py-2.5 border border-[#00d4ff] text-[#00d4ff] bg-transparent cursor-pointer transition-all duration-300 hover:bg-[#00d4ff] hover:text-[#080b10] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
          >
            Hire Me
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
            aria-label="Menu"
          >
            <span className={`w-6 h-[1.5px] bg-[#e8edf5] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-[1.5px] bg-[#e8edf5] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[1.5px] bg-[#e8edf5] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[99] bg-[#080b10]/98 backdrop-blur-2xl flex-col items-center justify-center gap-8 transition-all duration-500 ${
        mobileMenuOpen ? 'flex opacity-100' : 'hidden opacity-0'
      }`}>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-2xl text-[#7a8fa8] cursor-pointer bg-transparent border-none hover:text-[#00d4ff] transition-colors"
        >
          ✕
        </button>
        <div className="flex flex-col items-center gap-6">
          {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="font-['JetBrains_Mono',monospace] text-lg tracking-[0.15em] text-[#e8edf5] uppercase transition-all duration-200 hover:text-[#00d4ff] hover:scale-105"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="absolute bottom-12 flex gap-6">
          <a href="mailto:kumarsucharita16@gmail.com" className="text-[#7a8fa8] hover:text-[#00d4ff] transition-colors">Email</a>
          <a href="https://github.com/sucharitaa16" target="_blank" rel="noopener noreferrer" className="text-[#7a8fa8] hover:text-[#00d4ff] transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/sucharita-kumar-9864692a2" target="_blank" rel="noopener noreferrer" className="text-[#7a8fa8] hover:text-[#00d4ff] transition-colors">LinkedIn</a>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center px-6 md:px-12 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute rounded-full blur-[100px] pointer-events-none opacity-20 w-[600px] h-[600px] bg-[#00d4ff] -top-[300px] -right-[200px] animate-pulse" />
        <div className="absolute rounded-full blur-[100px] pointer-events-none opacity-15 w-[400px] h-[400px] bg-[#00ff9d] bottom-0 -left-[200px] animate-pulse" style={{ animationDuration: '4s' }} />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div className={`z-10 transition-all duration-700 transform ${
            visibleSections.includes('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-2 font-['JetBrains_Mono',monospace] text-[0.7rem] tracking-[0.15em] text-[#00d4ff] uppercase border border-[#00d4ff]/30 px-4 py-2 mb-8 bg-[#00d4ff]/5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
              Available for freelance
            </div>
            <h1 className="font-['DM_Serif_Display',serif] text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-[#e8edf5] mb-3 tracking-[-0.02em]">
              Sucharita<br /><em className="text-[#00d4ff] not-italic">Kumar</em>
            </h1>
            <p className="font-['JetBrains_Mono',monospace] text-xs md:text-sm text-[#00d4ff] tracking-[0.12em] uppercase mb-6">
              // Full Stack Developer · UI/UX Designer · API Architect
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[#a0b0c0] max-w-lg mb-8 font-light">
              I build <strong className="text-[#e8edf5] font-medium">beautiful, functional web applications</strong> from concept to deployment.
              Specializing in modern full-stack development with a designer's eye for detail — creating experiences that users love.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => scrollToSection('projects')}
                className="group font-['JetBrains_Mono',monospace] text-xs tracking-[0.1em] uppercase px-7 py-3.5 bg-gradient-to-r from-[#00d4ff] to-[#00ff9d] text-[#080b10] font-semibold cursor-pointer border-none transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,212,255,0.3)] flex items-center gap-2"
                style={{ clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}
              >
                View Projects
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="font-['JetBrains_Mono',monospace] text-xs tracking-[0.1em] uppercase px-7 py-3.5 bg-transparent text-[#e8edf5] border border-[#263344] cursor-pointer transition-all duration-300 hover:border-[#00d4ff] hover:text-[#00d4ff] hover:scale-105"
                style={{ clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}
              >
                Let's Talk
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-[#1e2a38]">
              <div>
                <div className="font-['JetBrains_Mono',monospace] text-3xl font-semibold text-[#00d4ff]">5+</div>
                <div className="text-xs text-[#7a8fa8] tracking-[0.08em] font-light mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="font-['JetBrains_Mono',monospace] text-3xl font-semibold text-[#00d4ff]">12+</div>
                <div className="text-xs text-[#7a8fa8] tracking-[0.08em] font-light mt-1">Technologies</div>
              </div>
              <div>
                <div className="font-['JetBrains_Mono',monospace] text-3xl font-semibold text-[#00d4ff]">100%</div>
                <div className="text-xs text-[#7a8fa8] tracking-[0.08em] font-light mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Visual - 3D Card Effect */}
          <div className="hidden lg:flex justify-center items-center relative group">
            <div className="relative w-[400px] h-[400px] perspective-1000">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-[#00d4ff]/15 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-[30px] rounded-full border border-[#00ff9d]/10 animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute inset-[60px] rounded-full border border-[#00d4ff]/8 animate-[spin_15s_linear_infinite]" />
              
              {/* Floating icons */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#141920] border border-[#263344] rounded-xl flex items-center justify-center text-xl shadow-lg animate-float">
                ⚛️
              </div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#141920] border border-[#263344] rounded-xl flex items-center justify-center text-xl shadow-lg animate-float-delay">
                🎨
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#141920] border border-[#263344] rounded-xl flex items-center justify-center text-xl shadow-lg animate-float">
                🚀
              </div>
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#141920] border border-[#263344] rounded-xl flex items-center justify-center text-xl shadow-lg animate-float-delay">
                💎
              </div>
              
              {/* Core */}
              <div className="absolute inset-[100px] rounded-full bg-gradient-to-br from-[#00d4ff]/15 via-[#1a2130] to-[#00ff9d]/5 border border-[#263344] flex flex-col items-center justify-center gap-3 backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                <span className="text-4xl animate-pulse">{`</>`}</span>
                <span className="font-['JetBrains_Mono',monospace] text-xs text-[#00d4ff] tracking-[0.15em] uppercase">Full Stack</span>
                <span className="font-['JetBrains_Mono',monospace] text-[0.6rem] text-[#7a8fa8] tracking-[0.1em]">UI/UX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 bg-[#0e1219] border-y border-[#1e2a38] relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className={`relative transition-all duration-700 delay-100 transform ${
            visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-br from-[#141920] to-[#0e1219] border border-[#263344] p-8 rounded-2xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d4ff] via-[#00ff9d] to-transparent" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00d4ff]/5 rounded-full blur-3xl" />
              
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#00ff9d] flex items-center justify-center font-['DM_Serif_Display',serif] text-4xl text-[#080b10] italic mb-5 shadow-lg">
                  S
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#00ff9d] rounded-full flex items-center justify-center text-sm animate-pulse">✨</div>
              </div>
              
              <div className="font-['DM_Serif_Display',serif] text-2xl mb-1">Sucharita Kumar</div>
              <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#00d4ff] tracking-[0.12em] uppercase mb-4">Full Stack Developer & UI/UX Designer</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {['UI/UX Design', 'Figma', 'React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'REST APIs', 'MERN Stack'].map((tech) => (
                  <span key={tech} className="font-['JetBrains_Mono',monospace] text-[0.65rem] tracking-[0.08em] px-3 py-1.5 bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] rounded-full">{tech}</span>
                ))}
              </div>
              
              <div className="flex gap-4 mt-4 pt-4 border-t border-[#263344]">
                <a href="mailto:kumarsucharita16@gmail.com" className="text-xs text-[#7a8fa8] hover:text-[#00d4ff] transition-colors">📧 kumarsucharita16@gmail.com</a>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-200 transform ${
            visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-gradient-to-r from-[#00d4ff] to-transparent" />
              <span className="font-['JetBrains_Mono',monospace] text-[0.7rem] tracking-[0.2em] text-[#00d4ff] uppercase">About Me</span>
            </div>
            <h2 className="font-['DM_Serif_Display',serif] text-4xl md:text-5xl text-[#e8edf5] leading-[1.15] mb-5">Crafting digital <em className="text-[#00d4ff] not-italic">experiences</em> that matter</h2>
            <p className="text-base md:text-lg leading-relaxed text-[#a0b0c0] font-light mb-5">
              I'm a <strong className="text-[#e8edf5] font-medium">Full Stack Developer and UI/UX Designer</strong> passionate about creating seamless digital experiences. With expertise in both frontend aesthetics and backend architecture, I bridge the gap between design and development.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[#a0b0c0] font-light mb-6">
              I've delivered projects ranging from <strong className="text-[#e8edf5] font-medium">AI-powered code optimization platforms</strong> to <strong className="text-[#e8edf5] font-medium">blockchain-based supply chain systems</strong> and real-time disaster monitoring solutions. I believe in writing clean code, creating beautiful interfaces, and shipping products that users actually enjoy.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-[#141920]/50 rounded-lg border border-[#263344]">
                <span className="text-2xl">🎨</span>
                <div>
                  <div className="font-['JetBrains_Mono',monospace] text-xs text-[#00d4ff]">Design</div>
                  <div className="text-sm text-[#a0b0c0]">Figma, Prototyping</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#141920]/50 rounded-lg border border-[#263344]">
                <span className="text-2xl">💻</span>
                <div>
                  <div className="font-['JetBrains_Mono',monospace] text-xs text-[#00d4ff]">Development</div>
                  <div className="text-sm text-[#a0b0c0]">MERN, REST APIs</div>
                </div>
              </div>
            </div>
            <ul className="list-none space-y-3">
              {[
                '📍 Based in India — open to remote freelance worldwide',
                '🎯 Specialized in UI/UX design & full-stack development',
                '🚀 Experience with LLM APIs, Blockchain, and real-time systems',
                '📦 Full deployment pipelines on Render, Vercel, and AWS'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 font-['JetBrains_Mono',monospace] text-sm text-[#a0b0c0]">
                  <span className="text-[#00d4ff] text-base">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#00d4ff]" />
              <span className="font-['JetBrains_Mono',monospace] text-[0.7rem] tracking-[0.2em] text-[#00d4ff] uppercase">Skills & Technologies</span>
              <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#00d4ff]" />
            </div>
            <h2 className="font-['DM_Serif_Display',serif] text-4xl md:text-5xl text-[#e8edf5] leading-[1.15] mb-4">The tools of <em className="text-[#00d4ff] not-italic">my craft</em></h2>
            <p className="text-base text-[#a0b0c0] max-w-2xl mx-auto leading-relaxed font-light">
              A curated set of technologies and design tools I use to build beautiful, functional web applications.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, idx) => (
              <div key={skill.name} className="bg-[#0e1219] p-5 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#141920] cursor-default relative overflow-hidden group border border-[#1e2a38] hover:border-[#00d4ff]/30">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-3xl mb-3">{skill.icon}</div>
                <div className="font-['JetBrains_Mono',monospace] text-sm font-medium text-[#e8edf5] mb-1">{skill.name}</div>
                <div className="text-xs text-[#7a8fa8] mb-3">{skill.description}</div>
                <div className="h-1 bg-[#263344] rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-[#00d4ff] to-[#00ff9d] rounded-full transition-all duration-1000`} 
                    style={{ width: visibleSections.includes('skills') ? `${skill.level}%` : '0%' }} />
                </div>
                <div className="text-right text-[0.6rem] text-[#4a5a6e] mt-1">{skill.level}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-12 bg-[#0e1219] border-y border-[#1e2a38] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#00d4ff]" />
              <span className="font-['JetBrains_Mono',monospace] text-[0.7rem] tracking-[0.2em] text-[#00d4ff] uppercase">Featured Work</span>
              <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#00d4ff]" />
            </div>
            <h2 className="font-['DM_Serif_Display',serif] text-4xl md:text-5xl text-[#e8edf5] leading-[1.15] mb-4">Projects that <em className="text-[#00d4ff] not-italic">matter</em></h2>
            <p className="text-base text-[#a0b0c0] max-w-2xl mx-auto leading-relaxed font-light">
              A showcase of my full-stack development work — combining beautiful design with robust functionality.
            </p>
          </div>
          <div className="space-y-6 mt-10">
            {projects.map((project, idx) => (
              <div key={project.num} className={`group bg-gradient-to-r from-[#141920] to-[#0e1219] border border-[#263344] rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-500 hover:border-[${project.color}]/50 hover:translate-x-2 hover:shadow-2xl cursor-pointer ${
                visibleSections.includes('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: `${idx * 150}ms` }}>
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/0 via-[#00d4ff]/0 to-[#00ff9d]/0 group-hover:from-[#00d4ff]/5 group-hover:via-[#00ff9d]/5 transition-all duration-700" />
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4ff]/20 to-[#00ff9d]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#4a5a6e] tracking-[0.1em]">// {project.num}</span>
                      <span className="text-xs px-2 py-1 bg-[#00d4ff]/10 text-[#00d4ff] rounded-full">{project.role}</span>
                    </div>
                    <div className="font-['DM_Serif_Display',serif] text-2xl md:text-3xl text-[#e8edf5] group-hover:text-[#00d4ff] transition-colors">{project.name}</div>
                    <div className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#00ff9d] tracking-[0.1em] uppercase mt-1 mb-3">{project.tagline}</div>
                    <p className="text-sm md:text-base leading-relaxed text-[#a0b0c0] font-light mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="font-['JetBrains_Mono',monospace] text-[0.62rem] tracking-[0.06em] px-2.5 py-1 bg-[#1e2a38] text-[#a0b0c0] rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#4a5a6e] group-hover:text-[#00d4ff] transition-all duration-300 group-hover:translate-x-1">
                    <span className="font-['JetBrains_Mono',monospace] text-sm">View Project</span>
                    <span className="text-xl">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#00d4ff]" />
              <span className="font-['JetBrains_Mono',monospace] text-[0.7rem] tracking-[0.2em] text-[#00d4ff] uppercase">Background</span>
              <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#00d4ff]" />
            </div>
            <h2 className="font-['DM_Serif_Display',serif] text-4xl md:text-5xl text-[#e8edf5] leading-[1.15] mb-4">My <em className="text-[#00d4ff] not-italic">journey</em></h2>
            <p className="text-base text-[#a0b0c0] max-w-2xl mx-auto leading-relaxed font-light">
              From design to development — my professional growth and key achievements.
            </p>
          </div>
          <div className="relative pl-6 mt-10 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-[#00d4ff] before:via-[#00ff9d] before:to-transparent">
            {experiences.map((exp, idx) => (
              <div key={`${exp.date}-${idx}`} className={`relative pb-12 last:pb-0 before:absolute before:left-[-1.35rem] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-gradient-to-r before:from-[#00d4ff] before:to-[#00ff9d] before:border-2 before:border-[#080b10] before:shadow-[0_0_0_4px_rgba(0,212,255,0.1)] ${
                visibleSections.includes('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="bg-[#0e1219] rounded-xl p-6 border border-[#1e2a38] hover:border-[#00d4ff]/30 transition-all duration-300 hover:translate-x-1">
                  <div className="flex flex-wrap justify-between items-start mb-3 gap-2">
                    <div className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#00d4ff] tracking-[0.1em] uppercase px-2 py-1 bg-[#00d4ff]/10 rounded-full">{exp.date}</div>
                    <div className="flex gap-3">
                      <span className="text-xs text-[#7a8fa8]">📍 Remote</span>
                    </div>
                  </div>
                  <div className="font-['DM_Serif_Display',serif] text-xl md:text-2xl text-[#e8edf5]">{exp.role}</div>
                  <div className="font-['JetBrains_Mono',monospace] text-xs text-[#00ff9d] mb-4">{exp.company}</div>
                  <ul className="list-none space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex gap-3 items-start text-sm text-[#a0b0c0] leading-relaxed font-light">
                        <span className="text-[#00d4ff] mt-1">▹</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-[#0e1219] border-t border-[#1e2a38] relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className={`transition-all duration-700 ${
            visibleSections.includes('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-gradient-to-r from-[#00d4ff] to-transparent" />
              <span className="font-['JetBrains_Mono',monospace] text-[0.7rem] tracking-[0.2em] text-[#00d4ff] uppercase">Get In Touch</span>
            </div>
            <h2 className="font-['DM_Serif_Display',serif] text-4xl md:text-5xl text-[#e8edf5] leading-[1.2] mb-5">Let's build<br />something <em className="text-[#00d4ff] not-italic">great</em></h2>
            <p className="text-base md:text-lg leading-relaxed text-[#a0b0c0] font-light max-w-md mb-8">
              I'm currently open for freelance work and collaborations. Whether you need a full-stack application, UI/UX design, or API integration — let's create something amazing together.
            </p>
            <div className="space-y-4">
              <a href="mailto:kumarsucharita16@gmail.com" className="flex items-center gap-4 p-4 border border-[#1e2a38] bg-[#141920] rounded-xl transition-all duration-300 hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 hover:translate-x-1 cursor-pointer group">
                <span className="text-2xl">✉️</span>
                <div className="flex-1">
                  <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#7a8fa8] tracking-[0.1em] uppercase">Email</div>
                  <div className="text-sm text-[#e8edf5] font-normal">kumarsucharita16@gmail.com</div>
                </div>
                <span className="text-[#4a5a6e] group-hover:text-[#00d4ff] group-hover:translate-x-1 transition-all">→</span>
              </a>
              <a href="https://linkedin.com/in/sucharita-kumar-9864692a2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 border border-[#1e2a38] bg-[#141920] rounded-xl transition-all duration-300 hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 hover:translate-x-1 cursor-pointer group">
                <span className="text-2xl">💼</span>
                <div className="flex-1">
                  <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#7a8fa8] tracking-[0.1em] uppercase">LinkedIn</div>
                  <div className="text-sm text-[#e8edf5] font-normal">linkedin.com/in/sucharita-kumar-9864692a2</div>
                </div>
                <span className="text-[#4a5a6e] group-hover:text-[#00d4ff] group-hover:translate-x-1 transition-all">→</span>
              </a>
              <a href="https://github.com/sucharitaa16" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 border border-[#1e2a38] bg-[#141920] rounded-xl transition-all duration-300 hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 hover:translate-x-1 cursor-pointer group">
                <span className="text-2xl">🐙</span>
                <div className="flex-1">
                  <div className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#7a8fa8] tracking-[0.1em] uppercase">GitHub</div>
                  <div className="text-sm text-[#e8edf5] font-normal">github.com/kumarsucharita16</div>
                </div>
                <span className="text-[#4a5a6e] group-hover:text-[#00d4ff] group-hover:translate-x-1 transition-all">→</span>
              </a>
            </div>
          </div>
          <div className={`transition-all duration-700 delay-200 ${
            visibleSections.includes('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <form
  className="space-y-5 bg-[#141920] p-6 md:p-8 rounded-2xl border border-[#263344]"
  onSubmit={sendEmail}
>
              <h3 className="font-['DM_Serif_Display',serif] text-2xl text-[#e8edf5] mb-4">Send a Message</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#7a8fa8] tracking-[0.1em] uppercase block mb-2">Name</label>
                 <input
  type="text"
  name="name"
  placeholder="Your name"
  className="w-full bg-[#0e1219] border border-[#263344] rounded-lg text-[#e8edf5] font-['Inter',sans-serif] text-sm p-3 outline-none transition-all duration-200 focus:border-[#00d4ff] focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)]"
/>
                </div>
                <div>
                  <label className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#7a8fa8] tracking-[0.1em] uppercase block mb-2">Email</label>
                  <input
  type="email"
  name="email"
  placeholder="your@email.com"
  className="w-full bg-[#0e1219] border border-[#263344] rounded-lg text-[#e8edf5] font-['Inter',sans-serif] text-sm p-3 outline-none transition-all duration-200 focus:border-[#00d4ff] focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)]"
/>
                </div>
              </div>
              <div>
                <label className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#7a8fa8] tracking-[0.1em] uppercase block mb-2">Project Type</label>
                <input
  type="text"
  name="title"
  placeholder="e.g. Full Stack App, UI/UX Design, API Integration"
  className="w-full bg-[#0e1219] border border-[#263344] rounded-lg text-[#e8edf5] font-['Inter',sans-serif] text-sm p-3 outline-none transition-all duration-200 focus:border-[#00d4ff] focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)]"
/>
              </div>
              <div>
                <label className="font-['JetBrains_Mono',monospace] text-[0.65rem] text-[#7a8fa8] tracking-[0.1em] uppercase block mb-2">Message</label>
                <textarea
  name="message"
  rows={4}
  placeholder="Tell me about your project, timeline, and budget…"
  className="w-full bg-[#0e1219] border border-[#263344] rounded-lg text-[#e8edf5] font-['Inter',sans-serif] text-sm p-3 outline-none transition-all duration-200 focus:border-[#00d4ff] focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] resize-none"
/>
              </div>
              <button
                type="submit"
                className="w-full font-['JetBrains_Mono',monospace] text-xs tracking-[0.1em] uppercase py-3.5 bg-gradient-to-r from-[#00d4ff] to-[#00ff9d] text-[#080b10] font-semibold cursor-pointer border-none transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,212,255,0.3)] rounded-lg"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080b10] border-t border-[#1e2a38] py-8 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-[#00d4ff] to-[#00ff9d] rounded-md rotate-45" />
            <div className="font-['JetBrains_Mono',monospace] text-sm text-[#e8edf5] tracking-[0.1em]">Sucharita<span className="text-[#00d4ff]">.dev</span></div>
          </div>
          <div className="font-['JetBrains_Mono',monospace] text-[0.68rem] text-[#4a5a6e] tracking-[0.06em]">© 2025 Sucharita Kumar · Full Stack Developer & UI/UX Designer</div>
          <div className="flex gap-6">
            <a href="https://github.com/sucharitaa16" target="_blank" rel="noopener noreferrer" className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#7a8fa8] tracking-[0.08em] uppercase transition-all duration-200 hover:text-[#00d4ff]">GitHub</a>
            <a href="https://linkedin.com/in/sucharita-kumar-9864692a2" target="_blank" rel="noopener noreferrer" className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#7a8fa8] tracking-[0.08em] uppercase transition-all duration-200 hover:text-[#00d4ff]">LinkedIn</a>
            <a href="mailto:kumarsucharita16@gmail.com" className="font-['JetBrains_Mono',monospace] text-[0.7rem] text-[#7a8fa8] tracking-[0.08em] uppercase transition-all duration-200 hover:text-[#00d4ff]">Email</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 3.5s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;