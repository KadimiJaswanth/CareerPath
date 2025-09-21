'use client';

import * as React from 'react';
import {
  Briefcase,
  Lightbulb,
  FileText,
  MessageSquare,
  ArrowRight,
  Book,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const features = [
  {
    title: 'Personalized Career Plan',
    description: 'Get an AI-generated career plan tailored to your skills and goals.',
    icon: Lightbulb,
    href: '/dashboard/career-plan',
    cta: 'Generate Your Plan',
  },
  {
    title: 'Map Your Skills',
    description: 'Identify and map your existing skills to our standardized taxonomy.',
    icon: Book,
    href: '/dashboard/skill-mapping',
    cta: 'Map Your Skills',
  },
  {
    title: 'Explore Careers',
    description: 'Browse various career paths with details on demand and salary.',
    icon: Briefcase,
    href: '/dashboard/explore',
    cta: 'Explore All Careers',
  },
  {
    title: 'Resume Builder',
    description: 'Create a professional, ATS-friendly resume with our easy-to-use tool.',
    icon: FileText,
    href: '/dashboard/resume-builder',
    cta: 'Build Your Resume',
  },
  {
    title: 'Mock Interview',
    description: 'Practice for your next interview with an AI-powered simulator.',
    icon: MessageSquare,
    href: '/dashboard/mock-interview',
    cta: 'Start a Mock Interview',
  },
  {
    title: 'Interview Prep',
    description: 'Generate tailored interview questions and answers with AI.',
    icon: HelpCircle,
    href: '/dashboard/mock-interview',
    cta: 'Prepare for Interviews',
  },
];

export default function DashboardPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <div className="space-y-8">
      <div>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-80" />
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, {displayName}!</h2>
            <p className="text-muted-foreground">
              Here's your command center for career growth. What will you do today?
            </p>
          </>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="group flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
            <CardHeader className="flex-row items-center gap-4">
               <div className="bg-primary/10 p-3 rounded-lg transition-colors group-hover:bg-primary">
                  <feature.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
              <div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">{feature.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter>
              <Link href={feature.href} className="flex w-full items-center justify-between text-sm font-medium text-primary hover:underline">
                <span>{feature.cta}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
