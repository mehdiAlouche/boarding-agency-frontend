'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  MessageCircle,
  Users,
  Mail,
  Plus,
  Search,
  Video,
  Phone,
  MoreVertical,
  Paperclip,
  Send,
  Smile,
  Check,
  CheckCheck,
  FileText,
  Download,
  BellOff,
  Archive,
  Trash2,
  ArrowLeft,
} from 'lucide-react'

const mockAdvisors = [
  {
    id: 1,
    name: 'Dr. Martin Dupont',
    title: 'Career Counselor',
    avatar: '👨‍🏫',
    online: true,
    email: 'm.dupont@boarding.com',
    phone: '+33 6 12 34 56 78',
    office: 'Building A, Room 204',
    specialization: 'Tech Industry, Resume Review',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'HR Advisor',
    avatar: '👩‍💼',
    online: false,
    email: 's.johnson@boarding.com',
    phone: '+33 6 98 76 54 32',
    office: 'Building B, Room 102',
    specialization: 'Interview Prep, Negotiations',
  },
  {
    id: 3,
    name: 'Jean Leclerc',
    title: 'Placement Manager',
    avatar: '👨‍💼',
    online: true,
    email: 'j.leclerc@boarding.com',
    phone: '+33 6 11 22 33 44',
    office: 'Building A, Room 301',
    specialization: 'Job Opportunities, Networking',
  },
]

const mockConversations = [
  {
    id: 1,
    advisorId: 1,
    unreadCount: 2,
    lastMessage: "Thanks for sharing your updated resume. I've reviewed it and have some...",
    timestamp: '2m ago',
    isRead: false,
    hasAttachment: 'resume_v2.pdf',
  },
  {
    id: 2,
    advisorId: 2,
    unreadCount: 0,
    lastMessage: 'Great! Let me know if you need anything else.',
    timestamp: '1h ago',
    isRead: true,
  },
  {
    id: 3,
    advisorId: 3,
    unreadCount: 0,
    lastMessage: "I'll send you the interview prep materials by tomorrow",
    timestamp: 'Yesterday',
    isRead: true,
  },
]

type Message = {
  id: number
  senderId: number | 'me'
  senderName?: string
  text: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  attachment?: {
    name: string
    size: string
  }
}

const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 1,
    senderName: 'Dr. Martin',
    text: "Hi Sarah! I've reviewed your resume. Overall it looks great, but I have a few suggestions...",
    timestamp: '2:34 PM',
    status: 'read',
  },
  {
    id: 2,
    senderId: 1,
    senderName: 'Dr. Martin',
    text: 'Could you add more details about your internship at TechLab?',
    timestamp: '2:34 PM',
    status: 'read',
  },
  {
    id: 3,
    senderId: 'me',
    text: "Sure! I'll update it and send it over by tomorrow.",
    timestamp: '2:36 PM',
    status: 'read',
  },
  {
    id: 4,
    senderId: 'me',
    text: "Here's my updated resume",
    attachment: { name: 'sarah_chen_resume_v2.pdf', size: '2.4 MB' },
    timestamp: '2:37 PM',
    status: 'delivered',
  },
]

const mockSharedFiles = [
  { id: 1, name: 'resume_v2.pdf', size: '2.4 MB', date: 'Feb 17', icon: FileText },
  { id: 2, name: 'portfolio.png', size: '1.2 MB', date: 'Feb 16', icon: 'image' },
]

function ConversationList({
  conversations,
  selectedId,
  onSelect,
  onNewMessage,
}: {
  conversations: typeof mockConversations
  selectedId: number | null
  onSelect: (id: number) => void
  onNewMessage: () => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const unreadCount = conversations.filter((c) => c.unreadCount > 0).length
  const totalMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0)

  return (
    <Card className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-6 py-5">
        <CardTitle className="text-xl font-semibold text-slate-900">Conversations</CardTitle>
        <Button size="sm" className="h-8 bg-blue-600 px-3 text-white hover:bg-blue-700" onClick={onNewMessage}>
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col space-y-4 overflow-hidden p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex gap-4 border-b border-slate-200">
          {['All', 'Advisors', 'System'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                activeTab === tab.toLowerCase() ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
              {tab === 'All' && totalMessages > 0 && (
                <Badge className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">{totalMessages}</Badge>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto">
          {conversations.length > 0 ? (
            conversations.map((conversation) => {
              const advisor = mockAdvisors.find((a) => a.id === conversation.advisorId)
              if (!advisor) return null

              return (
                <button
                  key={conversation.id}
                  onClick={() => onSelect(conversation.id)}
                  className={`flex w-full cursor-pointer items-start gap-3 rounded-lg p-4 transition-colors ${
                    selectedId === conversation.id ? 'border-l-4 border-blue-600 bg-blue-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">{advisor.avatar}</div>
                    {advisor.online ? (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                    ) : (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-slate-400" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">{advisor.name}</h3>
                      <span className="flex-shrink-0 text-xs text-slate-500">{conversation.timestamp}</span>
                    </div>

                    <p className={`mt-1 line-clamp-1 text-sm ${conversation.isRead ? 'text-slate-600' : 'font-medium text-slate-900'}`}>
                      {conversation.lastMessage}
                    </p>

                    {conversation.hasAttachment && <p className="mt-1 text-xs text-blue-600">📎 {conversation.hasAttachment}</p>}
                  </div>

                  {conversation.unreadCount > 0 && (
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      {conversation.unreadCount}
                    </div>
                  )}
                </button>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageCircle className="mb-4 h-12 w-12 text-slate-300" />
              <p className="text-base font-medium text-slate-600">No messages yet</p>
              <p className="mt-1 text-sm text-slate-500">Start a conversation with an advisor</p>
              <Button size="sm" className="mt-4 bg-blue-600 text-white hover:bg-blue-700" onClick={onNewMessage}>
                New Message
              </Button>
            </div>
          )}
        </div>
        {unreadCount > 0 && <p className="text-xs text-slate-500">{unreadCount} conversation(s) with unread messages</p>}
      </CardContent>
    </Card>
  )
}

function ChatWindow({
  conversationId,
  onBack,
}: {
  conversationId: number | null
  onBack?: () => void
}) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [inputValue, setInputValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const currentConversation = mockConversations.find((conversation) => conversation.id === conversationId)
  const advisor = mockAdvisors.find((person) => person.id === currentConversation?.advisorId)

  if (!conversationId) {
    return (
      <Card className="flex h-full items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="text-center">
          <MessageCircle className="mx-auto mb-4 h-24 w-24 text-slate-300" />
          <h3 className="text-xl font-semibold text-slate-600">Select a conversation</h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">Choose a conversation from the left to start messaging</p>
        </div>
      </Card>
    )
  }

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          senderId: 'me',
          text: inputValue,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
        },
      ])
      setInputValue('')
    }
  }

  return (
    <Card className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-200 px-6 py-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="lg:hidden">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </button>
          )}
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg">{advisor?.avatar}</div>
            {advisor?.online && (
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
            )}
          </div>
          <div className="ml-1">
            <p className="text-base font-semibold text-slate-900">{advisor?.name}</p>
            <p className="text-sm text-slate-500">{advisor?.title}</p>
            <p className={`text-xs ${advisor?.online ? 'text-green-600' : 'text-slate-500'}`}>
              {advisor?.online ? 'Active now' : 'Last seen 2h ago'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="hover:bg-slate-100">
            <Video className="h-5 w-5 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-slate-100">
            <Phone className="h-5 w-5 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-slate-100">
            <MoreVertical className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
      </CardHeader>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6">
        <div className="py-4 text-center">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-500">Today</span>
        </div>

        {messages.map((message, idx) => {
          const showSenderName = idx === 0 || messages[idx - 1].senderId !== message.senderId

          if (message.senderId === 'me') {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="flex items-end gap-2">
                  <div className="max-w-lg">
                    <div className="rounded-2xl rounded-tr-sm bg-blue-600 p-3 text-white shadow-sm">
                      {message.attachment ? (
                        <div>
                          <p className="mb-3 text-sm">{message.text}</p>
                          <div className="flex items-center gap-2 rounded-lg bg-blue-700 p-3">
                            <FileText className="h-4 w-4 text-white" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">{message.attachment.name}</p>
                              <p className="text-xs text-blue-200">{message.attachment.size}</p>
                            </div>
                            <Download className="h-4 w-4 cursor-pointer text-white" />
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      )}
                    </div>
                    <div className="mt-1 flex items-center justify-end gap-1 text-xs text-slate-500">
                      <span>{message.timestamp}</span>
                      {message.status === 'sent' && <Check className="h-3.5 w-3.5" />}
                      {message.status === 'delivered' && <CheckCheck className="h-3.5 w-3.5" />}
                      {message.status === 'read' && <CheckCheck className="h-3.5 w-3.5 text-blue-600" />}
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div key={message.id} className="flex items-end gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm">
                {advisor?.avatar}
              </div>
              <div>
                {showSenderName && <p className="mb-1 text-xs font-medium text-slate-600">{message.senderName}</p>}
                <div className="max-w-lg rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-3 shadow-sm">
                  <p className="text-sm leading-relaxed text-slate-900">{message.text}</p>
                </div>
                <p className="mt-1 text-xs text-slate-500">{message.timestamp}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="space-y-2 border-t border-slate-200 bg-white px-6 py-4">
        <div className="flex items-end gap-3">
          <Button variant="ghost" size="icon" className="flex-shrink-0 hover:bg-slate-100">
            <Paperclip className="h-5 w-5 text-slate-600" />
          </Button>

          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Type your message..."
            rows={1}
            className="max-h-24 flex-1 resize-none rounded-lg border border-slate-300 p-3 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <Button variant="ghost" size="icon" className="flex-shrink-0 hover:bg-slate-100">
            <Smile className="h-5 w-5 text-slate-600" />
          </Button>

          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={`h-10 w-10 flex-shrink-0 p-0 ${
              inputValue.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'cursor-not-allowed bg-slate-300 text-slate-500'
            }`}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-xs text-slate-500">Press Enter to send, Shift + Enter for new line</p>
      </div>
    </Card>
  )
}

function ConversationDetails({ advisorId }: { advisorId: number | null }) {
  const advisor = mockAdvisors.find((a) => a.id === advisorId)

  if (!advisorId || !advisor) return null

  return (
    <div className="space-y-6">
      <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-100 px-6 py-5">
          <CardTitle className="text-xl font-semibold text-slate-900">Conversation Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">{advisor.avatar}</div>
            <h3 className="text-lg font-semibold text-slate-900">{advisor.name}</h3>
            <p className="text-sm text-slate-600">{advisor.title}</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-sm text-green-600">{advisor.online ? 'Active now' : 'Offline'}</p>
            </div>
          </div>

          <div className="border-t border-slate-200" />

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 flex-shrink-0 text-slate-600" />
              <div>
                <p className="text-slate-600">{advisor.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 flex-shrink-0 text-slate-600" />
              <p className="text-slate-600">{advisor.phone}</p>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-600" />
              <p className="text-slate-600">{advisor.office}</p>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-600" />
              <p className="text-slate-600">{advisor.specialization}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50">
              Schedule Appointment
            </Button>
            <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50">
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-100 px-6 py-5">
          <CardTitle className="text-base font-semibold text-slate-900">Shared Files</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 p-6">
          {mockSharedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-slate-50">
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="min-w-0">
                  <p className="truncate text-sm text-slate-900">{file.name}</p>
                  <p className="text-xs text-slate-500">
                    {file.size} · {file.date}
                  </p>
                </div>
              </div>
              <Download className="h-4 w-4 cursor-pointer flex-shrink-0 text-slate-600" />
            </div>
          ))}
          <p className="mt-3 cursor-pointer text-center text-sm text-blue-600 hover:underline">View All (12)</p>
        </CardContent>
      </Card>

      <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-100 px-6 py-5">
          <CardTitle className="text-base font-semibold text-slate-900">Quick Actions</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 p-6">
          <Button variant="outline" className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50">
            <BellOff className="mr-2 h-4 w-4" /> Mute Conversation
          </Button>
          <Button variant="outline" className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50">
            <Mail className="mr-2 h-4 w-4" /> Mark as Unread
          </Button>
          <Button variant="outline" className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50">
            <Archive className="mr-2 h-4 w-4" /> Archive
          </Button>
          <Button variant="outline" className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50">
            <Trash2 className="mr-2 h-4 w-4" /> Delete Conversation
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(1)

  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-4xl font-bold text-slate-900">Messages</h1>
          <p className="mb-6 text-xl text-slate-600">Communicate with advisors and receive updates</p>

          <div className="flex items-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-600">5 Unread</span>
            </div>
            <div className="h-4 w-0.5 bg-slate-300" />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-blue-600">3 Active Conversations</span>
            </div>
            <div className="h-4 w-0.5 bg-slate-300" />
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-600" />
              <span className="text-slate-600">12 Total Messages</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="-mt-24 grid h-screen grid-cols-1 gap-6 pt-24 lg:grid-cols-[300px_1fr_320px]">
          <div className="hidden lg:block">
            <ConversationList
              conversations={mockConversations}
              selectedId={selectedConversationId}
              onSelect={setSelectedConversationId}
              onNewMessage={() => {}}
            />
          </div>

          <div>
            <ChatWindow conversationId={selectedConversationId} />
          </div>

          <div className="hidden lg:block">
            <ConversationDetails advisorId={selectedConversationId} />
          </div>
        </div>
      </div>
    </main>
  )
}
