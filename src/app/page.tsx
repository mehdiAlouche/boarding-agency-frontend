'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants/routes';
import {
  Brain,
  MapPin,
  Users,
  UserPlus,
  Upload,
  Sparkles,
  CheckCircle,
  Menu,
  X,
} from 'lucide-react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Boarding</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                How It Works
              </button>
              <Link
                href={ROUTES.LOGIN}
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-slate-600 hover:text-slate-900 font-medium py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left text-slate-600 hover:text-slate-900 font-medium py-2"
              >
                How It Works
              </button>
              <Link
                href={ROUTES.LOGIN}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left text-slate-600 hover:text-slate-900 font-medium py-2"
              >
                Sign In
              </Link>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          )}
        </div>
      </nav>

      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Animate_neural.webp"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Optional overlay to ensure text readability */}
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight text-balance">
            Land Your Dream Internship with AI-Powered Matching
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 text-balance">
            Upload your CV, discover companies that match your profile, and track your journey from
            student to professional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-300 text-slate-900 hover:bg-slate-50 px-8 py-3"
            >
              See How It Works
            </Button>
          </div>

          <p className="text-sm text-slate-500">✨ Join 1,000+ students already on their journey</p>
        </div>
      </section>

      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to succeed
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 md:p-8 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">AI-Powered Matching</h3>
              <p className="text-slate-600">
                Our AI analyzes your skills and experience to match you with companies that are the
                perfect fit.
              </p>
            </Card>

            <Card className="p-6 md:p-8 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Track Your Journey</h3>
              <p className="text-slate-600">
                Visualize your progress from profile creation to placement with a clear, interactive
                timeline.
              </p>
            </Card>

            <Card className="p-6 md:p-8 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Expert Guidance</h3>
              <p className="text-slate-600">
                Book appointments with advisors, get real-time feedback, and access resources to
                prepare.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your path to placement in 4 simple steps
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-200 via-blue-300 to-slate-200"></div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Badge className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
                      1
                    </Badge>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <UserPlus className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 text-center">Create Profile</h3>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    Set up your account and start your journey
                  </p>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Badge className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
                      2
                    </Badge>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 text-center">Upload CV</h3>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    Share your resume and qualifications
                  </p>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Badge className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
                      3
                    </Badge>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 text-center">Get Matched</h3>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    Discover perfect-fit company opportunities
                  </p>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Badge className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
                      4
                    </Badge>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 text-center">Land Placement</h3>
                  <p className="text-sm text-slate-600 text-center mt-2">
                    Secure your internship placement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trusted by students at top universities
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 md:p-8 border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  SC
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Demo Chen</p>
                  <p className="text-sm text-slate-600">Software Eng. @ TechCorp</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "Boarding helped me find an internship that perfectly matched my skills. The AI
                matching was incredibly accurate!"
              </p>
            </Card>

            <Card className="p-6 md:p-8 border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  JM
                </div>
                <div>
                  <p className="font-semibold text-slate-900">James Miller</p>
                  <p className="text-sm text-slate-600">Product Mgmt @ StartupXYZ</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "The entire journey was smooth. From uploading my CV to landing the role, Boarding
                made everything simple and transparent."
              </p>
            </Card>

            <Card className="p-6 md:p-8 border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  AK
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Aisha Khan</p>
                  <p className="text-sm text-slate-600">Data Analyst @ FinTech Inc</p>
                </div>
              </div>
              <p className="text-slate-600 italic">
                "The advisor guidance was invaluable. I received personalized feedback that helped me
                stand out to companies."
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Ready to start your journey?
          </h2>
          <p className="text-lg text-slate-600 mb-8 text-balance">
            Join thousands of students who found their dream internship
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 mb-4"
          >
            <Link href={ROUTES.REGISTER}>Create Your Profile</Link>
          </Button>
          <p className="text-sm text-slate-500">Free to get started • No credit card required</p>
        </div>
      </section>

      <footer className="landing-footer bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Security
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Blog
                  </button>
                </li>
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Careers
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Help Center
                  </button>
                </li>
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Documentation
                  </button>
                </li>
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Privacy
                  </button>
                </li>
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Terms
                  </button>
                </li>
                <li>
                  <button type="button" className="hover:text-white transition-colors">
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm">© 2026 Boarding. All rights reserved.</p>
              <div className="flex gap-4">
                <button type="button" className="hover:text-white transition-colors" aria-label="LinkedIn">
                  LinkedIn
                </button>
                <button type="button" className="hover:text-white transition-colors" aria-label="Twitter">
                  Twitter
                </button>
                <button type="button" className="hover:text-white transition-colors" aria-label="Instagram">
                  Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

