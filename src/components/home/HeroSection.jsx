import React from 'react'
import { Link } from 'react-router-dom'
import { createPageUrl } from '../../utils/utils'
import { Search, Sparkles, ArrowRight, GraduationCap } from 'lucide-react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-[#003366] via-[#004488] to-[#0066CC] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Högskolan Väst campus"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/90 to-[#0066CC]/70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-white/90 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Välkommen till studentwebben</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Allt du behöver
              <br />
              <span className="text-[#D4A843]">på ett ställe</span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-lg">
              Hitta snabbt dina e-tjänster, schema, tentamensarkiv och allt annat du behöver som student.
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="search"
                placeholder="Sök t.ex. 'Gamla tentor', 'Byt lösenord', 'Boka rum'..."
                className="pl-12 pr-4 py-6 text-base bg-white border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-[#D4A843]"
              />
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-white/60">Populärt:</span>
              {['Schema', 'Gamla tentor', 'Grupprum', 'Eduroam'].map((term) => (
                <button
                  key={term}
                  className="text-sm px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Right content - Image and New Student CTA */}
          <div className="lg:justify-self-end">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Studenter på Högskolan Väst"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="w-16 h-16 bg-[#D4A843] rounded-2xl flex items-center justify-center mb-6 -mt-12 relative z-10">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-[#003366] mb-3">
                  Ny student?
                </h2>
                
                <p className="text-slate-600 mb-6">
                  Få en komplett guide för att komma igång. Vi hjälper dig med allt från 
                  att aktivera ditt konto till att hitta schemat.
                </p>

                <Link to={createPageUrl('NyStudent')}>
                  <Button className="w-full bg-[#D4A843] hover:bg-[#c49a3d] text-white py-6 text-lg font-semibold rounded-xl group">
                    Kom igång som ny student
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}