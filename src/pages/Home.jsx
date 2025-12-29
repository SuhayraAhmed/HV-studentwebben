// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react'
import { createPageUrl } from '../utils/utils'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { 
  Search, ArrowRight, BookOpen, FileText, Calendar,
  Settings, Wifi, AlertTriangle, Clipboard, PenTool,
  Clock, MapPin, Lock, GraduationCap, Monitor, Building,
  Briefcase, Users, Phone, Plane, Building2, Mail,
  Printer, Car, CreditCard, CheckCircle, HelpCircle,
  Download, Database, UserCheck, Book, Shield, Key,
  Smartphone, FileCheck, ChevronDown, Bookmark,
  AlertCircle, Headphones, Library, Globe, HomeIcon,
  Calculator, MessageSquare, FileQuestion, Bell,
  Heart, Accessibility, ExternalLink, Mail as MailIcon,
  Award, Cloud, RotateCcw
} from 'lucide-react'
import hogskolanVastBild from '../assets/hogskolan_vast1.jpg'

// Hjälpkomponenter
const Microsoft = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
  </svg>
)

// Högskolan Väst färger
const HV_COLORS = {
  primary: '#003366',
  secondary: '#106E8D',
  lightBlue: '#E8F4FC',
  accent: '#D4A843',
  white: '#FFFFFF',
  gray: '#F8F9FA'
}

// Kategorier med HTTPS länkar (förutom felanmälan)
const serviceCategories = [
  {
    id: 'konto',
    title: 'Konto & inloggning',
    icon: Key,
    color: 'bg-[#E8F4FC] text-[#106E8D] border-[#106E8D]/20',
    description: 'Hantera ditt konto, lösenord och inloggningsinformation',
    services: [
      { 
        name: 'Glömt användarnamn & lösenord', 
        desc: 'Du använder ditt användarnamn (t.ex. buba0001) och lösenord för att logga in på alla system vid Högskolan Väst, till exempel Canvas och andra digitala tjänster. Om du har glömt ditt användarnamn eller lösenord kan du enkelt återställa dem.', 
        icon: Key, 
        directLink: 'https://mittkonto.hv.se/account?language=sv-SE',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/knowledgeitem?unid=dc69f5eb71ad4f508a43366961dfdf95',
        instruction: 'Gå till Mitt Konto och välj "Kan inte logga in" för att återställa lösenord.'
      },
      { 
        name: 'Logga in med tvåstegsverifiering', 
        desc: 'Komma igång med tvåstegs-inloggning (MFA). MFA (multifaktorautentisering) är ett extra säkerhetslager när du loggar in på högskolans tjänster, som e-post och Microsoft Word.För att kunna använda alla tjänster måste du aktivera MFA via mobilappen Microsoft Authenticator.', 
        icon: Shield, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/knowledgeitem?unid=4d92977259eb428a95d292b2e19ad80e',
        instruction: 'Installera Microsoft Authenticator och följ guiden för att aktivera MFA.'
      },
      { 
        name: 'Problem med inloggning', 
        desc: 'Om du har tagit bort och installerat om MFA-appen (Microsoft Authenticator) kan det hända att appen ber om autentisering när du loggar in första gången, eller att inloggningssidan kräver autentisering men appen inte visar någon notifikation. Då behöver din MFA-profil återställas.', 
        icon: HelpCircle, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/service?unid=e6ce88cda89749c49241b065452e0821&from=c926ba84-0ec8-4aa4-9844-56e51bb3a9e5',
       instruction: 'Återställ via Mitt Konto och följ guiden om MFA inte fungerar.'
      }
    ]
  },
  {
    id: 'kurser',
    title: 'Kurser & registrering',
    icon: BookOpen,
    color: 'bg-[#E8F4FC] text-[#106E8D] border-[#106E8D]/20',
    description: 'Kursregistrering, avslutad kurs, BIP-kurser och studieadministration',
    services: [
      { 
        name: 'Anmälan till BIP-kurs', 
        desc: 'BIP-kurser är korta, intensiva kurser som kombinerar digital undervisning med fysiska träffar. För att delta behöver du vara antagen och registrerad på en utbildning vid Högskolan Väst.', 
        icon: FileText, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/serviceflow?unid=2a9cf126e6b043588d4fbd9f61e6457d&openedFromService=true',
        instruction: 'Fyll i formuläret för att ansöka om BIP-kurser.'
      },
      { 
        name: 'Inte klar med en avslutad kurs?', 
        desc: 'Om du har en kurs du tidigare läst men inte blivit klar med, kan du ansöka om att få göra klart den. Detta gäller när du behöver skriva tentamen eller lämna in/komplettera uppgifter.', 
        icon: Monitor, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/serviceflow?unid=92f94c17c68b4582870c48a39b9eb85c&from=bfa3d865-4ee3-4ffd-bab6-7953eae044b3&openedFromService=true',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/knowledgeitem?unid=1ee19241a318433d9c46198326fc3e12',
        instruction: 'Fyll i formuläret för att begära åtkomst till kurser du inte blivit klar med.'
      },
      { 
        name: 'Gå om en kurs du redan läst(Omregistrering)', 
        desc: 'Här ansöker du om att läsa om en kurs som du tidigare varit registrerad på.Detta gäller när du vill läsa hela kursen igen, t.ex. för att delta i föreläsningar, göra VFU eller kunna ansöka om studiemedel.', 
        icon: FileCheck, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/serviceflow?unid=7fba74190afe4ffa98e02ffe8c2fff76&openedFromService=true',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/service?unid=2fe64a7d4fb74870b20b8014fa4dd199',
        instruction: 'Fyll i formuläret för att ansöka om omregistrering.'
      },
      { 
        name: 'Ansökan om tillgodoräknande', 
        desc: 'Som student vid Högskolan Väst kan du ansöka om att få tidigare utbildning eller yrkeserfarenhet räknad mot ditt nuvarande program eller examen.Det betyder att kurser du redan har klarat, antingen från Högskolan Väst eller andra lärosäten, kan ersätta delar av din nuvarande utbildning', 
        icon: CheckCircle, 
        directLink: 'https://student.ladok.se/student/app/studentwebb/tillgodoraknande/ansokan/1',
        instruction: 'Ansök om tillgodoräknande via Ladok.'
      },
      { 
        name: 'Återupptagande av studier', 
        desc: 'Om du tidigare varit registrerad på ett program men av någon anledning avbrutit eller varit obehörig kan du ansöka om att starta igen. Detta gäller också om du har en oavslutad kurs som inte längre erbjuds inom programmet.S', 
        icon: ArrowRight, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/serviceflow?unid=bc17969e8ac84ef181e914a98a927746&from=be1550d9-693c-4099-94e7-9fa87f7cf82c&openedFromService=true',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/service?unid=53fcf992e46a43b1b2d4919403234663&from=be1550d9-693c-4099-94e7-9fa87f7cf82c',
        instruction: 'Läs informationen och fyll i formuläret för återupptagande.'
      },
      { 
        name: 'Studieavbrott', 
        desc: 'Om du vill avbryta en kurs eller ett program kan du göra ett studieavbrott i Ladok.', 
        icon: ArrowRight, 
        directLink: 'https://student.ladok.se/student/app/studentwebb/start',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/service?unid=a24fc27dd88b4dde96e1e61c4e83f056',
        instruction: 'Gör studieavbrott direkt i Ladok.'
      }
    ]
  },
  {
    id: 'tentamen',
    title: 'Tentamen',
    icon: FileText,
    color: 'bg-[#E8F4FC] text-[#106E8D] border-[#106E8D]/20',
    description: 'Tentamensanmälan, digitala tentor och tentamensarkiv',
    services: [
      { 
        name: 'Jag kan inte anmäla mig till tentamen', 
        desc: 'Om du har problem med att anmäla dig till en tentamen kan du be om hjälp här.', 
        icon: AlertCircle, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/serviceflow?unid=11cc85c8692b4682840ba6e4cec9fcf6&openedFromService=true',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/service?unid=f6d9573c860b458999efbb0ece431eb4',
        instruction: 'Fyll i formuläret om du har problem med tentamensanmälan.'
      },
      { 
        name: 'Digitala tentamen – Inspera', 
        desc: 'Logga in på Inspera för digitala tentamen .', 
        icon: Monitor, 
        directLink: 'https://hv.inspera.com/',
        instruction: 'Logga in med ditt HV-konto för att skriva digital tentamen och se din digitala tenta.'
      },
      { 
        name: 'Se mina rättade tentor', 
        desc: 'Här kan du som student hitta alla dina rättade tentor som har skannats in. Tentorna finns tillgängliga i PDF-format, så att du kan läsa dem, ladda ner dem eller spara dem för eget bruk.', 
        icon: FileCheck, 
        directLink: 'https://minatentor.hv.se/',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/knowledgeitem?unid=ad880c1d82f3489d94b2e6f023dd27ac',
        instruction: 'Logga in på Aldoc för att se dina rättade tentor.'
      },
      { 
        name: 'Gamla tentor – Tentamensarkiv', 
        desc: 'Sök och ladda ner gamla tentor som övningsmaterial.', 
        icon: Database, 
        directLink: 'https://tentamensarkiv.hv.se/?sq=Gamla%20tentor%20%E2%80%93%20Tentamensarkiv',
        instruction: 'Sök med hjälp av kurskoden i tentamensarkivet.'
      },
      { 
        name: 'Begär om tentamenssvar', 
        desc: 'Här kan du få se exempel på tentor som tidigare studenter har lämnat in och fått högsta betyg på. Detta hjälper dig att förstå hur en bra lösning kan se ut. Du kan även önska tentasvar från ett särskilt datum, men högst tre tentamensdatum per kurskod..', 
        icon: FileText, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/serviceflow?unid=f727c0b510004df4822288c80656f7e7&openedFromService=true',
        guideLink: 'https://www.hv.se/student/studier/examination/Tentamen/tentamenssvar/?sq=Beg%C3%A4r%20om%20tentamensvar',
        instruction: 'Fyll i formuläret för att begära svar på gamla tentor (endast tillgängliga i 2 år).'
      }
    ]
  },
  {
    id: 'intyg',
    title: 'Studiebevis & intyg',
    icon: Award,
    color: 'bg-[#E8F4FC] text-[#106E8D] border-[#106E8D]/20',
    description: 'Studieintyg, examensbevis och officiella dokument',
    services: [
      { 
        name: 'Studieintyg', 
        desc: 'Behöver du visa för arbetsgivare eller annan mottagare vilka kurser du är antagen till och registrerad på? Då kan du själv skapa ett intyg via Ladok för studenter. Intyget visar både aktuella kurser och, om du vill, kommande kurser.', 
        icon: FileText, 
        directLink: 'https://student.ladok.se/student/app/studentwebb/intyg',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/knowledgeitem?unid=b9d9fdc04c6e408a875767347aef8778',
        instruction: 'Beställ och ladda ner studieintyg från Ladok.'
      },
      { 
        name: 'Examensbevis', 
        desc: 'Här kan du som student på Högskolan Väst ansöka om ditt examensbevis när du har avslutat alla kurser som ingår i din utbildning. Examensbeviset visar vilken examen du har tagit, vilka kurser som ingår, betyg, titel på examensarbetet samt datum för kursavslut. Beviset är tvåspråkigt (svenska och engelska.', 
        icon: GraduationCap, 
        directLink: 'https://student.ladok.se/student/app/studentwebb/examen-bevis',
        guideLink: 'https://www.hv.se/student/studier/examensbevis/',
        instruction: 'Ansök om examensbevis via Ladok.'
      }
    ]
  },
  {
    id: 'bibliotek',
    title: 'Bibliotek',
    icon: Library,
    color: 'bg-[#E8F4FC] text-[#106E8D] border-[#106E8D]/20',
    description: 'Boklån, fjärrlån och bibliotekstjänster',
    services: [
      { 
        name: 'Låna bok / Mitt bibliotekskonto', 
        desc: 'Logga in på ditt bibliotekskonto för lån och reservationer.', 
        icon: UserCheck, 
        directLink: 'https://koha.hv.se/cgi-bin/koha/opac-user.pl',
        instruction: 'Logga in med ditt HV-konto för att se dina lån och reservationer.'
      },
      { 
        name: 'Fjärrlån av böcker och artiklar', 
        desc: 'Om en bok eller artikel inte finns på biblioteket kan du beställa den från ett annat bibliotek eller få en kopia av artikeln/bokkapitlet. Du kan också föreslå böcker som biblioteket kan köpa in.', 
        icon: Book, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/serviceflow?unid=24e2fc86c203417b856483fe4c5417c3',
        instruction: 'Använd fjärrlånetjänsten för att beställa material från andra bibliotek.'
      },
      { 
        name: 'Legimus – talbokstjänst', 
        desc: 'Du kan lyssna på kurslitteratur i stället för att läsa. Som student med läsnedsättning kan du få tillgång till talböcker via Legimus eller använda uppläsningsprogram för e-böcker och artiklar.', 
        icon: Headphones, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/service?unid=081573b6ade24c83b6cd50d2c2224b29',
        instruction: 'Ansök om konto till talbokstjänsten Legimus.'
      }
    ]
  },
  {
    id: 'schema',
    title: 'Schema & bokningar',
    icon: Calendar,
    color: 'bg-[#E8F4FC] text-[#106E8D] border-[#106E8D]/20',
    description: 'Schema, grupprumsbokning och tidsplanering',
    services: [
      { 
        name: 'Hitta schema', 
        desc: 'Se ditt schema i Canvas.', 
        icon: Calendar, 
        directLink: 'https://hv.instructure.com/calendar#view_name=month&view_start=2025-12-15',
        guideLink: 'https://www.hv.se/student/it-support/webbtjanster/canvas-larplattform/guider/#schema',
        instruction: 'Logga in på Canvas för att se ditt schema och kurser.'
      },
      { 
        name: 'Boka grupprum', 
        desc: 'Du kan boka grupprum på campus för studier eller grupparbete.', 
        icon: Users, 
        directLink: 'https://schema.hv.se/',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/knowledgeitem?unid=7e14994576f949558d4f428eea395a98',
        instruction: 'Logga in med ditt HV-konto för att boka grupprum.'
      }
    ]
  },
  {
    id: 'praktik',
    title: 'Praktik & VFU',
    icon: Briefcase,
    color: 'bg-[#E8F4FC] text-[#106E8D] border-[#106E8D]/20',
    description: 'Verksamhetsförlagd utbildning och praktikplatser',
    services: [
      { 
        name: 'VFU-placeringar', 
        desc: 'I VFU-webb kan du se dina aktuella och tidigare VFU-placeringar samt kontaktuppgifter till handledare och VFU-samordnare.', 
        icon: Building2, 
        directLink: 'https://valwebb.hv.se/vfu/login.htm',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/knowledgeitem?unid=45b7a656fe524cacb0a22dd89fa1a07b',
        instruction: 'Logga in på Valwebb för att se din VFU-placering.'
      }
    ]
  },
  {
    id: 'digitala',
    title: 'Digitala verktyg & uppkoppling',
    icon: Wifi,
    color: 'bg-[#E8F4FC] text-[#106E8D] border-[#106E8D]/20',
    description: 'WiFi, Office 365 och IT-resurser',
    services: [
      { 
        name: 'Eduroam (WiFi)', 
        desc: 'Anslut till campus WiFi.', 
        icon: Wifi, 
        directLink: 'https://cloudpath.server.hv.se/enroll/UniversityWest/eduroam/wizard/2/page4_download.html',
        guideLink: 'https://www.hv.se/student/it-support/wifi-tradlost-natverk/wifi-eduroam/',
        instruction: 'Använd ditt HV-konto för att ansluta till eduroam WiFi.'
      },
      { 
        name: 'HV-Guest (WiFi)', 
        desc: 'Gäst-WiFi för besökare, 4 timmars anslutning.', 
        icon: Wifi, 
        directLink: 'https://www.hv.se/en/student/it-services-and-support/wifi/wifi---hv-guest/',
        guideLink: 'https://www.hv.se/en/student/it-services-and-support/wifi/wifi---hv-guest/',
        instruction: 'Välj HV-Guest nätverk och följ instruktionerna.'
      },
      { 
        name: 'E-post', 
        desc: 'Outlook för HV-e-post.', 
        icon: Mail, 
        directLink: 'https://outlook.office.com',
        instruction: 'Logga in på Outlook med ditt HV-konto.'
      },
      { 
        name: 'Teams', 
        desc: 'Microsoft Teams för samarbete.', 
        icon: Users, 
        directLink: 'https://teams.microsoft.com',
        instruction: 'Logga in på Teams med ditt HV-konto.'
      },
      { 
        name: 'OneDrive', 
        desc: 'Molnlagring med 5TB.', 
        icon: Cloud, 
        directLink: 'https://onedrive.live.com',
        instruction: 'Logga in på OneDrive med ditt HV-konto.'
      },
      { 
        name: 'Office-program', 
        desc: 'Word, Excel, PowerPoint.', 
        icon: Microsoft, 
        directLink: 'https://office.com',
        instruction: 'Logga in på Office.com med ditt HV-konto.'
      },
      { 
        name: 'Installera Microsoft Office', 
        desc: 'Ladda ner och installera Office gratis.', 
        icon: Download, 
        directLink: 'https://portal.office.com',
        instruction: 'Ladda ner Office från Office-portalen.'
      },
      { 
        name: 'Utskrift och kopiering', 
        desc: 'Skriv ut och kopiera på campus.', 
        icon: Printer, 
        directLink: 'https://print.hv.se',
        guideLink: 'https://www.hv.se/support/digitalt-servicecenter/skriva-ut-skanna-kopiera',
        instruction: 'Registrera ditt Västkort och använd print.hv.se för utskrifter.'
      }
    ]
  },
  {
    id: 'campus',
    title: 'Campus & tillstånd',
    icon: Car,
    color: 'bg-[#E8F4FC] text-[#106E8D] border-[#106E8D]/20',
    description: 'Parkering, Västkort och campusfaciliteter',
    services: [
      { 
        name: 'Parkeringstillstånd', 
        desc: 'Ansök om parkeringstillstånd.', 
        icon: Car, 
        directLink: 'https://mittkonto.hv.se/secure/index.php?lang=sv',
        instruction: 'Registrera mobilnummer i Mitt Konto för digitalt parkeringstillstånd.'
      },
      { 
        name: 'Västkort', 
        desc: 'Ditt passerkort och lånekort.', 
        icon: CreditCard, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/service?unid=92bd9c43e59049139df3bc6beff19bd9',
        guideLink: 'https://www.hv.se/student/it-support/vastkortpasserkort/',
        instruction: 'Hämta Västkort i Servicecenter. För problem vänta 30 min efter aktivering.'
      },
      { 
        name: 'Byt PIN-kod', 
        desc: 'Ändra din PIN-kod för Västkort.', 
        icon: Key, 
        directLink: 'https://mittkonto.hv.se/',
        guideLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/knowledgeitem?unid=e030da48c9ff401fb63f8ef1b7618396',
        instruction: 'Gå till Mitt Konto för att byta PIN-kod.'
      }
    ]
  },
  {
    id: 'felanmalan',
    title: 'Anmäl fel och problem',
    icon: AlertTriangle,
    color: 'bg-[#E8F4FC] text-[#106E8D] border-[#106E8D]/20',
    description: 'Rapportera problem på campus',
    services: [
      { 
        name: 'Felanmälan', 
        desc: 'Här kan du rapportera problem med datorer, lokaler eller Högskolans system.', 
        icon: AlertTriangle, 
        directLink: 'https://topdesk.hv.se/tas/public/ssp/content/detail/service?unid=566d6b5b4b4b4344920d1804e12d7985&from=9953361f-eff1-49b9-8cc4-5230b0249569', // INTERN LÄNK
        instruction: 'Använd formuläret för att rapportera problem på campus.' 
      } 
    ]
  }
]

// Stöd & Service data
const supportServices = [
  {
    title: "Studievägledning",
    description: "Hjälp med studieval, kursplanering och studieuppehåll.",
    icon: GraduationCap,
    color: "bg-blue-600",
    contact: {
      email: "studievagledning@hv.se",
      phone: "0520-22 30 00",
    },
  },
  {
    title: "Studenthälsan",
    description: "Stöd för psykisk och fysisk hälsa. Samtalsstöd och kurser.",
    icon: Heart,
    color: "bg-red-500",
    contact: {
      email: "studenthalsan@hv.se",
      phone: "0520-22 30 00",
    },
  },
  {
    title: "Stöd vid funktionsnedsättning",
    description: "Anpassningar och hjälpmedel för studenter med funktionsnedsättning.",
    icon: Accessibility,
    color: "bg-purple-600",
    contact: {
      email: "nais@hv.se",
      phone: "0520-22 30 00",
    },
  },
  {
    title: "Studentkåren",
    description: "Studentrepresentation, studiesociala aktiviteter och stöd.",
    icon: Users,
    color: "bg-green-600",
    contact: {
      email: "info@hvstudent.se",
      href: "https://www.hvstudent.se",
    },
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [filteredServices, setFilteredServices] = useState([])
  const [showServices, setShowServices] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [shouldScroll, setShouldScroll] = useState(false)
  
  // Refs
  const servicesRef = useRef(null)
  const searchInputRef = useRef(null)

  // Funktion för att scrolla till resultat
  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Radio button handler
  const handleRadioChange = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
      setFilteredServices([])
      setShowServices(false)
      setActiveDropdown(null)
      setShouldScroll(false)
    } else {
      setSelectedCategory(categoryId)
      const category = serviceCategories.find(c => c.id === categoryId)
      setFilteredServices(category?.services || [])
      setShowServices(true)
      setActiveDropdown(null)
      setShouldScroll(true)
      setSearchQuery('')
    }
  }

  // Toggle dropdown
  const toggleDropdown = (categoryId) => {
    if (activeDropdown === categoryId) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(categoryId)
    }
  }

  // Select service from dropdown
  const handleServiceSelect = (service) => {
    if (service.directLink.includes('http')) {
      window.open(service.directLink, '_blank')
    } else {
      window.location.href = service.directLink
    }
    setActiveDropdown(null)
  }

  // Normalize search text
  const normalizeText = (text) => {
    return text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  }

  // Sökfunktion
  const performSearch = (query, triggerScroll = false) => {
    if (!query.trim()) {
      setFilteredServices([])
      setShowServices(false)
      return
    }

    const normalizedQuery = normalizeText(query)
    const words = normalizedQuery.split(' ').filter(word => word.length > 0)
    
    const results = serviceCategories.flatMap(category => 
      category.services.filter(service => {
        const serviceName = normalizeText(service.name)
        const serviceDesc = normalizeText(service.desc)
        const serviceInstruction = normalizeText(service.instruction || '')
        
        return words.some(word => 
          serviceName.includes(word) || 
          serviceDesc.includes(word) ||
          serviceInstruction.includes(word)
        )
      }).map(service => ({
        ...service,
        categoryId: category.id,
        categoryTitle: category.title,
        categoryColor: category.color,
      }))
    )
    
    setFilteredServices(results)
    setSelectedCategory(null)
    setActiveDropdown(null)
    setShowServices(results.length > 0)
    
    if (triggerScroll && results.length > 0) {
      setShouldScroll(true)
    }
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    
    if (value.trim()) {
      performSearch(value, false)
    } else {
      setFilteredServices([])
      setShowServices(false)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      performSearch(searchQuery, true)
      // Stäng tangentbordet på mobil
      searchInputRef.current?.blur()
    }
  }

  // Effekt för att scrolla när resultat visas
  useEffect(() => {
    if (shouldScroll && showServices && (searchQuery.trim() || selectedCategory)) {
      const timer = setTimeout(() => {
        scrollToServices()
        setShouldScroll(false)
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [shouldScroll, showServices, searchQuery, selectedCategory])

  const handleClearFilters = () => {
    setSelectedCategory(null)
    setSearchQuery('')
    setFilteredServices([])
    setShowServices(false)
    setActiveDropdown(null)
    setShouldScroll(false)
    searchInputRef.current?.focus()
  }

  const selectedCategoryData = selectedCategory 
    ? serviceCategories.find(c => c.id === selectedCategory)
    : null

  const hasSearchResults = searchQuery.trim() && filteredServices.length > 0
  const hasCategorySelected = selectedCategory && !searchQuery.trim()

  return (
    <div className="min-h-screen bg-white">
      {/* Header med bild och sök */}
      <div 
        className="relative text-white py-12 md:py-16"
        style={{
          backgroundImage: `url(${hogskolanVastBild})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Mörk overlay för bättre textläsbarhet */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Självservice för studenter
            </h1>
            
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Alla e-tjänster och resurser för dina studier vid Högskolan Väst
            </p>
          </div>
          
          {/* Förbättrad sökruta */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Sök e-tjänster eller information..."
                  className="w-full pl-12 pr-16 py-4 border-0 rounded-lg shadow-lg text-base placeholder:text-slate-400 focus:ring-2 focus:ring-[#D4A843] bg-white text-[#003366]"
                  style={{ color: HV_COLORS.primary }}
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      performSearch(searchQuery, true)
                    }
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#106E8D] hover:bg-[#0d5c74] text-white p-2 rounded-lg transition-colors"
                  title="Tryck Enter för att söka"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-2 flex justify-end">
                <span className="text-white/60 text-xs">
                  Tryck <span className="font-bold">Enter</span> för att visa resultat
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Huvudinnehåll */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Rubrik */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#003366] mb-2">
                {hasSearchResults 
                  ? `Sökresultat för "${searchQuery}"`
                  : hasCategorySelected
                  ? selectedCategoryData?.title
                  : 'Kategorier'
                }
              </h2>
              <p className="text-slate-600">
                {hasSearchResults 
                  ? `${filteredServices.length} tjänster hittades`
                  : hasCategorySelected
                  ? `${filteredServices.length} tillgängliga tjänster`
                  : 'Välj en kategori för att se alla tillgängliga tjänster'
                }
              </p>
            </div>
            
            {(selectedCategory || searchQuery) && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="border-[#106E8D] text-[#106E8D] hover:bg-[#E8F4FC]"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Rensa alla filter
              </Button>
            )}
          </div>
        </div>

        {/* Kategorier - 4 kolumner på stora skärmar */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceCategories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              const isDropdownOpen = activeDropdown === category.id
              
              return (
                <div key={category.id} className="relative">
                  {/* Kategorikort */}
                  <div
                    className={`
                      rounded-lg border p-4 cursor-pointer transition-all duration-200 h-full
                      ${isSelected 
                        ? `${category.color} border-[#106E8D] shadow-md` 
                        : 'bg-white border-slate-200 hover:border-[#106E8D]/40 hover:shadow-sm'
                      }
                      ${isDropdownOpen ? 'rounded-b-none border-b-0' : ''}
                    `}
                    onClick={() => handleRadioChange(category.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                        ${isSelected ? 'bg-[#106E8D]' : 'bg-[#E8F4FC]'}
                      `}>
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#106E8D]'}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-[#003366] text-sm md:text-base">
                              {category.title}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {category.description}
                            </p>
                          </div>
                          
                          {/* Radio knapp */}
                          <div className={`
                            w-4 h-4 rounded-full border flex items-center justify-center ml-2 flex-shrink-0
                            ${isSelected 
                              ? 'border-[#106E8D] bg-[#106E8D]' 
                              : 'border-slate-300'
                            }
                          `}>
                            {isSelected && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            )}
                          </div>
                        </div>
                        
                        {/* Dropdown knapp */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleDropdown(category.id)
                          }}
                          className={`mt-3 flex items-center gap-1 text-xs font-medium text-[#106E8D] hover:text-[#003366] transition-colors ${
                            isDropdownOpen ? 'font-semibold' : ''
                          }`}
                        >
                          {isDropdownOpen ? 'Dölj snabblänkar' : 'Snabblänkar'}
                          <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown meny med snabblänkar */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 right-0 z-50 mt-[-1px]">
                      <div className="border border-slate-200 rounded-b-lg shadow-lg bg-white">
                        <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                          {category.services.slice(0, 3).map((service, index) => {
                            const ServiceIcon = service.icon
                            return (
                              <button
                                key={index}
                                onClick={() => handleServiceSelect(service)}
                                className="w-full flex items-center gap-3 p-2 rounded hover:bg-[#E8F4FC] transition-colors text-left"
                              >
                                <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 bg-[#E8F4FC]">
                                  <ServiceIcon className="w-4 h-4 text-[#106E8D]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm text-[#003366] truncate">
                                    {service.name}
                                  </p>
                                  <p className="text-xs text-slate-500 truncate">
                                    {service.desc}
                                  </p>
                                </div>
                                <ArrowRight className="w-3 h-3 text-[#106E8D] flex-shrink-0" />
                              </button>
                            )
                          })}
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRadioChange(category.id)
                              setActiveDropdown(null)
                            }}
                            className="w-full text-center py-2 text-sm font-medium text-[#106E8D] hover:bg-[#E8F4FC] rounded transition-colors"
                          >
                            Visa alla {category.services.length} tjänster →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Visa tjänster om en kategori är vald eller om sökning har resultat */}
        {showServices && filteredServices.length > 0 && (
          <div 
            ref={servicesRef}
            className="mt-12 scroll-mt-8"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#003366]">
                    {hasSearchResults 
                      ? `Sökresultat (${filteredServices.length})`
                      : `Tjänster inom ${selectedCategoryData?.title} (${filteredServices.length})`
                    }
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {hasSearchResults 
                      ? `Hittade ${filteredServices.length} matchningar för "${searchQuery}"`
                      : `Visar ${filteredServices.length} tillgängliga tjänster`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Tjänster grid - 3 kolumner */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service, index) => {
                const ServiceIcon = service.icon
                const category = serviceCategories.find(c => c.id === service.categoryId)
                
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-[#106E8D]"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${category?.color || 'bg-[#E8F4FC]'}`}>
                        <ServiceIcon className="w-5 h-5 text-[#106E8D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-[#003366] text-sm">
                            {service.name}
                          </h4>
                          {service.directLink.includes('http') && !service.directLink.includes('felanmalan') && (
                            <span className="text-xs text-slate-400">↗</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mb-2 whitespace-normal">
                          {service.desc}
                        </p>
                        <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
                          <p className="text-xs font-medium text-[#106E8D] mb-1">
                            Vad du ska göra:
                          </p>
                          <p className="text-xs text-slate-700">
                            {service.instruction}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Knappar */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {/* Direkt till tjänsten knapp */}
                      {service.directLink.includes('http') || service.directLink.startsWith('/') ? (
                        <a
                          href={service.directLink}
                          target={service.directLink.includes('http') ? '_blank' : undefined}
                          rel={service.directLink.includes('http') ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:shadow-sm"
                          style={{ 
                            backgroundColor: HV_COLORS.secondary,
                            color: 'white'
                          }}
                        >
                          Till tjänsten
                          {service.directLink.includes('http') ? (
                            <ExternalLink className="w-3 h-3" />
                          ) : (
                            <ArrowRight className="w-3 h-3" />
                          )}
                        </a>
                      ) : (
                        <button
                          onClick={() => window.location.href = service.directLink}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:shadow-sm"
                          style={{ 
                            backgroundColor: HV_COLORS.secondary,
                            color: 'white'
                          }}
                        >
                          Till tjänsten
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      
                      {/* Guide knapp (om tillgänglig) */}
                      {service.guideLink && (
                        <a
                          href={service.guideLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium border border-[#106E8D] text-[#106E8D] hover:bg-[#E8F4FC] transition-colors"
                        >
                          <HelpCircle className="w-3 h-3" />
                          Guide
                        </a>
                      )}
                    </div>

                    {/* Kategori badge */}
                    {category && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <span className="inline-block text-xs px-2 py-1 bg-[#E8F4FC] text-[#106E8D] rounded-full">
                          {category.title}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Ingen kategori vald och ingen sökning - visa instruktioner */}
        {!selectedCategory && !searchQuery && !showServices && (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
            <div className="w-16 h-16 bg-[#E8F4FC] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#106E8D]" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              Välj en kategori för att se tjänster
            </h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              Klicka på en kategori ovan för att visa alla tillgängliga tjänster inom den kategorin.
              Sidan scrollar automatiskt ner till resultaten så att du direkt kan se alla tillgängliga tjänster.
              Du kan också använda "Snabblänkar" på varje kategori för snabbåtkomst.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {serviceCategories.slice(0, 4).map((category) => (
                <Button
                  key={category.id}
                  onClick={() => handleRadioChange(category.id)}
                  className="bg-[#106E8D] hover:bg-[#0d5c74] text-white"
                >
                  {category.title}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Inga sökresultat */}
        {searchQuery && filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#E8F4FC] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#106E8D]" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              Inga resultat hittades
            </h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Din sökning "{searchQuery}" matchade inga tjänster.
            </p>
            <Button 
              onClick={handleClearFilters}
              className="bg-[#106E8D] hover:bg-[#0d5c74] text-white"
            >
              Rensa sökning
            </Button>
          </div>
        )}

        {/* Snabbhjälp */}
        {!selectedCategory && !searchQuery && !showServices && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-[#003366] mb-4">Snabbhjälp</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Problem med inloggning?',
                  description: 'Gå till "Konto & inloggning" för lösenordshantering.',
                  icon: Lock,
                  category: 'konto',
                  instruction: 'Klicka på "Konto & inloggning" för att byta lösenord eller få hjälp med inloggning.'
                },
                {
                  title: 'Behöver du böcker?',
                  description: 'Besök "Bibliotek" för att söka böcker och artiklar.',
                  icon: Library,
                  category: 'bibliotek',
                  instruction: 'Använd bibliotekskatalogen för att hitta kurslitteratur.'
                },
                {
                  title: 'Söker du schema?',
                  description: 'Hitta ditt schema under "Schema & bokningar".',
                  icon: Calendar,
                  category: 'schema',
                  instruction: 'Logga in på Canvas eller KronoX för att se ditt schema.'
                },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={index}
                    onClick={() => {
                      const category = serviceCategories.find(c => c.id === item.category)
                      if (category) {
                        handleRadioChange(category.id)
                      }
                    }}
                    className="text-left bg-white border border-slate-200 rounded-lg p-4 hover:border-[#106E8D] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-[#E8F4FC] rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#106E8D]" />
                      </div>
                      <h4 className="font-semibold text-[#003366] text-sm">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">{item.description}</p>
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-100">
                      <p className="text-xs font-medium text-[#106E8D] mb-1">
                        Så här gör du:
                      </p>
                      <p className="text-xs text-slate-700">{item.instruction}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Stöd & Service sektion */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#003366] mb-3">Stöd & Service</h2>
            <p className="text-slate-600 text-sm mb-6">
              Som student på Högskolan Väst har du tillgång till olika former av stöd.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {supportServices.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title} className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3">
                      {service.description}
                    </p>
                    <div className="space-y-1 pt-3 border-t border-slate-100">
                      {service.contact.email && (
                        <a
                          href={`mailto:${service.contact.email}`}
                          className="flex items-center gap-1 text-xs text-[#106E8D] hover:underline"
                        >
                          <MailIcon className="w-3 h-3" />
                          {service.contact.email}
                        </a>
                      )}
                      {service.contact.phone && (
                        <a
                          href={`tel:${service.contact.phone.replace(/[^0-9]/g, '')}`}
                          className="flex items-center gap-1 text-xs text-[#106E8D] hover:underline"
                        >
                          <Phone className="w-3 h-3" />
                          {service.contact.phone}
                        </a>
                      )}
                      {service.contact.href && (
                        <a
                          href={service.contact.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-[#106E8D] hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Webbplats
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NAIS info */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Accessibility className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-purple-800 mb-2">
                    NAIS – Stöd vid funktionsnedsättning
                  </h2>
                  <p className="text-purple-700 text-sm mb-3">
                    Om du har en varaktig funktionsnedsättning kan du få pedagogiskt stöd och anpassningar.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a href="mailto:nais@hv.se">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
                        Kontakta NAIS
                        <MailIcon className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
                    <a href="https://www.hv.se" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-100 text-xs">
                        Läs mer
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-[#003366] mb-2 text-sm">Kontakt</h4>
              <p className="text-xs text-slate-600 mb-1">
                <strong>Telefon:</strong> 0520-22 30 00
              </p>
              <p className="text-xs text-slate-600 mb-1">
                <strong>E-post:</strong> info@hv.se
              </p>
              <p className="text-xs text-slate-600 mb-1">
                <strong>Öppettider:</strong> Mån-fre 08:00-17:00
              </p>
              <p className="text-xs text-slate-600">
                <strong>Akut support:</strong> Ring direkt till relevant avdelning
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-[#003366] mb-2 text-sm">Om Studentwebben</h4>
              <p className="text-xs text-slate-600 mb-2">
                Din digitala portal för e-tjänster och resurser vid Högskolan Väst.
              </p>
              <div className="mt-2">
                <a href="https://www.hv.se" className="text-xs text-[#106E8D] hover:underline font-medium inline-flex items-center gap-1">
                  Besök Högskolan Västs huvudsajt
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-[#003366] mb-2 text-sm">Support & hjälp</h4>
              <p className="text-xs text-slate-600 mb-2">
                Behöver du hjälp? Kontakta IT-support för tekniska problem.
              </p>
              <Button 
                size="sm" 
                className="bg-[#106E8D] hover:bg-[#0d5c74] text-white text-xs"
                onClick={() => window.open('https://www.hv.se/support/digitalt-servicecenter', '_blank')}
              >
                Kontakta IT-support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}