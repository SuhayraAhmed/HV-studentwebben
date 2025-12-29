import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createPageUrl } from '../utils/utils'
import { 
  Search, Key, Wifi, AlertTriangle, Settings, 
  HelpCircle, FileText, ExternalLink, ArrowRight
} from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

const commonIssues = [
  {
    title: "Byt lösenord",
    description: "Byta eller återställa ditt lösenord för HV-kontot",
    icon: Key,
    color: "bg-blue-600",
    action: { text: "Gå till Mitt Konto", href: "https://mittkonto.hv.se" },
  },
  {
    title: "Eduroam WiFi",
    description: "Anslut till campus WiFi med Eduroam",
    icon: Wifi,
    color: "bg-cyan-600",
    action: { text: "Se guide", page: "ITSupport" },
  },
  {
    title: "MFA / tvåfaktorsautentisering",
    description: "Installera och använd Microsoft Authenticator",
    icon: Settings,
    color: "bg-purple-600",
    action: { text: "Läs mer", page: "ITSupport" },
  },
  {
    title: "Felanmälan",
    description: "Rapportera problem med IT-utrustning eller lokaler",
    icon: AlertTriangle,
    color: "bg-orange-500",
    action: { text: "Gå till felanmälan", page: "Felanmalan" },
  },
]

export default function ITSupport() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0066CC] to-[#003366] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <Settings className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">IT-support</h1>
              <p className="text-white/80">Hjälp med lösenord, WiFi, MFA och IT-problem</p>
            </div>
          </div>
          <p className="text-xl text-white/90 max-w-2xl">
            Hitta snabb hjälp för vanliga IT-problem eller kontakta vår IT-helpdesk.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="search"
                placeholder="Sök efter IT-hjälp, t.ex. 'Eduroam', 'Byt lösenord', 'Skrivare'..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-base"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-slate-500">Vanliga sökningar:</span>
              {['Eduroam', 'Byt lösenord', 'MFA', 'Skrivare', 'Canvas login'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Issues */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Vanliga IT-problem</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commonIssues.map((issue, index) => {
              const Icon = issue.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-5 text-center">
                    <div className={`w-12 h-12 ${issue.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-2">{issue.title}</h3>
                    <p className="text-xs text-slate-500 mb-3">{issue.description}</p>
                    {issue.action.href ? (
                      <a
                        href={issue.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#0066CC] text-sm font-medium hover:underline"
                      >
                        {issue.action.text}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link to={createPageUrl(issue.action.page)} className="inline-flex items-center gap-1 text-[#0066CC] text-sm font-medium hover:underline">
                        {issue.action.text}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Eduroam Guide */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-cyan-600" />
              Eduroam WiFi – så här ansluter du
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 text-cyan-700 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Välj nätverk</h4>
                  <p className="text-sm text-slate-500">Gå till WiFi-inställningarna på din enhet och välj "eduroam"</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 text-cyan-700 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Ange uppgifter</h4>
                  <p className="text-sm text-slate-500">
                    Användarnamn: <code className="bg-slate-100 px-1 rounded">din-epost@hv.se</code>
                    <br />
                    Lösenord: Samma som till ditt HV-konto
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 text-cyan-700 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Godkänn certifikat</h4>
                  <p className="text-sm text-slate-500">Om du blir tillfrågad, godkänn certifikatet för anslutningen</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Tips:</strong> Eduroam fungerar på de flesta universitet och högskolor i Sverige och utomlands.
                Använd samma inloggning överallt!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Helpdesk */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#0066CC]" />
              Kontakta IT-helpdesk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-slate-800 mb-2">Telefon</h4>
                <a href="tel:0520223000" className="text-[#0066CC] font-medium hover:underline">
                  0520-22 30 00
                </a>
                <p className="text-sm text-slate-500 mt-1">Måndag–fredag 08:00–16:00</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">E-post</h4>
                <a href="mailto:it-support@hv.se" className="text-[#0066CC] font-medium hover:underline">
                  it-support@hv.se
                </a>
                <p className="text-sm text-slate-500 mt-1">Svar inom 1 arbetsdag</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">Plats</h4>
                <p className="text-slate-600">Studentcentrum</p>
                <p className="text-sm text-slate-500">Huvudbyggnaden, plan 1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}