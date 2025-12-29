import React from 'react'
import { Link } from 'react-router-dom'
import { createPageUrl } from '../../utils/utils'
import { 
  BookOpen, FileText, User, Calendar, Library, 
  Settings, Wifi, AlertTriangle, ExternalLink
} from 'lucide-react'

const quickLinks = [
  {
    name: 'Canvas',
    description: 'Lärplattform',
    icon: BookOpen,
    href: 'https://hv.instructure.com',
    external: true,
    color: 'bg-red-500',
  },
  {
    name: 'Ladok',
    description: 'Resultat & registrering',
    icon: FileText,
    href: 'https://www.student.ladok.se',
    external: true,
    color: 'bg-green-600',
  },
  {
    name: 'Mitt Konto',
    description: 'Lösenord & inställningar',
    icon: User,
    href: 'https://mittkonto.hv.se',
    external: true,
    color: 'bg-[#003366]',
  },
  {
    name: 'Schema',
    description: 'KronoX & bokning',
    icon: Calendar,
    page: 'Schema',
    color: 'bg-purple-600',
  },
  {
    name: 'Bibliotek',
    description: 'Sök & låna',
    icon: Library,
    page: 'Bibliotek',
    color: 'bg-[#D4A843]',
  },
  {
    name: 'IT-support',
    description: 'Hjälp & lösenord',
    icon: Settings,
    page: 'ITSupport',
    color: 'bg-slate-600',
  },
  {
    name: 'Eduroam',
    description: 'WiFi-uppkoppling',
    icon: Wifi,
    page: 'ITSupport',
    color: 'bg-cyan-600',
  },
  {
    name: 'Felanmälan',
    description: 'Anmäl problem',
    icon: AlertTriangle,
    page: 'Felanmalan',
    color: 'bg-orange-500',
  },
];

export default function QuickLinks() {
  return (
    <div className="bg-white py-4 border-b border-slate-200 shadow-sm sticky top-[73px] z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-sm font-medium text-slate-500 whitespace-nowrap mr-2 hidden sm:inline">
            Snabbåtkomst:
          </span>
          {quickLinks.map((link) => {
            const Icon = link.icon;
            const content = (
              <div
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium
                  ${link.color} hover:opacity-90 transition-all cursor-pointer whitespace-nowrap
                  shadow-sm hover:shadow-md
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
                {link.external && <ExternalLink className="w-3 h-3 opacity-70" />}
              </div>
            );

            if (link.external) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={link.name}
                to={createPageUrl(link.page)}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  )
}