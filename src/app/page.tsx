'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { Icons } from '@/components/icons';
import { ArrowRight, Brain, FileText, MessageSquare, Compass, LineChart, Sparkles, Quote } from 'lucide-react';
import ThemeToggle from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Home() {
  const [isAuthed, setIsAuthed] = React.useState(false);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setIsAuthed(!!user));
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg">Careerpath</span>
          </Link>
          <nav className="flex items-center gap-2">
            {isAuthed ? (
              <Button onClick={() => auth.signOut()}>Sign Out</Button>
            ) : (
              <Button asChild>
                <Link href="/login">
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container relative flex flex-col items-center justify-center gap-6 pt-20 pb-16 text-center md:pt-32 md:pb-24">
          <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(#3BA3FF33_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <h1 className="text-4xl font-extrabold tracking-tighter md:text-6xl lg:text-7xl">
            Chart Your Course to a{' '}
            <span className="text-primary">Fulfilling Career</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Careerpath provides AI-powered tools and personalized guidance to help you navigate your professional journey with confidence.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/signup">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard/explore">Explore Careers</Link>
            </Button>
          </div>
        </div>

        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Everything you need to grow</h2>
            <p className="text-muted-foreground mt-2">From finding your path to landing the job — use AI-powered tools designed for every step.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary"><Sparkles className="h-5 w-5" /><CardTitle className="text-xl">Personalized Plans</CardTitle></div>
                <CardDescription>Create tailored career plans based on your goals and current skills.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/career-plan" className="text-sm text-primary hover:underline">Generate your plan →</Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary"><FileText className="h-5 w-5" /><CardTitle className="text-xl">AI Resume Builder</CardTitle></div>
                <CardDescription>Turn achievements into a polished, role-ready resume.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/resume-builder" className="text-sm text-primary hover:underline">Build your resume →</Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary"><MessageSquare className="h-5 w-5" /><CardTitle className="text-xl">Mock Interviews</CardTitle></div>
                <CardDescription>Practice real interview questions and get instant feedback.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/mock-interview" className="text-sm text-primary hover:underline">Start practicing →</Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary"><Compass className="h-5 w-5" /><CardTitle className="text-xl">Career Explorer</CardTitle></div>
                <CardDescription>Discover roles, salaries, and demand matched to your interests.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/explore" className="text-sm text-primary hover:underline">Explore roles →</Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary"><Brain className="h-5 w-5" /><CardTitle className="text-xl">Skill Mapping</CardTitle></div>
                <CardDescription>See your strengths and fill gaps with targeted learning.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/skill-mapping" className="text-sm text-primary hover:underline">Map your skills →</Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-primary"><LineChart className="h-5 w-5" /><CardTitle className="text-xl">Progress Tracking</CardTitle></div>
                <CardDescription>Track milestones and stay accountable with reminders.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard" className="text-sm text-primary hover:underline">View dashboard →</Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <p className="text-muted-foreground mt-2">Three simple steps to accelerate your career.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">1. Set your goal</CardTitle>
                <CardDescription>Choose a target role and list your current skills.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">2. Get your roadmap</CardTitle>
                <CardDescription>Receive a personalized plan, learning paths, and resources.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">3. Practice and apply</CardTitle>
                <CardDescription>Build projects, practice interviews, and track progress.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">What learners say</h2>
            <p className="text-muted-foreground mt-2">Real stories from users who achieved their goals.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">“The personalized plan kept me focused. I landed a Data Analyst role in 8 weeks.”</p>
                <p className="mt-4 text-sm font-medium">Aarav • Mumbai</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">“Mock interviews were spot on. I felt confident in my real interviews.”</p>
                <p className="mt-4 text-sm font-medium">Diya • Bengaluru</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">“The resume builder translated my projects into impact. Got more callbacks.”</p>
                <p className="mt-4 text-sm font-medium">Kabir • Pune</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Ready to start?</h2>
            <p className="text-muted-foreground mt-2">Join for free and build your career plan in minutes.</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Create your account</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard/explore">Browse careers</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background/50">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Icons.logo className="h-6 w-6 text-primary" />
                <span className="font-semibold">Careerpath</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-xs">AI-powered tools and guidance to help you find, plan, and grow your career.</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Product</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><Link href="/dashboard/career-plan" className="hover:text-foreground">Career Plan</Link></li>
                <li><Link href="/dashboard/resume-builder" className="hover:text-foreground">Resume Builder</Link></li>
                <li><Link href="/dashboard/mock-interview" className="hover:text-foreground">Mock Interview</Link></li>
                <li><Link href="/dashboard/explore" className="hover:text-foreground">Explore Careers</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Resources</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
                <li><Link href="/signup" className="hover:text-foreground">Create Account</Link></li>
                <li><Link href="/login" className="hover:text-foreground">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Company</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Careerpath. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Terms</Link>
              <Link href="#" className="hover:text-foreground">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
