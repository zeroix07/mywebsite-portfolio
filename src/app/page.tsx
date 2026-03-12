'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowDown, Code, BarChart3, Brain, Sparkles, Database, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    body: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'tools', 'projects', 'experience', 'competitions', 'certifications', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xvgvgylr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.body, // Formspree expects 'message' for the main content
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        body: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-background/90 backdrop-blur-md border-b border-border' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Code className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Analytics & AI Engineer</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'tools', 'projects', 'experience', 'competitions', 'certifications', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-primary ${activeSection === section ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                >
                  {section}
                </button>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                className="text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
            <div className="px-4 py-2 space-y-1">
              {['home', 'about', 'tools', 'projects', 'experience', 'competitions', 'certifications', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-3 py-2 capitalize transition-all duration-300 hover:text-primary hover:bg-accent rounded ${activeSection === section ? 'text-primary font-semibold bg-accent' : 'text-muted-foreground'}`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-4">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 dark:from-green-900/10 dark:via-black dark:to-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            className="mb-8 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary dark:border-green-500 shadow-2xl shadow-primary/20 dark:shadow-green-500/20">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary dark:bg-green-500 rounded-full flex items-center justify-center border-4 border-background dark:border-black shadow-lg">
                <Brain className="w-6 h-6 text-primary-foreground dark:text-black" />
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Analytics & AI Engineer
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-foreground dark:text-green-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Fadhel Muhammad Apriansyah
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground dark:text-green-400/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transforming data into intelligent solutions that drive business growth and innovation
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-primary hover:bg-primary/90 dark:bg-green-500 dark:hover:bg-green-600 text-primary-foreground dark:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Projects
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground dark:border-green-500 dark:text-green-400 dark:hover:bg-green-500 dark:hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Get In Touch
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a href="#" className="text-foreground/70 hover:text-primary dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-foreground/70 hover:text-primary dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-foreground/70 hover:text-primary dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300">
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground/60 dark:text-green-400/60" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/70 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6 order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-muted-foreground dark:text-green-400/80 leading-relaxed">
              Fullstack Analytics & AI Engineer with experience in the end-to-end data lifecycle, specializing in the convergence of scalable data infrastructure and advanced AI architectures. Architected robust data transformation layers and streaming pipelines using Apache Airflow, DuckDB, and Parquet, BigQuery, seamlessly integrating them with Generative AI solutions and Retrieval-Augmented Generation (RAG) frameworks.
              </p>
              <p className="text-lg text-muted-foreground dark:text-green-400/80 leading-relaxed">
              Expert in developing and deploying production-grade Machine Learning and Deep Learning models to solve complex business challenges, from predictive analytics to intelligent automation. Experienced in managing and maintaining on-premises infrastructure alongside leveraging the Google Cloud ecosystem and Vector Databases to deliver high-impact, AI-driven insights for Retail, Fintech, and Government sectors.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex justify-center order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary dark:border-green-500 shadow-2xl shadow-primary/20 dark:shadow-green-500/20">
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary dark:bg-green-500 rounded-full flex items-center justify-center border-4 border-background dark:border-black shadow-lg">
                  <Code className="w-8 h-8 text-primary-foreground dark:text-black" />
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { icon: <BarChart3 className="w-8 h-8" />, title: "Data Analytics/Science", desc: "Deep insights from complex datasets" },
              { icon: <Database className="w-8 h-8" />, title: "Data Engineering", desc: "Scalable data pipelines and infrastructure" },
              { icon: <TrendingUp className="w-8 h-8" />, title: "Business Intelligence", desc: "Strategic insights and dashboards" },
              { icon: <Brain className="w-8 h-8" />, title: "Machine Learning", desc: "Building intelligent AI solutions" },
              { icon: <Code className="w-8 h-8" />, title: "Software Engineering", desc: "Scalable, robust systems" },
              { icon: <Sparkles className="w-8 h-8" />, title: "Innovation", desc: "Cutting-edge technology solutions" }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-card/50 border-border/30 hover:border-primary/50 dark:bg-black/50 dark:border-green-900/30 dark:hover:border-green-500/50 transition-all duration-300 h-full shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="text-primary dark:text-green-400 mb-3 flex justify-center">{skill.icon}</div>
                    <h3 className="text-foreground dark:text-green-300 font-semibold mb-2">{skill.title}</h3>
                    <p className="text-muted-foreground dark:text-green-400/60 text-sm">{skill.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <Button className="bg-primary hover:bg-primary/90 dark:bg-green-500 dark:hover:bg-green-600 text-primary-foreground dark:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 px-4 bg-gradient-to-b from-background via-background to-accent/5 dark:from-black dark:via-black dark:to-green-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/70 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Tools & Technologies
          </motion.h2>
          
          {/* Row 1 - Continuous seamless looping animation from right to left */}
          <div className="mb-12 overflow-hidden relative">
            <motion.div 
              className="flex gap-6 w-max"
              animate={{ x: [0, -1456] }} // Exact width of one set of tools (8 cards * 160px + 7 gaps * 24px = 1456px)
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }}
              style={{ width: 'max-content' }}
            >
              {/* First set of tools */}
              {[
                { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
                { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
                { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
                { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
                { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
                { name: "Keras", icon: "https://www.svgrepo.com/show/330780/keras.svg" },
                { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" }
              ].map((tool, index) => (
                <motion.div
                  key={`row1-${index}`}
                  className="flex-shrink-0 w-40"
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-card/50 border-border/30 hover:border-primary/50 dark:bg-black/50 dark:border-green-900/30 dark:hover:border-green-500/50 transition-all duration-300 h-full shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-background dark:bg-black/50 rounded-lg flex items-center justify-center p-2">
                        <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain filter dark:brightness-0 dark:invert dark:opacity-90" />
                      </div>
                      <h3 className="text-foreground dark:text-green-300 font-semibold">{tool.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
                { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
                { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
                { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
                { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
                { name: "Keras", icon: "https://www.svgrepo.com/show/330780/keras.svg" },
                { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" }
              ].map((tool, index) => (
                <motion.div
                  key={`row1-duplicate-${index}`}
                  className="flex-shrink-0 w-40"
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-card/50 border-border/30 hover:border-primary/50 dark:bg-black/50 dark:border-green-900/30 dark:hover:border-green-500/50 transition-all duration-300 h-full shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-background dark:bg-black/50 rounded-lg flex items-center justify-center p-2">
                        <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain filter dark:brightness-0 dark:invert dark:opacity-90" />
                      </div>
                      <h3 className="text-foreground dark:text-green-300 font-semibold">{tool.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Row 2 - Continuous seamless looping animation from left to right */}
          <div className="overflow-hidden relative">
            <motion.div 
              className="flex gap-6 w-max"
              animate={{ x: [-1456, 0] }} // Reverse direction for left to right
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }}
              style={{ width: 'max-content' }}
            >
              {/* First set of tools */}
              {[
                { name: "Apache Airflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-plain.svg" },
                { name: "dbt", icon: "https://www.svgrepo.com/show/330270/dbt.svg" },
                { name: "Apache Spark", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-plain-wordmark.svg" },
                { name: "Snowflake", icon: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg" },
                { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
                { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                { name: "Apache Kafka", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" }
              ].map((tool, index) => (
                <motion.div
                  key={`row2-${index}`}
                  className="flex-shrink-0 w-40"
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-card/50 border-border/30 hover:border-primary/50 dark:bg-black/50 dark:border-green-900/30 dark:hover:border-green-500/50 transition-all duration-300 h-full shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-background dark:bg-black/50 rounded-lg flex items-center justify-center p-2">
                        <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain filter dark:brightness-0 dark:invert dark:opacity-90" />
                      </div>
                      <h3 className="text-foreground dark:text-green-300 font-semibold">{tool.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                { name: "Apache Airflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-plain.svg" },
                { name: "dbt", icon: "https://www.svgrepo.com/show/330270/dbt.svg" },
                { name: "Apache Spark", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-plain-wordmark.svg" },
                { name: "Snowflake", icon: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg" },
                { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
                { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                { name: "Apache Kafka", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" }
              ].map((tool, index) => (
                <motion.div
                  key={`row2-duplicate-${index}`}
                  className="flex-shrink-0 w-40"
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-card/50 border-border/30 hover:border-primary/50 dark:bg-black/50 dark:border-green-900/30 dark:hover:border-green-500/50 transition-all duration-300 h-full shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-background dark:bg-black/50 rounded-lg flex items-center justify-center p-2">
                        <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain filter dark:brightness-0 dark:invert dark:opacity-90" />
                      </div>
                      <h3 className="text-foreground dark:text-green-300 font-semibold">{tool.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Additional Tools Grid */}
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {[
              "Git", "SQL", "NoSQL", "REST API", "GraphQL", 
              "CI/CD", "Linux", "Bash", "Tableau", "Power BI", "Metabase", "Spark", "Hadoop", "FastAPI", "Redis", 
              "Selenium", "Polars", "MLflow", "BigQuery", "Typesense", "Google Cloud Platform", "Zabbix"
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="bg-primary/10 border border-primary/30 dark:bg-green-900/20 dark:border-green-800/50 rounded-lg p-3 text-center hover:border-primary/50 dark:hover:border-green-500/50 transition-all duration-300">
                  <span className="text-primary dark:text-green-400 text-sm font-medium">{tool}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gradient-to-b from-background via-background to-accent/5 dark:from-black dark:via-black dark:to-green-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/70 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Predictive Analytics Platform",
                description: "ML-powered forecasting system that reduced prediction errors by 40% for retail clients",
                tech: ["Python", "TensorFlow", "React", "PostgreSQL"],
                link: "#"
              },
              {
                title: "Real-time Data Pipeline",
                description: "Scalable ETL pipeline processing 1M+ events daily with real-time analytics dashboard",
                tech: ["Apache Kafka", "Spark", "Docker", "Airflow", "dbt", "Zabbix"],
                link: "#"
              },
              {
                title: "AI Chatbot System",
                description: "NLP-powered customer service bot handling 10K+ conversations with 85% satisfaction",
                tech: ["NLP", "FastAPI", "Redis", "React"],
                link: "#"
              },
              {
                title: "Anomaly Detection System",
                description: "Unsupervised learning system detecting fraud patterns with 95% accuracy",
                tech: ["Python", "Scikit-learn", "AWS", "Docker"],
                link: "#"
              },
              {
                title: "Business Intelligence Dashboard",
                description: "Interactive dashboard providing real-time insights for C-level executives",
                tech: ["Tableau", "SQL", "Python", "PostgreSQL"],
                link: "#"
              },
              {
                title: "Recommendation Engine",
                description: "Collaborative filtering system increasing user engagement by 60%",
                tech: ["Machine Learning", "Redis", "Node.js", "PostgreSQL"],
                link: "#"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-card/50 border-border/30 hover:border-primary/50 dark:bg-black/50 dark:border-green-900/30 dark:hover:border-green-500/50 transition-all duration-300 h-full group shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground dark:text-green-300 mb-3 group-hover:text-primary dark:group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-green-400/80 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex} 
                          className="px-2 py-1 bg-primary/10 text-primary dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full border border-primary/20 dark:border-green-800/50"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20 p-0 h-auto font-normal">
                      View Project →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-gradient-to-b from-background via-background to-accent/5 dark:from-black dark:via-black dark:to-green-950/20">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/70 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Data Analyst",
                company: "dRetail.id",
                period: "Oct 2024 – Present",
                type: "Full Time",
                description: [
                  "Built, scheduled, and monitored workflows seamlessly using Apache Airflow, ensuring consistent and efficient data operations.",
                  "Designed and implemented robust ETL processes, optimized data flow and improved data accessibility and handling.",
                  "Architected complex data pipelines, successfully integrating diverse data sources to deliver high-quality, actionable insights.",
                  "Analyzed data to uncover trends, patterns, and insights, directly contributing to data-driven decision-making.",
                  "Processed and managed large-scale Big Data with precision, ensuring high-quality and reliable outputs.",
                  "Developed and automated daily, weekly, and monthly reporting, streamlining business intelligence processes.",
                  "Implemented Tableau dashboard visualizations to enhance strategic decision-making and monitor key business metrics."
                ]
              },
              {
                title: "Google Cloud Arcade Facilitator",
                company: "Google Cloud",
                period: "Jul 2025 - Sep 2025",
                type: "Part Time",
                description: [
                  "Demonstrated expertise in GCP services including BigQuery, Vertex AI, looker studio, and Cloud Run to support participants during the Arcade challenge.",
                  "Managed community-led learning initiatives by leveraging Google Cloud Skills Boost resources to track and boost participant progress.",
                  "Organized virtual and in-person Cloud Jam sessions to simplify complex cloud concepts like Kubernetes and Infrastructure as Code (IaC).",
                  "Validated technical solutions and provided architectural guidance while troubleshooting complex issues related to IAM, Networking, and Resource Management within the Google Cloud Console, ensuring seamless lab execution and successful project deployment for advanced-level Arcade missions."
                ]
              },
              {
                title: "Data Scientist Facilitator",
                company: "Indosat Ooredoo Hutchison Digital Camp (IDCamp)",
                period: "Jan 2025 – Jun 2025",
                type: "Freelance",
                description: [
                  "Mentored 25-30 students at Intermediate and Expert Class, with a high graduation rate through structured learning and hands-on projects.",
                  "Led interactive sessions, enhancing participants' proficiency in AI, machine learning, and data analytics.",
                  "Designed structured learning pathways to achieve project completion rate with high-quality deliverables.",
                  "Provided expert guidance on capstone projects, to develop industry-standard solutions.",
                  "Evaluated student progress through rigorous assessments, improving problem-solving and analytical skills.",
                  "Applied industry expertise to bridge the gap between academic concepts and real-world data science challenges."
                ]
              },
              {
                title: "Company Capstone Advisor at Bizzagi",
                company: "BANGKIT ACADEMY – Led by Google, GoTo, Traveloka",
                period: "Nov 2024 - Dec 2024",
                type: "Part Time",
                description: [
                  "Guided and supported students in developing an LLM for SEO Audit, achieving a 94% success rate in project completion.",
                  "Optimized students’ problem-solving abilities by introducing advanced prompt engineering techniques to improve SEO insight scores and generate actionable recommendations for SEO score enhancement.",
                  "Mentored students in applying AI-driven models to analyze SEO data, leading to the identification of key optimization opportunities.",
                  "Developed a structured approach for evaluating SEO performance, helping students pinpoint factors affecting SEO scores and implement effective improvements."
                ]
              },
              {
                title: "Company Capstone Advisor at Bizzagi",
                company: "BANGKIT ACADEMY – Led by Google, GoTo, Traveloka",
                period: "Apr 2024 - Jun 2024",
                type: "Part Time",
                description: [
                  "Guided and supported students during their final capstone project Aspect Based Sentiment Analysis, achieving a 93% success rate.",
                  "Facilitated hands-on learning in machine learning and AI, boosting student readiness for industry challenges by applying real-world case studies."
                ]
              },
              {
                title: "Data Scientist",
                company: "Braincore.id",
                period: "May 2024 – July 2024",
                type: "Part Time",
                description: [
                  "Guided and supported students during their final capstone project Aspect Based Sentiment Analysis, achieving a 93% success rate.",
                  "Facilitated hands-on learning in machine learning and AI, boosting student readiness for industry challenges by applying real-world case studies."
                ]
              },
              {
                title: "Lead Curriculum Developer",
                company: "Braincore.id",
                period: "Jan 2024 – May 2024",
                type: "Part Time",
                description: [
                  "Mentoring about AI/ML/Data Science/Analysis/Business Intelligence, improving student learning outcomes by 50%.",
                  "Created and assessed educational materials and programs, resulting in a 50% increase in student engagement and satisfaction."
                ]
              },
              {
                title: "Data Analyst",
                company: "Central Bureau of Statistics (Badan Pusat Statistik)",
                period: "Jul 2023 – Sep 2023",
                type: "Internship",
                description: [
                  "Preprocessed visitor data using Python, providing actionable insights that increased visitor experience by 20%.",
                  "Developed interactive dashboards with Tableau, supporting better decision-making and resource allocation."
                ]
              },
              {
                title: "Internship Coordinator",
                company: "Ministry of Communication and Informatics (Dinas Komunikasi dan Informatika)",
                period: "Dec 2022 – Mar 2023",
                type: "Internship",
                description: [
                  "Coordinated intern schedules and project timelines using Google Sheets, enhancing project efficiency and intern satisfaction by 15%.",
                  "Documented project details and generated regular reports, contributing to a more effective and streamlined internship program."
                ]
              },
              {
                title: "Internship Coordinator",
                company: "PT. KIMIA FARMA, TBK",
                period: "May 2022 – Jun 2022",
                type: "Internship",
                description: [
                  "Preprocessed sales data using Python.",
                  "Developed a sales dashboard with Looker Studio that accelerated sales reporting accuracy by 20%."
                ]
              }
            ].map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-8 pb-8 border-l-2 border-border/30 dark:border-green-900/30 group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="absolute left-0 top-0 w-4 h-4 bg-primary dark:bg-green-500 rounded-full transform -translate-x-1/2"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div 
                  className="bg-card/50 border border-border/30 dark:bg-black/50 dark:border-green-900/30 rounded-lg p-6 hover:border-primary/50 dark:hover:border-green-500/50 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-xl font-bold text-foreground dark:text-green-300">{exp.title}</h3>
                    {exp.type && (
                      <span className="px-3 py-1 bg-primary/10 dark:bg-green-500/20 text-primary dark:text-green-400 text-xs font-semibold rounded-full border border-primary/20 dark:border-green-500/30">
                        {exp.type}
                      </span>
                    )}
                  </div>
                  <p className="text-primary dark:text-green-400 font-semibold mb-2">{exp.company}</p>
                  <p className="text-muted-foreground dark:text-green-400/60 text-sm mb-3">{exp.period}</p>
                  {Array.isArray(exp.description) ? (
                    <ul className="text-muted-foreground dark:text-green-400/80 space-y-2">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 text-primary dark:text-green-400">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground dark:text-green-400/80">{exp.description}</p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section id="competitions" className="py-20 px-4 bg-gradient-to-b from-background via-background to-accent/5 dark:from-black dark:via-black dark:to-green-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/70 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Competitions & Hackathons
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Sucofindo Science Hackathon Festival (Sci-Hack Fest)",
                organizer: "PT. Sucofindo",
                date: "2024",
                achievement: "The First Winner EV Category & Best of The Best",
                category: "Hackathon",
                highlight: true
              },
              {
                title: "INDONERIS NATIONAL IT COMPETITION 2023",
                organizer: "AMIKOM PURWOKERTO",
                date: "2022",
                achievement: "The Third Place Business Plan Competition",
                category: "Business Plan Competition",
                highlight: true
              },
              {
                title: "BPJS Healthkathon",
                organizer: "BPJS Kesehatan",
                date: "2025",
                achievement: "Top 10 finalists out of 1000+ teams with AI-powered healthcare solution",
                category: "Hackathon",
                highlight: false
              }
            ].map((competition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-card/50 border-border/30 hover:border-primary/50 dark:from-green-900/20 dark:to-black/50 dark:border-green-500/30 dark:hover:border-green-500/50 transition-all duration-300 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-primary/10 text-primary dark:bg-green-500/20 dark:text-green-300 text-xs rounded-full font-semibold">
                            {competition.category}
                          </span>
                          {competition.highlight && (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full font-semibold">
                              🏆 Winner
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-foreground dark:text-green-300 mb-1">{competition.title}</h3>
                        <p className="text-primary dark:text-green-400/80 font-semibold mb-1">{competition.organizer}</p>
                        <p className="text-muted-foreground dark:text-green-400/60 text-sm mb-3">{competition.date}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground dark:text-green-400/70 leading-relaxed">{competition.achievement}</p>
                    
                    {competition.highlight && (
                      <motion.div 
                        className="mt-4 pt-4 border-t border-border/30 dark:border-green-900/30"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center gap-2 text-primary dark:text-green-300">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-sm font-semibold">Key Achievement</span>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-card/50 dark:bg-black/50 border border-border/30 dark:border-green-900/30 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground dark:text-green-300 mb-4">Competition Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { number: "5", label: "Competitions" },
                  { number: "1", label: "First Places" },
                  { number: "2", label: "Top 10 Finishes" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-3xl font-bold text-primary dark:text-green-400 mb-1">{stat.number}</div>
                    <div className="text-muted-foreground dark:text-green-400/60 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 bg-gradient-to-b from-background via-background to-accent/5 dark:from-black dark:via-black dark:to-green-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/70 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Professional Certifications
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "TensorFlow Developer Certificate",
                issuer: "Google",
                date: "2022",
                credentialId: "TF-DEV-901234",
                status: "active",
                level: "Professional",
                icon: ""
              },
              {
                title: "Astronomer Certification DAG Authoring for Apache Airflow 3",
                issuer: "Astronomer",
                date: "2025",
                credentialId: "bc81428c-e57c-4d91-8b33-25d5e481419c",
                status: "active",
                level: "Professional",
                icon: ""
              },
              {
                title: "Astronomer Certification for Apache Airflow 3 Fundamentals",
                issuer: "Astronomer",
                date: "2025",
                credentialId: "1ce5b6bf-fe35-4c06-bb31-130dd54b9792",
                status: "active",
                level: "Specialization",
                icon: ""
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full bg-card/50 dark:bg-black/50 border-border/30 dark:border-green-900/30 hover:border-primary/50 dark:hover:border-green-500/50 transition-all duration-300 group shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl mb-3">{cert.icon}</div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                          cert.level === 'Professional' 
                            ? 'bg-primary/10 text-primary dark:bg-green-500/20 dark:text-green-300' 
                            : cert.level === 'Associate'
                            ? 'bg-blue-500/10 text-blue-600'
                            : 'bg-purple-500/10 text-purple-600'
                        }`}>
                          {cert.level}
                        </span>
                        <div className="w-2 h-2 bg-primary dark:bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground dark:text-green-300 mb-2 group-hover:text-primary dark:group-hover:text-green-200 transition-colors">
                      {cert.title}
                    </h3>
                    
                    <p className="text-primary dark:text-green-400/80 font-semibold mb-1">{cert.issuer}</p>
                    <p className="text-muted-foreground dark:text-green-400/60 text-sm mb-3">{cert.date}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground dark:text-green-400/70 text-sm">
                        <span className="font-mono bg-secondary dark:bg-black/30 px-2 py-1 rounded text-xs border border-border/30 dark:border-green-900/30">
                          ID: {cert.credentialId}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground dark:text-green-400/70 text-sm">
                        <div className="w-2 h-2 bg-primary dark:bg-green-400 rounded-full"></div>
                        <span>Active</span>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="mt-4 pt-4 border-t border-border/30 dark:border-green-900/30"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 dark:border-green-500/30 dark:text-green-400 dark:hover:bg-green-500/10 dark:hover:border-green-500/50 transition-all duration-300"
                      >
                        Verify Credential
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-background via-background to-accent/5 dark:from-black dark:via-black dark:to-green-950/20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let's Connect
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground dark:text-green-400/80 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I'm always interested in discussing new opportunities, innovative projects, or collaborations.
          </motion.p>
          
          <motion.div 
            className="bg-card/50 dark:bg-black/50 border border-border/30 dark:border-green-900/30 rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-background dark:bg-black/50 border border-border dark:border-green-900/30 rounded-lg text-foreground dark:text-green-300 placeholder-muted-foreground dark:placeholder-white focus:outline-none focus:border-primary dark:focus:border-green-500 focus:ring-2 focus:ring-primary/20 dark:focus:ring-green-500/20 transition-all duration-300"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-background dark:bg-black/50 border border-border dark:border-green-900/30 rounded-lg text-foreground dark:text-green-300 placeholder-muted-foreground dark:placeholder-white focus:outline-none focus:border-primary dark:focus:border-green-500 focus:ring-2 focus:ring-primary/20 dark:focus:ring-green-500/20 transition-all duration-300"
                  />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-3 bg-background dark:bg-black/50 border border-border dark:border-green-900/30 rounded-lg text-foreground dark:text-green-300 placeholder-muted-foreground dark:placeholder-white focus:outline-none focus:border-primary dark:focus:border-green-500 focus:ring-2 focus:ring-primary/20 dark:focus:ring-green-500/20 transition-all duration-300"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 dark:bg-green-500 dark:hover:bg-green-600 text-primary-foreground dark:text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
            
            <motion.div 
              className="flex justify-center space-x-6 pt-6 mt-6 border-t border-border/30 dark:border-green-900/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              {[
                { icon: <Github className="w-6 h-6" />, href: "#" },
                { icon: <Linkedin className="w-6 h-6" />, href: "#" },
                { icon: <Mail className="w-6 h-6" />, href: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-primary dark:text-green-400 hover:text-primary/80 dark:hover:text-green-300 transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card dark:bg-black/50 border-t border-border dark:border-green-900/30 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2">
                <Code className="w-8 h-8 text-primary dark:text-green-400" />
                <span className="text-xl font-bold text-primary dark:text-green-400">Analytics & AI Engineer</span>
              </div>
              <p className="text-muted-foreground dark:text-white text-sm leading-relaxed">
                Transforming data into intelligent solutions that drive business growth and innovation.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-foreground dark:text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['About', 'Projects', 'Experience', 'Contact'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="text-muted-foreground dark:text-white hover:text-primary dark:hover:text-green-300 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Expertise */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-foreground dark:text-white font-semibold mb-4">Expertise</h3>
              <ul className="space-y-2">
                {['Data Analytics', 'Data Science', 'Data Engineering', 'Business Intelligence', 'Machine Learning', 'Cloud Computing', 'AI Engineering'].map((skill) => (
                  <li key={skill} className="text-muted-foreground dark:text-white text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Connect */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-foreground dark:text-white font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-4">
                {[
                  { icon: <Github className="w-5 h-5" />, href: "#" },
                  { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                  { icon: <Mail className="w-5 h-5" />, href: "#" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-primary dark:text-green-400 hover:text-primary/80 dark:hover:text-green-300 transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <p className="text-muted-foreground dark:text-white text-sm">
                fmapriansyah3@gmail.com
              </p>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="border-t border-border dark:border-green-900/30 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-muted-foreground dark:text-white text-sm">
                © 2025 Fadhel Muhammad Apriansyah. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <button className="text-muted-foreground dark:text-white hover:text-primary dark:hover:text-green-300 transition-colors duration-300">
                  Privacy Policy
                </button>
                <button className="text-muted-foreground dark:text-white hover:text-primary dark:hover:text-green-300 transition-colors duration-300">
                  Terms of Service
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}