'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { getFeedbackForInterview } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { interviewRoles, interviewQuestions, type InterviewRole } from '@/lib/interview-data';
import { type InterviewFeedbackOutput } from '@/ai/flows/interview-feedback-generator';

type InterviewState = 'setup' | 'in-progress' | 'feedback' | 'error';
type Answer = { questionId: string; answer: string };

export default function MockInterviewPage() {
  const [interviewState, setInterviewState] = useState<InterviewState>('setup');
  const [selectedRole, setSelectedRole] = useState<InterviewRole | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [feedbackResult, setFeedbackResult] = useState<InterviewFeedbackOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: InterviewRole) => {
    setSelectedRole(role);
    setInterviewState('in-progress');
    // Initialize answers state
    const initialAnswers = interviewQuestions[role].map(q => ({ questionId: q.id, answer: '' }));
    setAnswers(initialAnswers);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => prev.map(a => a.questionId === questionId ? { ...a, answer } : a));
  };

  const handleSubmit = async () => {
    if (!selectedRole) return;
    setIsLoading(true);
    setInterviewState('feedback');

    const questions = interviewQuestions[selectedRole];
    const questionsAndAnswers = questions.map(question => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      return {
        question: question.text,
        modelAnswer: question.modelAnswer,
        userAnswer: userAnswer?.answer || '',
      };
    });

    try {
      const result = await getFeedbackForInterview({
        role: selectedRole,
        questionsAndAnswers,
      });
      setFeedbackResult(result);
    } catch (error) {
      console.error(error);
      setInterviewState('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setInterviewState('setup');
    setSelectedRole(null);
    setAnswers([]);
    setFeedbackResult(null);
  };
  
  const allQuestionsAnswered = answers.every(a => a.answer.trim() !== '');

  const renderContent = () => {
    switch (interviewState) {
      case 'setup':
        return (
          <motion.div
            key="setup"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-center h-full"
          >
            <Card className="w-full max-w-lg text-center">
              <CardHeader>
                <CardTitle className="text-2xl">AI Mock Interview</CardTitle>
                <CardDescription>
                  Get personalized feedback on your interview skills. Select a role to begin.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Label>Select Target Role</Label>
                <Select onValueChange={(value) => handleRoleSelect(value as InterviewRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role..." />
                  </SelectTrigger>
                  <SelectContent>
                    {interviewRoles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'in-progress':
        const questions = selectedRole ? interviewQuestions[selectedRole] : [];
        return (
          <motion.div key="in-progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Mock Interview: {selectedRole}</CardTitle>
                    <CardDescription>Answer all the questions below.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleRestart}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Role Selection
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {questions.map((q, index) => (
                  <div key={q.id} className="space-y-2">
                    <Label htmlFor={q.id}>Question {index + 1}: {q.text}</Label>
                    <Textarea
                      id={q.id}
                      value={answers.find(a => a.questionId === q.id)?.answer || ''}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      placeholder="Type your answer here..."
                      rows={5}
                    />
                  </div>
                ))}
                 <Button onClick={handleSubmit} disabled={!allQuestionsAnswered} className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Submit and Get Feedback
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'feedback':
         return (
          <motion.div key="feedback" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Interview Feedback Report</CardTitle>
                    <CardDescription>Role: {selectedRole}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleRestart}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Start New Interview
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="ml-4 text-lg">Analyzing your answers...</p>
                  </div>
                ) : feedbackResult ? (
                  <div className="space-y-8">
                     <Alert className="bg-primary/5 border-primary/20">
                        <Sparkles className="h-4 w-4 !text-primary" />
                        <AlertTitle className="font-semibold">Overall Summary</AlertTitle>
                        <AlertDescription>
                         {feedbackResult.overallFeedback}
                        </AlertDescription>
                    </Alert>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Detailed Feedback by Question</h3>
                        <div className="space-y-6">
                        {feedbackResult.feedbackByQuestion.map((item, index) => (
                            <div key={index} className="p-4 border rounded-lg bg-muted/30">
                               <p className="font-semibold text-md mb-2">{item.question}</p>
                               <div className="space-y-4">
                                   <div>
                                       <p className="text-sm font-medium text-muted-foreground mb-1">Your Answer</p>
                                       <p className="p-3 rounded-md bg-background text-sm whitespace-pre-wrap">{item.userAnswer || "You did not provide an answer."}</p>
                                   </div>
                                    <div>
                                       <p className="text-sm font-medium text-blue-600 mb-1">Feedback</p>
                                       <p className="p-3 rounded-md bg-blue-50 border border-blue-200 text-sm text-blue-900">{item.feedback}</p>
                                   </div>
                               </div>
                            </div>
                        ))}
                        </div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'error':
        return (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Sorry, I encountered an error while generating feedback. Please try again.
              <Button onClick={handleRestart} variant="link" className="p-0 h-auto ml-2">Restart Interview</Button>
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
}
