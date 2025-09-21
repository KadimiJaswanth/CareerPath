'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, CheckCircle, ArrowRight, TrendingUp, DollarSign, Target, BookOpen, ExternalLink, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { careers } from '@/lib/data';
import Link from 'next/link';

const formSchema = z.object({
  userSkills: z.string().min(2, {
    message: 'Please enter at least one skill.',
  }),
  careerGoal: z.string({
    required_error: 'Please select a career goal.',
  }),
});

type CareerRecommendation = {
  career: string;
  description: string;
  salaryRange: string;
  demand: string;
  skillGap: {
    possessed: string[];
    missing: string[];
  };
};

type ActionStep = {
  title: string;
  description: string;
  resources?: { title: string; url: string }[];
  jobPlatforms?: { name: string; url: string }[];
};

type CareerPlanResult = {
  recommendedCareers: CareerRecommendation[];
  actionableRoadmap: ActionStep[];
};


export default function CareerPlanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CareerPlanResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userSkills: '',
      careerGoal: '',
    },
  });

  function generateLocalCareerPlan(values: z.infer<typeof formSchema>): CareerPlanResult {
    const selectedCareer = careers.find(c => c.id === values.careerGoal);
    if (!selectedCareer) {
        return { recommendedCareers: [], actionableRoadmap: [] };
    }

    const userSkillsList = values.userSkills.split(',').map(s => s.trim().toLowerCase());
    
    const possessed = selectedCareer.requiredSkills.filter(reqSkill => 
        userSkillsList.some(userSkill => userSkill.toLowerCase() === reqSkill.toLowerCase())
    );
    const missing = selectedCareer.requiredSkills.filter(reqSkill => 
        !userSkillsList.some(userSkill => userSkill.toLowerCase() === reqSkill.toLowerCase())
    );

    const recommendation: CareerRecommendation = {
        career: selectedCareer.title,
        description: selectedCareer.description,
        salaryRange: selectedCareer.averageSalary,
        demand: selectedCareer.demand,
        skillGap: {
            possessed,
            missing
        }
    };

    const roadmap: ActionStep[] = [];
    if (missing.length > 0) {
        const skillsToLearn = missing.slice(0, 2).join(', ');
        roadmap.push({
            title: `Phase 1: Master Foundational Skills: ${skillsToLearn}`,
            description: `Start by mastering these core skills. They are essential for a ${selectedCareer.title}. We recommend dedicating time to a structured course.`,
            resources: selectedCareer.learningResources?.slice(0, 1) || [],
        });
        
        roadmap.push({
            title: `Phase 2: Build a Portfolio Project`,
            description: `Now it's time to apply what you've learned. Build a significant project that integrates the skills you've acquired (${missing.join(', ')}). This project is crucial for demonstrating your capabilities to employers. Use our Resume Builder to document this project.`,
        });
    } else {
        roadmap.push({
            title: "Phase 1: Advanced Portfolio Project",
            description: `You have a strong foundation! Your next step is to create an advanced project that showcases your mastery of the required skills for a ${selectedCareer.title}. Consider contributing to an open-source project or building a full-stack application.`,
        });
    }

    roadmap.push({
        title: `Phase 3: Network and Apply for Jobs`,
        description: `With your skills and portfolio ready, focus on preparing your resume and practicing for interviews (using our Mock Interview tool!). Start applying for jobs on relevant platforms.`,
        jobPlatforms: selectedCareer.jobPlatforms?.slice(0, 2) || []
    });

    return {
        recommendedCareers: [recommendation],
        actionableRoadmap: roadmap.slice(0, 3)
    };
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    // Simulate network delay for a better UX
    setTimeout(() => {
        const plan = generateLocalCareerPlan(values);
        setResult(plan);
        setIsLoading(false);
    }, 500);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Generate Your Personalized Career Plan</CardTitle>
          <CardDescription>Select your target role and list your current skills to get a tailored plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="careerGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Career Goal</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a career to plan for" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {careers.map(career => (
                            <SelectItem key={career.id} value={career.id}>{career.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    <FormDescription>
                      Choose the role you are aiming for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., JavaScript, Project Management, Graphic Design"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your skills, separated by commas. This will be used for the skill gap analysis.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Plan
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  Your Personalized Career Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Recommended Career Path</h3>
                  <div className="grid md:grid-cols-1 gap-6">
                    {result.recommendedCareers.map((rec, index) => (
                      <Card key={index} className="bg-muted/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <Target className="text-primary"/>
                            {rec.career}
                          </CardTitle>
                          <CardDescription>{rec.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{rec.salaryRange} (INR)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Demand: {rec.demand}</span>
                            </div>
                          </div>
                          <div className="mt-6">
                            <h4 className="font-semibold mb-4 text-center">Skill Gap Analysis</h4>
                            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                              {/* You Have Column */}
                              <div className="flex flex-col items-center text-center p-4 bg-background rounded-lg">
                                <CheckCircle className="h-8 w-8 text-green-500 mb-2"/>
                                <h5 className="font-semibold text-green-600 mb-3">You Have</h5>
                                <div className="flex flex-wrap gap-2 justify-center">
                                  {rec.skillGap.possessed.length > 0 ? rec.skillGap.possessed.map(skill => (
                                    <Badge key={skill} variant="secondary" className="bg-green-100 text-green-800">{skill}</Badge>
                                  )) : <p className="text-xs text-muted-foreground">None identified</p>}
                                </div>
                              </div>
                              
                              {/* Arrow */}
                              <div className="flex justify-center">
                                <ArrowRight className="h-8 w-8 text-muted-foreground"/>
                              </div>

                              {/* You Need Column */}
                              <div className="flex flex-col items-center text-center p-4 bg-background rounded-lg">
                                 <Sparkles className="h-8 w-8 text-blue-500 mb-2"/>
                                <h5 className="font-semibold text-blue-600 mb-3">You Need to Learn</h5>
                                <div className="flex flex-wrap gap-2 justify-center">
                                   {rec.skillGap.missing.length > 0 ? rec.skillGap.missing.map(skill => (
                                    <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800">{skill}</Badge>
                                  )) : <p className="text-xs text-muted-foreground">You have all the skills!</p>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Your Actionable Roadmap</h3>
                  <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {result.actionableRoadmap.map((step, index) => (
                       <AccordionItem value={`item-${index}`} key={index}>
                         <AccordionTrigger className="text-lg hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <span>{step.title}</span>
                          </div>
                         </AccordionTrigger>
                         <AccordionContent className="text-muted-foreground pl-16 space-y-4">
                            <p>{step.description}</p>
                            {step.resources && step.resources.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><BookOpen className="h-4 w-4"/> Recommended Learning Resource</h4>
                                    {step.resources.map(res => (
                                        <Button key={res.title} asChild variant="outline" className="w-full justify-between">
                                            <Link href={res.url} target="_blank">{res.title} <ExternalLink className="h-4 w-4"/></Link>
                                        </Button>
                                    ))}
                                </div>
                            )}
                            {step.jobPlatforms && step.jobPlatforms.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Briefcase className="h-4 w-4"/> Relevant Job Platforms</h4>
                                    <div className="flex gap-2">
                                    {step.jobPlatforms.map(jp => (
                                        <Button key={jp.name} asChild variant="secondary">
                                            <Link href={jp.url} target="_blank">{jp.name}</Link>
                                        </Button>
                                    ))}
                                    </div>
                                </div>
                            )}
                         </AccordionContent>
                       </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
