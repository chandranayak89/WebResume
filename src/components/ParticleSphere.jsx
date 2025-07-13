import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

const ParticleSphere = ({ scrollProgress }) => {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const particlesRef = useRef([])
  const animationIdRef = useRef(null)
  const isSplatteredRef = useRef(false)

  // Fine cloud configuration
  const config = useMemo(() => ({
    count: window.innerWidth > 768 ? 7000 : 3500,
    radius: 6.5,
    thickness: 1.2,
    colors: [
      '#e0e7ff', '#b3c6ff', '#a5d8ff', '#b2dfdb', '#f3e5f5', '#e1bee7', '#b2ebf2', '#fffde4'
    ],
    physics: {
      gravity: 0.10,
      friction: 0.995,
      splatterForce: 2.5,
      turbulence: 0.7
    },
    animation: {
      rotationSpeed: 0.00018,
      pulseSpeed: 0.0015
    }
  }), [])

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 7.5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create fine, tiny particles
    const particles = []
    const geometry = new THREE.SphereGeometry(0.03, 8, 8)
    const materials = config.colors.map(color => 
      new THREE.MeshBasicMaterial({ 
        color, 
        transparent: true, 
        opacity: 0.7 
      })
    )

    // Generate hollow sphere formation
    for (let i = 0; i < config.count; i++) {
      const material = materials[i % materials.length].clone()
      const particle = new THREE.Mesh(geometry, material)
      
      // Calculate position on hollow sphere surface
      const phi = Math.acos(-1 + (2 * i) / config.count)
      const theta = Math.sqrt(config.count * Math.PI) * phi
      
      const radius = config.radius + (Math.random() - 0.5) * config.thickness
      particle.position.setFromSphericalCoords(radius, phi, theta)
      
      // Store original position for splatter effect
      particle.userData = {
        originalPosition: particle.position.clone(),
        velocity: new THREE.Vector3(),
        color: material.color.clone(),
        size: Math.random() * 0.25 + 0.7
      }
      
      // Set initial scale
      particle.scale.setScalar(particle.userData.size)
      
      particles.push(particle)
      scene.add(particle)
    }
    particlesRef.current = particles

    // Soft ambient light for cloud effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      
      // Slow, gentle rotation
      camera.position.x = Math.cos(Date.now() * config.animation.rotationSpeed) * 10
      camera.position.z = Math.sin(Date.now() * config.animation.rotationSpeed) * 10
      camera.lookAt(0, 0, 0)

      // Update particles
      particles.forEach((particle, index) => {
        if (!isSplatteredRef.current) {
          // Gentle floating animation
          const time = Date.now() * config.animation.pulseSpeed + index
          particle.position.y += Math.sin(time) * 0.001
          particle.rotation.x += 0.01
          particle.rotation.y += 0.01
          // Subtle pulse
          const pulse = Math.sin(time) * 0.05 + 1
          particle.scale.setScalar(particle.userData.size * pulse)
        } else {
          // Apply physics for splatter effect
          particle.userData.velocity.y -= config.physics.gravity
          particle.userData.velocity.multiplyScalar(config.physics.friction)
          particle.position.add(particle.userData.velocity)
          // Fade out particles as they fall
          const distance = particle.position.length()
          const opacity = Math.max(0, 0.45 - distance / 40)
          particle.material.opacity = opacity
          // Rotate falling particles
          particle.rotation.x += 0.04
          particle.rotation.y += 0.04
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [config])

  // Handle scroll-triggered splatter effect
  useEffect(() => {
    if (scrollProgress > 0.08 && !isSplatteredRef.current) {
      isSplatteredRef.current = true
      triggerSplatterEffect()
    } else if (scrollProgress <= 0.03 && isSplatteredRef.current) {
      isSplatteredRef.current = false
      resetParticles()
    }
  }, [scrollProgress])

  const triggerSplatterEffect = () => {
    particlesRef.current.forEach((particle, index) => {
      // Calculate outward force vector
      const forceVector = particle.position.clone()
        .normalize()
        .multiplyScalar(config.physics.splatterForce * (1 + Math.random() * 0.7))
      // Add turbulence
      const turbulence = new THREE.Vector3(
        (Math.random() - 0.5) * config.physics.turbulence,
        (Math.random() - 0.5) * config.physics.turbulence,
        (Math.random() - 0.5) * config.physics.turbulence
      )
      particle.userData.velocity.add(forceVector).add(turbulence)
      // Animate particle scale
      gsap.to(particle.scale, {
        x: particle.userData.size * 2.5,
        y: particle.userData.size * 2.5,
        z: particle.userData.size * 2.5,
        duration: 0.3,
        ease: "power2.out"
      })
    })
  }

  const resetParticles = () => {
    particlesRef.current.forEach((particle) => {
      // Reset to original position
      gsap.to(particle.position, {
        x: particle.userData.originalPosition.x,
        y: particle.userData.originalPosition.y,
        z: particle.userData.originalPosition.z,
        duration: 2.0,
        ease: "power2.out"
      })
      // Reset velocity
      particle.userData.velocity.set(0, 0, 0)
      // Reset scale and opacity
      gsap.to(particle.scale, {
        x: particle.userData.size,
        y: particle.userData.size,
        z: particle.userData.size,
        duration: 2.0,
        ease: "power2.out"
      })
      gsap.to(particle.material, {
        opacity: 0.45,
        duration: 2.0,
        ease: "power2.out"
      })
    })
  }

  return (
    <div 
      ref={mountRef} 
      className="particle-container"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none'
      }}
    />
  )
}

export default ParticleSphere 