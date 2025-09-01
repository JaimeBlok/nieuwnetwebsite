# NieuwNet Contactformulier - Vercel Setup

## 🎯 Wat we hebben geïmplementeerd

Je contactformulier is nu omgezet naar een **Vercel serverless function** die emails verstuurt via TransIP SMTP. Dit betekent:

✅ **Geen PHP nodig** - Alles draait op Vercel  
✅ **TransIP SMTP** - Jouw eigen email server  
✅ **Moderne technologie** - Node.js serverless functions  
✅ **Automatische deployment** - Via GitHub + Vercel  

## 🚀 Stappen om te implementeren

### **Stap 1: Dependencies installeren**
```bash
npm install
```

### **Stap 2: Wachtwoord instellen in Vercel**
Je moet je TransIP email wachtwoord instellen als environment variable in Vercel:

1. **Ga naar [vercel.com](https://vercel.com)**
2. **Log in en selecteer je project**
3. **Ga naar Settings → Environment Variables**
4. **Voeg toe:**
   - **Name:** `TRANSIP_EMAIL_PASSWORD`
   - **Value:** `jouw_echte_wachtwoord`
   - **Environment:** Production, Preview, Development
5. **Klik Save**

### **Stap 3: Deploy naar Vercel**
```bash
# Commit en push je wijzigingen
git add .
git commit -m "Add contact form API endpoint"
git push origin main

# Vercel deployt automatisch!
```

## 📁 Bestanden die zijn toegevoegd

- `api/contact.js` - Serverless function voor contactformulier
- `vercel.json` - Vercel configuratie
- `package.json` - Bijgewerkt met nodemailer dependency

## 🔧 Hoe het werkt

1. **Bezoeker vult formulier in** → React formulier
2. **JavaScript stuurt data** → `/api/contact` endpoint
3. **Vercel serverless function** → Verwerkt het formulier
4. **Nodemailer verstuurt email** → Via TransIP SMTP
5. **Response terug** → Bevestiging naar bezoeker

## 🧪 Testen

### **Lokaal testen:**
```bash
npm run dev
# Ga naar http://localhost:3000 en test het formulier
```

### **Productie testen:**
1. Deploy naar Vercel
2. Test het formulier op je live website
3. Controleer of je emails ontvangt op `contact@nieuw-net.nl`

## 🚨 Troubleshooting

### **Email wordt niet verzonden:**
1. **Controleer Vercel environment variables**
2. **Kijk in Vercel logs** (Function Logs in je dashboard)
3. **Verifieer TransIP SMTP instellingen**

### **API endpoint niet gevonden:**
1. **Controleer of `vercel.json` correct is**
2. **Zorg dat de `api/` map bestaat**
3. **Redeploy na wijzigingen**

### **CORS problemen:**
- Vercel handhaaft automatisch CORS voor API routes

## 🔒 Beveiliging

- **Input validatie** - Alle velden worden gevalideerd
- **Spam detectie** - Automatische detectie van verdachte content
- **Rate limiting** - Kan worden toegevoegd via Vercel
- **Environment variables** - Wachtwoord staat veilig in Vercel

## 📞 Ondersteuning

Als je problemen ondervindt:
1. **Check Vercel Function Logs** in je dashboard
2. **Controleer environment variables**
3. **Test lokaal eerst** met `npm run dev`
4. **Verifieer TransIP SMTP instellingen**

## ✨ Voordelen van deze oplossing

- **Geen PHP hosting nodig**
- **Automatische scaling** via Vercel
- **Snelle response tijden**
- **Betrouwbare email delivery**
- **Moderne tech stack**
- **Eenvoudig te onderhouden**

Je contactformulier werkt nu volledig op Vercel en verstuurt emails via je TransIP email server! 🎉
