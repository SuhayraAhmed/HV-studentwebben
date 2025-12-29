// src/components/layout/Layout.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HvLogo from '../HvLogo'
import { 
  Menu, Phone, Mail, MapPin, Clock, 
  Facebook, Instagram, Youtube, Linkedin,
  Home, Book, Settings, User, Building
} from 'lucide-react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

const menuItems = [
  { title: "Självservice", page: "/", icon: Home },
  { title: "Ny student", page: "/ny-student", icon: User },
]

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`sticky top-0 z-50 bg-white border-b transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-2">
              <HvLogo 
                withText 
                showSubtitle 
                size="md"
                className="hover:opacity-80 transition-opacity"
              />
            </Link>

            <nav className="hidden lg:flex gap-8 items-center">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.page} 
                    to={item.page} 
                    className="text-slate-700 hover:text-[#003366] font-medium text-sm flex items-center gap-2 hover:underline transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-6 h-6"/>
                    <span className="sr-only">Öppna meny</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <div className="p-6 border-b">
                    <HvLogo withText size="lg" className="mb-6" />
                    <p className="text-sm text-slate-500">Studentwebb för Högskolan Väst</p>
                  </div>
                  <div className="flex flex-col py-2">
                    {menuItems.map(item => {
                      const Icon = item.icon;
                      return (
                        <Link 
                          key={item.page} 
                          to={item.page} 
                          className="flex items-center gap-3 text-slate-700 py-3 px-6 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      )
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-[#003366] text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <HvLogo withText size="lg" className="mb-4" />
            <p className="text-white/80 text-center max-w-2xl">
              Studentwebben är din digitala portal för studier vid Högskolan Väst. 
              Här hittar du alla e-tjänster, resurser och information du behöver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Kontakta oss
              </h3>
              <address className="not-italic space-y-2">
                <p className="font-bold">Högskolan Väst</p>
                <p>461 86 Trollhättan</p>
                <p className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <a href="tel:0520223000" className="hover:text-[#D4A843] transition-colors">
                    0520-22 30 00
                  </a>
                </p>
                <p className="flex items-center gap-1 mt-4">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@hv.se" className="hover:text-[#D4A843] transition-colors">
                    E-post och fler kontaktuppgifter
                  </a>
                </p>
              </address>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Besök och leveranser
              </h3>
              <div className="space-y-2">
                <p>Gustava Melins Gata 2</p>
                <p>461 32 Trollhättan</p>
                <p className="mt-4">
                  <span className="text-slate-300">Org. nr:</span> 202100-4052
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Öppettider
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Måndag–Fredag:</span>
                  <span className="font-medium">08:00–17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Lördag–Söndag:</span>
                  <span className="font-medium">Stängt</span>
                </div>
                <p className="text-sm text-slate-300 mt-2">
                  * Öppettider kan variera under lov och tentaperioder
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Genvägar</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#D4A843] transition-colors">Kris och nödsituation</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D4A843] transition-colors">Press och media</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D4A843] transition-colors">Arbeta hos oss</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D4A843] transition-colors">Om webbplatsen</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D4A843] transition-colors">Tillgänglighetsredogörelse</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="font-medium">Följ oss:</span>
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/hogskolanvast/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://www.instagram.com/hogskolanvast/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://www.youtube.com/user/hogskolanvast" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a href="https://www.linkedin.com/school/h-gskolan-v-st-university-west-/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 w-full">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-white/70">
                      © {new Date().getFullYear()} Högskolan Väst. Alla rättigheter reserverade.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <a href="#" className="text-white/70 hover:text-white hover:underline transition-colors">Integritetspolicy</a>
                    <a href="#" className="text-white/70 hover:text-white hover:underline transition-colors">Cookies</a>
                    <a href="#" className="text-white/70 hover:text-white hover:underline transition-colors">Användarvillkor</a>
                    <a href="#" className="text-white/70 hover:text-white hover:underline transition-colors">Tillgänglighet</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}