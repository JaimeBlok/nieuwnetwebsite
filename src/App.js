import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showContactButton, setShowContactButton] = useState(true);
  const fullText = '<Welkom!\nWij maken merken\nonline onmisbaar>';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80); // Prettige typewriter snelheid

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
        padding: '40px 0', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        paddingLeft: 'clamp(20px, 6vw, 60px)',
        paddingRight: 'clamp(20px, 6vw, 60px)',
        position: 'relative'
      }}>
        <div style={{ width: '40px' }}></div>
        
        <img 
          src="/logozwart.png" 
          alt="Logo" 
          className="logo"
          style={{ 
            height: '16px', 
            width: 'auto',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
        
        <button style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '4px',
          transition: 'all 0.2s ease'
        }}>
          <div style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#000',
            borderRadius: '1px'
          }}></div>
          <div style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#000',
            borderRadius: '1px'
          }}></div>
          <div style={{
            width: '24px',
            height: '2px',
            backgroundColor: '#000',
            borderRadius: '1px'
          }}></div>
        </button>
      </header>
      
      <div className="title-container" style={{ 
        width: '100%', 
        maxWidth: '1200px',
        textAlign: 'left',
        marginTop: '80px',
        position: 'relative',
        zIndex: 10
      }}>
        <h1 className="main-title" style={{
          fontSize: 'clamp(3rem, 8vw, 4.5rem)',
          fontWeight: '700',
          color: '#2a2a2a',
          lineHeight: '1.2',
          margin: 0,
          maxWidth: '800px',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          letterSpacing: '-0.02em',
          whiteSpace: 'pre-wrap',
          minHeight: 'calc(3 * 1.2 * clamp(3rem, 8vw, 4.5rem))'
        }}>
          {(() => {
            if (displayText.includes('onmisbaar')) {
              const beforeOnmisbaar = displayText.split('onmisbaar')[0];
              const afterOnmisbaar = displayText.split('onmisbaar')[1] || '';
              return (
                <>
                  {beforeOnmisbaar}
                  <span style={{ color: '#0066cc' }}>onmisbaar</span>
                  {afterOnmisbaar}
                  {showCursor && <span style={{ color: '#0066cc' }}>_</span>}
                </>
              );
            }
            return (
              <>
                {displayText}
                {showCursor && <span style={{ color: '#0066cc' }}>_</span>}
              </>
            );
          })()}
        </h1>
      </div>
      
      <div className="nature-grid" style={{
        display: 'flex',
        gap: '20px',
        padding: '0',
        marginTop: '60px',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
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
          width: 'clamp(700px, 60vw, 1000px)',
          height: 'clamp(400px, 50vw, 600px)',
          borderRadius: '40px',
          overflow: 'hidden',
          backgroundImage: 'url(/Nature1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0,
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          scrollSnapAlign: 'start'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '30px 30px 40px 30px',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 15px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              CarriereStudent
            </h3>
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="nature-card" style={{
          width: 'clamp(700px, 60vw, 1000px)',
          height: 'clamp(400px, 50vw, 600px)',
          borderRadius: '40px',
          overflow: 'hidden',
          backgroundImage: 'url(/Nature2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0,
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          scrollSnapAlign: 'start'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '30px 30px 40px 30px',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 15px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              ClinicalCareerEvents
            </h3>
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="nature-card" style={{
          width: 'clamp(700px, 60vw, 1000px)',
          height: 'clamp(400px, 50vw, 600px)',
          borderRadius: '40px',
          overflow: 'hidden',
          backgroundImage: 'url(/CSC.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0,
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          scrollSnapAlign: 'start'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '30px 30px 40px 30px',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 15px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Circular Shipping Company
            </h3>
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="nature-card" style={{
          width: 'clamp(700px, 60vw, 1000px)',
          height: 'clamp(400px, 50vw, 600px)',
          borderRadius: '40px',
          overflow: 'hidden',
          backgroundImage: 'url(/Nature4.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexShrink: 0,
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          scrollSnapAlign: 'start'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0,0,0,0.7), transparent)',
            padding: '30px 30px 40px 30px',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 15px 0',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Natuur 4
            </h3>
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Nieuwe sectie tussen blokken en footer */}
      <section style={{
        width: '100%',
        padding: '120px 0 80px 0',
        backgroundColor: '#ffffff',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(20px, 6vw, 60px)'
        }}>
          {/* Hoofdtitel */}
          <div style={{
            textAlign: 'right',
            marginBottom: '80px',
            padding: '0 20px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: '700',
              color: '#2a2a2a',
              margin: '0 0 0 0',
              fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
              letterSpacing: '-0.02em',
              lineHeight: '1.2'
            }}>
              Samenwerken.<br />
              <span style={{ color: '#666666' }}>van lokale ondernemers</span><br />
              <span style={{ color: '#666666' }}>tot grote bedrijven_</span>
            </h2>
          </div>
          
          {/* Team grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}>
            {/* Teamlid 1 */}
            <div style={{
              background: 'white',
              padding: '240px 40px',
              borderRadius: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              border: 'none',
              outline: 'none'
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#2a2a2a',
                margin: '0 0 16px 0',
                fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
                border: 'none',
                outline: 'none',
                position: 'absolute',
                top: '40px',
                left: '40px',
                right: '40px',
                textShadow: 'none'
              }}>
                Jaime Ram
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                margin: 0,
                fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
                border: 'none',
                outline: 'none',
                position: 'absolute',
                top: '70px',
                left: '40px',
                right: '40px',
                textShadow: 'none'
              }}>
                Student Technische Bestuurskunde TU Delft
              </p>
              
              {/* Foto placeholder rechthoek */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '280px',
                height: '320px',
                background: '#f5f5f5',
                borderRadius: '20px',
                border: '2px dashed #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '16px',
                fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif'
              }}>
                Foto
              </div>
            </div>
            
            {/* Teamlid 2 */}
            <div style={{
              background: 'white',
              padding: '240px 40px',
              borderRadius: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              border: 'none',
              outline: 'none'
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#2a2a2a',
                margin: '0 0 16px 0',
                fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
                border: 'none',
                outline: 'none',
                position: 'absolute',
                top: '40px',
                left: '40px',
                right: '40px',
                textShadow: 'none'
              }}>
                Pieter den Hartog
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                margin: 0,
                fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
                border: 'none',
                outline: 'none',
                position: 'absolute',
                top: '70px',
                left: '40px',
                right: '40px',
                textShadow: 'none'
              }}>
                Student Werktuigbouwkunde TU Delft
              </p>
              
              {/* Foto placeholder rechthoek */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '280px',
                height: '320px',
                background: '#f5f5f5',
                borderRadius: '20px',
                border: '2px dashed #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '16px',
                fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif'
              }}>
                Foto
              </div>
            </div>
            
            {/* Teamlid 3 */}
            <div style={{
              background: 'white',
              padding: '240px 40px',
              borderRadius: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              border: 'none',
              outline: 'none'
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#2a2a2a',
                margin: '0 0 16px 0',
                fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
                border: 'none',
                outline: 'none',
                position: 'absolute',
                top: '40px',
                left: '40px',
                right: '40px',
                textShadow: 'none'
              }}>
                Floris Keuper
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                margin: 0,
                fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif',
                border: 'none',
                outline: 'none',
                position: 'absolute',
                top: '70px',
                left: '40px',
                right: '40px',
                textShadow: 'none'
              }}>
                Student Werktuigbouwkunde TU Delft
              </p>
              
              {/* Foto placeholder rechthoek */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '280px',
                height: '320px',
                background: '#f5f5f5',
                borderRadius: '20px',
                border: '2px dashed #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '16px',
                fontFamily: 'SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif'
              }}>
                Foto
              </div>
            </div>
          </div>
          

        </div>
      </section>
      
      {/* Footer */}
      <footer style={{
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
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#2a2a2a',
                margin: '0 0 20px 0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                NieuwNet
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.4',
                color: '#666',
                margin: '0 0 30px 0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Wij bouwen hoogwaardige marketing websites die groei stimuleren. We houden van strak en duidelijk - geen onnodige complexiteit, wel oplossingen die écht werken.
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '20px'
              }}>
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
            
            {/* Snelle links */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#2a2a2a',
                margin: '0 0 20px 0',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Direct contact
              </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
                gap: '12px'
              }}>
                {/* Naam */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  // Genereer vCard data
                  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Jaime Ram
ORG:NieuwNet
TEL:+31646232696
EMAIL:contact@nieuw-net.nl
ADR:;;Markt 9;Delft;2611GP;Nederland
URL:https://nieuw-net.nl
NOTE:Wij maken merken online onmisbaar door innovatieve digitale oplossingen die uw bedrijf laten groeien.
END:VCARD`;
                  
                  // Maak een blob en download link
                  const blob = new Blob([vCardData], { type: 'text/vcard' });
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'Jaime_Ram_NieuwNet.vcf';
                  
                  // Trigger download
                  document.body.appendChild(link);
                  link.click();
                  
                  // Cleanup
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#0066cc';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#666';
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '16px',
                    color: '#666',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    transition: 'all 0.3s ease'
                  }}>
                    Jaime Ram
                  </span>
                </div>
                {/* Telefoon */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.3521 21.4019C21.1469 21.5902 20.9046 21.7335 20.6407 21.8227C20.3768 21.9119 20.0973 21.9454 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09461 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85685 2.63483 2.65215C2.8221 2.44745 3.04976 2.28341 3.30351 2.17179C3.55726 2.06018 3.8317 2.00333 4.10999 2.00001H7.10999C7.59522 1.99522 8.06579 2.16708 8.43373 2.48353C8.80167 2.79999 9.04201 3.23945 9.10999 3.72001C9.23662 4.68007 9.47144 5.62273 9.80999 6.53001C9.94454 6.88792 9.97351 7.27675 9.89382 7.65319C9.81413 8.02963 9.62884 8.37496 9.35999 8.65001L8.08999 9.92001C9.51367 12.4135 11.5865 14.4863 14.08 15.91L15.35 14.64C15.625 14.3712 15.9704 14.1859 16.3468 14.1062C16.7232 14.0265 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5765C21.8437 15.9498 22.0122 16.4268 22 16.92Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <a href="tel:+31646232696" style={{
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
                    +31 6 46 23 26 96
                  </a>
                </div>
                {/* Email */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <a href="mailto:contact@nieuw-net.nl" style={{
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
                    contact@nieuw-net.nl
                  </a>
                </div>
                {/* Adres */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <a href="https://maps.google.com/?q=Markt+9,+2611GP+Delft" target="_blank" rel="noopener noreferrer" style={{
                    fontSize: '16px',
                    color: '#666',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    lineHeight: '1.4',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#0066cc';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                  }}>
                    Markt 9, 2611GP Delft
                  </a>
            </div>
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
      
      {/* Vaste knop onderaan de website */}
      <div 
        className="fixed-contact-button"
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '600px',
          padding: '0 clamp(30px, 8vw, 80px)',
          zIndex: 1000,
          pointerEvents: 'auto'
        }}
      >
        <div 
          className="floating-button"
          style={{
            background: 'rgba(54, 54, 54, 0.8)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            borderRadius: '20px',
            padding: '20px 30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            opacity: 1,
            transform: 'scale(1) translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.02) translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
            // Maak tekst wit
            e.target.querySelector('.button-text').style.color = '#ffffff';
            // Maak streepjes wit
            e.target.querySelectorAll('.line1, .line2').forEach(line => {
              line.style.background = '#ffffff';
            });
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            // Zet tekst terug naar originele kleur
            e.target.querySelector('.button-text').style.color = '#A0A0A0';
            // Zet streepjes terug naar originele kleur
            e.target.querySelectorAll('.line1, .line2').forEach(line => {
              line.style.background = '#A0A0A0';
            });
          }}
          onClick={() => {
            // Scroll naar beneden
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
          }}
        >
          <span 
            className="button-text"
            style={{
              color: '#A0A0A0',
              fontSize: '16px',
              fontWeight: '500',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.3s ease'
            }}>
            Neem contact met ons op!
          </span>
          <div style={{
            background: '#282828',
            borderRadius: '8px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginLeft: '6px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div 
                className="line1"
                style={{
                  width: '16px',
                  height: '2px',
                  background: '#A0A0A0',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease'
                }}></div>
              <div 
                className="line2"
                style={{
                  width: '16px',
                  height: '2px',
                  background: '#A0A0A0',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease'
                }}></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

export default App;
