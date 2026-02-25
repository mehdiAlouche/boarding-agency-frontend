'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Download,
} from 'lucide-react'

const mockAppointments = [
  {
    id: 1,
    date: '2026-02-18',
    time: { start: '2:00 PM', end: '3:00 PM' },
    type: 'Career Guidance Session',
    advisor: { name: 'Dr. Martin Dupont', avatar: '👨‍🏫', title: 'Career Counselor' },
    format: 'virtual' as const,
    duration: '1 hour',
    status: 'confirmed' as const,
    isPast: false,
    isImminent: true,
  },
  {
    id: 2,
    date: '2026-02-25',
    time: { start: '10:00 AM', end: '10:30 AM' },
    type: 'Quick Check-in',
    advisor: { name: 'Sarah Johnson', avatar: '👩‍💼', title: 'HR Advisor' },
    format: 'in-person' as const,
    location: 'Office 204',
    duration: '30 min',
    status: 'confirmed' as const,
    isPast: false,
  },
  {
    id: 3,
    date: '2026-02-20',
    time: { start: '3:00 PM', end: '3:30 PM' },
    type: 'Resume Review',
    advisor: { name: 'Jean Leclerc', avatar: '👨‍💻', title: 'Resume Specialist' },
    format: 'virtual' as const,
    duration: '30 min',
    status: 'pending' as const,
    isPast: false,
  },
  {
    id: 4,
    date: '2026-02-10',
    time: { start: '1:00 PM', end: '2:00 PM' },
    type: 'Initial Consultation',
    advisor: { name: 'Dr. Martin Dupont', avatar: '👨‍🏫', title: 'Career Counselor' },
    format: 'virtual' as const,
    duration: '1 hour',
    status: 'completed' as const,
    isPast: true,
  },
  {
    id: 5,
    date: '2026-02-12',
    time: { start: '11:00 AM', end: '11:30 AM' },
    type: 'Technical Interview Prep',
    advisor: { name: 'Sarah Johnson', avatar: '👩‍💼', title: 'HR Advisor' },
    format: 'virtual' as const,
    duration: '30 min',
    status: 'cancelled' as const,
    cancellationReason: 'Advisor unavailable',
    isPast: true,
  },
]

const mockAdvisors = [
  {
    id: 1,
    name: 'Dr. Martin Dupont',
    title: 'Career Counselor',
    avatar: '👨‍🏫',
    specialization: 'Tech Industry, Resume Review',
    rating: 4.9,
    nextAvailable: 'Tomorrow 2 PM',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'HR Advisor',
    avatar: '👩‍💼',
    specialization: 'Interview Prep, Negotiation',
    rating: 4.8,
    nextAvailable: 'Today 4 PM',
  },
  {
    id: 3,
    name: 'Jean Leclerc',
    title: 'Resume Specialist',
    avatar: '👨‍💻',
    specialization: 'CV Writing, Portfolio Building',
    rating: 4.7,
    nextAvailable: 'Feb 25 10 AM',
  },
]

type Appointment = (typeof mockAppointments)[0]

function AppointmentItem({ appointment, isPast }: { appointment: Appointment; isPast: boolean }) {
  const appointmentDate = new Date(appointment.date)
  const month = appointmentDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const day = appointmentDate.getDate()
  const dayOfWeek = appointmentDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()

  const getStatusBadge = () => {
    switch (appointment.status) {
      case 'confirmed':
        return <Badge className="border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Confirmed</Badge>
      case 'pending':
        return (
          <Badge className="border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
            Pending Confirmation
          </Badge>
        )
      case 'completed':
        return (
          <Badge className="flex items-center gap-1 border border-green-100 bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
            <CheckCircle2 className="h-3 w-3" /> Completed
          </Badge>
        )
      case 'cancelled':
        return (
          <Badge className="flex items-center gap-1 border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
            <XCircle className="h-3 w-3" /> Cancelled
          </Badge>
        )
    }
  }

  return (
    <div
      className={`flex items-start gap-4 border-b border-slate-100 p-6 transition-colors hover:bg-slate-50 last:border-b-0 ${isPast && appointment.status === 'cancelled' ? 'opacity-60' : ''}`}
    >
      <div
        className={`min-w-24 flex-shrink-0 rounded-lg p-4 text-center ${isPast || appointment.status === 'cancelled' ? 'bg-slate-50' : 'bg-blue-50'}`}
      >
        <p className={`text-xs font-bold uppercase ${isPast || appointment.status === 'cancelled' ? 'text-slate-600' : 'text-blue-600'}`}>
          {dayOfWeek}
        </p>
        <p className="text-3xl font-bold text-slate-900">{day}</p>
        <p className={`text-xs ${isPast || appointment.status === 'cancelled' ? 'text-slate-500' : 'text-slate-600'}`}>{month}</p>
      </div>

      <div className="flex-1 px-4">
        <div className="mb-1 flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-900">
            {appointment.time.start} - {appointment.time.end}
          </span>
        </div>
        <p className="mb-1 text-base font-medium text-slate-900">{appointment.type}</p>
        <div className="mb-2 flex items-center gap-1 text-sm text-slate-600">
          <span className="text-lg">{appointment.advisor.avatar}</span>
          <span className="font-medium">{appointment.advisor.name}</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          {appointment.format === 'virtual' ? (
            <Badge variant="outline" className="border-slate-300 bg-white text-xs text-slate-600 hover:bg-white">
              <Video className="mr-1 h-3 w-3" /> Virtual Meeting
            </Badge>
          ) : (
            <>
              <Badge variant="outline" className="border-slate-300 bg-white text-xs text-slate-600 hover:bg-white">
                <MapPin className="mr-1 h-3 w-3" /> In-Person
              </Badge>
              <span className="text-xs text-slate-500">{appointment.location}</span>
            </>
          )}
          <span className="text-xs text-slate-500">{appointment.duration}</span>
        </div>
        {'cancellationReason' in appointment && appointment.cancellationReason && (
          <p className="mt-1 text-xs italic text-slate-500">{appointment.cancellationReason}</p>
        )}
      </div>

      <div className="flex flex-shrink-0 flex-col items-end justify-between gap-3">
        {getStatusBadge()}
        <div className="flex flex-col items-end space-y-2">
          {!isPast && appointment.status === 'confirmed' && appointment.isImminent && (
            <Button className="h-8 bg-blue-600 px-3 text-xs text-white hover:bg-blue-700">Join Meeting</Button>
          )}
          {(!isPast || (isPast && appointment.status !== 'cancelled')) && !appointment.isImminent && (
            <Button variant="outline" className="h-8 border-slate-300 px-3 text-xs text-slate-700 hover:bg-slate-50">
              View Details
            </Button>
          )}
          {!isPast && appointment.status === 'confirmed' && (
            <a href="#" className="text-xs text-blue-600 hover:underline">
              Reschedule
            </a>
          )}
          {!isPast && appointment.status === 'pending' && (
            <a href="#" className="text-xs text-red-600 hover:underline">
              Cancel Request
            </a>
          )}
          {isPast && appointment.status === 'completed' && (
            <Button variant="outline" className="h-8 border-slate-300 px-3 text-xs text-slate-700 hover:bg-slate-50">
              View Notes
            </Button>
          )}
          {isPast && appointment.status === 'cancelled' && (
            <Button variant="outline" className="h-8 border-slate-300 px-3 text-xs text-slate-700 hover:bg-slate-50">
              Book Again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 24))

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const padding = Array.from({ length: firstDay }, (_, i) => i)

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-6 py-5">
        <div className="flex items-center gap-4 text-slate-900">
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
            <ChevronLeft className="h-5 w-5 text-slate-600 hover:text-slate-900" />
          </button>
          <span className="text-lg font-semibold">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
            <ChevronRight className="h-5 w-5 text-slate-600 hover:text-slate-900" />
          </button>
        </div>
        <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">
          Today
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 grid grid-cols-7 gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={`${day}-${index}`} className="py-2 text-center text-xs font-semibold uppercase text-slate-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {padding.map((_, i) => (
            <div key={`pad-${i}`} className="h-12" />
          ))}
          {days.map((day) => {
            const hasAppointment = mockAppointments.some(
              (a) =>
                new Date(a.date).getDate() === day &&
                new Date(a.date).getMonth() === currentDate.getMonth() &&
                new Date(a.date).getFullYear() === currentDate.getFullYear(),
            )
            const isToday =
              day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear()

            return (
              <div
                key={day}
                className={`flex h-12 cursor-pointer flex-col items-center justify-center rounded-lg border border-slate-100 p-1 transition-colors hover:bg-slate-50 ${
                  isToday ? 'border-blue-600 bg-blue-50' : ''
                }`}
              >
                <span className={`text-sm font-medium ${isToday ? 'font-bold text-blue-600' : 'text-slate-900'}`}>{day}</span>
                {hasAppointment && <div className={`mt-0.5 h-1.5 w-1.5 rounded-full ${isToday ? 'bg-blue-600' : 'bg-blue-600'}`} />}
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-slate-600">Appointments scheduled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BookAppointmentForm() {
  const [step, setStep] = useState(1)
  const [selectedAdvisor, setSelectedAdvisor] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM']

  if (step === 7) {
    return (
      <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-green-600">Appointment Booked!</h3>
          <p className="mb-4 text-sm text-slate-600">
            Your appointment has been confirmed. A calendar invite has been sent to your email.
          </p>
          <div className="mb-6 space-y-2">
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" /> Download Calendar Invite
            </Button>
            <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50">
              View Appointment
            </Button>
          </div>
          <button onClick={() => setStep(1)} className="text-sm text-blue-600 hover:underline">
            Book Another
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 px-6 py-5">
        <CardTitle className="text-xl font-semibold text-slate-900">Book New Appointment</CardTitle>
        <p className="mt-1 text-sm text-slate-500">Step {step} of 7</p>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {step === 1 && (
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">Choose an Advisor</label>
            <div className="space-y-3">
              {mockAdvisors.map((advisor) => (
                <div
                  key={advisor.id}
                  onClick={() => {
                    setSelectedAdvisor(advisor.id)
                    setStep(2)
                  }}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    selectedAdvisor === advisor.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <span className="text-3xl">{advisor.avatar}</span>
                      <div>
                        <p className="text-base font-semibold text-slate-900">{advisor.name}</p>
                        <p className="text-xs text-slate-500">{advisor.title}</p>
                        <p className="mt-1 text-xs text-slate-600">{advisor.specialization}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-yellow-600">{advisor.rating} ★</p>
                      <p className="mt-2 text-xs text-green-600">{advisor.nextAvailable}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">Select Date</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { date: '2026-02-18', label: 'Tomorrow' },
                { date: '2026-02-19', label: 'Feb 19' },
                { date: '2026-02-20', label: 'Feb 20' },
                { date: '2026-02-21', label: 'Feb 21' },
              ].map((d) => (
                <button
                  key={d.date}
                  onClick={() => {
                    setSelectedDate(d.date)
                    setStep(3)
                  }}
                  className={`rounded-lg border-2 p-3 text-sm font-medium transition-all ${
                    selectedDate === d.date
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-slate-200 text-slate-700 hover:border-blue-500'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">Select Time</label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time)
                    setStep(4)
                  }}
                  className={`rounded-lg border p-2 text-sm font-medium transition-all ${
                    selectedTime === time ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 text-slate-700 hover:bg-blue-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {step >= 4 && (
          <div className="space-y-4 border-t border-slate-200 pt-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{mockAdvisors.find((a) => a.id === selectedAdvisor)?.name}</p>
              <p className="mt-1 text-sm text-slate-600">
                {selectedDate} at {selectedTime}
              </p>
            </div>
            <div className="space-y-2">
              <Button onClick={() => setStep(7)} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Confirm Appointment
              </Button>
              <button onClick={() => setStep(1)} className="w-full text-sm text-slate-500 hover:text-slate-700">
                Cancel
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function AppointmentsPage() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredAppointments =
    statusFilter === 'all' ? mockAppointments : mockAppointments.filter((appointment) => appointment.status === statusFilter)
  const upcomingAppointments = filteredAppointments.filter((appointment) => !appointment.isPast)
  const pastAppointments = filteredAppointments.filter((appointment) => appointment.isPast)

  return (
    <main className="min-h-screen bg-white">
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Appointments</h1>
              <p className="mt-2 text-xl text-slate-600">Schedule and manage meetings with your career advisors</p>
            </div>
            <Button className="h-10 bg-blue-600 text-white hover:bg-blue-700">Book New Appointment</Button>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-blue-600">2 Upcoming</span>
            </div>
            <div className="h-4 w-0.5 bg-slate-300" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-green-600">8 Completed</span>
            </div>
            <div className="h-4 w-0.5 bg-slate-300" />
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-yellow-600">1 Pending Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-8">
            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="flex items-center justify-between p-6">
                <div className="rounded-lg bg-slate-100 p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                      viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                      viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Calendar View
                  </button>
                </div>

                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:border-slate-400"
                  >
                    <option value="all">All Appointments</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:border-slate-400">
                    <option value="all">All Advisors</option>
                    <option value="dupont">Dr. Martin Dupont</option>
                    <option value="johnson">Sarah Johnson</option>
                    <option value="leclerc">Jean Leclerc</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {viewMode === 'list' ? (
              <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-6 py-5">
                  <CardTitle className="text-xl font-semibold text-slate-900">Your Appointments</CardTitle>
                  <span className="text-sm text-slate-500">Showing {filteredAppointments.length} appointments</span>
                </CardHeader>
                <CardContent className="p-0">
                  {upcomingAppointments.length > 0 && (
                    <div>
                      <div className="border-b border-slate-100 bg-slate-50 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-700">
                        Upcoming
                      </div>
                      {upcomingAppointments.map((appointment) => (
                        <AppointmentItem key={appointment.id} appointment={appointment} isPast={false} />
                      ))}
                    </div>
                  )}

                  {pastAppointments.length > 0 && (
                    <div>
                      <div className="mt-4 border-b border-slate-100 bg-slate-50 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-700">
                        Past
                      </div>
                      {pastAppointments.map((appointment) => (
                        <AppointmentItem key={appointment.id} appointment={appointment} isPast />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <CalendarView />
            )}
          </div>

          <div className="space-y-8">
            <BookAppointmentForm />

            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 px-6 py-5">
                <CardTitle className="text-xl font-semibold text-slate-900">Next Appointment</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="mb-1 text-sm text-slate-500">FEB</p>
                  <p className="text-5xl font-bold text-slate-900">18</p>
                  <p className="mt-2 text-sm text-slate-600">Wednesday</p>
                  <p className="mt-3 text-base font-medium text-slate-900">2:00 PM - 3:00 PM</p>
                  <div className="mt-3 flex items-center justify-center gap-2 text-slate-600">
                    <span className="text-lg">👨‍🏫</span>
                    <span className="text-sm font-medium">Dr. Martin Dupont</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Career Guidance Session</p>
                  <p className="mt-3 text-sm font-medium text-blue-600">Tomorrow</p>
                  <div className="mt-6 space-y-2">
                    <Button className="h-9 w-full bg-blue-600 text-white hover:bg-blue-700">
                      <Phone className="mr-2 h-4 w-4" /> Join Meeting
                    </Button>
                    <Button variant="outline" className="h-9 w-full border-slate-300 text-slate-700 hover:bg-slate-50">
                      Add to Calendar
                    </Button>
                    <Button variant="outline" className="h-9 w-full border-slate-300 text-slate-700 hover:bg-slate-50">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 px-6 py-5">
                <CardTitle className="text-xl font-semibold text-slate-900">Advisor Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {mockAdvisors.map((advisor) => (
                  <div key={advisor.id} className="flex items-center justify-between border-b border-slate-100 py-2 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{advisor.avatar}</span>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{advisor.name}</p>
                        <p className="text-xs text-slate-500">{advisor.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="flex items-center gap-1 text-xs font-medium text-green-600">
                        <CheckCircle2 className="h-3 w-3" />
                        Available
                      </p>
                      <p className="text-xs text-slate-500">{advisor.nextAvailable}</p>
                    </div>
                  </div>
                ))}
                <a href="#" className="block pt-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                  View Full Availability →
                </a>
              </CardContent>
            </Card>

            <Card className="rounded-xl border border-blue-100 bg-blue-50 shadow-sm">
              <CardHeader className="border-b border-blue-100 px-6 py-5">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-base font-semibold text-slate-900">Appointment Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                {[
                  'Book appointments at least 2 days in advance',
                  'Prepare questions or topics before the meeting',
                  'Join virtual meetings 5 minutes early',
                  'Cancel at least 24 hours in advance if needed',
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                    <span>{tip}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
