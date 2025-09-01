// Vercel serverless function voor het contactformulier
// Deze functie draait op Vercel's servers en verstuurt emails via TransIP SMTP

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Alleen POST requests toestaan
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Alleen POST methode toegestaan' 
    });
  }

  try {
    // Haal formulier data op
    const { name, email, phone, company, subject, message } = req.body;

    // Validatie
    const errors = [];
    
    if (!name || name.trim().length < 2) {
      errors.push('Naam is verplicht en moet minimaal 2 karakters bevatten.');
    }
    
    if (!email || !isValidEmail(email)) {
      errors.push('Een geldig e-mailadres is verplicht.');
    }
    
    if (!subject || subject.trim().length < 3) {
      errors.push('Onderwerp is verplicht en moet minimaal 3 karakters bevatten.');
    }
    
    if (!message || message.trim().length < 10) {
      errors.push('Bericht is verplicht en moet minimaal 10 karakters bevatten.');
    }

    // Spam detectie
    if (isSpam(message) || isSpam(subject)) {
      errors.push('Uw bericht bevat verdachte content en kan niet worden verzonden.');
    }

    // Als er validatie fouten zijn, stuur ze terug
    if (errors.length > 0) {
      return res.status(400).json({
        status: 'error',
        errors: errors
      });
    }

    // Maak email transporter aan (TransIP SMTP)
    const transporter = nodemailer.createTransporter({
      host: 'smtp.transip.email',
      port: 587,
      secure: false, // true voor 465, false voor andere poorten
      auth: {
        user: 'contact@nieuw-net.nl',
        pass: process.env.TRANSIP_EMAIL_PASSWORD // Wachtwoord uit environment variable
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email inhoud samenstellen
    const emailBody = `Nieuwe contactaanvraag via nieuw-net.nl
=========================================

CONTACTGEGEVENS:
Naam: ${name}
Email: ${email}
Telefoon: ${phone || 'Niet opgegeven'}
Bedrijf: ${company || 'Niet opgegeven'}
Onderwerp: ${subject}

BERICHT:
=========================================
${message}

=========================================
Website: nieuw-net.nl
Verzonden: ${new Date().toLocaleString('nl-NL')}
IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}
`;

    // Email versturen
    const info = await transporter.sendMail({
      from: '"Website Formulier" <contact@nieuw-net.nl>',
      to: 'contact@nieuw-net.nl',
      replyTo: `${name} <${email}>`,
      subject: `Nieuw bericht via website van ${name}`,
      text: emailBody,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    });

    console.log('Email succesvol verzonden:', info.messageId);

    // Succes response
    return res.status(200).json({
      status: 'success',
      message: '✅ Bedankt! Je bericht is verzonden.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Fout bij verzenden email:', error);
    
    return res.status(500).json({
      status: 'error',
      message: '❌ Fout bij verzenden. Probeer het later opnieuw.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Interne server fout'
    });
  }
}

// Helper functies
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isSpam(content) {
  if (!content) return false;
  
  const spamKeywords = ['viagra', 'cialis', 'loan', 'casino', 'poker', 'bitcoin', 'crypto'];
  const contentLower = content.toLowerCase();
  
  // Check op spam keywords
  for (const keyword of spamKeywords) {
    if (contentLower.includes(keyword)) {
      return true;
    }
  }
  
  // Check op te veel links
  const linkCount = (content.match(/http/g) || []).length;
  if (linkCount > 3) {
    return true;
  }
  
  return false;
}
