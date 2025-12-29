import React, { useState } from 'react'
import { Send, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default function FelanmalanForm() {
  const [form, setForm] = useState({
    namn: '',
    email: '',
    telefon: '',
    typ: '',
    plats: '',
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
    // Återställ formuläret
    setForm({
      namn: '',
      email: '',
      telefon: '',
      typ: '',
      plats: '',
      byggnad: '',
      rum: '',
      beskrivning: '',
      prioritering: 'normal'
    })
  }

  const problemTyper = [
    { id: 'it', label: 'IT-utrustning', desc: 'Dator, projektor, skrivare, WiFi' },
    { id: 'lokal', label: 'Lokal/byggnad', desc: 'Ventilation, temperatur, stolar' },
    { id: 'sakerhet', label: 'Säkerhet', desc: 'Brandsläckare, dörrar, belysning' },
  ]

  const byggnader = [
    'Huvudbyggnaden (G)',
    'Hus A',
    'Hus B', 
    'Hus C',
    'Hus D',
    'Hus E',
    'Träffpunkt',
    'Biblioteket'
  ]

  return (
    <Card className="max-w-4xl mx-auto">
      {submitted ? (
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Tack för din felanmälan!</h2>
          <p className="text-slate-600 mb-4">Vi har tagit emot din rapport och återkommer så snart som möjligt.</p>
          <p className="text-sm text-slate-500">
            Referensnummer: FEL-{Date.now().toString().slice(-6)}
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setSubmitted(false)}
          >
            Gör en ny felanmälan
          </Button>
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Felanmälan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Problemtyp */}
              <div>
                <h3 className="font-medium text-slate-800 mb-3">Vad är det för problem?</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {problemTyper.map((typ) => (
                    <button
                      key={typ.id}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, typ: typ.id }))}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${
                        form.typ === typ.id 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="mb-2">
                        <span className="font-medium text-slate-800">{typ.label}</span>
                      </div>
                      <p className="text-sm text-slate-500">{typ.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Plats */}
              <div className="space-y-4">
                <h3 className="font-medium text-slate-800">Plats för problemet</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Byggnad *
                    </label>
                    <select
                      name="byggnad"
                      value={form.byggnad}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    >
                      <option value="">Välj byggnad</option>
                      {byggnader.map((byggnad) => (
                        <option key={byggnad} value={byggnad}>{byggnad}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Rum/beskrivning
                    </label>
                    <Input
                      name="rum"
                      value={form.rum}
                      onChange={handleChange}
                      placeholder="T.ex. 'Sal G101' eller 'Korridor plan 2'"
                    />
                  </div>
                </div>
              </div>

              {/* Beskrivning */}
              <div>
                <h3 className="font-medium text-slate-800 mb-3">Beskriv problemet</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Beskrivning *
                    </label>
                    <textarea
                      name="beskrivning"
                      value={form.beskrivning}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                      placeholder="Beskriv problemet så detaljerat som möjligt..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Prioritering
                    </label>
                    <select
                      name="prioritering"
                      value={form.prioritering}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    >
                      <option value="normal">Normal (löst inom 3 arbetsdagar)</option>
                      <option value="hög">Hög (löst inom 1 arbetsdag)</option>
                      <option value="kritisk">Kritisk (akuta säkerhetsproblem)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Kontaktuppgifter */}
              <div>
                <h3 className="font-medium text-slate-800 mb-3">Kontaktuppgifter</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Namn *
                    </label>
                    <Input
                      name="namn"
                      value={form.namn}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      E-post *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Telefon
                    </label>
                    <Input
                      name="telefon"
                      value={form.telefon}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline">
                  Avbryt
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  <Send className="w-4 h-4 mr-2" />
                  Skicka felanmälan
                </Button>
              </div>
            </form>
          </CardContent>
        </>
      )}
    </Card>
  )
}