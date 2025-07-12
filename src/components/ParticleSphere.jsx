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

  // Particle system configuration
  const config = useMemo(() => ({
    count: window.innerWidth > 768 ? 2500 : 1500,
    radius: 8,
    thickness: 0.3,
    colors: ['#4F46E5', '#EC4899', '#8B5CF6', '#06B6D4', '#10B981'],
    physics: {
      gravity: 0.2,
      friction: 0.98,
      splatterForce: 1.8,
      turbulence: 0.5
    },
    animation: {
      rotationSpeed: 0.001,
      pulseSpeed: 0.005
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
    camera.position.z = 15

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

    // Create particles
    const particles = []
    const geometry = new THREE.SphereGeometry(0.05, 8, 8)
    const materials = config.colors.map(color => 
      new THREE.MeshBasicMaterial({ 
        color, 
        transparent: true, 
        opacity: 0.8 
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
        size: Math.random() * 0.5 + 0.5
      }
      
      particles.push(particle)
      scene.add(particle)
    }
    particlesRef.current = particles

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point light
    const pointLight = new THREE.PointLight(0x4F46E5, 1, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      
      // Rotate camera slowly
      camera.position.x = Math.cos(Date.now() * config.animation.rotationSpeed) * 15
      camera.position.z = Math.sin(Date.now() * config.animation.rotationSpeed) * 15
      camera.lookAt(0, 0, 0)

      // Update particles
      particles.forEach((particle, index) => {
        if (!isSplatteredRef.current) {
          // Gentle floating animation
          const time = Date.now() * config.animation.pulseSpeed + index
          particle.position.y += Math.sin(time) * 0.001
          particle.rotation.x += 0.01
          particle.rotation.y += 0.01
        } else {
          // Apply physics for splatter effect
          particle.userData.velocity.y -= config.physics.gravity
          particle.userData.velocity.multiplyScalar(config.physics.friction)
          particle.position.add(particle.userData.velocity)
          
          // Fade out particles as they fall
          const distance = particle.position.length()
          const opacity = Math.max(0, 1 - distance / 50)
          particle.material.opacity = opacity
          
          // Rotate falling particles
          particle.rotation.x += 0.05
          particle.rotation.y += 0.05
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
    if (scrollProgress > 0.15 && !isSplatteredRef.current) {
      isSplatteredRef.current = true
      triggerSplatterEffect()
    } else if (scrollProgress <= 0.15 && isSplatteredRef.current) {
      isSplatteredRef.current = false
      resetParticles()
    }
  }, [scrollProgress])

  const triggerSplatterEffect = () => {
    particlesRef.current.forEach((particle, index) => {
      // Calculate outward force vector
      const forceVector = particle.position.clone()
        .normalize()
        .multiplyScalar(config.physics.splatterForce * (1 + Math.random() * 0.5))
      
      // Add turbulence
      const turbulence = new THREE.Vector3(
        (Math.random() - 0.5) * config.physics.turbulence,
        (Math.random() - 0.5) * config.physics.turbulence,
        (Math.random() - 0.5) * config.physics.turbulence
      )
      
      particle.userData.velocity.add(forceVector).add(turbulence)
      
      // Animate particle scale
      gsap.to(particle.scale, {
        x: particle.userData.size * 2,
        y: particle.userData.size * 2,
        z: particle.userData.size * 2,
        duration: 0.5,
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
        duration: 1,
        ease: "power2.out"
      })
      
      // Reset velocity
      particle.userData.velocity.set(0, 0, 0)
      
      // Reset scale and opacity
      gsap.to(particle.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "power2.out"
      })
      
      gsap.to(particle.material, {
        opacity: 0.8,
        duration: 1,
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
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  )
}

export default ParticleSphere 