import React from 'react'
import { motion } from 'framer-motion'

const ScrollIndicator = ({ currentSection, onSectionClick }) => {
  const sections = ['Home', 'About', 'Experience', 'Skills', 'Contact']

  return (
    <div className="scroll-indicator">
      {sections.map((section, index) => (
        <motion.button
          key={section}
          onClick={() => onSectionClick(index)}
          className={`scroll-dot ${currentSection === index ? 'active' : ''}`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title={section}
        />
      ))}
    </div>
  )
}

export default ScrollIndicator 