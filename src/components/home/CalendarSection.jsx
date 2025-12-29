import React from 'react'
import { Link } from 'react-router-dom'
import { createPageUrl } from '../../utils/utils'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

const events = [
  {
    date: "15",
    month: "Jan",
    title: "Sista dag för sen anmälan VT25",
    time: "23:59",
    type: "deadline",
    location: null,
  },
  {
    date: "20",
    month: "Jan",
    title: "Terminsstart vårterminen",
    time: "08:00",
    type: "event",
    location: "Campus Trollhättan",
  },
  {
    date: "24",
    month: "Jan",
    title: "Studievägledning drop-in",
    time: "10:00 - 14:00",
    type: "workshop",
    location: "Studentcentrum",
  },
];

export default function CalendarSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#003366] mb-2">Kalender & händelser</h2>
            <p className="text-slate-600">Viktiga datum och aktiviteter</p>
          </div>
          <Button variant="outline" className="border-[#0066CC] text-[#0066CC] hover:bg-[#E8F4FC]">
            <Calendar className="w-4 h-4 mr-2" />
            Gå till kalender
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Date badge */}
                    <div className="w-20 bg-slate-50 flex flex-col items-center justify-center p-4 border-r border-slate-100">
                      <span className="text-3xl font-bold text-[#003366]">{event.date}</span>
                      <span className="text-sm text-slate-500 uppercase">{event.month}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="inline-block w-2 h-2 rounded-full bg-[#0066CC] mb-2" />
                      <h3 className="font-semibold text-slate-800 mb-2 leading-tight">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}