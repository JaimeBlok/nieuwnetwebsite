import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('nl');
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'nl' ? 'en' : 'nl');
  };

  // Language content
  const content = {
    nl: {
      nav: {
        portfolio: 'Portfolio',
        overOns: 'Over ons',
        contact: 'Contact'
      },
      contact: {
        directContact: 'Direct Contact',
        contactForm: 'Neem contact op!',
        contactDescription: 'Laten we samenwerken aan uw project',
        form: {
          name: 'Naam',
          phone: 'Telefoonnummer',
          email: 'E-mail',
          message: 'Bericht',
          submit: 'Versturen'
        },
        methods: {
          phone: {
            title: 'Bellen',
            availability: 'Beschikbaar: 9:00 - 17:00'
          },
          email: {
            title: 'E-mail',
            availability: 'Antwoord binnen 24 uur'
          },
          address: {
            title: 'Adres',
            availability: 'Op afspraak'
          }
        },
        company: {
          title: 'Bedrijfsinformatie',
          kvk: 'KVK: 12345678',
          btw: 'BTW: NL123456789B01',
          iban: 'IBAN: NL91 ABNA 0417 1643 00'
        }
      },
      footer: {
        copyright: '© 2024 Nieuwnet. Alle rechten voorbehouden.',
        links: {
          terms: 'Algemene Voorwaarden',
          privacy: 'Privacy',
          cookies: 'Cookies'
        }
      }
    },
    en: {
      nav: {
        portfolio: 'Portfolio',
        overOns: 'About Us',
        contact: 'Contact'
      },
      contact: {
        directContact: 'Direct Contact',
        contactForm: 'Get in Touch!',
        contactDescription: 'Let\'s work together on your project',
        form: {
          name: 'Name',
          phone: 'Phone Number',
          email: 'Email',
          message: 'Message',
          submit: 'Send'
        },
        methods: {
          phone: {
            title: 'Call',
            availability: 'Available: 9:00 - 17:00'
          },
          email: {
            title: 'Email',
            availability: 'Response within 24 hours'
          },
          address: {
            title: 'Address',
            availability: 'By appointment'
          }
        },
        company: {
          title: 'Company Information',
          kvk: 'Chamber of Commerce: 12345678',
          btw: 'VAT: NL123456789B01',
          iban: 'IBAN: NL91 ABNA 0417 1643 00'
        }
      },
      footer: {
        copyright: '© 2024 Nieuwnet. All rights reserved.',
        links: {
          terms: 'Terms & Conditions',
          privacy: 'Privacy',
          cookies: 'Cookies'
        }
      }
    }
  };

  const currentContent = content[language];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <img 
        src="/CarriereStudentAchtergrond.png" 
        alt="Background" 
        className="background-image"
      />
      <img 
        src="/CarriereStudentAchtergrond.png" 
        alt="Background Mirrored" 
        className="background-image-mirrored"
      />
      <img 
        src="/icoonzonderachtergrond.svg" 
        alt="Large Icon" 
        className="large-icon"
      />
      
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="nav-menu">
          <a href="#portfolio" className="nav-link">{currentContent.nav.portfolio}</a>
          <a href="#over-ons" className="nav-link">{currentContent.nav.overOns}</a>
          <a href="#contact" className="nav-link">{currentContent.nav.contact}</a>
          <button className="language-toggle" onClick={toggleLanguage}>
            {language === 'nl' ? 'EN' : 'NL'}
          </button>
        </nav>
        <div className="logo">
          <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }}>
            <img src="/logostack.png" alt="nieuwnet" />
          </a>
        </div>
        <button className="hamburger-menu" onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="#portfolio" className="mobile-nav-link" onClick={closeMenu}>{currentContent.nav.portfolio}</a>
          <a href="#over-ons" className="mobile-nav-link" onClick={closeMenu}>{currentContent.nav.overOns}</a>
          <a href="#contact" className="mobile-nav-link" onClick={closeMenu}>{currentContent.nav.contact}</a>
          <button className="mobile-language-toggle" onClick={toggleLanguage}>
            {language === 'nl' ? 'EN' : 'NL'}
          </button>
        </div>
      </header>

      <div className="partners-section">
        <div className="partners-container">
          <h2 className="partners-title">Portfolio</h2>
          <div className="partners-grid">
            <div className="partner-card">
              <div className="partner-content">
                <h3>Digitale Innovatie</h3>
                <p>Wij werken samen met toonaangevende partners om de beste digitale oplossingen te leveren.</p>
              </div>
              <div className="partner-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
            
            <div className="partner-card">
              <div className="partner-content">
                <h3>Webdesign Expertise</h3>
                <p>Onze expertise wordt ondersteund door gerenommeerde partners in de webdesign industrie.</p>
              </div>
              <div className="partner-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
            
            <div className="partner-card">
              <div className="partner-content">
                <h3>Technische Partners</h3>
                <p>Samen met onze technische partners creëren we robuuste en schaalbare oplossingen.</p>
              </div>
              <div className="partner-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-section" id="contact">
        <div className="main-contact-block">
          <div className="contact-info-section">
            <div className="transparent-block">
              <h3>Direct Contact</h3>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4>{currentContent.contact.methods.phone.title}</h4>
                    <p>+31 6 46 23 16 96</p>
                    <span className="availability">{currentContent.contact.methods.phone.availability}</span>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 6l-10 7L2 6" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4>{currentContent.contact.methods.email.title}</h4>
                    <p>info@nieuwnet.nl</p>
                    <span className="availability">{currentContent.contact.methods.email.availability}</span>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h4>{currentContent.contact.methods.address.title}</h4>
                    <p>Markt 9</p>
                    <p>2611 GP Delft</p>
                    <span className="availability">{currentContent.contact.methods.address.availability}</span>
                  </div>
                </div>
                
                <div className="company-info">
                  <h4>{currentContent.contact.company.title}</h4>
                  <div className="company-details">
                    <p><strong>Nieuwnet</strong></p>
                    <p>{currentContent.contact.company.kvk}</p>
                    <p>{currentContent.contact.company.btw}</p>
                    <p>{currentContent.contact.company.iban}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-section">
            <h2>{currentContent.contact.contactForm}</h2>
            <p className="contact-description">{currentContent.contact.contactDescription}</p>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder={currentContent.contact.form.name} required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder={currentContent.contact.form.phone} />
              </div>
              <div className="form-group">
                <input type="email" placeholder={currentContent.contact.form.email} required />
              </div>
              <div className="form-group">
                <textarea placeholder={currentContent.contact.form.message} rows="5" required />
              </div>
              <button type="submit" className="submit-btn">
                {currentContent.contact.form.submit}
                <svg className="submit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <span className="copyright">{currentContent.footer.copyright}</span>
          <div className="footer-links">
            <a href="#algemene-voorwaarden" className="footer-link">{currentContent.footer.links.terms}</a>
            <span className="separator">|</span>
            <a href="#privacy" className="footer-link">{currentContent.footer.links.privacy}</a>
            <span className="separator">|</span>
            <a href="#cookies" className="footer-link">{currentContent.footer.links.cookies}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
