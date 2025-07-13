import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleSphere from './components/ParticleSphere'
import ResumeContent from './components/ResumeContent'
import ScrollIndicator from './components/ScrollIndicator'
import { Download, Menu, X, Globe } from 'lucide-react'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [language, setLanguage] = useState('en') // 'en' for English, 'de' for German
  const contentRef = useRef(null)

  useEffect(() => {
    // Simulate loading time for Three.js initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const progress = Math.min(scrollY / documentHeight, 1)
      setScrollProgress(progress)

      // Update current section based on scroll position
      const sections = document.querySelectorAll('section[id]')
      const current = Array.from(sections).findIndex(section => {
        const rect = section.getBoundingClientRect()
        return rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5
      })
      setCurrentSection(Math.max(0, current))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionIndex) => {
    const sections = document.querySelectorAll('section[id]')
    if (sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'de' : 'en')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-primary-400 mb-2">
            Loading Interactive Resume
          </h2>
          <p className="text-dark-300">Initializing 3D particle system...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* Particle System Background */}
      <ParticleSphere scrollProgress={scrollProgress} />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <h1 className="text-xl font-bold gradient-text">
                Interactive Resume
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection(0)}
                className="text-white hover:text-primary-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection(1)}
                className="text-white hover:text-primary-400 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection(2)}
                className="text-white hover:text-primary-400 transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection(3)}
                className="text-white hover:text-primary-400 transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection(4)}
                className="text-white hover:text-primary-400 transition-colors"
              >
                Contact
              </button>
              <button
                onClick={toggleLanguage}
                className="glass-effect px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'DE'}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-primary-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 glass-effect"
          >
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => { scrollToSection(0); setIsMenuOpen(false); }}
                className="block w-full text-left text-white hover:text-primary-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => { scrollToSection(1); setIsMenuOpen(false); }}
                className="block w-full text-left text-white hover:text-primary-400 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => { scrollToSection(2); setIsMenuOpen(false); }}
                className="block w-full text-left text-white hover:text-primary-400 transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => { scrollToSection(3); setIsMenuOpen(false); }}
                className="block w-full text-left text-white hover:text-primary-400 transition-colors"
              >
                Skills
              </button>
              <button
                onClick={() => { scrollToSection(4); setIsMenuOpen(false); }}
                className="block w-full text-left text-white hover:text-primary-400 transition-colors"
              >
                Contact
              </button>
              <div className="pt-2">
                <button
                  onClick={toggleLanguage}
                  className="glass-effect px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2 w-full"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'DE'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <ScrollIndicator 
        currentSection={currentSection} 
        onSectionClick={scrollToSection} 
      />

      {/* Main Content */}
      <main ref={contentRef} className="content-layer relative z-10">
        <ResumeContent language={language} />
      </main>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-dark-700 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  )
}

export default App 