import React, { useEffect, useRef } from 'react'
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
  ExternalLink
} from 'lucide-react'

const ResumeContent = () => {
  const sectionsRef = useRef([])

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

  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        id="hero" 
        ref={addToRefs}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 opacity-90"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">John Doe</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-primary-300 mb-4">
              Full Stack Developer & Cybersecurity Specialist
            </h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto leading-relaxed">
              Crafting secure, scalable web applications with cutting-edge technologies. 
              Passionate about creating innovative solutions that drive business growth.
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
              <span>Full Stack Development</span>
            </div>
            <div className="glass-effect px-6 py-3 rounded-full">
              <Shield className="inline-block w-5 h-5 mr-2" />
              <span>Cybersecurity</span>
            </div>
            <div className="glass-effect px-6 py-3 rounded-full">
              <Database className="inline-block w-5 h-5 mr-2" />
              <span>Cloud Architecture</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-4"
          >
            <button className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              View Projects
            </button>
            <button className="glass-effect text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300">
              Download Resume
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
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              A passionate developer with 5+ years of experience building secure, scalable applications
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
                  My Journey
                </h3>
                <p className="text-dark-300 leading-relaxed mb-6">
                  I started my career as a junior developer and quickly grew into a full-stack specialist. 
                  My passion for cybersecurity led me to specialize in secure application development, 
                  working with Fortune 500 companies to build robust, scalable solutions.
                </p>
                <p className="text-dark-300 leading-relaxed">
                  Today, I lead development teams and architect solutions that combine cutting-edge 
                  technology with enterprise-grade security standards.
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
                <div className="text-dark-300">Years Experience</div>
              </div>
              <div className="glass-effect p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-accent-400 mb-2">50+</div>
                <div className="text-dark-300">Projects Completed</div>
              </div>
              <div className="glass-effect p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">15+</div>
                <div className="text-dark-300">Technologies</div>
              </div>
              <div className="glass-effect p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-accent-400 mb-2">100%</div>
                <div className="text-dark-300">Client Satisfaction</div>
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
              Work <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              My professional journey in software development and cybersecurity
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-primary-400 mb-2">
                    Senior Full Stack Developer
                  </h3>
                  <p className="text-lg text-dark-300">TechCorp Inc.</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-sm text-dark-400">2022 - Present</div>
                  <div className="text-sm text-primary-400">Remote</div>
                </div>
              </div>
              <p className="text-dark-300 leading-relaxed mb-4">
                Lead development of enterprise-grade applications using React, Node.js, and AWS. 
                Implemented security best practices and CI/CD pipelines. Mentored junior developers 
                and conducted code reviews.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">AWS</span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Docker</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-primary-400 mb-2">
                    Cybersecurity Specialist
                  </h3>
                  <p className="text-lg text-dark-300">SecureNet Solutions</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-sm text-dark-400">2020 - 2022</div>
                  <div className="text-sm text-primary-400">New York, NY</div>
                </div>
              </div>
              <p className="text-dark-300 leading-relaxed mb-4">
                Conducted security audits, penetration testing, and vulnerability assessments. 
                Developed secure coding guidelines and trained development teams on security best practices.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Penetration Testing</span>
                <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">OWASP</span>
                <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Kali Linux</span>
                <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">Burp Suite</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-primary-400 mb-2">
                    Junior Developer
                  </h3>
                  <p className="text-lg text-dark-300">StartupXYZ</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <div className="text-sm text-dark-400">2019 - 2020</div>
                  <div className="text-sm text-primary-400">San Francisco, CA</div>
                </div>
              </div>
              <p className="text-dark-300 leading-relaxed mb-4">
                Built and maintained web applications using modern JavaScript frameworks. 
                Collaborated with design and product teams to deliver user-friendly solutions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">JavaScript</span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Vue.js</span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">PostgreSQL</span>
              </div>
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
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-center mb-6">
                <Code className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-primary-400 mb-4">Frontend</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>React.js</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Vue.js</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>TypeScript</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tailwind CSS</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '92%' }}></div>
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
                <h3 className="text-2xl font-semibold text-accent-400 mb-4">Backend</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Node.js</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Python</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>PostgreSQL</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>MongoDB</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-accent-500 h-2 rounded-full" style={{ width: '82%' }}></div>
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
                <h3 className="text-2xl font-semibold text-primary-400 mb-4">Security</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Penetration Testing</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>OWASP Top 10</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cryptography</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Security Auditing</span>
                  <div className="w-24 bg-dark-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
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
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Ready to work together? Let's discuss your next project
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
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary-400 mr-3" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary-400 mr-3" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary-400 mr-3" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-primary-400 mb-4">
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    <a href="#" className="glass-effect p-3 rounded-lg hover:bg-white/20 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="glass-effect p-3 rounded-lg hover:bg-white/20 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="glass-effect p-3 rounded-lg hover:bg-white/20 transition-colors">
                      <Twitter className="w-5 h-5" />
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
                  Send Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-dark-800 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-dark-800 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows="4"
                      className="w-full bg-dark-800 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ResumeContent 