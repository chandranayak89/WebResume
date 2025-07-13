import React, { useRef, useEffect } from 'react'

const STAR_COUNT = 80
const STAR_COLOR = 'rgba(255,255,255,0.85)'
const STAR_MIN_SIZE = 1
const STAR_MAX_SIZE = 2.5
const STAR_MIN_SPEED = 1.2
const STAR_MAX_SPEED = 2.8
const COMET_CHANCE = 0.08 // 8% of stars are comets

function randomBetween(a, b) {
  return Math.random() * (b - a) + a
}

const Starfall = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const stars = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    function createStar() {
      const isComet = Math.random() < COMET_CHANCE
      return {
        x: randomBetween(0, width),
        y: randomBetween(-height, 0),
        size: randomBetween(STAR_MIN_SIZE, STAR_MAX_SIZE),
        speed: randomBetween(STAR_MIN_SPEED, STAR_MAX_SPEED),
        isComet,
        tail: isComet ? randomBetween(60, 120) : 0,
        alpha: isComet ? 0.7 : 1.0
      }
    }

    function resetStar(star) {
      Object.assign(star, createStar())
      star.y = -star.size
    }

    // Initialize stars
    stars.current = Array.from({ length: STAR_COUNT }, createStar)

    function draw() {
      ctx.clearRect(0, 0, width, height)
      for (const star of stars.current) {
        if (star.isComet) {
          // Draw comet tail
          const grad = ctx.createLinearGradient(star.x, star.y, star.x, star.y + star.tail)
          grad.addColorStop(0, 'rgba(255,255,255,0.0)')
          grad.addColorStop(0.2, 'rgba(255,255,255,0.15)')
          grad.addColorStop(1, 'rgba(255,255,255,0.5)')
          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(star.x, star.y + star.tail)
          ctx.strokeStyle = grad
          ctx.lineWidth = star.size * 1.2
          ctx.stroke()
        }
        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI)
        ctx.fillStyle = STAR_COLOR
        ctx.globalAlpha = star.alpha
        ctx.shadowColor = '#fff'
        ctx.shadowBlur = star.isComet ? 16 : 4
        ctx.fill()
        ctx.globalAlpha = 1.0
        ctx.shadowBlur = 0
      }
    }

    function update() {
      for (const star of stars.current) {
        star.y += star.speed
        if (star.y - star.size > height) {
          resetStar(star)
        }
      }
    }

    function animate() {
      update()
      draw()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    function handleResize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  )
}

export default Starfall 