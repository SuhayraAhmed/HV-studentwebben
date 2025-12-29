import React, { useState } from 'react'
import {
  AlertTriangle,
  Building,
  Monitor,
  CheckCircle,
  Clock,
  Info
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function Felanmalan() {
  const [form, setForm] = useState({
    namn: '',
    email: '',
    telefon: '',
    typ: '',
    byggnad: '',
    rum: '',
    beskrivning: '',
    prioritering: 'normal'
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Felanmälan skickad:', form)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const problemTyper = [
    { id: 'it', label: 'IT-utrustning', icon: Monitor, desc: 'Dator, projektor, skrivare, WiFi' },
    { id: 'lokal', label: 'Lokal & byggnad', icon: Building, desc: 'Ventilation, temperatur, möbler' },
    { id: 'sakerhet', label: 'Säkerhet', icon: AlertTriangle, desc: 'Belysning, dörrar, risker' },
  ]

  const byggnader = [
    'Huvudbyggnaden (G)',
    'Hus A',
    'Hus B',
    'Hus C',
    'Hus D',
    'Hus E',
    'Biblioteket',
    'Träffpunkt'
  ]

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Felanmälan – problem på campus
          </h1>
          <p className="text-white/90 max-w-2xl">
            Här rapporterar du problem i lokaler, utrustning eller studiemiljö.
            Är det akut och gäller säkerhet – ring alltid campus direkt.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* GUIDE */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-blue-800 font-semibold">
              <Info className="w-5 h-5" />
              Så fungerar felanmälan
            </div>
            <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
              <li>Välj vilken typ av problem det gäller</li>
              <li>Ange plats (byggnad och rum)</li>
              <li>Beskriv problemet så tydligt som möjligt</li>
              <li>Skicka in – ditt ärende tas om hand av ansvarig funktion</li>
            </ol>
          </CardContent>
        </Card>

        {submitted ? (
          <Card className="border-green-500">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-green-700 mb-2">
                Felanmälan mottagen
              </h2>
              <p className="text-slate-600 mb-2">
                Tack! Vi återkommer så snart som möjligt.
              </p>
              <p className="text-sm text-slate-500 flex justify-center gap-2">
                <Clock className="w-4 h-4" />
                Referensnummer: FEL-{Date.now().toString().slice(-6)}
              </p>
              <Button
                className="mt-4"
                onClick={() => setSubmitted(false)}
              >
                Skicka en ny felanmälan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* PROBLEMTYP */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Vad gäller problemet?</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                {problemTyper.map(({ id, label, icon: Icon, desc }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, typ: id }))}
                    className={`p-4 border-2 rounded-xl text-left ${
                      form.typ === id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-slate-200'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-orange-600 mb-2" />
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-slate-500">{desc}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plats</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <select
                    name="byggnad"
                    value={form.byggnad}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="">Välj byggnad</option>
                    {byggnader.map(b => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                  <Input
                    name="rum"
                    placeholder="Rum eller platsbeskrivning"
                    value={form.rum}
                    onChange={handleChange}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Beskrivning</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    name="beskrivning"
                    required
                    rows={4}
                    value={form.beskrivning}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kontaktuppgifter</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <Input name="namn" placeholder="Namn" required onChange={handleChange} />
                  <Input name="email" type="email" placeholder="E-post" required onChange={handleChange} />
                  <Input name="telefon" placeholder="Telefon (valfritt)" onChange={handleChange} />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Skicka felanmälan
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
