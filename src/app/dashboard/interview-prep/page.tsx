'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, PlusCircle, Trash2 } from 'lucide-react';
import { generateInterviewQuestionsAction } from './actions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const projectSchema = z.object({
    title: z.string().min(2, 'Title is required.'),
    description: z.string().min(10, 'Description is too short.'),
});

const formSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  role: z.string().min(2, 'Target role is required.'),
  skills: z.string().min(2, 'Please list at least one skill.'),
  experience: z.string().min(10, 'Please describe your experience.'),
  projects: z.array(projectSchema),
});

type QuestionAndAnswer = {
  question: string;
  expectedAnswer: string;
};

type InterviewPrepResult = {
  interviewQuestions: QuestionAndAnswer[];
};

export default function InterviewPrepPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<InterviewPrepResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Rishi Kadimi',
      role: 'Frontend Developer',
      skills: 'React, JavaScript, HTML, CSS, Firebase, GitHub',
      experience: 'Internship at TechStart Pvt Ltd (3 months)',
      projects: [
        { title: 'TaskZen – Smart To-Do App', description: 'MERN stack app with AI task prioritization' },
      ],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects"
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const formattedInput = {
        ...values,
        skills: values.skills.split(',').map(s => s.trim()),
    };
    const plan = await generateInterviewQuestionsAction(formattedInput);
    setResult(plan as InterviewPrepResult);
    setIsLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
            <CardTitle>Interview Question Generator</CardTitle>
            <CardDescription>Fill in your profile to get tailored interview questions.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Rishi Kadimi" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Target Role</FormLabel>
                        <FormControl><Input placeholder="e.g., Frontend Developer" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="skills" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl><Textarea placeholder="e.g., React, Node.js, Python" {...field} /></FormControl>
                        <FormDescription>Comma-separated list of your skills.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="experience" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Experience Summary</FormLabel>
                        <FormControl><Textarea placeholder="e.g., Internship at TechStart (3 months)" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div>
                    <FormLabel>Projects</FormLabel>
                    <div className="space-y-4 mt-2">
                    {fields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md space-y-2 relative">
                             <FormField control={form.control} name={`projects.${index}.title`} render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Project Title</FormLabel>
                                    <FormControl><Input placeholder="e.g., TaskZen" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Description</FormLabel>
                                    <FormControl><Textarea placeholder="e.g., MERN stack app..." {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4 text-destructive"/>
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" className="w-full" onClick={() => append({ title: "", description: "" })}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                    </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                    ) : (
                    <><Sparkles className="mr-2 h-4 w-4" /> Generate Questions</>
                    )}
                </Button>
                </form>
            </Form>
            </CardContent>
        </Card>

        <div className="sticky top-24">
            <AnimatePresence>
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                )}
                {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="h-[calc(100vh-8rem)] overflow-auto"
                >
                    <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Sparkles className="text-primary" />
                        Your Interview Questions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {result.interviewQuestions.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    <p className="font-semibold text-foreground mb-2">Model Answer:</p>
                                    {item.expectedAnswer}
                                </AccordionContent>
                            </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                    </Card>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
