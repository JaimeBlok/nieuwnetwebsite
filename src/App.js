import React, { useState, useEffect } from 'react';
import './App.css';

// Import alle afbeeldingen
import logoImage from './images/NNLOGO.png';
import carriereStudentImage from './images/CarrièreStudent.png';
import cscImage from './images/CSC.png';
import nature4Image from './images/Nature4.jpg';
import jaimeImage from './images/Jaime.jpg';
import florisImage from './images/Floris.jpeg';
// Delft afbeelding staat in public map

function App() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showContactButton, setShowContactButton] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isContactButtonExpanded, setIsContactButtonExpanded] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const fullText = '<Welkom!\nJouw website,\nonze expertise>';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80); // Snellere typewriter snelheid

    // Cursor knipperen
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  // Effect voor het verbergen van de contact knop bij de footer
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      
      if (footer) {
        const footerTop = footer.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        // Verberg de knop alleen wanneer we bij de footer komen
        if (scrollPosition >= footerTop) {
          setShowContactButton(false);
        } else {
          setShowContactButton(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect om body class te beheren voor menu overlay
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  // Effect voor scroll tracking - robuuste detectie
  useEffect(() => {
    const updateSection = () => {
      const scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      // Smooth sectie overgang met aangepaste breakpoints
      if (scroll < 600) {
        setCurrentSection(null);
      } else if (scroll < 1200) {
        setCurrentSection('portfolio');
      } else if (scroll < 1800) {
        setCurrentSection('team');  
      } else if (scroll < 2400) {
        setCurrentSection('diensten');
      } else {
        setCurrentSection('contact');
      }
    };

    // Robuuste scroll detectie met meerdere methodes
    window.addEventListener('scroll', updateSection, { passive: true });
    document.addEventListener('scroll', updateSection, { passive: true });
    window.addEventListener('resize', updateSection);
    
    // Timer backup voor constante monitoring
    const interval = setInterval(updateSection, 200);
    
    updateSection(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', updateSection);
      document.removeEventListener('scroll', updateSection);
      window.removeEventListener('resize', updateSection);
      clearInterval(interval);
    };
  }, []);

  // Effect voor sliding indicator
  useEffect(() => {
    const updateIndicator = () => {
      const navContainer = document.querySelector('.desktop-menu');
      if (!navContainer) return;

      let targetElement = null;
      const sections = ['portfolio', 'team', 'diensten', 'contact'];
      
      if (currentSection && sections.includes(currentSection)) {
        // Zoek het actieve element
        const links = navContainer.querySelectorAll('a');
        
        links.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${currentSection}`) {
            targetElement = link;
          }
        });
      }

      if (targetElement) {
        const containerRect = navContainer.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        
        setIndicatorStyle({
          left: targetRect.left - containerRect.left,
          width: targetRect.width,
          opacity: 1
        });
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    // Delay om ervoor te zorgen dat DOM elementen geladen zijn
    const timeout = setTimeout(updateIndicator, 50);
    
    // Update bij window resize
    window.addEventListener('resize', updateIndicator);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [currentSection]);

  // Functie om sectienaam te vertalen
  const getSectionName = (sectionId) => {
    if (!sectionId) return 'Home';
    
    const sectionNames = {
      'home': 'Home',
      'portfolio': 'Portfolio',
      'team': 'Over ons',
      'diensten': 'Diensten',
      'contact': 'Contact'
    };
    return sectionNames[sectionId] || 'Home';
  };

  console.log('App component loaded');
  
  return (
    <div 
      className="App"
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 0,
        padding: '0 0 40px 0',
        overflow: 'visible',
        position: 'relative'
      }}
    >
      
      <header className="header" style={{ 
        padding: '0 clamp(40px, 8vw, 80px)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        height: 'clamp(70px, 10vw, 100px)',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        {/* Logo aan de linkerkant */}
        <a href="/" style={{ textDecoration: 'none' }}>
        <img 
          src={logoImage} 
          alt="NieuwNet Logo" 
          className="logo"
          style={{ 
              height: 'clamp(32px, 5vw, 42px)', 
            width: 'auto',
              flexShrink: '0',
              padding: '0',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
            }}
          />
        </a>
        
        
        


        {/* Desktop menu - rechts uitgelijnd */}
        <div className="desktop-menu" style={{
          display: 'flex',
          gap: 'clamp(1px, 0.2vw, 3px)',
          alignItems:'center',
          zIndex: 1001,
          marginLeft: 'auto',
          paddingRight: 'clamp(8px, 1.5vw, 20px)',
          position: 'relative'
        }}>
          {/* Sliding indicator blokje */}
          <div style={{
            position: 'absolute',
            top: 0,
            height: '100%',
            backgroundColor: 'rgba(0, 102, 204, 0.12)',
            borderRadius: '20px',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
            zIndex: -1
          }} />
          <a 
            href="#portfolio" 
            style={{
              textDecoration: 'none',
              color: currentSection === 'portfolio' ? '#0066cc' : '#333333',
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: '700',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              padding: 'clamp(6px, 1vw, 8px) clamp(6px, 1vw, 8px)',
              borderRadius: '20px',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden',
              transform: 'translateY(0) scale(1)',
              boxShadow: '0 0 0 rgba(0, 102, 204, 0)'
            }}
            onMouseEnter={(e) => {
              if (currentSection !== 'portfolio') {
                e.target.style.color = '#0066cc';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentSection !== 'portfolio') {
                e.target.style.color = '#333333';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            Portfolio
          </a>
          <a 
            href="#team" 
            style={{
              textDecoration: 'none',
              color: currentSection === 'team' ? '#0066cc' : '#333333',
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: '700',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              padding: 'clamp(6px, 1vw, 8px) clamp(6px, 1vw, 8px)',
              borderRadius: '20px',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden',
              transform: 'translateY(0) scale(1)',
              boxShadow: '0 0 0 rgba(0, 102, 204, 0)'
            }}
            onMouseEnter={(e) => {
              if (currentSection !== 'team') {
                e.target.style.color = '#0066cc';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentSection !== 'team') {
                e.target.style.color = '#333333';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            Over ons
          </a>
          <a 
            href="#diensten" 
            style={{
              textDecoration: 'none',
              color: currentSection === 'diensten' ? '#0066cc' : '#333333',
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: '700',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              padding: 'clamp(6px, 1vw, 8px) clamp(6px, 1vw, 8px)',
              borderRadius: '20px',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden',
              transform: 'translateY(0) scale(1)',
              boxShadow: '0 0 0 rgba(0, 102, 204, 0)'
            }}
            onMouseEnter={(e) => {
              if (currentSection !== 'diensten') {
                e.target.style.color = '#0066cc';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentSection !== 'diensten') {
                e.target.style.color = '#333333';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            Diensten
          </a>
          <a 
            href="#contact" 
            style={{
              textDecoration: 'none',
              color: currentSection === 'contact' ? '#0066cc' : '#333333',
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: '700',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              padding: 'clamp(6px, 1vw, 8px) clamp(6px, 1vw, 8px)',
              borderRadius: '20px',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden',
              transform: 'translateY(0) scale(1)',
              boxShadow: '0 0 0 rgba(0, 102, 204, 0)'
            }}
            onMouseEnter={(e) => {
              if (currentSection !== 'contact') {
                e.target.style.color = '#0066cc';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentSection !== 'contact') {
                e.target.style.color = '#333333';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            Contact
          </a>
        </div>
        
        {/* Hamburger menu - alleen zichtbaar op kleine schermen */}
        <button 
          className="hamburger-menu-button"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 'clamp(3px, 0.8vw, 4px)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 'clamp(6px, 1.5vw, 8px)',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            zIndex: 1001,
            marginLeft: 'auto',
            minWidth: 'clamp(40px, 8vw, 44px)',
            minHeight: 'clamp(40px, 8vw, 44px)',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div style={{
            width: 'clamp(20px, 4vw, 24px)',
            height: 'clamp(2px, 0.4vw, 2px)',
            backgroundColor: '#333333',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            transform: isMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
          }}></div>
          <div style={{
            width: 'clamp(20px, 4vw, 24px)',
            height: 'clamp(2px, 0.4vw, 2px)',
            backgroundColor: '#333333',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            opacity: isMenuOpen ? 0 : 1
          }}></div>
          <div style={{
            width: 'clamp(20px, 4vw, 24px)',
            height: 'clamp(2px, 0.4vw, 2px)',
            backgroundColor: '#333333',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            transform: isMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
          }}></div>
        </button>
      </header>

      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="hamburger-menu-overlay"
          style={{
            position: 'fixed',
            top: 'clamp(20px, 4vw, 30px)',
            right: 'clamp(20px, 4vw, 30px)',
            left: 'clamp(20px, 4vw, 30px)',
            width: 'auto',
            maxWidth: '320px',
            height: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            zIndex: 10001,
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out',
            marginLeft: 'auto'
          }}>
          {/* Sluitknop */}
          <div style={{
            padding: '20px 20px 0 0',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <button 
              onClick={() => setIsMenuOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '8px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                color: '#666'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                e.target.style.color = '#2a2a2a';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#666';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div style={{
            padding: '0 0 20px 0',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <a 
              href="#portfolio" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 24px',
                textDecoration: 'none',
                color: '#2a2a2a',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#2a2a2a';
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <div style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'inherit'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Portfolio
            </a>

            <a 
              href="#team" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 24px',
                textDecoration: 'none',
                color: '#2a2a2a',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#2a2a2a';
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <div style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'inherit'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Over ons
            </a>

            <a 
              href="#diensten" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 24px',
                textDecoration: 'none',
                color: '#2a2a2a',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#2a2a2a';
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <div style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'inherit'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Diensten
            </a>

            <a 
              href="#" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 24px',
                textDecoration: 'none',
                color: '#2a2a2a',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#2a2a2a';
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                setIsContactButtonExpanded(true);
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'inherit'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.3521 21.4019C21.1469 21.5902 20.9046 21.7335 20.6407 21.8227C20.3768 21.9119 20.0973 21.9454 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09461 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85685 2.63483 2.65215C2.8221 2.44745 3.04976 2.28341 3.30351 2.17179C3.55726 2.06018 3.8317 2.00333 4.10999 2.00001H7.10999C7.59522 1.99522 8.06579 2.16708 8.43373 2.48353C8.80167 2.79999 9.04201 3.23945 9.10999 3.72001C9.23662 4.68007 9.47144 5.62273 9.80999 6.53001C9.94454 6.88792 9.97351 7.27675 9.89382 7.65319C9.81413 8.02963 9.62884 8.37496 9.35999 8.65001L8.08999 9.92001C9.51367 12.4135 11.5865 14.4863 14.08 15.91L15.35 14.64C15.625 14.3712 15.9704 14.1859 16.3468 14.1062C16.7232 14.0265 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5765C21.8437 15.9498 22.0122 16.4268 22 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Contact
            </a>
          </div>
        </div>
      )}

      {/* Overlay om menu te sluiten bij klik buiten menu */}
      {isMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 9998
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Hero sectie met titel, ondertitel en knop als één geheel */}
      <div className="hero-section" style={{ 
        width: '100%', 
        maxWidth: 'none',
        textAlign: 'left',
        marginTop: 'clamp(140px, 18vw, 220px)',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0',
        position: 'relative',
        zIndex: '10'
      }}>
        {/* Doorzichtig blok dat alle elementen bij elkaar houdt */}
        <div style={{ 
          paddingLeft: 'clamp(40px, 8vw, 80px)',
          paddingRight: 'clamp(20px, 4vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: 'clamp(280px, 90vw, 800px)',
          margin: '0'
        }}>
          {/* Hoofdtitel */}
          <h1 className="main-title" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '700',
            color: '#333333',
            lineHeight: '1.2',
            margin: '0 0 0 0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.02em',
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
            overflowWrap: 'anywhere',
            hyphens: 'none',
            WebkitHyphens: 'none',
            msHyphens: 'none',
            height: 'auto',
            minHeight: 'auto'
          }}>
            {/* Container met vaste hoogte om ruimte te reserveren */}
            <div style={{
              minHeight: 'calc(1.2em * 3)', // 3 regels hoogte reserveren
              position: 'relative',
              width: 'clamp(400px, 95vw, 1200px)'
            }}>
              {/* Onzichtbare placeholder die de volledige ruimte inneemt */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                visibility: 'hidden',
                whiteSpace: 'pre-wrap',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '700',
                lineHeight: '1.2',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '-0.02em',
                width: 'clamp(400px, 95vw, 1200px)'
              }}>
                {fullText}
              </div>
              
              {/* Zichtbare animerende tekst */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                whiteSpace: 'pre-wrap',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '700',
                lineHeight: '1.2',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '-0.02em',
                width: 'clamp(400px, 95vw, 1200px)'
              }}>
                {(() => {
                  // Split de tekst op om "expertise" blauw te maken
                  const parts = displayText.split('expertise');
                  if (parts.length > 1) {
                    return (
                      <>
                        {parts[0]}
                        <span style={{ color: '#0066cc' }}>expertise</span>
                        {parts[1]}
                        <span style={{ color: '#0066cc', opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s ease' }}>_</span>
                      </>
                    );
                  }
                  return (
                    <>
                      {displayText}
                      <span style={{ color: '#0066cc', opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s ease' }}>_</span>
                    </>
                  );
                })()}
              </div>
            </div>
          </h1>
          
          {/* Ondertitel */}
          <h2 className="subtitle" style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            fontWeight: '400',
            color: '#666666',
            textAlign: 'left',
            margin: '32px 0 0 0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.6',
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}>
            Wij maken websites voor jouw bedrijf! Van webdesign tot webdevelopment, nieuwnet ontzorgt van begin tot eind met focus op resultaat.
          </h2>
          
          {/* Aan de slag knop */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '40px'
          }}>
            <button 
              onClick={() => {
                const dienstenSection = document.querySelector('#diensten');
                if (dienstenSection) {
                  dienstenSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(8px, 1.5vw, 12px)',
                backgroundColor: '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: 'clamp(20px, 4vw, 28px)',
                padding: 'clamp(12px, 2.5vw, 16px) clamp(18px, 3.5vw, 24px)',
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                fontWeight: '600',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0052a3';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 102, 204, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#0066cc';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 102, 204, 0.3)';
              }}>
              Aan de slag
              <svg width="clamp(16px, 3vw, 20px)" height="clamp(16px, 3vw, 20px)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Portfolio sectie met titel */}
      <div style={{
        width: '100%',
        maxWidth: 'none',
        marginTop: '120px',
        position: 'relative',
        zIndex: '10',
        padding: '20px 0'
      }}>
        {/* Portfolio anker - nog lager geplaatst */}
        <div id="portfolio" style={{ 
          position: 'absolute', 
          top: '0px',
          visibility: 'hidden'
        }}></div>
        
        {/* Portfolio titel */}
        <div style={{
          paddingLeft: 'clamp(20px, 4vw, 40px)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            fontWeight: '500',
            color: '#333333',
            margin: '0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            Portfolio <span style={{ color: '#0066cc', fontSize: '1.2em' }}>→</span>
          </h2>
        </div>
        
        <div className="nature-grid" style={{
          display: 'flex',
          gap: '24px',
          padding: '0',
          marginTop: '0',
          maxWidth: 'none',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          zIndex: 10,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
        <div style={{ 
          width: 'clamp(20px, 4vw, 40px)', 
          flexShrink: 0,
          minWidth: 'clamp(20px, 4vw, 40px)'
        }}></div>
        
        <div className="nature-card" style={{
          width: 'clamp(300px, 35vw, 400px)',
          height: 'clamp(300px, 35vw, 400px)',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundImage: `url(${carriereStudentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          flexShrink: 0
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '20px 20px 30px 20px',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 10px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              CarrièreStudent
            </h3>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="nature-card" style={{
          width: 'clamp(300px, 35vw, 400px)',
          height: 'clamp(300px, 35vw, 400px)',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundImage: `url(${cscImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          flexShrink: 0
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '20px 20px 30px 20px',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 10px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Circular Shipping Company
            </h3>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="nature-card" style={{
          width: 'clamp(300px, 35vw, 400px)',
          height: 'clamp(300px, 35vw, 400px)',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundImage: `url(${nature4Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          flexShrink: 0
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '20px 20px 30px 20px',
            opacity: '1',
            transition: 'opacity 0.3s ease'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 10px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Natuur 4
            </h3>
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
        </div>
      </div>
      </div>
      
        <div className="nature-card" style={{
          width: 'clamp(300px, 35vw, 400px)',
          height: 'clamp(300px, 35vw, 400px)',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          flexShrink: 0
        }}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '20px 20px 30px 20px',
            opacity: '1',
            transition: 'opacity 0.3s ease'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 10px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              E-commerce Platform
            </h3>
          <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          </div>
          
        <div className="nature-card" style={{
          width: 'clamp(300px, 35vw, 400px)',
          height: 'clamp(300px, 35vw, 400px)',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          flexShrink: 0
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '20px 20px 30px 20px',
            opacity: '1',
            transition: 'opacity 0.3s ease'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 10px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Mobile App
            </h3>
          <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="nature-card" style={{
          width: 'clamp(300px, 35vw, 400px)',
          height: 'clamp(300px, 35vw, 400px)',
              borderRadius: '24px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          flexShrink: 0
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '20px 20px 30px 20px',
            opacity: '1',
            transition: 'opacity 0.3s ease'
            }}>
              <h3 style={{
              color: 'white',
              fontSize: '20px',
                fontWeight: '600',
              margin: '0 0 10px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Corporate Website
              </h3>
            <div style={{
                position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
            </div>
            
        <div className="nature-card" style={{
          width: 'clamp(300px, 35vw, 400px)',
          height: 'clamp(300px, 35vw, 400px)',
              borderRadius: '24px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          flexShrink: 0
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '20px 20px 30px 20px',
            opacity: '1',
            transition: 'opacity 0.3s ease'
            }}>
              <h3 style={{
              color: 'white',
              fontSize: '20px',
                fontWeight: '600',
              margin: '0 0 10px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              SaaS Dashboard
              </h3>
            <div style={{
                position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* Over ons sectie */}
      <div style={{
        width: '100%',
        maxWidth: 'none',
        marginTop: '120px',
        position: 'relative',
        zIndex: 10,
        padding: '20px 0'
      }}>
        {/* Over ons anker */}
        <div id="team" style={{ 
          position: 'absolute', 
          top: '0px',
          visibility: 'hidden'
        }}></div>
        
        {/* Over ons titel */}
        <div style={{
          paddingLeft: 'clamp(20px, 4vw, 40px)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            fontWeight: '500',
            color: '#333333',
            margin: '0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            Over ons <span style={{ color: '#0066cc', fontSize: '1.2em' }}>→</span>
          </h2>
        </div>
        
        {/* Over ons content placeholder */}
        <div style={{
          padding: '60px 0',
          textAlign: 'center',
          color: '#666666',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            margin: '0',
            opacity: '0.7'
          }}>
            Over ons sectie - content komt hier
          </p>
        </div>
      </div>
      
      {/* Diensten sectie */}
      <div style={{
        width: '100%',
        maxWidth: 'none',
        marginTop: '120px',
        position: 'relative',
        zIndex: 10,
        padding: '20px 0'
      }}>
        {/* Diensten anker */}
        <div id="diensten" style={{ 
          position: 'absolute', 
          top: '0px',
          visibility: 'hidden'
        }}></div>
        
        {/* Diensten titel */}
        <div style={{
          paddingLeft: 'clamp(20px, 4vw, 40px)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            fontWeight: '500',
            color: '#333333',
            margin: '0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            Diensten <span style={{ color: '#0066cc', fontSize: '1.2em' }}>→</span>
          </h2>
        </div>
        
        {/* Diensten content placeholder */}
        <div style={{
          padding: '60px 0',
          textAlign: 'center',
          color: '#666666',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            margin: '0',
            opacity: '0.7'
          }}>
            Diensten sectie - content komt hier
          </p>
        </div>
      </div>
      
      {/* Contact sectie */}
      <div style={{
        width: '100%',
        maxWidth: 'none',
        marginTop: '120px',
        position: 'relative',
        zIndex: '10',
        backgroundColor: '#f0f8ff',
        padding: '20px 0 80px 0',
        overflow: 'hidden'
      }}>
        {/* Grote achtergrondafbeelding */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '-40%',
          transform: 'translateY(-50%)',
          width: 'clamp(1125px, 150vw, 2250px)',
          height: 'clamp(1125px, 150vw, 2250px)',
          backgroundImage: `url(${process.env.PUBLIC_URL}/ICOON.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: '0.08',
          zIndex: '1',
          pointerEvents: 'none'
        }}></div>
        {/* Contact anker */}
        <div id="contact" style={{ 
          position: 'absolute', 
          top: '0px',
          visibility: 'hidden'
        }}></div>
        
        {/* Contact titel */}
        <div style={{
          paddingLeft: 'clamp(20px, 4vw, 40px)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            fontWeight: '500',
            color: '#333333',
            margin: '0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            Contact <span style={{ color: '#0066cc', fontSize: '1.2em' }}>→</span>
          </h2>
        </div>
        
        {/* Contact introductie */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h3 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#333333',
            margin: '0 0 20px 0',
            fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}>
            Klaar om te starten?
          </h3>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: '#666666',
            margin: '0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.5',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Laat ons weten wat jij wil! Wij nemen zo snel mogelijk contact met je op.
          </p>
        </div>
        
        {/* Contact content container */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(20px, 6vw, 60px)',
          position: 'relative',
          zIndex: 2
        }}>
          
          {/* Contact formulier en direct contact */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
          className="contact-grid"
          >
                        {/* Direct contact sectie */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{
                fontSize: 'clamp(28px, 4vw, 36px)',
                fontWeight: '700',
                color: '#333333',
                margin: '0 0 24px 0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                lineHeight: '1.2'
              }}>
                Liever direct<br />contact?
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {/* Telefoon */}
                <a 
                  href="tel:+31646231696"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#0066cc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#0066cc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.3521 21.4019C21.1469 21.5902 20.9046 21.7335 20.6407 21.8227C20.3768 21.9119 20.0973 21.9454 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09461 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85685 2.63483 2.65215C2.8221 2.44745 3.04976 2.28341 3.30351 2.17179C3.55726 2.06018 3.8317 2.00333 4.10999 2.00001H7.10999C7.59522 1.99522 8.06579 2.16708 8.43373 2.48353C8.80167 2.79999 9.04201 3.23945 9.10999 3.72001C9.23662 4.68007 9.47144 5.62273 9.80999 6.53001C9.94454 6.88792 9.97351 7.27675 9.89382 7.65319C9.81413 8.02963 9.62884 8.37496 9.35999 8.65001L8.08999 9.92001C9.51367 12.4135 11.5865 14.4863 14.08 15.91L15.35 14.64C15.625 14.3712 15.9704 14.1859 16.3468 14.1062C16.7232 14.0265 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5765C21.8437 15.9498 22.0122 16.4268 22 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#666666',
                      marginBottom: '4px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      Telefoon
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#333333',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      +31 6 46 23 16 96
                    </div>
                  </div>
                </a>
                
                {/* Email */}
                <a 
                  href="mailto:info@nieuwnet.nl"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#0066cc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#0066cc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#666666',
                      marginBottom: '4px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      Email
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#333333',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      info@nieuwnet.nl
                    </div>
                  </div>
                </a>
                
                {/* Adres */}
                <a 
                  href="https://maps.google.com/?q=Markt+9,+2611GP+Delft,+Nederland"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#0066cc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#0066cc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#666666',
                      marginBottom: '4px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      Adres
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#333333',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      Markt 9, 2611GP Delft
                    </div>
                  </div>
                </a>
                

              </div>
            </div>
            
            {/* Contact formulier */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)'
            }}>
              <form style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                {/* Naam en Email rij */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#333333',
                      marginBottom: '8px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      Naam *
                    </label>
                    <input 
                      type="text" 
                      required
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0066cc';
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e1e5e9';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#333333',
                      marginBottom: '8px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0066cc';
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e1e5e9';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                
                {/* Bedrijf */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333333',
                    marginBottom: '8px',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    Bedrijf
                  </label>
                  <input 
                    type="text" 
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0066cc';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e1e5e9';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                {/* Bericht */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333333',
                    marginBottom: '8px',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    Bericht *
                  </label>
                  <textarea 
                    required
                    rows="5"
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid #e1e5e9',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '120px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0066cc';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e1e5e9';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                {/* Verstuur knop */}
                <button 
                  type="submit"
                  style={{
                    backgroundColor: '#0066cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '18px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#0052a3';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 102, 204, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#0066cc';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0, 102, 204, 0.3)';
                  }}
                >
                  Verstuur bericht
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <path 
                      d="M7 17L17 7M17 7H7M17 7V17" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer id="contact" style={{
        width: '100%',
        padding: '60px 0 40px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(15px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        marginTop: '80px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(20px, 6vw, 60px)'
        }}>
          {/* Hoofdinhoud footer */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Bedrijfsinformatie */}
            <div>
              <div style={{
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'flex-start',
                paddingLeft: '0'
              }}>
                <a href="/" style={{ textDecoration: 'none' }}>
                  <img 
                    src={logoImage} 
                    alt="NieuwNet Logo" 
                    style={{ 
                      height: '50px', 
                      width: 'auto',
                      marginLeft: '0',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s ease',
                      marginTop: '0'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = '1';
                    }}
                  />
                </a>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '20px',
                marginTop: '0'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#888',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  Handelsnaam: NieuwNet BV
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#888',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  KVK: 12345678
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#888',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  BTW: NL123456789B01
              </span>
              </div>
            </div>
            
            {/* Adres sectie */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#333333',
                margin: '0 0 20px 0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Adres
              </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
                gap: '12px'
              }}>
                {/* Adres */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <span style={{
                    fontSize: '16px',
                    color: '#666',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    lineHeight: '1.4'
                  }}>
                    Markt 9
                  </span>
                  <span style={{
                    fontSize: '16px',
                    color: '#666',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    lineHeight: '1.4'
                  }}>
                    2611GP Delft
                  </span>
                  <span style={{
                    fontSize: '16px',
                    color: '#666',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    lineHeight: '1.4'
                  }}>
                    Nederland
                  </span>
                </div>
              </div>
            </div>
            
            {/* Menu sectie */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#333333',
                margin: '0 0 20px 0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Menu
              </h3>
                <div style={{
                  display: 'flex',
                flexDirection: 'column',
                  gap: '12px'
                }}>
                <a href="#portfolio" style={{
                    fontSize: '16px',
                    color: '#666',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#0066cc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                  }}>
                  Portfolio
                </a>
                <a href="#diensten" style={{
                fontSize: '16px',
                    color: '#666',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                    e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                  }}>
                  Diensten
                </a>
                <a href="#team" style={{
                  fontSize: '16px',
                  color: '#666',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#0066cc';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#666';
                }}>
                  Over ons
                </a>
                <a href="#contact" style={{
                    fontSize: '16px',
                    color: '#666',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#0066cc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                  }}>
                  Contact
                  </a>
          </div>
        </div>
      </div>
      
          {/* Onderste regel */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '30px',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <span style={{
              color: '#999',
              fontSize: '14px',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              © 2024 NieuwNet. Alle rechten voorbehouden.
            </span>
        <div style={{
          display: 'flex',
              gap: '30px',
              flexWrap: 'wrap'
        }}>
          <a href="#" style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666';
          }}>
            Privacy
          </a>
          <a href="#" style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666';
          }}>
            Voorwaarden
          </a>
          <a href="#" style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666';
              }}>
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
  </div>
  );
}

export default App;
