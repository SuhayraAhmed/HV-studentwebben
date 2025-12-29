import React from 'react'
import { Link } from 'react-router-dom'
import { createPageUrl } from '../../utils/utils'
import { 
  BookOpen, FileText, Calendar, Library, Settings, 
  Wifi, AlertTriangle, Car, CreditCard, Mail, 
  GraduationCap, Clipboard, ExternalLink, ArrowRight
} from 'lucide-react'
import { Card, CardContent } from "../ui/card"

const services = [
  {
    category: "Studier",
    items: [
      { name: "Canvas", desc: "Kurser & material", icon: BookOpen, href: "https://hv.instructure.com", external: true, popular: true },
      { name: "Ladok", desc: "Resultat & registrering", icon: FileText, href: "https://www.student.ladok.se", external: true, popular: true },
      { name: "Schema", desc: "KronoX", icon: Calendar, page: "Schema", popular: true },
      { name: "Tentamensarkiv", desc: "Gamla tentor", icon: Clipboard, page: "Tentamensarkiv", popular: true },
    ]
  },
  {
    category: "Konto & IT",
    items: [
      { name: "Mitt Konto", desc: "Lösenord & MFA", icon: Settings, href: "https://mittkonto.hv.se", external: true, popular: true },
      { name: "Eduroam", desc: "WiFi-uppkoppling", icon: Wifi, page: "ITSupport" },
      { name: "Microsoft 365", desc: "Mail, Teams, OneDrive", icon: Mail, href: "https://office.com", external: true },
      { name: "IT-support", desc: "Hjälp med IT", icon: Settings, page: "ITSupport" },
    ]
  },
  {
    category: "Service",
    items: [
      { name: "Biblioteket", desc: "Sök & låna böcker", icon: Library, page: "Bibliotek", popular: true },
      { name: "Boka grupprum", desc: "Lokaler via KronoX", icon: Calendar, page: "Schema" },
      { name: "Felanmälan", desc: "Anmäl problem", icon: AlertTriangle, page: "Felanmalan" },
      { name: "Parkeringstillstånd", desc: "Ansök om parkering", icon: Car, page: "Etjanster" },
    ]
  }
]

export default function ServiceCards() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#003366] mb-4">E-tjänster & system</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Snabb åtkomst till alla digitala tjänster du behöver som student
          </p>
        </div>

        <div className="space-y-12">
          {services.map((category) => (
            <div key={category.category}>
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                {category.category}
                <span className="text-sm font-normal text-slate-400">
                  ({category.items.length} tjänster)
                </span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.items.map((service) => {
                  const Icon = service.icon;
                  const content = (
                    <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 bg-[#E8F4FC] group-hover:bg-[#0066CC] transition-colors">
                          <Icon className="w-6 h-6 text-[#0066CC] group-hover:text-white transition-colors" />
                        </div>
                        <h4 className="font-semibold text-slate-800 text-sm mb-1 group-hover:text-[#0066CC] transition-colors">
                          {service.name}
                        </h4>
                        <p className="text-xs text-slate-500">{service.desc}</p>
                        {service.external && (
                          <ExternalLink className="w-3 h-3 mx-auto mt-2 text-slate-300 group-hover:text-[#0066CC] transition-colors" />
                        )}
                        {service.popular && (
                          <span className="inline-block mt-2 text-[10px] px-2 py-0.5 bg-[#D4A843]/10 text-[#D4A843] rounded-full font-medium">
                            Populär
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  );

                  if (service.external) {
                    return (
                      <a
                        key={service.name}
                        href={service.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <Link key={service.name} to={createPageUrl(service.page)}>
                      {content}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to={createPageUrl('Etjanster')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#003366] hover:bg-[#002244] text-white rounded-lg font-medium transition-colors"
          >
            Se alla e-tjänster
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}