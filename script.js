document.addEventListener("DOMContentLoaded", () => {
    // Create loading overlay
    const loadingOverlay = document.createElement("div")
    loadingOverlay.className = "loading-overlay"
    const loadingSpinner = document.createElement("div")
    loadingSpinner.className = "loading-spinner"
    loadingOverlay.appendChild(loadingSpinner)
    document.body.appendChild(loadingOverlay)
  
    // Hide loading overlay after content loads
    window.addEventListener("load", () => {
      setTimeout(() => {
        loadingOverlay.classList.add("hidden")
        setTimeout(() => {
          loadingOverlay.remove()
        }, 500)
      }, 800)
    })
  
    // Initialize AOS (Animate On Scroll)
    let AOS // Declare AOS variable
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out",
        once: false,
        offset: 100,
      })
    } else {
      console.warn("AOS is not defined. Make sure to include the AOS library.")
      // Fallback animations
      const animateElements = document.querySelectorAll("[data-aos]")
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-in")
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )
  
      animateElements.forEach((element) => {
        observer.observe(element)
      })
    }
  
    // Scroll to top button
    const scrollToTopBtn = document.getElementById("scrollToTop")
  
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("visible")
      } else {
        scrollToTopBtn.classList.remove("visible")
      }
    })
  
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Add parallax effect to sections
    const sections = document.querySelectorAll(".section")
  
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionMiddle = sectionTop + sectionHeight / 2
        const distanceFromMiddle = scrollY - sectionMiddle
        const parallaxFactor = distanceFromMiddle * 0.03
  
        if (Math.abs(distanceFromMiddle) < window.innerHeight) {
          section.style.transform = `translateY(${parallaxFactor}px)`
        }
      })
    })
  
    // Add hover effect to feature boxes
    const featureBoxes = document.querySelectorAll(".feature-box")
  
    featureBoxes.forEach((box) => {
      box.addEventListener("mouseenter", function () {
        const icon = this.querySelector(".feature-icon i")
        icon.classList.add("fa-beat")
        setTimeout(() => {
          icon.classList.remove("fa-beat")
        }, 1000)
      })
    })
  
    // Add color transition effect to logo
    const logo = document.querySelector(".logo")
    const colors = ["#8b5a2b", "#a67c52", "#c19a6b", "#d2b48c", "#c19a6b", "#a67c52"]
    let colorIndex = 0
  
    setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length
      logo.style.color = colors[colorIndex]
    }, 3000)
  
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll(".btn")
  
    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const x = e.clientX - e.target.getBoundingClientRect().left
        const y = e.clientY - e.target.getBoundingClientRect().top
  
        const ripple = document.createElement("span")
        ripple.classList.add("ripple")
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
  
        this.appendChild(ripple)
  
        setTimeout(() => {
          ripple.remove()
        }, 600)
      })
    })
  
    // Add CSS for ripple effect
    const style = document.createElement("style")
    style.textContent = `
          .btn {
              position: relative;
              overflow: hidden;
          }
          
          .ripple {
              position: absolute;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 50%;
              transform: scale(0);
              animation: ripple 0.6s linear;
              pointer-events: none;
              width: 100px;
              height: 100px;
              margin-left: -50px;
              margin-top: -50px;
          }
          
          @keyframes ripple {
              to {
                  transform: scale(4);
                  opacity: 0;
              }
          }
      `
    document.head.appendChild(style)
  
    // Animate numbers when in viewport
    const animateValue = (element, start, end, duration) => {
      let startTimestamp = null
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        const value = Math.floor(progress * (end - start) + start)
        element.textContent = value
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  
    // Add animated counters (example for future use)
    const counters = document.querySelectorAll(".counter")
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target
            const endValue = Number.parseInt(target.getAttribute("data-count"))
            animateValue(target, 0, endValue, 1500)
            counterObserver.unobserve(target)
          }
        })
      },
      { threshold: 0.5 },
    )
  
    counters.forEach((counter) => {
      counterObserver.observe(counter)
    })
  
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })
  
    // Add paint drip animation to feature boxes
    const paintDripStyle = document.createElement("style")
    paintDripStyle.textContent = `
        @keyframes paintDrip {
            0% { height: 0; opacity: 0; }
            50% { height: 30px; opacity: 0.8; }
            100% { height: 0; opacity: 0; }
        }
        
        .paint-drip {
            position: absolute;
            width: 8px;
            background: var(--primary-color);
            top: 0;
            border-radius: 0 0 4px 4px;
            animation: paintDrip 2s ease-in-out;
        }
    `
    document.head.appendChild(paintDripStyle)
  
    // Randomly create paint drips on feature boxes
    featureBoxes.forEach((box) => {
      setInterval(() => {
        if (Math.random() > 0.7) {
          const drip = document.createElement("div")
          drip.classList.add("paint-drip")
          drip.style.left = `${Math.random() * 100}%`
          box.appendChild(drip)
  
          setTimeout(() => {
            drip.remove()
          }, 2000)
        }
      }, 3000)
    })
  })
  