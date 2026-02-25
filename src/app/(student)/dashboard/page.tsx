'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  User,
  Building2,
  Calendar,
  MessageCircle,
  Sparkles,
  Clock,
  CheckCircle2,
  Lightbulb,
  UserPlus,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

// Mock data
const mockStats = {
  profileCompletion: 75,
  activeMatches: 12,
  newMatches: 3,
  upcomingAppointments: 2,
  unreadMessages: 5,
  messagesFromAdvisor: 2,
}

const mockMatches = [
  {
    id: 1,
    company: 'TechCorp',
    industry: 'Software',
    location: 'Paris, France',
    matchScore: 87,
    matchReason: 'Strong match in React & Python',
  },
  {
    id: 2,
    company: 'InnovateLabs',
    industry: 'AI/ML',
    location: 'Berlin, Germany',
    matchScore: 82,
    matchReason: 'Perfect fit for ML engineering role',
  },
  {
    id: 3,
    company: 'DataFlow',
    industry: 'Data Analytics',
    location: 'London, UK',
    matchScore: 78,
    matchReason: 'Excellent skills alignment',
  },
]

const mockAppointments = [
  {
    id: 1,
    advisorName: 'Dr. Martin Dupont',
    type: 'Career Guidance Session',
    date: '2026-02-18',
    time: '2:00 PM - 3:00 PM',
    format: 'Virtual Meeting',
    isPending: true,
  },
  {
    id: 2,
    advisorName: 'Demo Johnson',
    type: 'Technical Interview Prep',
    date: '2026-02-22',
    time: '10:00 AM - 11:00 AM',
    format: 'Virtual Meeting',
    isPending: false,
  },
]

const journeySteps = [
  { step: 1, title: 'Profile Created', date: 'Feb 10, 2026', status: 'completed' },
  { step: 2, title: 'CV Uploaded', date: 'Feb 12, 2026', status: 'completed' },
  { step: 3, title: 'Getting Matched', date: null, status: 'current' },
  { step: 4, title: 'Interview Scheduled', date: null, status: 'upcoming' },
  { step: 5, title: 'Placement Confirmed', date: null, status: 'upcoming' },
]

const quickActionsTips = [
  { text: 'Upload your CV to improve matches', href: '/profile' },
  { text: 'Add 3 more technical skills', href: '/profile' },
  { text: 'Schedule your first advisor meeting', href: '/appointments' },
]

function StatCard({
  icon: Icon,
  number,
  label,
  hint,
  badge,
  href,
  iconBgColor,
  numberColor,
}: {
  icon: React.ReactNode
  number: string | number
  label: string
  hint: string
  badge?: { text: string; count?: number }
  href: string
  iconBgColor: string
  numberColor?: string
}) {
  return (
    <Link href={href}>
      <Card className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`${iconBgColor} rounded-full p-3 flex items-center justify-center w-12 h-12`}>
              {typeof Icon === 'string' ? Icon : Icon}
            </div>
            {badge && (
              <Badge
                className={`${
                  badge.text === 'New'
                    ? 'bg-blue-600 text-white'
                    : badge.text.includes('unread') || badge.count
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-600 text-white'
                } rounded-full px-2 py-0.5 text-xs font-medium`}
              >
                {badge.count || badge.text}
              </Badge>
            )}
          </div>

          <div className="mb-3">
            <div className={`text-3xl font-bold ${numberColor || 'text-slate-900'}`}>{number}</div>
            <p className="text-sm text-slate-600 font-medium mt-1">{label}</p>
          </div>

          {label.includes('Profile') && (
            <div className="mb-3">
              <Progress value={number as number} className="h-2 bg-slate-200" />
            </div>
          )}

          <p className="text-xs text-slate-500">{hint}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function JourneyTimeline() {
  return (
    <div className="space-y-4">
      {journeySteps.map((item, idx) => (
        <div key={item.step} className="relative">
          <div className="flex items-start gap-4">
            {/* Circle indicator */}
            <div className="relative z-10 flex-shrink-0">
              {item.status === 'completed' && (
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
              {item.status === 'current' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              )}
              {item.status === 'upcoming' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 text-slate-500 text-sm font-medium">
                  {item.step}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="pt-1 flex-1">
              <p
                className={`text-sm font-medium ${item.status === 'current' ? 'text-blue-600 font-semibold' : item.status === 'completed' ? 'text-slate-900' : 'text-slate-500'}`}
              >
                {item.title}
              </p>
              {item.status === 'current' && <p className="text-xs text-slate-500 mt-0.5">In progress...</p>}
              {item.date && <p className="text-xs text-slate-500 mt-0.5">{item.date}</p>}
            </div>
          </div>

          {/* Connecting line */}
          {idx < journeySteps.length - 1 && (
            <div
              className={`absolute left-3.5 top-8 w-0.5 h-8 ${item.status === 'completed' ? 'bg-green-500' : 'bg-slate-200'}`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <main className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-xl text-slate-600">Good morning, Demo 👋</p>
          <p className="text-sm text-slate-500 mt-1">{dateStr}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Stats Overview */}
            <div>
              <div className="grid grid-cols-2 gap-6">
                <StatCard
                  icon={<User className="w-6 h-6 text-blue-600" />}
                  number={`${mockStats.profileCompletion}%`}
                  label="Profile Complete"
                  hint="Add skills to reach 100%"
                  href="/profile"
                  iconBgColor="bg-blue-50"
                />
                <StatCard
                  icon={<Building2 className="w-6 h-6 text-blue-600" />}
                  number={mockStats.activeMatches}
                  label="Companies Matched"
                  hint={`${mockStats.newMatches} new matches this week`}
                  badge={{ text: 'New', count: mockStats.newMatches }}
                  href="/matching"
                  iconBgColor="bg-blue-50"
                />
                <StatCard
                  icon={<Calendar className="w-6 h-6 text-blue-600" />}
                  number={mockStats.upcomingAppointments}
                  label="Upcoming Meetings"
                  hint="Next: Tomorrow at 2:00 PM"
                  href="/appointments"
                  iconBgColor="bg-blue-50"
                />
                <StatCard
                  icon={<MessageCircle className="w-6 h-6 text-red-500" />}
                  number={mockStats.unreadMessages}
                  label="Unread Messages"
                  hint={`${mockStats.messagesFromAdvisor} from your advisor`}
                  badge={{ text: 'unread', count: mockStats.unreadMessages }}
                  href="/messages"
                  iconBgColor="bg-red-50"
                  numberColor="text-red-500"
                />
              </div>
            </div>

            {/* Recent Matches */}
            <Card className="bg-white border border-slate-200 rounded-xl shadow-sm">
              <CardHeader className="px-6 py-5 border-b border-slate-100 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-900">Recent Matches</CardTitle>
                <Link href="/matching">
                  <span className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer">
                    View All <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {mockMatches.length > 0 ? (
                  <div>
                    {mockMatches.map((match, idx) => (
                      <div key={match.id} className={`p-6 hover:bg-slate-50 transition-colors ${idx !== mockMatches.length - 1 ? 'border-b border-slate-100' : ''}`}>
                        <div className="flex items-start gap-4">
                          {/* Company logo placeholder */}
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-slate-400" />
                          </div>

                          {/* Company info */}
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-slate-900">{match.company}</h3>
                            <p className="text-sm text-slate-500">{match.industry} · {match.location}</p>
                            <p className="text-xs text-slate-500 italic mt-1">{match.matchReason}</p>
                          </div>

                          {/* Match score and action */}
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-center">
                              <div className="text-xl font-bold text-blue-600">{match.matchScore}%</div>
                              <div className="text-xs text-slate-500">Match</div>
                            </div>
                            <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-base font-medium text-slate-600">No matches yet</p>
                    <p className="text-sm text-slate-500 mt-1">Complete your profile to get matched</p>
                    <Link href="/profile">
                      <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Complete Profile</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="bg-white border border-slate-200 rounded-xl shadow-sm">
              <CardHeader className="px-6 py-5 border-b border-slate-100 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-900">Upcoming Appointments</CardTitle>
                <Link href="/appointments">
                  <span className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer">
                    View All <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {mockAppointments.length > 0 ? (
                  <div>
                    {mockAppointments.map((appt, idx) => {
                      const apptDate = new Date(appt.date)
                      const month = apptDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
                      const day = apptDate.getDate()

                      return (
                        <div
                          key={appt.id}
                          className={`p-6 hover:bg-slate-50 transition-colors ${idx !== mockAppointments.length - 1 ? 'border-b border-slate-100' : ''}`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Date block */}
                            <div className="bg-blue-50 rounded-lg p-3 text-center min-w-14 flex-shrink-0">
                              <p className="text-xs font-bold text-blue-600">{month}</p>
                              <p className="text-2xl font-bold text-slate-900">{day}</p>
                            </div>

                            {/* Appointment info */}
                            <div className="flex-1">
                              <h3 className="text-base font-semibold text-slate-900">{appt.advisorName}</h3>
                              <p className="text-sm text-slate-600 mt-1">{appt.type}</p>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                                <Clock className="w-3.5 h-3.5" />
                                {appt.time}
                              </div>
                              <Badge variant="outline" className="mt-2 border-slate-300 text-slate-600 bg-white hover:bg-white">
                                {appt.format}
                              </Badge>
                            </div>

                            {/* Action buttons */}
                            <div className="flex-shrink-0">
                              {appt.isPending ? (
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-9">Join</Button>
                              ) : (
                                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 h-9">
                                  Details
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-base font-medium text-slate-600">No upcoming appointments</p>
                    <Link href="/appointments">
                      <Button variant="outline" className="mt-4 border-slate-300">
                        Book an Appointment
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN - Sticky Sidebar */}
          <div className="space-y-8">
            {/* Journey Progress Card */}
            <Card className="bg-white border border-slate-200 rounded-xl shadow-sm">
              <CardHeader className="px-6 py-5 border-b border-slate-100">
                <CardTitle className="text-xl font-semibold text-slate-900">My Journey</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <JourneyTimeline />
                <Link href="/journey">
                  <p className="text-sm text-blue-600 hover:text-blue-700 font-medium text-center mt-6 cursor-pointer">
                    View Full Journey →
                  </p>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="bg-white border border-slate-200 rounded-xl shadow-sm">
              <CardHeader className="px-6 py-5 border-b border-slate-100">
                <CardTitle className="text-xl font-semibold text-slate-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Link href="/profile" className="w-full block">
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-slate-700 font-medium border-slate-300 hover:bg-slate-50 ${mockStats.profileCompletion < 100 ? 'border-blue-600 border-2' : ''}`}
                  >
                    <UserPlus className="w-4.5 h-4.5 text-slate-500 mr-3" />
                    Complete My Profile
                  </Button>
                </Link>
                <Link href="/matching" className="w-full block">
                  <Button variant="outline" className="w-full justify-start text-slate-700 font-medium border-slate-300 hover:bg-slate-50">
                    <Sparkles className="w-4.5 h-4.5 text-slate-500 mr-3" />
                    Browse Matches
                  </Button>
                </Link>
                <Link href="/appointments" className="w-full block">
                  <Button variant="outline" className="w-full justify-start text-slate-700 font-medium border-slate-300 hover:bg-slate-50">
                    <Calendar className="w-4.5 h-4.5 text-slate-500 mr-3" />
                    Book an Advisor
                  </Button>
                </Link>
                <Link href="/messages" className="w-full block">
                  <Button variant="outline" className="w-full justify-start text-slate-700 font-medium border-slate-300 hover:bg-slate-50">
                    <MessageCircle className="w-4.5 h-4.5 text-slate-500 mr-3" />
                    View Messages
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
              <CardHeader className="px-6 py-5 border-b border-blue-100">
                <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {quickActionsTips.map((tip, idx) => (
                  <Link key={idx} href={tip.href}>
                    <div className="flex items-start gap-3 text-sm text-slate-700 hover:text-blue-600 cursor-pointer transition-colors">
                      <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{tip.text}</span>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
