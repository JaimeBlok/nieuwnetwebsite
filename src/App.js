import React, { useState, useEffect } from 'react';
import './App.css';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Import alle afbeeldingen
import logoImage from './images/NNLOGO.png';
import carriereStudentImage from './images/CarrièreStudent.png';
import nature4Image from './images/Nature4.jpg';

import jaimeImage from './images/Jaime.jpg';
import florisImage from './images/Floris.jpeg';
// Delft afbeelding staat in public map

function App() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const [currentSection, setCurrentSection] = useState('over-ons');
  const [selectedQuality, setSelectedQuality] = useState(null);

  // Kwaliteiten data
  const qualities = [
    {
      id: 1,
      title: "Gratis hosting en domein",
      description: "Voor het eerste jaar krijg je volledig gratis hosting en een .nl domein. Dit bespaart je honderden euro's aan jaarlijkse kosten en geeft je direct een professionele online aanwezigheid."
    },
    {
      id: 2,
      title: "Kosteloze aanpassingen",
      description: "Tekst en afbeeldingen kunnen kosteloos worden aangepast. Wij begrijpen dat je website moet meegroeien met je bedrijf, daarom helpen we je graag bij het up-to-date houden van je content."
    },
    {
      id: 3,
      title: "SSL en beveiliging",
      description: "Gratis SSL certificaat en uitgebreide beveiligingsmaatregelen zorgen ervoor dat je website en bezoekers volledig beschermd zijn. Dit is essentieel voor vertrouwen en SEO."
    },
    {
      id: 4,
      title: "Onderhoud en updates",
      description: "De eerste 6 maanden krijg je gratis onderhoud en updates. We zorgen ervoor dat je website altijd up-to-date blijft en optimaal presteert."
    },
    {
      id: 5,
      title: "Google Analytics",
      description: "Gratis SEO optimalisatie en Google Analytics setup. We helpen je gevonden worden in Google en geven je inzicht in je website prestaties."
    }
  ];

  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(false);
  const [includeBTW, setIncludeBTW] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldSpanTwoColumns, setShouldSpanTwoColumns] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);



  const fullText = '<Welkom!\nJouw website,\nonze expertise>';
  
  // Inlaad animatie effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Korte delay voor smooth animatie
    
    return () => clearTimeout(timer);
  }, []);
  
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
        // Contact button visibility logic removed
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

  // Effect voor scroll tracking - geoptimaliseerde detectie
  useEffect(() => {
    let ticking = false;
    
    const updateSection = () => {
      const scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      // Smooth sectie overgang met aangepaste breakpoints
      if (scroll < 600) {
        setCurrentSection(null);
      } else if (scroll < 1200) {
        setCurrentSection('over-ons');
  
      } else if (scroll < 1600) {
        setCurrentSection('portfolio');
      } else if (scroll < 2400) {
        setCurrentSection('diensten');
      } else {
        setCurrentSection('contact');
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateSection);
        ticking = true;
      }
    };

    // Gebruik alleen window scroll event met throttling
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSection);
    
    updateSection(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSection);
    };
  }, []);





  // Effect voor window resize tracking
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect voor grid layout bepaling
  useEffect(() => {
    // Bij medium vensters (tussen 768px en 1024px) moet het op aanvraag pakket 2 kolommen beslaan
    // Dit gebeurt alleen wanneer er 2 kolommen zijn (niet 1 of 3)
    const isMediumScreen = windowWidth >= 768 && windowWidth < 1024;
    setShouldSpanTwoColumns(isMediumScreen);
  }, [windowWidth]);

  // Functie om pakket te selecteren en direct naar contact te gaan
  const selectPackage = (packageInfo) => {
    setSelectedPackage(packageInfo);
    
    // Zet het onderwerp in het subject veld
    const packageSubject = `Aanvraag ${packageInfo.name}`;

    setContactFormData(prev => ({
      ...prev,
      subject: packageSubject
    }));
    
    // Scroll naar contact sectie
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Functie om contactformulier te verwerken
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validatie
    const errors = {};
    if (!contactFormData.name.trim()) errors.name = 'Naam is verplicht';
    if (!contactFormData.email.trim()) errors.email = 'Email is verplicht';
    if (!contactFormData.subject.trim()) errors.subject = 'Onderwerp is verplicht';
    if (!contactFormData.message.trim()) errors.message = 'Bericht is verplicht';
    
    // Form errors handling removed
    
    if (Object.keys(errors).length === 0) {
      try {
        console.log('Versturen naar Vercel API...');
        
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            name: contactFormData.name,
            email: contactFormData.email,
            phone: contactFormData.phone || '',
            company: contactFormData.company || '',
            subject: contactFormData.subject,
            message: contactFormData.message
          })
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Niet-JSON response:', text);
          throw new Error('Server stuurt geen JSON terug. Mogelijk PHP error.');
        }

        const result = await response.json();
        console.log('Server response:', result);
        
        if (result.status === 'success') {
          setIsFormSubmitted(true);
          
          // Reset form
          setContactFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            subject: '',
            message: ''
          });
          setSelectedPackage(null);
        } else {
          alert('Server fout: ' + (result.message || result.errors?.join(', ') || 'Onbekende fout'));
        }
      } catch (error) {
        console.error('Verzending mislukt:', error);
        alert(`Kan email niet verzenden: ${error.message}\n\nProbeer het later opnieuw of neem direct contact op.`);
      }
    }
  };

  console.log('App component loaded');
  
    return (
    <>
      <header className="header">
        {/* Logo aan de linkerkant - uitgelijnd met content */}
        <a href="/" style={{
          textDecoration: 'none',
          marginLeft: 'clamp(20px, 4vw, 40px)'
        }}>
        <img 
          src={logoImage} 
          alt="NieuwNet Logo" 
          className="logo"
          style={{ 
              height: 'clamp(24px, 3.5vw, 32px)', 
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
          gap: 'clamp(4px, 1vw, 12px)',
          alignItems:'center',
          zIndex: 1001,
          marginLeft: 'auto',
          marginRight: 'clamp(20px, 4vw, 40px)',
          paddingRight: 'clamp(8px, 1.5vw, 20px)',
          position: 'relative',
          overflow: 'visible'
        }}>

          <a 
            href="#portfolio" 
            style={{
              textDecoration: 'none',
              color: currentSection === 'portfolio' ? '#0066cc' : '#333333',
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: '400',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              padding: 'clamp(4px, 0.8vw, 6px) clamp(8px, 1.2vw, 10px)',
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
              }
            }}
            onMouseLeave={(e) => {
              if (currentSection !== 'portfolio') {
                e.target.style.color = '#333333';
              }
            }}
          >
            Portfolio
          </a>

                      <a 
              href="#over-ons-anchor" 
              style={{
              textDecoration: 'none',
              color: currentSection === 'over-ons' ? '#0066cc' : '#333333',
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: '400',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              padding: 'clamp(4px, 0.8vw, 6px) clamp(8px, 1.2vw, 10px)',
              borderRadius: '20px',
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              position: 'relative',
              overflow: 'hidden',
              transform: 'translateY(0) scale(1)',
              boxShadow: '0 0 0 rgba(0, 102, 204, 0)'
            }}
            onMouseEnter={(e) => {
              if (currentSection !== 'over-ons') {
                e.target.style.color = '#0066cc';
              }
            }}
            onMouseLeave={(e) => {
              if (currentSection !== 'over-ons') {
                e.target.style.color = '#333333';
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
              fontWeight: '400',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              padding: 'clamp(4px, 0.8vw, 6px) clamp(8px, 1.2vw, 10px)',
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
              }
            }}
            onMouseLeave={(e) => {
              if (currentSection !== 'diensten') {
                e.target.style.color = '#333333';
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
              fontWeight: '400',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              padding: 'clamp(4px, 0.8vw, 6px) clamp(8px, 1.2vw, 10px)',
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
              }
            }}
            onMouseLeave={(e) => {
              if (currentSection !== 'contact') {
                e.target.style.color = '#333333';
              }
            }}
          >
            Contact
          </a>
        </div>
        
        {/* Hamburger menu - alleen zichtbaar op kleine schermen */}
        <button 
          className={`hamburger-menu-button ${isMenuOpen ? 'open' : ''}`}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 'clamp(3px, 0.8vw, 4px)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 'clamp(6px, 1.5vw, 8px)',
            borderRadius: '3px',
            transition: 'all 0.2s ease',
            zIndex: 1001,
            marginLeft: 'auto',
            marginRight: 'clamp(20px, 4vw, 40px)',
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
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: 'none',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
          }}></div>
          <div style={{
            width: 'clamp(20px, 4vw, 24px)',
            height: 'clamp(2px, 0.4vw, 2px)',
            backgroundColor: '#333333',
            borderRadius: '1px',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: 'translateY(0) scale(1)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            opacity: 1
          }}></div>
          <div style={{
            width: 'clamp(20px, 4vw, 24px)',
            height: 'clamp(2px, 0.4vw, 2px)',
            backgroundColor: '#333333',
            borderRadius: '1px',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: 'none',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
          }}></div>
        </button>

        {/* Hamburger Menu Overlay */}
        {isMenuOpen && (
        <div 
          className="hamburger-menu-overlay"
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            left: '0',
            width: '100%',
            maxWidth: 'none',
            height: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: 'none',
            borderRadius: '0 0 20px 20px',
            boxShadow: 'none',
            zIndex: 10001,
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out',
            margin: '0'
          }}>


          {/* Menu Items */}
          <div style={{
            padding: '20px 0',
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
                fontWeight: '400',
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
              href="#over-ons-anchor" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 24px',
                textDecoration: 'none',
                color: '#2a2a2a',
                fontSize: '16px',
                fontWeight: '400',
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
                fontWeight: '400',
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

            <button 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 24px',
                textDecoration: 'none',
                color: '#2a2a2a',
                fontSize: '16px',
                fontWeight: '400',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: 'translateY(0) scale(1)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
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
                // Scroll naar contact sectie
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
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
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.3521 21.4019C21.1469 21.5902 20.9046 21.7335 20.6407 21.8227C20.3768 21.9119 20.0973 21.9454 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09461 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85685 2.63483 2.65215C2.8221 2.44745 3.04976 2.28341 3.30351 2.17179C3.55726 2.06018 3.8317 2.00333 4.10999 2.00001H7.10999C7.59522 1.99522 8.06579 2.16708 8.43373 2.48353C8.80167 2.79999 9.04201 3.23945 9.10999 3.72001C9.23662 4.68007 9.47144 5.62273 9.80999 6.53001C9.94454 6.88792 9.97351 7.27675 9.89382 7.65319C9.81413 8.02963 9.62884 8.37496 9.35999 8.65001L8.08999 9.92001C9.51367 12.4135 11.5865 14.4863 14.08 15.91L15.35 14.64C15.625 14.3712 15.9704 14.1859 16.3468 14.1062C16.7232 14.0265 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5765C21.8437 15.9498 22.0122 16.4268 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Contact
            </button>
          </div>
        </div>
        )}

      </header>

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
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}
      >

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
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: '700',
            color: '#333333',
            lineHeight: '1.1',
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
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: '700',
                lineHeight: '1.1',
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
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: '700',
                lineHeight: '1.1',
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
          
          {/* Aan de slag knop en vertrouwensindicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: '40px',
            gap: '40px',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => {
                console.log('Aan de slag knop geklikt!');
                const dienstenSection = document.querySelector('#diensten');
                console.log('Diensten sectie:', dienstenSection);
                
                if (dienstenSection) {
                  // Eenvoudige scroll met langzamere animatie
                  dienstenSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                  console.log('Scroll gestart naar diensten sectie');
                } else {
                  console.log('Diensten sectie niet gevonden!');
                  // Fallback: scroll naar beneden
                  window.scrollBy({
                    top: 1000,
                    behavior: 'smooth'
                  });
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(8px, 1.5vw, 12px)',
                backgroundColor: '#0066cc',
                color: 'white',
                border: 'none',
                borderRadius: 'clamp(16px, 3vw, 24px)',
                padding: 'clamp(12px, 2.5vw, 16px) clamp(18px, 3.5vw, 24px)',
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                fontWeight: '600',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: 'translateY(0) scale(1)',
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
            
            {/* Vertrouwensindicator met profielfoto's */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                const portfolioSection = document.querySelector('#portfolio');
                if (portfolioSection) {
                  portfolioSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              {/* Profielfoto's */}
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <img 
                  src={jaimeImage}
                  alt="Klant 1"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 3
                  }}
                />
                <img 
                  src={florisImage}
                  alt="Klant 2"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    marginLeft: '-8px',
                    zIndex: 2
                  }}
                />
                <img 
                  src={carriereStudentImage}
                  alt="Klant 3"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    marginLeft: '-8px',
                    zIndex: 1
                  }}
                />
              </div>
              
              {/* Vertrouwenstekst */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333333',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  Vertrouwd door 20+ bedrijven
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#666666',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  in Nederland
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Portfolio sectie met titel */}
      <div style={{
        width: '100%',
        maxWidth: 'none',
        marginTop: '40px',
        position: 'relative',
        zIndex: '10',
        padding: '50px 0',
        backgroundColor: '#ffffff'
      }}>
        {/* Portfolio anker */}
        <div id="portfolio" style={{ 
          position: 'absolute', 
          top: '-20px',
          visibility: 'hidden'
        }}></div>
        
        {/* Portfolio pill indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#0066cc',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: 'rgba(0, 102, 204, 0.1)',
            padding: '8px 16px',
            borderRadius: '20px',
            display: 'inline-block'
          }}>
            PORTFOLIO
          </span>
        </div>
        
        {/* Grote titel boven portfolio blokken */}
        <div style={{
          width: '100%',
          textAlign: 'center',
          margin: '40px 0 50px 0'
        }}>
          <h1 style={{
            fontSize: windowWidth <= 768 ? '48px' : '64px',
            fontWeight: '700',
            color: '#333333',
            margin: '0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.1',
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
            Onze kracht zit in<br />
            <span style={{ color: '#0066cc' }}>Samenwerken.</span>
          </h1>
        </div>
        
        {/* Drie licht grijze blokken */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '40px auto 0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
          display: 'grid',
          gridTemplateColumns: windowWidth <= 1024 ? '1fr' : 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {/* Blok 1 */}
          <a 
            href="https://www.nieuw-net.nl" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '20px',
              border: '0.2px solid #e0e0e0',
              padding: '40px 24px',
              textAlign: 'center',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f2f5';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '20px',
              width: '100%',
              paddingLeft: '8px',
              justifyContent: 'flex-start'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src="/ICOON.png" 
                  alt="Bedrijf logo 1" 
                  style={{
                    width: '52px',
                    height: '52px',
                    filter: 'brightness(0) invert(1)',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 4px 0',
                  fontFamily: '"Inter", sans-serif'
                }}>
                  Circular Shipping Company
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  margin: '0',
                  fontFamily: '"Inter", sans-serif',
                  lineHeight: '1.4'
                }}>
                  Duurzame logistieke oplossingen voor<br />
                  een circulaire economie
                </p>
              </div>
            </div>
            <img 
              src="/WebsiteMock.png" 
              alt="Website Mockup 1" 
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
          </div>
          </a>

          {/* Blok 2 */}
          <a 
            href="https://www.nieuw-net.nl" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '20px',
              border: '0.2px solid #e0e0e0',
              padding: '40px 24px',
              textAlign: 'center',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f2f5';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '20px',
              width: '100%',
              paddingLeft: '8px',
              justifyContent: 'flex-start'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src="/ICOON.png" 
                  alt="Bedrijf logo 2" 
                  style={{
                    width: '52px',
                    height: '52px',
                    filter: 'brightness(0) invert(1)',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 4px 0',
                  fontFamily: '"Inter", sans-serif'
                }}>
                  Carriere Student
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  margin: '0',
                  fontFamily: '"Inter", sans-serif',
                  lineHeight: '1.4'
                }}>
                  Platform voor studenten om hun<br />
                  carrière te starten en te ontwikkelen
                </p>
              </div>
            </div>
            <img 
              src="/WebsiteMock.png" 
              alt="Website Mockup 2" 
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
          </div>
          </a>

          {/* Blok 3 */}
          <a 
            href="https://www.nieuw-net.nl" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '20px',
              border: '0.2px solid #e0e0e0',
              padding: '40px 24px',
              textAlign: 'center',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f2f5';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '20px',
              width: '100%',
              paddingLeft: '8px',
              justifyContent: 'flex-start'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src="/ICOON.png" 
                  alt="Bedrijf logo 3" 
                  style={{
                    width: '52px',
                    height: '52px',
                    filter: 'brightness(0) invert(1)',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 4px 0',
                  fontFamily: '"Inter", sans-serif'
                }}>
                  Koster Sportschool
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  margin: '0',
                  fontFamily: '"Inter", sans-serif',
                  lineHeight: '1.4'
                }}>
                  Moderne sportschool met persoonlijke<br />
                  begeleiding en flexibele tijden
                </p>
              </div>
            </div>
            <img 
              src="/WebsiteMock.png" 
              alt="Website Mockup 3" 
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
          </div>
          </a>
        </div>
      </div>
      
      {/* Over ons sectie - alleen header */}
      <div id="over-ons" style={{
        width: '100%',
        maxWidth: 'none',
        marginTop: '40px',
        position: 'relative',
        zIndex: '10',
        padding: '50px 0',
        minHeight: '200px'
      }}>
        {/* Over ons anker */}
        <div id="over-ons-anchor" style={{ 
          position: 'absolute', 
          top: '-20px',
          visibility: 'hidden'
        }}></div>
        {/* Over ons pill indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#0066cc',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: 'rgba(0, 102, 204, 0.1)',
            padding: '8px 16px',
            borderRadius: '20px',
            display: 'inline-block'
          }}>
            OVER ONS
          </span>
        </div>
        
        {/* Grote titel boven over ons content */}
        <div style={{
          maxWidth: '1200px',
          margin: '40px auto 0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
          textAlign: 'left',
          position: 'relative'
        }}>
          <h1 style={{
            fontSize: windowWidth <= 768 ? '48px' : '64px',
            fontWeight: '700',
            color: '#333333',
            margin: '0 0 20px 0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.1',
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
            Het verhaal achter<br />
            <span style={{ color: '#0066cc' }}>NieuwNet</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            color: '#666666',
            margin: '0 0 10px 0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.6',
            maxWidth: '600px'
          }}>
            "NieuwNet is ontstaan op een zolderkamer in Delft, met het idee om lokale ondernemers te ondersteunen die online een extra zetje konden gebruiken. Delft vormt nog altijd het kloppende hart van NieuwNet. Samen met lokale ondernemers zijn we uitgegroeid tot wat we vandaag zijn."
          </p>
          
          {/* Jaime Ram profiel onder de subtekst */}
          <a 
            href="https://www.linkedin.com/in/jaime-ram-196373236/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              padding: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginTop: '10px',
              marginBottom: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'translateY(0px)';
            }}>
              <img 
                src="/Jaime.jpg" 
                alt="Jaime Ram" 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333333',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  lineHeight: '1.2'
                }}>
                  Jaime Ram
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666666',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  lineHeight: '1.2',
                  whiteSpace: 'nowrap'
                }}>
                  Oprichter en eigenaar van NieuwNet
                </div>
              </div>
            </div>
          </a>
        </div>
        </div>

        {/* OverDelft afbeelding */}
        <div style={{
          maxWidth: '1200px',
          margin: '-50px auto 0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <img 
              src="/Delft-min.jpg" 
              alt="Over Delft" 
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '24px',
                objectFit: 'cover',
                objectPosition: 'center 10%',
                maxHeight: '400px'
              }}
            />
            {/* Witte tekst overlay in de hoek */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              right: '35px',
              maxWidth: '200px'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#ffffff',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                lineHeight: '1.4',
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                whiteSpace: 'nowrap'
              }}>
                De Nieuw Kerk, Delft
              </p>
            </div>
          </div>
        </div>

        {/* Twee doorzichtige blokken onder de Delft foto */}
        <div style={{
          maxWidth: '1200px',
          margin: '40px auto 0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
          display: 'grid',
          gridTemplateColumns: windowWidth <= 768 ? '1fr' : selectedQuality ? '1fr 1fr' : '1fr 1fr',
          gridTemplateRows: windowWidth <= 768 ? 'auto auto' : 'auto',
          gap: '30px',
          alignItems: 'start',
          transition: 'all 0.3s ease'
        }}>
          {/* Rechter blok - Tekst of dynamische content */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: windowWidth <= 768 ? '24px' : '32px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            textAlign: 'right',
            order: windowWidth <= 768 ? 1 : 2,
            transition: 'all 0.3s ease'
          }}>
            <div style={{ 
              textAlign: 'right', 
              width: '100%',
              transition: 'all 0.4s ease-in-out'
            }}>
              <h2 
                key={selectedQuality ? selectedQuality.id : 'default'}
                style={{
                  fontSize: windowWidth <= 768 ? '48px' : '64px',
                  fontWeight: '700',
                  color: '#333333',
                  margin: selectedQuality ? '0 0 16px 0' : '0',
                  lineHeight: '1.1',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  transition: 'all 0.4s ease-in-out',
                  animation: 'fadeIn 0.4s ease-in-out'
                }}>
                {selectedQuality ? selectedQuality.title : (
                  <>Kwaliteit is de basis voor <span style={{ color: '#0066cc' }}>Vertrouwen</span>.</>
                )}
              </h2>
              {selectedQuality && (
                <p 
                  key={`desc-${selectedQuality.id}`}
                  style={{
                    fontSize: '16px',
                    color: '#666666',
                    margin: 0,
                    lineHeight: '1.6',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    transition: 'all 0.4s ease-in-out',
                    animation: 'fadeIn 0.4s ease-in-out'
                  }}>
                  {selectedQuality.description}
                </p>
              )}
            </div>
          </div>
          
          {/* Linker blok - 5 knoppen */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: windowWidth <= 768 ? '24px' : '32px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            order: windowWidth <= 768 ? 2 : 1
          }}>
            {/* 5 knoppen */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {qualities.map((quality) => (
                <div 
                  key={quality.id}
                  style={{
                    backgroundColor: selectedQuality?.id === quality.id ? 'rgba(0, 102, 204, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    border: selectedQuality?.id === quality.id ? '2px solid #0066cc' : '1px solid rgba(0, 0, 0, 0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedQuality?.id === quality.id ? 'translateX(20px)' : 'translateX(0px)'
                  }}
                  onClick={() => {
                    if (selectedQuality?.id === quality.id) {
                      setSelectedQuality(null);
                    } else {
                      setSelectedQuality(quality);
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (selectedQuality?.id !== quality.id) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedQuality?.id !== quality.id) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'translateY(0px)';
                    }
                  }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: selectedQuality?.id === quality.id ? '#0066cc' : '#1976d2',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: 0,
                      fontSize: '16px',
                      color: '#333333',
                      lineHeight: '1.1',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontWeight: selectedQuality?.id === quality.id ? '600' : '400'
                    }}>
                      {quality.title}
                    </p>
                  </div>
                  <button 
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: selectedQuality?.id === quality.id ? '#0066cc' : '#f5f5f5',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuality(null);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = selectedQuality?.id === quality.id ? '#0052a3' : '#e0e0e0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = selectedQuality?.id === quality.id ? '#0066cc' : '#f5f5f5';
                    }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={selectedQuality?.id === quality.id ? "white" : "#666"}>
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Diensten sectie */}
      <div style={{
        width: '100%',
        maxWidth: 'none',
        marginTop: '40px',
        position: 'relative',
        zIndex: 10,
        padding: '50px 0',
        backgroundColor: '#ffffff'
      }}>
        {/* Diensten anker */}
        <div id="diensten" style={{ 
          position: 'absolute', 
          top: '-20px',
          visibility: 'hidden'
        }}></div>
        
        {/* Diensten pill indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#0066cc',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: 'rgba(0, 102, 204, 0.1)',
            padding: '8px 16px',
            borderRadius: '20px',
            display: 'inline-block'
          }}>
            DIENSTEN
          </span>
        </div>
        
        {/* Diensten intro */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          padding: '0 clamp(20px, 4vw, 40px)'
        }}>
          <h3 style={{
            fontSize: 'clamp(3rem, 6vw, 4rem)',
            fontWeight: '700',
            color: '#333333',
            margin: '0 0 20px 0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Kies een plan<br />
            dat werkt voor <span style={{ color: '#0066cc' }}>Jou</span>.
          </h3>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            color: '#666666',
            margin: '0 auto',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.6',
            maxWidth: '600px'
          }}>
            Van startende ondernemer tot groot bedrijf!
          </p>
        </div>

        {/* Pricing toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '4px',
            width: 'fit-content',
            margin: '0 auto',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            {/* Sliding pill background */}
            <div style={{
              position: 'absolute',
              top: '4px',
              left: !includeBTW ? '4px' : 'calc(50% - 4px)',
              width: 'calc(50% - 4px)',
              height: 'calc(100% - 8px)',
              backgroundColor: '#0066cc',
              borderRadius: '20px',
              transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 1
            }}></div>
            
            <button 
              onClick={() => setIncludeBTW(false)}
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '12px 24px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                backgroundColor: 'transparent',
                color: !includeBTW ? 'white' : '#64748b',
                minWidth: '120px'
              }}>
              Excl. BTW
            </button>
            <button 
              onClick={() => setIncludeBTW(true)}
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '12px 24px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                backgroundColor: 'transparent',
                color: includeBTW ? 'white' : '#64748b',
                minWidth: '120px'
              }}>
              Incl. BTW
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 40px)'
        }}>
          {/* One Page pakket */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: 'translateY(0) scale(1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}>
            
            {/* "Zoals deze website" pil */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '20px',
              backgroundColor: '#0066cc',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              boxShadow: '0 2px 8px rgba(0, 102, 204, 0.3)',
              zIndex: 1
            }}>
              Zoals deze website!
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9,12 12,15 23,4"/>
              </svg>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#333333',
                margin: '0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                One Page Website
              </h3>
            </div>
            
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: '0 0 24px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              lineHeight: '1.6'
            }}>
              Perfect voor kleine bedrijven.
            </p>
            
            <div style={{
              marginBottom: '32px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  color: '#333333',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  €{includeBTW ? '725' : '599'}
                </span>
                <span style={{
                  fontSize: '16px',
                  color: '#64748b',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  / eenmalig
                </span>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: '0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {includeBTW ? 'Incl. BTW (€599 + 21% BTW)' : 'Excl. BTW'}
              </p>
            </div>

            <button style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '20px',
              border: '2px solid #e2e8f0',
              backgroundColor: 'white',
              color: '#0066cc',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: 'translateY(0) scale(1)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              marginBottom: '32px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.borderColor = '#0066cc';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#e2e8f0';
            }}
            onClick={() => selectPackage({
              name: 'One Page Website',
              price: includeBTW ? '€725' : '€599',
              description: 'Perfect voor kleine bedrijven die een professionele online aanwezigheid willen.',
              features: ['1 pagina', 'Responsive design', 'Contact formulier', '1 jaar hosting gratis', 'SSL certificaat']
            })}>
              Start vandaag
            </button>

            <div style={{
              marginBottom: '32px',
              flex: 1
            }}>
              {[
                '1 pagina',
                'Responsive design',
                'Contact formulier',
                '1 jaar hosting gratis',
                'SSL certificaat'
              ].map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#e8f5e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional pakket */}
          <div style={{
            backgroundColor: '#0066cc',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: '1px solid #0066cc',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: 'translateY(0) scale(1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9,12 12,15 23,4"/>
              </svg>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'white',
                margin: '0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Professional Website
              </h3>
            </div>
            
            <p style={{
              fontSize: '16px',
              color: 'white',
              margin: '0 0 24px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              lineHeight: '1.6'
            }}>
              Voor groeiende bedrijven.
            </p>
            
            <div style={{
              marginBottom: '32px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  color: 'white',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  €{includeBTW ? '2419' : '1999'}
                </span>
                <span style={{
                  fontSize: '16px',
                  color: 'rgba(173, 216, 230, 0.9)',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  / eenmalig
                </span>
              </div>
              <p style={{
                fontSize: '14px',
                color: 'rgba(173, 216, 230, 0.9)',
                margin: '0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {includeBTW ? 'Incl. BTW (€1999 + 21% BTW)' : 'Excl. BTW'}
              </p>
            </div>

            <button style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '20px',
              border: '2px solid rgba(173, 216, 230, 0.8)',
              backgroundColor: 'transparent',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: 'translateY(0) scale(1)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              marginBottom: '32px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(173, 216, 230, 0.2)';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'white';
            }}
            onClick={() => selectPackage({
              name: 'Professional Website',
              price: includeBTW ? '€2419' : '€1999',
              description: 'Voor groeiende bedrijven die een uitgebreide, professionele website nodig hebben.',
              features: ['Tot 15 pagina\'s', 'Custom design', 'CMS systeem', 'Blog functionaliteit', 'Google Analytics', 'SEO optimalisatie', '2 jaar hosting gratis', 'Onderhoud eerste jaar']
            })}>
              Start vandaag
            </button>

            <div style={{
              marginBottom: '32px',
              flex: 1
            }}>
              {[
                'Tot 15 pagina\'s',
                'Custom design',
                'CMS systeem',
                'Blog functionaliteit',
                'Google Analytics',
                'SEO optimalisatie',
                '2 jaar hosting gratis',
                'Onderhoud eerste jaar'
              ].map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(173, 216, 230, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="rgba(173, 216, 230, 0.9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '16px',
                    color: 'white',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>


          {/* Enterprise Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: 'translateY(0) scale(1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            ...(shouldSpanTwoColumns && { gridColumn: 'span 2' })
          }}>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9,12 12,15 23,4"/>
              </svg>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#333333',
                margin: '0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Applicatie
              </h3>
            </div>
            
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: '0 0 24px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              lineHeight: '1.6'
            }}>
              Voor web- en mobiele applicaties.
            </p>
            
            <div style={{
              marginBottom: '32px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#333333',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  Op Aanvraag
                </span>

              </div>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: '0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Persoonlijke consultatie en offerte.
              </p>
            </div>

            <button style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '20px',
              border: '2px solid #e2e8f0',
              backgroundColor: 'white',
              color: '#0066cc',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: 'translateY(0) scale(1)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              marginBottom: '32px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.borderColor = '#0066cc';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#e2e8f0';
            }}
            onClick={() => selectPackage({
              name: 'Applicatie Website',
              price: 'Op Aanvraag',
              description: 'Voor web- en mobiele applicaties.',
              features: ['Web & mobiele applicatie', 'Database ontwerp & beheer', 'API ontwikkeling', 'User authentication systeem', 'Cloud hosting & scaling', 'Real-time functionaliteiten', 'Analytics & reporting', 'Security & compliance', 'Onderhoud & support', 'Performance monitoring']
            })}>
              Start vandaag
            </button>

            <div style={{
              marginBottom: '32px',
              flex: 1
            }}>
              {[
                'Web & mobiele applicatie',
                'Database ontwerp & beheer',
                'API ontwikkeling',
                'User authentication systeem',
                'Cloud hosting & scaling',
                'Real-time functionaliteiten',
                'Analytics & reporting',
                'Security & compliance',
                'Onderhoud & support',
                'Performance monitoring'
              ].map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#e8f5e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '16px',
                    color: '#334155',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Nog Vragen? Button */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px clamp(20px, 4vw, 40px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button
            onClick={() => {
              // Zet de gesprek aanvraag state
              setSelectedConversation(true);
              setSelectedPackage(null); // Reset package selection
              
              // Zet het onderwerp voor een gesprek aanvraag
              setContactFormData(prev => ({
                ...prev,
                subject: 'Aanvraag gesprek'
              }));
              
              // Scroll naar contact sectie
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="conversation-button"
            style={{
              backgroundColor: 'white',
              color: '#0066cc',
              border: '2px solid #0066cc',
              borderRadius: '50px',
              padding: '20px 40px',
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: '0 4px 20px rgba(0, 102, 204, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 'clamp(400px, 50vw, 600px)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0066cc';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.border = '2px solid #0066cc';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#0066cc';
              e.currentTarget.style.border = '2px solid #0066cc';
            }}
          >
            {/* Blue fill element for hover effect */}
            <div className="button-fill" />
            
            <span style={{ fontSize: '18px', fontWeight: '500', position: 'relative', zIndex: '1' }}>Nog vragen?</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: '1' }}>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>Plan een gesprek</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.271 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.04207 3.23945 9.11999 3.72C9.23662 4.68007 9.47144 5.62273 9.81999 6.53C9.94454 6.88792 9.97366 7.27691 9.9039 7.65088C9.83415 8.02485 9.6682 8.36811 9.42499 8.64L8.08999 9.97C9.51355 12.4584 11.5416 14.4864 14.03 15.91L15.36 14.58C15.6319 14.3368 15.9751 14.1708 16.3491 14.1011C16.7231 14.0313 17.1121 14.0605 17.47 14.185C18.3773 14.5335 19.3199 14.7683 20.28 14.885C20.7658 14.9636 21.2094 15.2071 21.5265 15.5775C21.8437 15.9479 22.0122 16.4216 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

      </div>
      
      {/* Contact sectie */}
      <div style={{
        width: '100%',
        maxWidth: 'none',
        marginTop: '40px',
        position: 'relative',
        zIndex: '10',
        backgroundColor: 'white',
        padding: '50px 0',
        overflow: 'hidden'
      }}>

        {/* Contact pill indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#0066cc',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: 'rgba(0, 102, 204, 0.1)',
            padding: '8px 16px',
            borderRadius: '20px',
            display: 'inline-block'
          }}>
            CONTACT
          </span>
        </div>
        
        {/* Contact introductie */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          {/* Contact anker */}
          <div id="contact" style={{ 
            position: 'absolute', 
            top: '-20px',
            visibility: 'hidden'
          }}></div>
          <h3 style={{
            fontSize: 'clamp(3rem, 6vw, 4rem)',
            fontWeight: '700',
            color: '#333333',
            margin: '0 0 20px 0',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Klaar om te <span style={{ color: '#0066cc' }}>Starten</span>?
          </h3>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: '#666666',
            margin: '0 auto',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.5',
            maxWidth: '600px'
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
            gridTemplateColumns: windowWidth <= 1200 ? '1fr' : '2fr 1fr',
            gap: '40px',
            maxWidth: '1800px',
            margin: '0 auto'
          }}
          className="contact-grid"
          >
            {/* Contact formulier */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)'
            }}>
              
              {/* Subtiele pakket indicator binnen formulier */}
              {selectedPackage && (
                <div style={{
                  backgroundColor: '#f0f8ff',
                  borderLeft: '4px solid #0066cc',
                  borderRadius: '0 6px 6px 0',
                  padding: '12px 16px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flex: 1
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#22c55e',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}>
                        {selectedPackage.name}
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: '#666',
                        marginLeft: '8px',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}>
                        • {selectedPackage.price}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPackage(null);
                      setContactFormData(prev => ({ ...prev, subject: '', message: '' }));
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#666',
                      cursor: 'pointer',
                      fontSize: '14px',
                      padding: '4px',
                      borderRadius: '3px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Gesprek aanvraag indicator binnen formulier */}
              {selectedConversation && (
                <div style={{
                  backgroundColor: '#f0f8ff',
                  borderLeft: '4px solid #0066cc',
                  borderRadius: '0 6px 6px 0',
                  padding: '12px 16px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flex: 1
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#22c55e',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.9706 16.9706 21 12 21C10.4001 21 8.88837 20.6246 7.54704 19.9565C7.19117 19.7781 6.78393 19.72 6.39939 19.8229L4.17335 20.4182C3.20701 20.677 2.32299 19.793 2.5818 18.8267L3.17712 16.6006C3.28001 16.2161 3.22194 15.8088 3.04346 15.453C2.37538 14.1116 2 12.5999 2 12C2 7.02944 6.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}>
                        Vrijblijvend Gesprek
                      </span>
                      <span style={{
                        fontSize: '14px',
                        color: '#666',
                        marginLeft: '8px',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}>
                        • Gratis consultatie
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedConversation(false);
                      setContactFormData(prev => ({ ...prev, subject: '', message: '' }));
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#666',
                      cursor: 'pointer',
                      fontSize: '14px',
                      padding: '4px',
                      borderRadius: '3px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

              {isFormSubmitted ? (
                // Bedankbericht
                <div style={{
                  textAlign: 'center',
                  padding: '60px 40px',
                  backgroundColor: 'rgba(34, 197, 94, 0.05)',
                  borderRadius: '20px',
                  border: '2px solid rgba(34, 197, 94, 0.2)'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#22c55e',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px auto'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#22c55e',
                    margin: '0 0 16px 0',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    Bedankt voor je aanvraag!
                  </h3>
                  <p style={{
                    fontSize: '18px',
                    color: '#374151',
                    margin: '0',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    lineHeight: '1.6'
                  }}>
                    We nemen zo snel mogelijk contact met je op.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{
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
                      value={contactFormData.name}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Uw volledige naam"
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: '1px solid #e1e5e9',
                        borderRadius: '20px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                        fontSize: '16px',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        transition: 'none',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0066cc';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e1e5e9';
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
                      value={contactFormData.email}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="uw.email@voorbeeld.nl"
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: '1px solid #e1e5e9',
                        borderRadius: '20px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                        fontSize: '16px',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        transition: 'none',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0066cc';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e1e5e9';
                      }}
                    />
                  </div>
                </div>
                
                {/* Bedrijf en Telefoonnummer rij */}
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
                    Bedrijf
                  </label>
                  <input 
                    type="text" 
                      value={contactFormData.company}
                      onChange={(e) => setContactFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Uw bedrijfsnaam (optioneel)"
                      style={{
                      width: '100%',
                      padding: '16px',
                      border: '1px solid #e1e5e9',
                      borderRadius: '20px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                      fontSize: '16px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      transition: 'none',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0066cc';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e1e5e9';
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
                      Telefoonnummer
                    </label>
                    <input 
                      type="tel" 
                        value={contactFormData.phone}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Uw telefoonnummer (optioneel)"
                        style={{
                        width: '100%',
                        padding: '16px',
                        border: '1px solid #e1e5e9',
                        borderRadius: '20px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                        fontSize: '16px',
                        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        transition: 'none',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0066cc';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e1e5e9';
                      }}
                    />
                  </div>
                </div>
                
                {/* Onderwerp */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333333',
                    marginBottom: '8px',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    Onderwerp *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={contactFormData.subject}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder={(selectedPackage || selectedConversation) ? "Onderwerp is automatisch ingevuld" : "Wat is het onderwerp van uw bericht?"}
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '1px solid #e1e5e9',
                      borderRadius: '20px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                      fontSize: '16px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      transition: 'none',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0066cc';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e1e5e9';
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
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Beschrijf hier uw wensen, vragen en eventuele specifieke eisen..."
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '1px solid #e1e5e9',
                      borderRadius: '20px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                      fontSize: '16px',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      transition: 'none',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '120px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0066cc';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e1e5e9';
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
                    borderRadius: '20px',
                    padding: '18px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transform: 'translateY(0) scale(1)',
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
{(selectedPackage || selectedConversation) ? 'Verstuur aanvraag' : 'Verstuur'}
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
                
                {/* Terms disclaimer */}
                <p style={{
                  fontSize: '12px',
                  color: '#999999',
                  margin: '16px 0 0 0',
                  textAlign: 'center',
                  lineHeight: '1.4',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  Door dit formulier te verzenden, ga je akkoord met onze{' '}
                  <a href="#terms" style={{ color: '#999999', textDecoration: 'underline' }}>Algemene Voorwaarden</a>
                  ,{' '}
                  <a href="#privacy" style={{ color: '#999999', textDecoration: 'underline' }}>Privacybeleid</a>
                  {' '}en{' '}
                  <a href="#data-protection" style={{ color: '#999999', textDecoration: 'underline' }}>Gegevensbeschermingsbeleid</a>
                  .
                </p>
              </form>
              )}
            </div>
            
            {/* Direct contact sectie */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
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
                  className="direct-contact-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <div className="contact-icon" style={{
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
                  <div className="contact-text">
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
                    href="mailto:contact@nieuw-net.nl"
                    className="direct-contact-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <div className="contact-icon" style={{
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
                  <div className="contact-text">
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
                      contact@nieuw-net.nl
                    </div>
                  </div>
                </a>
                
                {/* Adres */}
                <a 
                  href="https://maps.google.com/?q=Markt+9,+2611GP+Delft,+Nederland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-contact-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <div className="contact-icon" style={{
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
                  <div className="contact-text">
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
        marginTop: '40px'
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
                      height: '36px', 
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
                <a href="#over-ons-anchor" style={{
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
          <button style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            transition: 'color 0.2s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666';
          }}>
            Privacy
          </button>
          <button style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            transition: 'color 0.2s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666';
          }}>
            Voorwaarden
          </button>
          <button style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            transition: 'color 0.2s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#0066cc';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666';
              }}>
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Vercel Speed Insights */}
      <SpeedInsights />

    </>
  );
}

export default App;
