'use client';

import { type ChangeEvent, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Edit2,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Progress } from '@/shared/ui/progress';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  university: string;
  degree: string;
  graduationDate: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  gpa?: string;
  coursework: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const mockPersonalInfo: PersonalInfo = {
  name: 'Demo Chen',
  email: 'Demo.chen@university.edu',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  university: 'Stanford University',
  degree: 'Bachelor of Science in Computer Science',
  graduationDate: 'June 2025',
};

const mockSkills: Skill[] = [
  { id: '1', name: 'React', level: 'Advanced' },
  { id: '2', name: 'Python', level: 'Advanced' },
  { id: '3', name: 'Machine Learning', level: 'Intermediate' },
  { id: '4', name: 'Node.js', level: 'Intermediate' },
  { id: '5', name: 'TypeScript', level: 'Advanced' },
  { id: '6', name: 'SQL', level: 'Intermediate' },
];

const mockExperience: Experience[] = [
  {
    id: '1',
    company: 'Tech Startup Inc',
    position: 'Full Stack Intern',
    startDate: 'June 2023',
    endDate: 'August 2023',
    current: false,
    description: 'Built and deployed customer dashboard using React and Node.js. Improved performance by 40%.',
  },
  {
    id: '2',
    company: 'AI Research Lab',
    position: 'ML Research Assistant',
    startDate: 'January 2024',
    endDate: 'Present',
    current: true,
    description: 'Developing machine learning models for natural language processing. Published 2 research papers.',
  },
];

const mockEducation: Education[] = [
  {
    id: '1',
    institution: 'Stanford University',
    degree: 'Bachelor of Science in Computer Science',
    startYear: '2021',
    endYear: '2025',
    gpa: '3.8',
    coursework: ['Data Structures', 'Algorithms', 'Web Development', 'Machine Learning'],
  },
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'AI Chat Application',
    description: 'Built an AI-powered chat application with real-time messaging and smart responses.',
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    githubUrl: 'https://github.com/Demochen/ai-chat',
    liveUrl: 'https://ai-chat-demo.com',
  },
  {
    id: '2',
    name: 'Data Visualization Dashboard',
    description: 'Created interactive dashboard for analyzing large datasets with custom charts.',
    technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    githubUrl: 'https://github.com/Demochen/data-viz',
  },
];

const getSkillColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'bg-slate-100 text-slate-700';
    case 'Intermediate':
      return 'bg-blue-100 text-blue-700';
    case 'Advanced':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const calculateProfileCompletion = () => {
  let completed = 0;
  const total = 6;
  if (mockPersonalInfo.name) completed++;
  if (mockSkills.length >= 3) completed++;
  if (mockExperience.length > 0) completed++;
  if (mockEducation.length > 0) completed++;
  if (mockProjects.length > 0) completed++;
  if (mockPersonalInfo.phone) completed++;
  return Math.round((completed / total) * 100);
};

const calculateProfileScore = () => {
  let score = 0;
  if (mockPersonalInfo.name && mockPersonalInfo.email) score += 20;
  if (mockExperience.length > 0) score += 20;
  if (mockSkills.length >= 5) score += 20;
  if (mockEducation.length > 0) score += 15;
  if (mockProjects.length > 0) score += 25;
  return Math.min(score, 100);
};

function PersonalInfoSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState(mockPersonalInfo);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setInfo({ ...info, [field]: value });
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEditing ? (
          <>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                {info.name.charAt(0)}
                {info.name.split(' ')[1]?.charAt(0) || ''}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl font-semibold text-slate-900">{info.name}</p>
              <div className="flex items-center space-x-3 text-slate-600">
                <Mail size={16} className="text-slate-500" />
                <span>{info.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Phone size={16} className="text-slate-500" />
                <span>{info.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <MapPin size={16} className="text-slate-500" />
                <span>{info.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <GraduationCap size={16} className="text-slate-500" />
                <div>
                  <p className="font-medium">{info.university}</p>
                  <p className="text-sm">{info.degree}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Calendar size={16} className="text-slate-500" />
                <span>Graduation: {info.graduationDate}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <Input value={info.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Full Name" />
            <Input type="email" value={info.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Email" />
            <Input value={info.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="Phone" />
            <Input value={info.location} onChange={(e) => handleChange('location', e.target.value)} placeholder="Location" />
            <Input value={info.university} onChange={(e) => handleChange('university', e.target.value)} placeholder="University" />
            <Input value={info.degree} onChange={(e) => handleChange('degree', e.target.value)} placeholder="Degree" />
            <Input
              type="month"
              value={info.graduationDate}
              onChange={(e) => handleChange('graduationDate', e.target.value)}
              placeholder="Graduation Date"
            />
            <div className="flex gap-3 pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AboutMeSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(
    "I'm a passionate computer science student with a strong interest in full-stack development and machine learning. I love building products that solve real-world problems and have experience working on several open-source projects."
  );

  const onAboutChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(e.target.value.slice(0, 500));
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">About Me</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <p className="text-slate-600 leading-relaxed">{about}</p>
        ) : (
          <div className="space-y-4">
            <textarea
              value={about}
              onChange={onAboutChange}
              placeholder="Write about yourself..."
              className="min-h-32 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-blue-300"
            />
            <p className="text-sm text-slate-500">{about.length} / 500 characters</p>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SkillsSection() {
  const [skills, setSkills] = useState(mockSkills);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState<{ name: string; level: Skill['level'] }>({
    name: '',
    level: 'Intermediate',
  });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, { id: Date.now().toString(), ...newSkill }]);
      setNewSkill({ name: '', level: 'Intermediate' });
      setShowAddSkill(false);
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Skills</CardTitle>
        <Button variant="outline" size="sm" onClick={() => setShowAddSkill(!showAddSkill)}>
          <Plus size={16} className="mr-1" />
          Add Skill
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddSkill && (
          <div className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50">
            <Input
              placeholder="Skill name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as Skill['level'] })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <div className="flex gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={addSkill}>
                Add
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowAddSkill(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div key={skill.id} className="group">
              <Badge className={`${getSkillColor(skill.level)} cursor-default`}>
                {skill.name}
                <button onClick={() => removeSkill(skill.id)} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={14} />
                </button>
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ExperienceSection() {
  const [experience, setExperience] = useState(mockExperience);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Work Experience</CardTitle>
        <Button variant="outline" size="sm">
          <Plus size={16} className="mr-1" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.id} className="pb-6 border-b border-slate-200 last:border-b-0 last:pb-0 group">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-slate-900">{exp.company}</p>
                <p className="text-slate-600">{exp.position}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                <p className="text-slate-600 text-sm mt-2">{exp.description}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="ghost">
                  <Edit2 size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setExperience(experience.filter((item) => item.id !== exp.id))}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function EducationSection() {
  const [education] = useState(mockEducation);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Education</CardTitle>
        <Button variant="outline" size="sm">
          <Plus size={16} className="mr-1" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="pb-6 border-b border-slate-200 last:border-b-0 last:pb-0">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-lg flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{edu.institution}</p>
                <p className="text-slate-600">{edu.degree}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {edu.startYear} - {edu.endYear}
                </p>
                {edu.gpa && <p className="text-sm text-slate-600 mt-1">GPA: {edu.gpa}/4.0</p>}
                <div className="flex flex-wrap gap-2 mt-3">
                  {edu.coursework.map((course) => (
                    <Badge key={course} variant="secondary" className="bg-blue-100 text-blue-700">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ProjectsSection() {
  const [projects, setProjects] = useState(mockProjects);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Projects</CardTitle>
        <Button variant="outline" size="sm">
          <Plus size={16} className="mr-1" />
          Add Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="pb-6 border-b border-slate-200 last:border-b-0 last:pb-0 group">
            <div className="flex justify-between items-start mb-3">
              <p className="font-semibold text-slate-900">{project.name}</p>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="ghost">
                  <Edit2 size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setProjects(projects.filter((item) => item.id !== project.id))}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech) => (
                <Badge key={tech} className="bg-blue-100 text-blue-700">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Github size={16} />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function RightSidebarCards() {
  const score = calculateProfileScore();
  const [isVisible, setIsVisible] = useState(true);
  const [cvUploaded] = useState(true);
  const aiSkills = ['React', 'Python', 'Machine Learning', 'Node.js', 'TypeScript', 'SQL'];

  return (
    <div className="space-y-6 lg:sticky lg:top-32 lg:h-fit">
      <Card className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-blue-50 to-slate-50 border-blue-100">
        <CardHeader>
          <CardTitle className="text-center text-slate-900">Profile Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative w-32 h-32 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600">{score}</p>
                <p className="text-xs text-slate-600">of 100</p>
              </div>
            </div>
          </div>
          <p className="text-center text-slate-900 font-medium">Your profile is looking great!</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-slate-900">Personal Info Complete</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-slate-900">CV Uploaded</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">Experience Needed</p>
                <p className="text-xs text-slate-600">Add 1 more experience</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Curriculum Vitae</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cvUploaded ? (
            <>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <FileText size={24} className="text-slate-600" />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Demo_Chen_CV.pdf</p>
                  <p className="text-sm text-slate-600">2.4 MB • Uploaded 2 days ago</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View CV
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Replace
                </Button>
              </div>
            </>
          ) : (
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Upload size={16} className="mr-2" />
              Upload CV
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">AI Detected Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {aiSkills.map((skill) => (
              <Badge key={skill} className="bg-blue-100 text-blue-700">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow bg-blue-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb size={20} className="text-blue-600" />
            <CardTitle className="text-lg">Profile Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-900">Add at least 5 technical skills</p>
          <p className="text-sm text-slate-900">Include relevant work experience</p>
          <p className="text-sm text-slate-900">Upload an updated CV</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Profile Visibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Visible to Companies</p>
              <p className="text-sm text-slate-600">Matched companies can view your profile</p>
            </div>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                isVisible ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isVisible ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProfileForm() {
  const completion = calculateProfileCompletion();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-900">{completion}% Complete</span>
        </div>
        <Progress value={completion} className="h-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfoSection />
          <AboutMeSection />
          <SkillsSection />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
        </div>
        <RightSidebarCards />
      </div>
    </div>
  );
}
