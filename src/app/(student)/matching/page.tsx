'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Building2,
  Search,
  Sparkles,
  TrendingUp,
  Target,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  MousePointer,
  Lightbulb,
  ArrowRight,
  X,
} from 'lucide-react'
import Link from 'next/link'

const mockCompanies = [
  {
    id: 1,
    name: 'TechCorp',
    industry: 'Software',
    location: 'Paris, France',
    matchScore: 87,
    matchReason: 'Strong match in React, Python and your internship experience at TechLab',
    isNew: true,
    viewed: false,
    skills: ['React', 'Python', 'TypeScript'],
    description: 'Leading software development company specializing in web and mobile applications.',
    size: '500-1000 employees',
    founded: '2015',
    website: 'techcorp.com',
    breakdown: [
      { label: 'Technical Skills', score: 90 },
      { label: 'Experience Level', score: 80 },
      { label: 'Industry Interest', score: 75 },
      { label: 'Location Preference', score: 95 },
    ],
  },
  {
    id: 2,
    name: 'InnovateLabs',
    industry: 'AI/ML',
    location: 'Berlin, Germany',
    matchScore: 82,
    matchReason: 'Perfect fit for ML engineering role with your Python expertise',
    isNew: true,
    viewed: false,
    skills: ['Python', 'TensorFlow', 'Machine Learning'],
    description: 'Pioneering artificial intelligence research and development company.',
    size: '100-500 employees',
    founded: '2018',
    website: 'innovatelabs.de',
    breakdown: [
      { label: 'Technical Skills', score: 85 },
      { label: 'Experience Level', score: 75 },
      { label: 'Industry Interest', score: 80 },
      { label: 'Location Preference', score: 70 },
    ],
  },
  {
    id: 3,
    name: 'DataFlow',
    industry: 'Data Analytics',
    location: 'London, UK',
    matchScore: 78,
    matchReason: 'Excellent alignment with your data analysis skills and SQL knowledge',
    isNew: false,
    viewed: true,
    skills: ['SQL', 'Python', 'Data Analysis'],
    description: 'Data analytics platform empowering businesses with insights.',
    size: '200-500 employees',
    founded: '2017',
    website: 'dataflow.io',
    breakdown: [
      { label: 'Technical Skills', score: 80 },
      { label: 'Experience Level', score: 78 },
      { label: 'Industry Interest', score: 72 },
      { label: 'Location Preference', score: 80 },
    ],
  },
  {
    id: 4,
    name: 'DesignStudio',
    industry: 'Design',
    location: 'Remote',
    matchScore: 72,
    matchReason: 'Great match for your UI/UX design interests and frontend skills',
    isNew: false,
    viewed: false,
    skills: ['React', 'UI Design', 'CSS'],
    description: 'Creative design agency crafting digital experiences.',
    size: '50-200 employees',
    founded: '2016',
    website: 'designstudio.com',
    breakdown: [
      { label: 'Technical Skills', score: 75 },
      { label: 'Experience Level', score: 70 },
      { label: 'Industry Interest', score: 70 },
      { label: 'Location Preference', score: 75 },
    ],
  },
  {
    id: 5,
    name: 'FinanceTech',
    industry: 'Finance',
    location: 'Frankfurt, Germany',
    matchScore: 68,
    matchReason: 'Your backend development skills align with their infrastructure team',
    isNew: true,
    viewed: false,
    skills: ['Java', 'Microservices', 'AWS'],
    description: 'Financial technology solutions for enterprise banking.',
    size: '1000+ employees',
    founded: '2010',
    website: 'financetech.eu',
    breakdown: [
      { label: 'Technical Skills', score: 70 },
      { label: 'Experience Level', score: 65 },
      { label: 'Industry Interest', score: 60 },
      { label: 'Location Preference', score: 65 },
    ],
  },
  {
    id: 6,
    name: 'StartupHub',
    industry: 'Software',
    location: 'Lyon, France',
    matchScore: 75,
    matchReason: 'Fast-growing startup looking for full-stack developers like you',
    isNew: false,
    viewed: false,
    skills: ['React', 'Node.js', 'MongoDB'],
    description: 'Dynamic startup ecosystem fostering innovation and growth.',
    size: '10-50 employees',
    founded: '2021',
    website: 'startuphub.fr',
    breakdown: [
      { label: 'Technical Skills', score: 76 },
      { label: 'Experience Level', score: 72 },
      { label: 'Industry Interest', score: 78 },
      { label: 'Location Preference', score: 80 },
    ],
  },
]

function getScoreColor(score: number) {
  if (score >= 85) return { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-500' }
  if (score >= 65) return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-500' }
  return { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-500' }
}

function getProgressColor(score: number) {
  if (score >= 85) return 'bg-green-500'
  if (score >= 70) return 'bg-blue-500'
  return 'bg-yellow-500'
}

function SelectedMatchDetail({ company }: { company: (typeof mockCompanies)[0] | null }) {
  const [interestSent, setInterestSent] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!company) {
    return (
      <Card className="bg-white border border-slate-200 rounded-xl shadow-sm h-full flex flex-col items-center justify-center p-8 text-center">
        <MousePointer className="w-12 h-12 text-slate-300 mb-3" />
        <p className="text-sm text-slate-500">Select a company to see details</p>
      </Card>
    )
  }

  const scoreColor = getScoreColor(company.matchScore)

  return (
    <Card className="bg-white border border-slate-200 rounded-xl shadow-sm">
      <CardHeader className="px-6 py-6 border-b border-slate-100 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-3 flex-shrink-0">
          <Building2 className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{company.name}</h3>
        <p className="text-sm text-slate-500 mt-1">
          {company.industry} · {company.location}
        </p>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col items-center">
          <div className={`w-24 h-24 rounded-full ${scoreColor.bg} border-4 ${scoreColor.border} flex flex-col items-center justify-center`}>
            <div className={`text-3xl font-bold ${scoreColor.text}`}>{company.matchScore}%</div>
          </div>
          <p className="text-sm text-slate-600 mt-3">AI Match Score</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <h4 className="text-sm font-semibold text-slate-700">Why this match?</h4>
          {company.breakdown.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-medium text-slate-700">{item.score}%</span>
              </div>
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full ${getProgressColor(item.score)} rounded-full`} style={{ width: `${item.score}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">About</h4>
            <p className="text-sm text-slate-600">{company.description}</p>
          </div>
          <div className="space-y-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{company.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Founded {company.founded}</span>
            </div>
            <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline">
              <ExternalLink className="w-4 h-4" />
              <span>{company.website}</span>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Matched Skills</h4>
          <div className="flex flex-wrap gap-2">
            {company.skills.map((skill, idx) => (
              <Badge key={idx} className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-full px-3 py-1 text-xs font-medium">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-6">
          <Button
            onClick={() => setInterestSent(!interestSent)}
            className={`w-full ${
              interestSent
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {interestSent ? 'Interest Sent ✓' : 'Express Interest'}
          </Button>
          <Button
            onClick={() => setSaved(!saved)}
            variant="outline"
            className={`w-full border-slate-300 ${saved ? 'bg-blue-50 border-blue-300 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
          >
            {saved ? 'Saved ✓' : 'Save for Later'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function MatchingStatsCard() {
  return (
    <Card className="bg-white border border-slate-200 rounded-xl shadow-sm">
      <CardHeader className="px-6 py-5 border-b border-slate-100">
        <CardTitle className="text-xl font-semibold text-slate-900">Your Matching Stats</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-sm text-slate-700">Total Matches</span>
          <span className="text-2xl font-bold text-blue-600">12</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-sm text-slate-700">Excellent Matches (85%+)</span>
          <span className="text-2xl font-bold text-green-600">4</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-100">
          <span className="text-sm text-slate-700">Good Matches (65-84%)</span>
          <span className="text-2xl font-bold text-blue-600">6</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-slate-700">Fair Matches (below 65%)</span>
          <span className="text-2xl font-bold text-yellow-600">2</span>
        </div>
        <div className="text-xs text-slate-500 text-center pt-4 border-t border-slate-100">
          Based on your current profile score
        </div>
        <Link href="/profile">
          <p className="text-xs text-blue-600 text-center hover:underline cursor-pointer">
            Improve profile to get more matches →
          </p>
        </Link>
      </CardContent>
    </Card>
  )
}

function TipsCard() {
  return (
    <Card className="bg-blue-50 border border-blue-100 rounded-xl shadow-sm">
      <CardHeader className="px-6 py-5 border-b border-blue-100">
        <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          Improve Your Matches
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        <Link href="/profile">
          <div className="flex items-start gap-3 text-sm text-slate-700 hover:text-blue-600 cursor-pointer transition-colors">
            <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>Add more technical skills to increase matches</span>
          </div>
        </Link>
        <Link href="/profile">
          <div className="flex items-start gap-3 text-sm text-slate-700 hover:text-blue-600 cursor-pointer transition-colors">
            <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>Upload an updated CV for better AI analysis</span>
          </div>
        </Link>
        <Link href="/profile">
          <div className="flex items-start gap-3 text-sm text-slate-700 hover:text-blue-600 cursor-pointer transition-colors">
            <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>Complete your About Me section</span>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function MatchingPage() {
  const [selectedCompany, setSelectedCompany] = useState<(typeof mockCompanies)[0] | null>(mockCompanies[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [scoreFilter, setScoreFilter] = useState('all')
  const [sortBy, setSortBy] = useState('best-match')

  const industries = ['All Industries', 'Software', 'AI/ML', 'Data Analytics', 'Design', 'Finance', 'Other']
  const locations = ['All Locations', 'Paris', 'London', 'Remote', 'Lyon', 'Bordeaux', 'Berlin', 'Frankfurt']

  const hasActiveFilters = searchQuery || industryFilter !== 'all' || locationFilter !== 'all' || scoreFilter !== 'all'

  const filteredCompanies = mockCompanies.filter((company) => {
    if (searchQuery && !company.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (industryFilter !== 'all' && company.industry !== industryFilter) return false
    if (locationFilter !== 'all' && company.location !== locationFilter) return false
    if (scoreFilter === '90%+' && company.matchScore < 90) return false
    if (scoreFilter === '75%+' && company.matchScore < 75) return false
    if (scoreFilter === '50%+' && company.matchScore < 50) return false
    return true
  })

  const sortedCompanies =
    sortBy === 'newest'
      ? [...filteredCompanies].reverse()
      : sortBy === 'name'
        ? [...filteredCompanies].sort((a, b) => a.name.localeCompare(b.name))
        : filteredCompanies

  return (
    <main className="bg-white min-h-screen">
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900">My Matches</h1>
          <p className="text-slate-600 mt-2">Companies matched to your profile by AI</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6 text-sm font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>12 Companies Matched</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>3 New This Week</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span>87% Average Match Score</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8">
          <div className="space-y-8">
            <Card className="bg-white border border-slate-200 rounded-xl shadow-sm">
              <CardHeader className="px-6 py-5 border-b border-slate-100 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-900">Filter Matches</CardTitle>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setIndustryFilter('all')
                      setLocationFilter('all')
                      setScoreFilter('all')
                    }}
                    className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="relative lg:col-span-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search companies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-11 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <select
                      value={industryFilter}
                      onChange={(e) => setIndustryFilter(e.target.value)}
                      className="h-11 px-3 border border-slate-300 rounded-lg text-slate-700 text-sm focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      {industries.map((ind) => (
                        <option key={ind} value={ind === 'All Industries' ? 'all' : ind}>
                          {ind}
                        </option>
                      ))}
                    </select>

                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="h-11 px-3 border border-slate-300 rounded-lg text-slate-700 text-sm focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc === 'All Locations' ? 'all' : loc}>
                          {loc}
                        </option>
                      ))}
                    </select>

                    <select
                      value={scoreFilter}
                      onChange={(e) => setScoreFilter(e.target.value)}
                      className="h-11 px-3 border border-slate-300 rounded-lg text-slate-700 text-sm focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      <option value="all">All Scores</option>
                      <option value="90%+">90%+ (Excellent)</option>
                      <option value="75%+">75%+ (Good)</option>
                      <option value="50%+">50%+ (Fair)</option>
                    </select>
                  </div>

                  {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {searchQuery && (
                        <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-full px-3 py-1">
                          {searchQuery} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      )}
                      {industryFilter !== 'all' && (
                        <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-full px-3 py-1">
                          {industryFilter} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      )}
                      {locationFilter !== 'all' && (
                        <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-full px-3 py-1">
                          {locationFilter} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      )}
                      {scoreFilter !== 'all' && (
                        <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-full px-3 py-1">
                          {scoreFilter} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 rounded-xl shadow-sm">
              <CardHeader className="px-6 py-5 border-b border-slate-100 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-900">{sortedCompanies.length} Matches Found</CardTitle>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 px-3 border border-slate-300 rounded-lg text-slate-700 text-sm focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="best-match">Best Match</option>
                  <option value="newest">Newest First</option>
                  <option value="name">Company Name A-Z</option>
                </select>
              </CardHeader>

              <CardContent className="p-0">
                {sortedCompanies.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {sortedCompanies.map((company) => {
                      const scoreColor = getScoreColor(company.matchScore)
                      return (
                        <div
                          key={company.id}
                          onClick={() => setSelectedCompany(company)}
                          className={`p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer ${
                            selectedCompany?.id === company.id
                              ? 'bg-blue-50/30 border-l-4 border-blue-500'
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-8 h-8 text-slate-400" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-semibold text-slate-900">{company.name}</h3>
                                {company.isNew && (
                                  <Badge className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                                    New
                                  </Badge>
                                )}
                                {company.viewed && (
                                  <Badge className="bg-slate-100 text-slate-600 text-xs rounded-full px-2 py-0.5">
                                    Viewed
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
                                <Building2 className="w-4 h-4" />
                                <span>{company.industry}</span>
                                <MapPin className="w-4 h-4" />
                                <span>{company.location}</span>
                              </div>

                              <div className="flex items-start gap-2 text-sm text-slate-600 italic mb-3">
                                <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span>{company.matchReason}</span>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {company.skills.map((skill, idx) => (
                                  <Badge
                                    key={idx}
                                    className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-full px-3 py-1 text-xs font-medium"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-col items-end justify-between gap-4 flex-shrink-0">
                              <div className={`w-16 h-16 rounded-lg ${scoreColor.bg} border-2 ${scoreColor.border} flex flex-col items-center justify-center`}>
                                <div className={`text-xl font-bold ${scoreColor.text}`}>{company.matchScore}%</div>
                                <div className="text-xs text-slate-500">Match</div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-slate-300 text-slate-700 hover:bg-slate-50"
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-600 mt-2">No matches yet</h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                      Complete your profile to unlock AI-powered company matching
                    </p>
                    <Progress value={75} className="h-2 bg-slate-200 mt-4" />
                    <p className="text-xs text-slate-500 mt-2">Profile 75% complete</p>
                    <Link href="/profile">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4">
                        Complete Your Profile
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <SelectedMatchDetail company={selectedCompany} />
            <MatchingStatsCard />
            <TipsCard />
          </div>
        </div>
      </div>
    </main>
  )
}
