import React, { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Database, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Home,
  User,
  Briefcase
} from 'lucide-react'

const ResumeContent = ({ language = 'en' }) => {
  const sectionsRef = useRef([])
  const [expandedSections, setExpandedSections] = useState({})
  const [showProjects, setShowProjects] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showImages, setShowImages] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    '/Image1.jpeg',
    '/Image2.jpeg',
    '/Image3.jpeg'
  ]

  // Translations object
  const translations = {
    en: {
      title: "Software Developer & Cybersecurity Specialist",
      subtitle: "Crafting secure, scalable web applications with cutting-edge technologies. Passionate about creating innovative solutions that drive business growth.",
      aboutTitle: "About Me",
      aboutSubtitle: "A dedicated IT Security and Software Testing professional with expertise in penetration testing, quality assurance, and secure software development",
      myJourney: "My Journey",
      journeyText1: "I am a dedicated IT Security and Software Testing professional with expertise spanning from penetration testing to quality assurance. With a background in mechanical engineering and a specialization in informatics and robotics, I bring a unique perspective to software security and testing challenges.",
      journeyText2: "My journey began in India where I worked as an Information Security Analyst, conducting penetration testing and vulnerability assessments. I then pursued my Master's in Mechanical Engineering at Karlsruhe Institute of Technology (KIT) with specialization in Informatics and Robotics, where I contributed to security-related machine learning projects. Currently, I work as a Software Developer at Atlas Copco, focusing on secure industrial automation systems and CI/CD processes.",
      experienceTitle: "Work Experience",
      experienceSubtitle: "My professional journey in software development and cybersecurity",
      skillsTitle: "Technical Skills",
      skillsSubtitle: "Technologies and tools I use to bring ideas to life",
      contactTitle: "Get In Touch",
      contactSubtitle: "Ready to work together? Let's discuss your next project",
      contactInfo: "Contact Information",
      followMe: "Follow Me",
      sendMessage: "Send Message",
      yourName: "Your Name",
      yourEmail: "Your Email",
      yourMessage: "Your Message",
      sendButton: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully! I'll get back to you soon.",
      errorMessage: "There was an error sending your message. Please try again or contact me directly.",
      contactDirectly: "Or contact me directly at",
      // Hero section translations
      softwareDevelopment: "Software Development",
      cybersecurity: "Cybersecurity", 
      robotics: "Robotics",
      viewProjects: "View Projects",
      downloadResume: "Download Resume",
      // Statistics translations
      yearsExperience: "Years Experience",
      projectsCompleted: "Projects Completed", 
      technologies: "Technologies",
      clientSatisfaction: "Client Satisfaction",
      // Work experience translations
      atlasCopco: {
        title: "Software Developer",
        company: "Atlas Copco, Bretten, Germany",
        period: "Apr 2024 – Mar 2025",
        location: "Bretten, Germany",
        bullets: [
          "Supported the implementation of security policies and compliance requirements in industrial automation systems",
          "Developed secure CI/CD test environments using Docker, Git, and Playwright",
          "Conducted manual and automated tests with Jira for quality assurance",
          "Contributed to risk mitigation strategies and secure software development processes",
          "Implemented automated security scanning and vulnerability assessment workflows",
          "Collaborated with cross-functional teams to ensure secure deployment practices",
          "Developed and maintained comprehensive test documentation and reporting systems"
        ]
      },
      prosaic: {
        title: "IT Security Analyst & Penetration Testing",
        company: "Prosaic Technologies, Bangalore, India",
        period: "Jul 2017 – Mar 2020",
        location: "Bangalore, India",
        bullets: [
          "Performed network and web penetration tests as well as vulnerability analyses",
          "Mitigated identified vulnerabilities using Nessus, OpenVAS, Metasploit, and Burp Suite",
          "Implemented and optimized SIEM detection rules (Splunk) for proactive threat detection",
          "Participated in incident response, digital forensics, and internal security training",
          "Automated vulnerability scans and alerting using Python and Bash",
          "Conducted security assessments for web applications, mobile apps, and network infrastructure",
          "Developed custom security scripts and tools for enhanced threat detection capabilities",
          "Provided security consulting and recommendations to clients across various industries"
        ]
      },
      kit: {
        title: "Research Assistant – IT Security & Software Development",
        company: "Karlsruhe Institute of Technology (KIT)",
        period: "Jul 2022 – Jun 2023",
        location: "Karlsruhe, Germany",
        bullets: [
          "Supported the automation of software tests and CI pipelines",
          "Contributed to security-related machine learning projects using PyTorch, PostgreSQL, and Linux",
          "Created technical documentation in compliance with audit traceability and regulatory requirements",
          "Developed and implemented machine learning models for cybersecurity threat detection",
          "Conducted research on emerging security technologies and their practical applications",
          "Assisted in the development of secure software architectures and best practices"
        ]
      }
    },
    de: {
      title: "Software-Entwickler & Cybersicherheitsspezialist",
      subtitle: "Entwicklung sicherer, skalierbarer Webanwendungen mit modernsten Technologien. Leidenschaft für innovative Lösungen, die das Geschäftswachstum fördern.",
      aboutTitle: "Über Mich",
      aboutSubtitle: "Ein engagierter IT-Sicherheits- und Software-Test-Experte mit Fachkenntnissen in Penetrationstests, Qualitätssicherung und sicherer Softwareentwicklung",
      myJourney: "Meine Reise",
      journeyText1: "Ich bin ein engagierter IT-Sicherheits- und Software-Test-Experte mit Fachkenntnissen von Penetrationstests bis zur Qualitätssicherung. Mit einem Hintergrund in Maschinenbau und einer Spezialisierung auf Informatik und Robotik bringe ich eine einzigartige Perspektive zu Software-Sicherheits- und Test-Herausforderungen.",
      journeyText2: "Meine Reise begann in Indien, wo ich als Information Security Analyst arbeitete und Penetrationstests und Schwachstellenbewertungen durchführte. Anschließend absolvierte ich meinen Master in Maschinenbau am Karlsruher Institut für Technologie (KIT) mit Spezialisierung auf Informatik und Robotik, wo ich zu sicherheitsbezogenen Machine-Learning-Projekten beitrug. Derzeit arbeite ich als Software-Entwickler bei Atlas Copco und konzentriere mich auf sichere industrielle Automatisierungssysteme und CI/CD-Prozesse.",
      experienceTitle: "Berufserfahrung",
      experienceSubtitle: "Mein beruflicher Werdegang in Softwareentwicklung und Cybersicherheit",
      skillsTitle: "Technische Fähigkeiten",
      skillsSubtitle: "Technologien und Tools, die ich verwende, um Ideen zum Leben zu erwecken",
      contactTitle: "Kontakt",
      contactSubtitle: "Bereit zusammenzuarbeiten? Lassen Sie uns über Ihr nächstes Projekt sprechen",
      contactInfo: "Kontaktinformationen",
      followMe: "Folgen Sie mir",
      sendMessage: "Nachricht senden",
      yourName: "Ihr Name",
      yourEmail: "Ihre E-Mail",
      yourMessage: "Ihre Nachricht",
      sendButton: "Nachricht senden",
      sending: "Wird gesendet...",
      successMessage: "Nachricht erfolgreich gesendet! Ich melde mich bald bei Ihnen.",
      errorMessage: "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt.",
      contactDirectly: "Oder kontaktieren Sie mich direkt unter",
      // Hero section translations
      softwareDevelopment: "Software-Entwicklung",
      cybersecurity: "Cybersicherheit", 
      robotics: "Robotik",
      viewProjects: "Projekte anzeigen",
      downloadResume: "Lebenslauf herunterladen",
      // Statistics translations
      yearsExperience: "Jahre Erfahrung",
      projectsCompleted: "Projekte abgeschlossen", 
      technologies: "Technologien",
      clientSatisfaction: "Kundenzufriedenheit",
      // Work experience translations
      atlasCopco: {
        title: "Software-Entwickler",
        company: "Atlas Copco, Bretten, Deutschland",
        period: "Apr 2024 – März 2025",
        location: "Bretten, Deutschland",
        bullets: [
          "Unterstützung bei der Implementierung von Sicherheitsrichtlinien und Compliance-Anforderungen in industriellen Automatisierungssystemen",
          "Entwicklung sicherer CI/CD-Testumgebungen mit Docker, Git und Playwright",
          "Durchführung manueller und automatisierter Tests mit Jira für Qualitätssicherung",
          "Beitrag zu Risikominderungsstrategien und sicheren Softwareentwicklungsprozessen",
          "Implementierung automatisierter Sicherheitsscans und Schwachstellenbewertungs-Workflows",
          "Zusammenarbeit mit funktionsübergreifenden Teams zur Gewährleistung sicherer Bereitstellungspraktiken",
          "Entwicklung und Wartung umfassender Testdokumentation und Berichtssysteme"
        ]
      },
      prosaic: {
        title: "IT-Sicherheitsanalytiker & Penetrationstests",
        company: "Prosaic Technologies, Bangalore, Indien",
        period: "Jul 2017 – März 2020",
        location: "Bangalore, Indien",
        bullets: [
          "Durchführung von Netzwerk- und Web-Penetrationstests sowie Schwachstellenanalysen",
          "Behebung identifizierter Schwachstellen mit Nessus, OpenVAS, Metasploit und Burp Suite",
          "Implementierung und Optimierung von SIEM-Erkennungsregeln (Splunk) für proaktive Bedrohungserkennung",
          "Teilnahme an Incident Response, digitaler Forensik und internen Sicherheitsschulungen",
          "Automatisierung von Schwachstellenscans und Alarmierung mit Python und Bash",
          "Durchführung von Sicherheitsbewertungen für Webanwendungen, mobile Apps und Netzwerkinfrastruktur",
          "Entwicklung benutzerdefinierter Sicherheitsskripte und -tools für erweiterte Bedrohungserkennungsfunktionen",
          "Bereitstellung von Sicherheitsberatung und Empfehlungen für Kunden in verschiedenen Branchen"
        ]
      },
      kit: {
        title: "Wissenschaftlicher Mitarbeiter – IT-Sicherheit & Softwareentwicklung",
        company: "Karlsruher Institut für Technologie (KIT)",
        period: "Jul 2022 – Jun 2023",
        location: "Karlsruhe, Deutschland",
        bullets: [
          "Unterstützung bei der Automatisierung von Softwaretests und CI-Pipelines",
          "Beitrag zu sicherheitsbezogenen Machine-Learning-Projekten mit PyTorch, PostgreSQL und Linux",
          "Erstellung technischer Dokumentation in Übereinstimmung mit Audit-Nachverfolgbarkeit und regulatorischen Anforderungen",
          "Entwicklung und Implementierung von Machine-Learning-Modellen für Cybersicherheits-Bedrohungserkennung",
          "Forschung zu aufkommenden Sicherheitstechnologien und deren praktischen Anwendungen",
          "Unterstützung bei der Entwicklung sicherer Softwarearchitekturen und bewährter Praktiken"
        ]
      }
    }
  }

  const t = useMemo(() => {
    return translations[language] || translations.en
  }, [language])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // For now, we'll use a simple approach with EmailJS or similar service
      // You can also implement your own backend API
      
      // Option 1: Using EmailJS (free tier available)
      // You'll need to sign up at emailjs.com and add their script
      
      // Option 2: Using a simple mailto link (fallback)
      const mailtoLink = `mailto:chandrathod99@gmail.com?subject=Contact from ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
      window.open(mailtoLink)
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
      console.error('Error sending message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        id="hero" 
        ref={addToRefs}
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent"
      >
        {/* Removed background overlay for full transparency */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Chandrashekhar Nayak</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-primary-300 mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <div className="glass-effect px-6 py-3 rounded-full">
              <Code className="inline-block w-5 h-5 mr-2" />
              <span>{t.softwareDevelopment}</span>
            </div>
            <div className="glass-effect px-6 py-3 rounded-full">
              <Shield className="inline-block w-5 h-5 mr-2" />
              <span>{t.cybersecurity}</span>
            </div>
            <div className="glass-effect px-6 py-3 rounded-full">
              <Database className="inline-block w-5 h-5 mr-2" />
              <span>{t.robotics}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-4"
          >
            <button 
              onClick={() => setShowProjects(true)}
              className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {t.viewProjects}
            </button>
            <button className="glass-effect text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300">
              {t.downloadResume}
            </button>
            <button
              onClick={() => setShowImages(true)}
              className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Reveal My Pictures
            </button>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 floating-element">
          <div className="w-4 h-4 bg-primary-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-20 right-10 floating-element" style={{ animationDelay: '2s' }}>
          <div className="w-6 h-6 bg-accent-400 rounded-full opacity-40"></div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={addToRefs}
        className="py-20 px-4 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">{t.aboutTitle}</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              {t.aboutSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4 text-primary-400">
                  {t.myJourney}
                </h3>
                <p className="text-dark-300 leading-relaxed mb-6">
                  {t.journeyText1}
                </p>
                <p className="text-dark-300 leading-relaxed">
                  {t.journeyText2}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="glass-effect p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">5+</div>
                <div className="text-dark-300">{t.yearsExperience}</div>
              </div>
              <div className="glass-effect p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-accent-400 mb-2">16+</div>
                <div className="text-dark-300">{t.projectsCompleted}</div>
              </div>
              <div className="glass-effect p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">16+</div>
                <div className="text-dark-300">{t.technologies}</div>
              </div>
              <div className="glass-effect p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-accent-400 mb-2">100%</div>
                <div className="text-dark-300">{t.clientSatisfaction}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        id="experience" 
        ref={addToRefs}
        className="py-20 px-4 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">{t.experienceTitle}</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              {t.experienceSubtitle}
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => toggleSection('atlas-copco')}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-primary-400 mb-2">
                    {t.atlasCopco.title}
                  </h3>
                  <p className="text-lg text-dark-300">{t.atlasCopco.company}</p>
                </div>
                <div className="text-right mt-4 md:mt-0 md:ml-4">
                  <div className="text-sm text-dark-400">{t.atlasCopco.period}</div>
                  <div className="text-sm text-primary-400">{t.atlasCopco.location}</div>
                </div>
                <div className="ml-4">
                  {expandedSections['atlas-copco'] ? (
                    <ChevronUp className="w-6 h-6 text-primary-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary-400" />
                  )}
                </div>
              </div>
              
              {expandedSections['atlas-copco'] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <ul className="text-dark-300 leading-relaxed mb-4 space-y-2">
                    {t.atlasCopco.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-400 mr-2">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Docker</span>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Git</span>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Playwright</span>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Jira</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => toggleSection('prosaic')}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-primary-400 mb-2">
                    {t.prosaic.title}
                  </h3>
                  <p className="text-lg text-dark-300">{t.prosaic.company}</p>
                </div>
                <div className="text-right mt-4 md:mt-0 md:ml-4">
                  <div className="text-sm text-dark-400">{t.prosaic.period}</div>
                  <div className="text-sm text-primary-400">{t.prosaic.location}</div>
                </div>
                <div className="ml-4">
                  {expandedSections['prosaic'] ? (
                    <ChevronUp className="w-6 h-6 text-primary-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary-400" />
                  )}
                </div>
              </div>
              
              {expandedSections['prosaic'] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <ul className="text-dark-300 leading-relaxed mb-4 space-y-2">
                    {t.prosaic.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-400 mr-2">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Nessus</span>
                    <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">OpenVAS</span>
                    <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Metasploit</span>
                    <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Burp Suite</span>
                    <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Splunk</span>
                    <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Python</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => toggleSection('kit')}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-primary-400 mb-2">
                    {t.kit.title}
                  </h3>
                  <p className="text-lg text-dark-300">{t.kit.company}</p>
                </div>
                <div className="text-right mt-4 md:mt-0 md:ml-4">
                  <div className="text-sm text-dark-400">{t.kit.period}</div>
                  <div className="text-sm text-primary-400">{t.kit.location}</div>
                </div>
                <div className="ml-4">
                  {expandedSections['kit'] ? (
                    <ChevronUp className="w-6 h-6 text-primary-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary-400" />
                  )}
                </div>
              </div>
              
              {expandedSections['kit'] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <ul className="text-dark-300 leading-relaxed mb-4 space-y-2">
                    {t.kit.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-400 mr-2">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">PyTorch</span>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">PostgreSQL</span>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Linux</span>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">CI/CD</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        ref={addToRefs}
        className="py-20 px-4 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">{t.skillsTitle}</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              {t.skillsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-center mb-6">
                <Code className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-primary-400 mb-4">Software Development</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>JavaScript</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>React</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Node.js</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>HTML/CSS</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>MongoDB</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-center mb-6">
                <Database className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-accent-400 mb-4">DevOps & Testing</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center mb-2">
                  <span className="min-w-[120px] mr-4">Docker</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2 flex-1">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <span className="min-w-[120px] mr-4">Git</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2 flex-1">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <span className="min-w-[120px] mr-4">Jira</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2 flex-1">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <span className="min-w-[120px] mr-4">Playwright</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2 flex-1">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <span className="min-w-[120px] mr-4">Linux/Windows</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2 flex-1">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-center mb-6">
                <Shield className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-primary-400 mb-4">Security Tools</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Nessus</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Metasploit</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Burp Suite</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>OpenVAS</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nmap</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-center mb-6">
                <Award className="w-12 h-12 text-accent-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-accent-400 mb-4">ISMS & Compliance</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center mb-2">
                  <span className="min-w-[120px] mr-4">BSI IT-Grundschutz</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2 flex-1">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <span className="min-w-[120px] mr-4">ISO 27001</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2 flex-1">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <span className="min-w-[120px] mr-4">Splunk</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2 flex-1">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <span className="min-w-[120px] mr-4">Wireshark</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2 flex-1">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <span className="min-w-[120px] mr-4">Python/Bash</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2 flex-1">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={addToRefs}
        className="py-20 px-4 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">{t.contactTitle}</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              {t.contactSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-primary-400 mb-6">
                  {t.contactInfo}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary-400 mr-3" />
                    <span>chandrathod99@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary-400 mr-3" />
                    <span>+49 176 21241018</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary-400 mr-3" />
                    <span>Nancy Strasse 20, 76187 Karlsruhe, Germany</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-primary-400 mb-4">
                    {t.followMe}
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <a 
                      href="https://github.com/chandranayak89/WebResume" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="glass-effect p-4 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center group"
                    >
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg mb-2 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300">
                        <Github className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-primary-300">GitHub</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/chandrashekhar-somappa-n-883a02240/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="glass-effect p-4 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center group"
                    >
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg mb-2 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                        <Linkedin className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-primary-300">LinkedIn</span>
                    </a>
                    <a 
                      href="https://chandranayak89.github.io/My-Portfolio/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="glass-effect p-4 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center group"
                    >
                      <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-3 rounded-lg mb-2 group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-300">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-primary-300">Portfolio</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold text-primary-400 mb-6">
                  {t.sendMessage}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.yourName}
                      required
                      className="w-full bg-dark-800 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.yourEmail}
                      required
                      className="w-full bg-dark-800 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.yourMessage}
                      rows="4"
                      required
                      className="w-full bg-dark-800 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    ></textarea>
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                      {t.successMessage}
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                      {t.errorMessage}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? t.sending : t.sendButton}
                  </button>
                </form>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-dark-400">
                    {t.contactDirectly}{' '}
                    <a 
                      href="mailto:chandrathod99@gmail.com" 
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      chandrathod99@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Modal */}
      {showProjects && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowProjects(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-dark-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">
                  My <span className="gradient-text">Projects</span>
                </h2>
                <button
                  onClick={() => setShowProjects(false)}
                  className="glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Projects Content */}
            <div className="p-6 space-y-8">
              {/* Project 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-effect p-6 rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-primary-400 mb-2">
                      1. ML-Based Test Automation
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Python</span>
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">PyTorch</span>
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Jenkins</span>
                    </div>
                  </div>
                </div>
                <ul className="text-dark-300 space-y-2">
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Predictive Test Case Failure Analysis</div>
                        <div className="pl-2 text-dark-300">– Developed machine learning models to predict potential test case failures, reducing redundant executions and improving test efficiency.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Optimized Test Execution Sequences</div>
                        <div className="pl-2 text-dark-300">– Implemented an intelligent scheduling algorithm to prioritize test cases based on failure probability and execution impact.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Data-Driven Decision Making</div>
                        <div className="pl-2 text-dark-300">– Analyzed historical test results and logs to extract meaningful patterns and improve overall test strategy.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Feature Engineering for Test Optimization</div>
                        <div className="pl-2 text-dark-300">– Engineered relevant features from test logs, execution times, and code changes to enhance model accuracy.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Integration with CI/CD Pipelines</div>
                        <div className="pl-2 text-dark-300">– Integrated ML-powered test automation into CI/CD workflows, ensuring faster feedback loops and continuous quality assurance.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Automated Root Cause Analysis</div>
                        <div className="pl-2 text-dark-300">– Leveraged ML techniques to classify and diagnose test failures, reducing manual debugging efforts.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Scalable and Adaptive Framework</div>
                        <div className="pl-2 text-dark-300">– Designed a scalable framework that adapts to evolving test environments and dynamically adjusts testing strategies.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Performance and Accuracy Metrics</div>
                        <div className="pl-2 text-dark-300">– Evaluated model effectiveness using precision, recall, and F1-score to ensure reliable test failure predictions.</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Project 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-effect p-6 rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-accent-400 mb-2">
                      2. CI/CD Pipeline for Security Testing
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Jenkins</span>
                      <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Docker</span>
                      <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Kubernetes</span>
                    </div>
                  </div>
                </div>
                <ul className="text-dark-300 space-y-2">
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-accent-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Automated Security Scanning</div>
                        <div className="pl-2 text-dark-300">– Integrated static (SAST) and dynamic (DAST) security testing tools into the CI/CD pipeline to identify vulnerabilities early.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-accent-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Container Security Assessment</div>
                        <div className="pl-2 text-dark-300">– Implemented container image scanning (e.g., Trivy, Anchore) to detect misconfigurations and vulnerabilities in Docker images.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-accent-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Dependency Vulnerability Management</div>
                        <div className="pl-2 text-dark-300">– Configured automated dependency checks using tools like OWASP Dependency-Check and Snyk to prevent security flaws in third-party libraries.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-accent-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Compliance and Policy Enforcement</div>
                        <div className="pl-2 text-dark-300">– Enforced security policies and compliance checks (e.g., OWASP Top 10, CIS benchmarks) as part of the automated workflow.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-accent-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Secure Deployment Strategies</div>
                        <div className="pl-2 text-dark-300">– Ensured secure software releases by incorporating automated security gates, preventing deployments with critical vulnerabilities.</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Project 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-effect p-6 rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-primary-400 mb-2">
                      3. Intrusion Detection System
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Python</span>
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">SIEM</span>
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Network Security</span>
                    </div>
                  </div>
                </div>
                <ul className="text-dark-300 space-y-2">
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Real-Time Threat Detection</div>
                        <div className="pl-2 text-dark-300">– Designed an IDS capable of detecting cyber threats in railway networks in real-time, ensuring quick response and mitigation.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Anomaly-Based and Signature-Based Detection</div>
                        <div className="pl-2 text-dark-300">– Implemented a hybrid approach combining anomaly detection (ML models) and signature-based methods for comprehensive threat coverage.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Network Traffic Analysis</div>
                        <div className="pl-2 text-dark-300">– Monitored and analyzed railway communication protocols to detect suspicious activities and potential cyberattacks.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Lightweight and Scalable Architecture</div>
                        <div className="pl-2 text-dark-300">– Optimized the IDS to work efficiently on resource-constrained railway systems without compromising performance.</div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="flex items-start">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      <div>
                        <div className="font-bold">Integration with Security Information and Event Management (SIEM)</div>
                        <div className="pl-2 text-dark-300">– Forwarded detected threats to SIEM platforms for centralized monitoring and incident response.</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showImages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 rounded-2xl max-w-md w-full relative flex flex-col items-center p-0">
            <div className="sticky top-0 z-10 w-full bg-dark-900 rounded-t-2xl flex flex-col items-center pt-6 pb-2 px-6">
              <button
                onClick={() => { setShowImages(false); setCurrentImageIndex(0); }}
                className="absolute top-4 right-4 glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
                style={{ right: '1.5rem' }}
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold text-center gradient-text">My Pictures</h3>
            </div>
            <div className="w-full px-6 pb-6 pt-2 flex flex-col items-center" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              <img
                src={images[currentImageIndex]}
                alt={`Me ${currentImageIndex + 1}`}
                className="rounded-xl object-contain w-full bg-dark-800 mb-4"
                style={{ maxHeight: '60vh' }}
              />
              <div className="flex justify-between w-full">
                <button
                  onClick={() => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentImageIndex === 0}
                  className="px-4 py-2 rounded-lg font-semibold bg-dark-700 text-white disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => Math.min(prev + 1, images.length - 1))}
                  disabled={currentImageIndex === images.length - 1}
                  className="px-4 py-2 rounded-lg font-semibold bg-dark-700 text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-700 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-lg font-semibold text-primary-400 mb-2 md:mb-0">
            Chandrashekhar Nayak
          </div>
          <nav className="flex flex-wrap gap-4 text-dark-300 text-sm font-medium">
            <a href="#hero" className="hover:text-primary-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-primary-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-primary-400 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-primary-400 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-primary-400 transition-colors">Contact</a>
          </nav>
          <div className="flex gap-4">
            <a 
              href="https://github.com/chandranayak89/WebResume" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Github className="w-5 h-5 text-primary-300" />
            </a>
            <a 
              href="https://www.linkedin.com/in/chandrashekhar-somappa-n-883a02240/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Linkedin className="w-5 h-5 text-primary-300" />
            </a>
            <a 
              href="https://chandranayak89.github.io/My-Portfolio/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-effect p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Briefcase className="w-5 h-5 text-primary-300" />
            </a>
          </div>
        </div>
        <div className="text-center text-dark-500 text-xs py-4 border-t border-dark-800 bg-dark-900/80">
          &copy; {new Date().getFullYear()} Chandrashekhar Nayak. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default ResumeContent 