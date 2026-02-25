'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  CheckCircle2,
  FileCheck,
  Sparkles,
  Calendar,
  Users,
  Trophy,
  UserCheck,
  Target,
  Lock,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Loader2,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'

type StepStatus = 'completed' | 'current' | 'upcoming'

type StepDetail = {
  text: string
  icon?: LucideIcon
  color?: string
  isProgress?: boolean
  percent?: number
  isSubtext?: boolean
  isSubtext2?: boolean
  isRequired?: boolean
  completed?: boolean
}

type StepAction = {
  label: string
  href: string
}

type JourneyStep = {
  id: number
  number: number
  title: string
  description: string
  status: StepStatus
  icon: LucideIcon
  date?: string
  time?: string
  estimated?: string
  details?: StepDetail[]
  detailsBg: string
  detailsBorder: string
  action?: StepAction
  isFinal?: boolean
}

type Milestone = {
  icon: LucideIcon
  title: string
  date?: string
  status: 'completed' | 'in-progress' | 'locked'
  progress?: {
    current: number
    total: number
  }
}

type NextAction = {
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  progress?: string
  button?: {
    label: string
    href: string
    variant?: 'outline'
  }
}

const journeyCompletion = 60

const journeySteps: JourneyStep[] = [
  {
    id: 1,
    number: 1,
    title: 'Profile Created',
    description: 'Your account has been successfully created and verified',
    status: 'completed',
    icon: CheckCircle2,
    date: 'Feb 10, 2026',
    time: '2:30 PM',
    details: [
      { text: 'Profile Information: Complete', icon: CheckCircle2, color: 'text-green-700' },
      { text: 'Email Verified: Yes', icon: CheckCircle2, color: 'text-green-700' },
    ],
    detailsBg: 'bg-green-50',
    detailsBorder: 'border-green-200',
  },
  {
    id: 2,
    number: 2,
    title: 'CV Uploaded & Analyzed',
    description: 'Your CV has been uploaded and analyzed by our AI system',
    status: 'completed',
    icon: FileCheck,
    date: 'Feb 12, 2026',
    time: '10:15 AM',
    details: [
      { text: 'CV Uploaded: sarah_chen_cv.pdf', icon: CheckCircle2, color: 'text-green-700' },
      { text: 'Skills Extracted: 12 skills found', icon: Sparkles, color: 'text-green-700' },
      { text: 'AI Analysis: Complete', icon: CheckCircle2, color: 'text-green-700' },
    ],
    detailsBg: 'bg-green-50',
    detailsBorder: 'border-green-200',
  },
  {
    id: 3,
    number: 3,
    title: 'Getting Matched',
    description: 'Our AI is finding the best company matches based on your profile',
    status: 'current',
    icon: Sparkles,
    date: 'Feb 13, 2026',
    details: [
      { text: 'AI Matching in Progress...', isProgress: true, percent: 75 },
      { text: '12 companies matched so far', isSubtext: true },
      { text: '3 new matches this week', isSubtext2: true },
    ],
    detailsBg: 'bg-blue-50',
    detailsBorder: 'border-blue-200',
    action: { label: 'View Matches', href: '/matching' },
  },
  {
    id: 4,
    number: 4,
    title: 'Interviews Scheduled',
    description: 'Schedule and attend interviews with matched companies',
    status: 'upcoming',
    icon: Calendar,
    estimated: '1-2 weeks',
    details: [
      { text: 'Complete matching process', isRequired: true, completed: true },
      { text: 'Express interest in at least 3 companies', isRequired: true, completed: false },
      { text: 'Wait for company responses', isRequired: true, completed: false },
    ],
    detailsBg: 'bg-slate-50',
    detailsBorder: 'border-slate-200',
  },
  {
    id: 5,
    number: 5,
    title: 'Advisor Consultation',
    description: 'Meet with your career advisor for interview preparation',
    status: 'upcoming',
    icon: Users,
    details: [
      { text: 'Complete interviews scheduling', isRequired: true, completed: false },
      { text: 'Book advisor appointment', isRequired: true, completed: false },
    ],
    detailsBg: 'bg-slate-50',
    detailsBorder: 'border-slate-200',
  },
  {
    id: 6,
    number: 6,
    title: 'Placement Confirmed',
    description: 'Congratulations! Your internship placement is confirmed',
    status: 'upcoming',
    icon: Trophy,
    estimated: '4-6 weeks',
    isFinal: true,
    detailsBg: 'bg-gradient-to-br from-slate-50 to-slate-100',
    detailsBorder: 'border-slate-200',
  },
]

const milestones: Milestone[] = [
  { icon: UserCheck, title: 'Profile Complete', date: 'Feb 10', status: 'completed' },
  { icon: FileCheck, title: 'CV Uploaded', date: 'Feb 12', status: 'completed' },
  { icon: Sparkles, title: 'First Match', date: 'Feb 13', status: 'completed' },
  { icon: Target, title: '10 Matches', progress: { current: 8, total: 10 }, status: 'in-progress' },
  { icon: Calendar, title: 'First Interview', status: 'locked' },
  { icon: Users, title: 'Advisor Session', status: 'locked' },
]

const nextActions: NextAction[] = [
  {
    priority: 'high',
    title: 'Review Your Matches',
    description: 'Browse 12 companies matched to your profile',
    button: { label: 'View Matches', href: '/matching' },
  },
  {
    priority: 'medium',
    title: 'Express Interest',
    description: 'Show interest in 3 companies to proceed',
    progress: '0/3 companies',
  },
  {
    priority: 'low',
    title: 'Schedule Advisor Meeting',
    description: 'Book a session to prepare for interviews',
    button: { label: 'Book Now', href: '/appointments', variant: 'outline' },
  },
]

const tips = [
  'Review all your matches to find best opportunities',
  'Express interest early to increase response rates',
  'Prepare your interview answers in advance',
  'Stay active and check updates daily',
]

function TimelineStep({ step, index, totalSteps }: { step: JourneyStep; index: number; totalSteps: number }) {
  const StepIcon = step.icon
  const isCompleted = step.status === 'completed'
  const isCurrent = step.status === 'current'
  const isUpcoming = step.status === 'upcoming'

  let circleColor = 'bg-slate-200'
  let textColor = 'text-slate-500'
  let badgeBg = 'bg-slate-100'
  let badgeText = 'text-slate-600'
  let titleColor = 'text-slate-500'

  if (isCompleted) {
    circleColor = 'bg-green-500'
    textColor = 'text-white'
    badgeBg = 'bg-green-100'
    badgeText = 'text-green-700'
    titleColor = 'text-slate-900'
  } else if (isCurrent) {
    circleColor = 'bg-blue-600 animate-pulse'
    textColor = 'text-white'
    badgeBg = 'bg-blue-100'
    badgeText = 'text-blue-700'
    titleColor = 'text-blue-600'
  }

  let lineColor = 'bg-slate-200'
  if (isCompleted) lineColor = 'bg-green-500'
  else if (isCurrent) lineColor = 'bg-gradient-to-b from-blue-400 to-slate-200'

  return (
    <div className="relative">
      {index < totalSteps - 1 && <div className={`absolute left-6 top-20 h-24 w-1 ${lineColor}`} style={{ height: '100px' }} />}

      <div className="flex gap-6">
        <div className="relative z-10 flex-shrink-0">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${circleColor} ${isCurrent ? 'shadow-lg shadow-blue-500/50' : ''}`}
          >
            {isCompleted ? (
              <CheckCircle2 className={`h-6 w-6 ${textColor}`} />
            ) : (
              <StepIcon className={`h-6 w-6 ${textColor} ${isCurrent && step.icon === Sparkles ? 'animate-spin' : ''}`} />
            )}
          </div>
        </div>

        <div className="flex-1 pt-1">
          <div className="mb-1 flex items-center gap-3">
            <Badge className={`${badgeBg} ${badgeText} flex h-6 w-6 items-center justify-center rounded-full border-0 p-0 text-xs font-bold`}>
              {step.number}
            </Badge>
            <h3 className={`text-lg font-semibold ${titleColor}`}>{step.title}</h3>
          </div>
          <p className="mb-3 text-sm text-slate-600">{step.description}</p>

          {step.details && (
            <div className={`${step.detailsBg} ${step.detailsBorder} mb-3 rounded-lg border p-4`}>
              {step.details.map((detail, idx) => {
                if (detail.isProgress) {
                  return (
                    <div key={idx}>
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-700">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {detail.text}
                      </div>
                      <Progress value={detail.percent ?? 0} className="mb-2 h-2" />
                      <p className="text-xs text-blue-600">{detail.text}</p>
                    </div>
                  )
                }

                if (detail.isSubtext) {
                  return (
                    <p key={idx} className="text-xs text-blue-600">
                      {detail.text}
                    </p>
                  )
                }

                if (detail.isSubtext2) {
                  return (
                    <p key={idx} className="text-xs text-slate-500">
                      {detail.text}
                    </p>
                  )
                }

                if (detail.isRequired) {
                  return (
                    <div key={idx} className="mb-1.5 flex items-center gap-2 text-sm text-slate-600">
                      {detail.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
                      )}
                      {detail.text}
                    </div>
                  )
                }

                if (detail.icon && detail.color) {
                  const DetailIcon = detail.icon
                  return (
                    <div key={idx} className="mb-1.5 flex items-center gap-2 text-sm">
                      <DetailIcon className={`h-4 w-4 ${detail.color}`} />
                      <span className={detail.color}>{detail.text}</span>
                    </div>
                  )
                }

                return (
                  <p key={idx} className="mb-1.5 text-sm text-slate-600">
                    {detail.text}
                  </p>
                )
              })}
            </div>
          )}

          {step.action && (
            <Link href={step.action.href}>
              <Button className="mt-2 h-8 bg-blue-600 text-xs text-white hover:bg-blue-700">{step.action.label}</Button>
            </Link>
          )}

          {step.isFinal && (
            <div className="text-center">
              <Trophy className="mx-auto mb-2 h-16 w-16 text-slate-300" />
              <p className="mb-1 text-sm font-medium text-slate-600">Almost there!</p>
              <p className="text-xs text-slate-500">Complete the previous steps to reach your goal</p>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 pt-1 text-right">
          {isCompleted && step.date && (
            <>
              <p className="text-sm text-slate-500">{step.date}</p>
              <p className="text-xs text-slate-400">{step.time}</p>
            </>
          )}
          {isCurrent && (
            <>
              <p className="text-sm font-medium text-blue-600">In Progress</p>
              <p className="text-xs text-slate-500">Started: {step.date}</p>
            </>
          )}
          {isUpcoming && (
            <>
              <p className="text-sm text-slate-500">Pending</p>
              {step.estimated && <p className="text-xs text-slate-400">{step.estimated}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const Icon = milestone.icon
  const isCompleted = milestone.status === 'completed'
  const isInProgress = milestone.status === 'in-progress'
  const isLocked = milestone.status === 'locked'

  let bgColor = 'bg-slate-50'
  let borderColor = 'border-slate-200'
  let iconColor = 'text-slate-400'

  if (isCompleted) {
    bgColor = 'bg-green-50'
    borderColor = 'border-green-200'
    iconColor = 'text-green-600'
  } else if (isInProgress) {
    bgColor = 'bg-blue-50'
    borderColor = 'border-blue-200'
    iconColor = 'text-blue-600'
  }

  return (
    <div className={`relative rounded-lg border p-4 transition-shadow hover:shadow-md ${bgColor} ${borderColor}`}>
      <div className="text-center">
        <Icon className={`mx-auto mb-2 h-6 w-6 ${iconColor}`} />
        <p className={`text-sm font-semibold ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>{milestone.title}</p>

        {isCompleted && <p className="mt-1 text-xs text-slate-500">{milestone.date}</p>}
        {isInProgress && milestone.progress && (
          <>
            <div className="mb-1 mt-2">
              <Progress value={(milestone.progress.current / milestone.progress.total) * 100} className="h-1.5" />
            </div>
            <p className="text-xs font-medium text-blue-600">
              {milestone.progress.current}/{milestone.progress.total}
            </p>
          </>
        )}

        {isCompleted && (
          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
            <CheckCircle2 className="h-3 w-3 text-white" />
          </div>
        )}
        {isLocked && (
          <div className="absolute right-2 top-2">
            <Lock className="h-4 w-4 text-slate-400" />
          </div>
        )}
      </div>
    </div>
  )
}

export default function JourneyPage() {
  const currentStepIndex = journeySteps.findIndex((step) => step.status === 'current')

  return (
    <main className="min-h-screen bg-white">
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-4xl font-bold text-slate-900">My Journey</h1>
          <p className="text-xl text-slate-600">Track your progress from profile creation to placement</p>

          <div className="mb-2 mt-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${journeyCompletion}%` }}
                />
              </div>
            </div>
            <span className="ml-4 whitespace-nowrap text-sm font-medium text-slate-700">{journeyCompletion}% Complete</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-8">
            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-6 py-5">
                <CardTitle className="text-xl font-semibold text-slate-900">Your Placement Journey</CardTitle>
                <Badge className="border-0 bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  Step {currentStepIndex >= 0 ? currentStepIndex + 1 : 3} of {journeySteps.length}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-8 p-6">
                {journeySteps.map((step, idx) => (
                  <TimelineStep key={step.id} step={step} index={idx} totalSteps={journeySteps.length} />
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-6 py-5">
                <CardTitle className="text-xl font-semibold text-slate-900">Milestones Achieved</CardTitle>
                <span className="text-sm font-medium text-slate-600">3 of 12</span>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {milestones.map((milestone, idx) => (
                    <MilestoneCard key={idx} milestone={milestone} />
                  ))}
                </div>
                <Link href="#all-milestones">
                  <p className="mt-6 cursor-pointer text-center text-sm font-medium text-blue-600 hover:text-blue-700">
                    View All Milestones →
                  </p>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 px-6 py-5">
                <CardTitle className="text-xl font-semibold text-slate-900">Journey Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-8 flex justify-center">
                  <div className="relative h-32 w-32">
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="56" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                      <circle
                        cx="60"
                        cy="60"
                        r="56"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        strokeDasharray={`${(journeyCompletion / 100) * 351.86} 351.86`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#1e40af" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold text-blue-600">{journeyCompletion}%</div>
                      <div className="text-sm text-slate-600">Complete</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm">
                    <span className="text-slate-600">Steps Completed</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-slate-900">2 of 6</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm">
                    <span className="text-slate-600">Current Step</span>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="font-semibold text-slate-900">Getting Matched</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm">
                    <span className="text-slate-600">Days Active</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="font-semibold text-slate-900">7 days</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Est. Time Left</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-slate-500" />
                      <span className="font-semibold text-slate-900">4-6 weeks</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <CardHeader className="border-b border-slate-100 px-6 py-5">
                <CardTitle className="text-xl font-semibold text-slate-900">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {nextActions.map((action, idx) => {
                  let dotColor = 'bg-blue-500'
                  if (action.priority === 'high') dotColor = 'bg-red-500'
                  if (action.priority === 'medium') dotColor = 'bg-yellow-500'

                  return (
                    <div key={idx} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                      <div className="mb-2 flex items-start gap-3">
                        <div className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${dotColor}`} />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">{action.title}</p>
                          <p className="mt-0.5 text-xs text-slate-600">{action.description}</p>
                          {action.progress && <p className="mt-1 text-xs font-medium text-yellow-600">{action.progress}</p>}
                        </div>
                      </div>
                      {action.button && (
                        <Link href={action.button.href} className="block w-full">
                          <Button
                            className={`mt-2 h-8 w-full text-xs ${
                              action.button.variant === 'outline'
                                ? 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                            variant={action.button.variant === 'outline' ? 'outline' : 'default'}
                          >
                            {action.button.label}
                          </Button>
                        </Link>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="rounded-xl border border-blue-100 bg-blue-50 shadow-sm">
              <CardHeader className="border-b border-blue-100 px-6 py-5">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  Journey Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                {tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
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
