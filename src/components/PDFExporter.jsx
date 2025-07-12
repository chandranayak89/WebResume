import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Check } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const PDFExporter = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [isExported, setIsExported] = useState(false)

  const exportToPDF = async () => {
    setIsExporting(true)
    
    try {
      // Hide particle system and navigation for PDF
      const particleContainer = document.querySelector('.particle-container')
      const navigation = document.querySelector('nav')
      const scrollIndicator = document.querySelector('.scroll-indicator')
      const progressBar = document.querySelector('.fixed.top-0.left-0')
      
      if (particleContainer) particleContainer.style.display = 'none'
      if (navigation) navigation.style.display = 'none'
      if (scrollIndicator) scrollIndicator.style.display = 'none'
      if (progressBar) progressBar.style.display = 'none'

      // Wait a bit for DOM updates
      await new Promise(resolve => setTimeout(resolve, 100))

      // Capture the content
      const content = document.querySelector('.content-layer')
      if (!content) throw new Error('Content not found')

      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0f172a',
        width: content.scrollWidth,
        height: content.scrollHeight,
        scrollX: 0,
        scrollY: 0
      })

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Add metadata
      pdf.setProperties({
        title: 'John Doe - Interactive Resume',
        subject: 'Professional Resume',
        author: 'John Doe',
        creator: 'Interactive Resume Generator'
      })

      // Save the PDF
      pdf.save('john-doe-resume.pdf')

      // Show success state
      setIsExported(true)
      setTimeout(() => setIsExported(false), 3000)

    } catch (error) {
      console.error('PDF export failed:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      // Restore hidden elements
      const particleContainer = document.querySelector('.particle-container')
      const navigation = document.querySelector('nav')
      const scrollIndicator = document.querySelector('.scroll-indicator')
      const progressBar = document.querySelector('.fixed.top-0.left-0')
      
      if (particleContainer) particleContainer.style.display = 'block'
      if (navigation) navigation.style.display = 'block'
      if (scrollIndicator) scrollIndicator.style.display = 'flex'
      if (progressBar) progressBar.style.display = 'block'
      
      setIsExporting(false)
    }
  }

  return (
    <motion.button
      onClick={exportToPDF}
      disabled={isExporting}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
        isExported
          ? 'bg-green-500 text-white'
          : isExporting
          ? 'bg-dark-600 text-dark-300 cursor-not-allowed'
          : 'glass-effect text-white hover:bg-white/20'
      }`}
      whileHover={!isExporting && !isExported ? { scale: 1.05 } : {}}
      whileTap={!isExporting && !isExported ? { scale: 0.95 } : {}}
    >
      {isExported ? (
        <>
          <Check size={18} />
          <span>Exported!</span>
        </>
      ) : isExporting ? (
        <>
          <div className="loading-spinner w-4 h-4"></div>
          <span>Exporting...</span>
        </>
      ) : (
        <>
          <Download size={18} />
          <span>Export PDF</span>
        </>
      )}
    </motion.button>
  )
}

export default PDFExporter 