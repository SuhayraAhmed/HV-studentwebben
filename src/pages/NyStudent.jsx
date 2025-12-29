// src/pages/NyStudent.jsx
import React from 'react'
import { createPageUrl } from '../utils/utils'
import { 
  GraduationCap, Key, Wifi, Calendar, BookOpen,
  CreditCard, CheckCircle, ArrowRight,
  ExternalLink, Star
} from 'lucide-react'

const HV_COLORS = {
  primary: '#003366',
  secondary: '#106E8D',
  lightBlue: '#E8F4FC',
  accent: '#D4A843',
  white: '#FFFFFF',
  gray: '#F8F9FA'
}

const onboardingSteps = [
  {
    number: 1,
    title: "Aktivera ditt HV-konto",
    description: "Ditt konto är nyckeln till alla digitala tjänster.",
    icon: Key,
    action: { 
      text: "Aktivera konto", 
      href: "https://mittkonto.hv.se",
      external: true 
    },
    tips: ["Gå till mittkonto.hv.se", "Ange personnummer", "Skapa starkt lösenord"]
  },
  {
    number: 2,
    title: "Anslut till campus WiFi",
    description: "Eduroam fungerar på hela campus och andra universitet.",
    icon: Wifi,
    action: { 
      text: "WiFi-guide", 
      href: "https://www.hv.se/student/it-support/wifi-tradlost-natverk/wifi-eduroam/",
      external: true
    },
    tips: ["Välj 'eduroam' nätverk", "Använd ditt HV-konto", "Ingen extra konfiguration"]
  },
  {
    number: 3,
    title: "Hämta Västkort",
    description: "Ditt studentkort för campus, utskrifter och bibliotek.",
    icon: CreditCard,
    action: { 
      text: "Mer om Västkort", 
      href: "https://www.hv.se/student/it-support/vastkortpasserkort/",
      external: true
    },
    tips: ["Hämta i Studentcentrum", "Ta med ID-handling", "Aktiveras direkt"]
  },
  {
    number: 4,
    title: "Kom igång med Canvas",
    description: "Lärplattform för dina kurser, material och uppgifter.",
    icon: BookOpen,
    action: { 
      text: "Öppna Canvas", 
      href: "https://hv.instructure.com/",
      external: true 
    },
    tips: ["Logga in med HV-konto", "Dina kurser visas direkt", "Ladda ner mobilapp"]
  },
  {
    number: 5,
    title: "Registrera kurser i Ladok",
    description: "Måste göras för att delta i kurser och få betyg.",
    icon: Calendar,
    action: { 
      text: "Till Ladok", 
      href: "https://student.ladok.se/student/app/studentwebb/",
      external: true 
    },
    tips: ["Logga in på Ladok", "Gå till 'Min utbildning'", "Välj kurser att registrera"]
  }
]

export default function NyStudent() {
  // Funktion för att hantera länkklick
  const handleLinkClick = (href, external = false) => {
    if (external) {
      window.open(href, '_blank', 'noopener noreferrer')
    } else {
      window.location.href = href
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero med sekundärfärg #106E8D */}
      <div 
        className="text-white py-12 md:py-16"
        style={{ backgroundColor: HV_COLORS.secondary }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="text-sm opacity-80">Välkommen till HV</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mt-1">
                Ny student - börja här
              </h1>
            </div>
          </div>
          
          <p className="text-lg opacity-90 max-w-2xl">
            Allt du behöver göra för att komma igång med dina studier.
            Följ stegen nedan för en smidig start.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Onboarding Steps */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">
            <div className="w-8 h-8 bg-[#106E8D] rounded-lg inline-flex items-center justify-center mr-3">
              <span className="text-white font-medium">1</span>
            </div>
            Dina första steg
          </h2>
          
          <div className="space-y-4">
            {onboardingSteps.map((step) => {
              const Icon = step.icon
              
              return (
                <div 
                  key={step.number} 
                  className="border border-slate-200 rounded-lg p-4 hover:border-[#106E8D] hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-[#E8F4FC] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#106E8D]" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium bg-[#106E8D] text-white px-2 py-0.5 rounded">
                          Steg {step.number}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-[#003366] text-sm mb-1">
                        {step.title}
                      </h3>
                      
                      <p className="text-xs text-slate-600 mb-2">
                        {step.description}
                      </p>
                      
                      {/* Tips */}
                      <div className="mb-3">
                        {step.tips.map((tip, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {tip}
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      {step.action.external ? (
                        <button
                          onClick={() => handleLinkClick(step.action.href, true)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#106E8D] hover:underline"
                        >
                          {step.action.text}
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleLinkClick(step.action.href, false)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#106E8D] hover:underline"
                        >
                          {step.action.text}
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}