'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { allSkills, careers, type allSkills as SkillType } from '@/lib/data';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, ArrowRight, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const skillsByCategory = allSkills.reduce((acc, skill) => {
  const { category } = skill;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(skill);
  return acc;
}, {} as Record<string, typeof allSkills>);

export default function SkillMappingPage() {
  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);

  const handleSkillToggle = (skill: SkillType, checked: boolean) => {
    if (checked) {
      setSelectedSkills((prev) => [...prev, skill]);
    } else {
      setSelectedSkills((prev) => prev.filter((s) => s.id !== skill.id));
    }
  };

  const isSkillSelected = (skillId: string) => {
    return selectedSkills.some((s) => s.id === skillId);
  };
  
  const matchingCareers = useMemo(() => {
    if (selectedSkills.length === 0) {
      return [];
    }

    const selectedSkillNames = selectedSkills.map(s => s.name);
    
    return careers.map(career => {
      const possessed = career.requiredSkills.filter(reqSkill => selectedSkillNames.includes(reqSkill));
      const missing = career.requiredSkills.filter(reqSkill => !selectedSkillNames.includes(reqSkill));
      const matchPercentage = (possessed.length / career.requiredSkills.length) * 100;
      
      return {
        ...career,
        possessed,
        missing,
        matchPercentage,
      };
    })
    .filter(c => c.matchPercentage > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  }, [selectedSkills]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
       <Card>
        <CardHeader>
          <CardTitle>Your Skillset</CardTitle>
          <CardDescription>You have selected {selectedSkills.length} skill(s).</CardDescription>
        </CardHeader>
        <CardContent>
            {selectedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <Badge key={skill.id} variant="secondary">{skill.name}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No skills selected yet. Start by checking some boxes below!</p>
            )}
            
            {selectedSkills.length > 0 && (
                <div className='mt-6'>
                    <Button asChild>
                        <Link href={{ pathname: '/dashboard/career-plan', query: { skills: selectedSkills.map(s => s.name).join(',') } }}>
                            <Lightbulb className="mr-2 h-4 w-4" />
                            Get Personalized Career Plan
                        </Link>
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="max-h-[calc(100vh-16rem)] overflow-y-auto">
          <CardHeader>
            <CardTitle>Map Your Skills</CardTitle>
            <CardDescription>
              Select the skills you possess from the categories below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" defaultValue={Object.keys(skillsByCategory)} className="w-full">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <AccordionItem value={category} key={category}>
                  <AccordionTrigger className="text-lg font-medium">{category}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill.id}
                            checked={isSkillSelected(skill.id)}
                            onCheckedChange={(checked) => handleSkillToggle(skill, !!checked)}
                          />
                          <Label
                            htmlFor={skill.id}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {skill.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Target /> Matching Career Roles</h2>
          {selectedSkills.length === 0 ? (
             <Card className="flex items-center justify-center h-48">
              <p className="text-muted-foreground">Select skills to see matching careers.</p>
            </Card>
          ) : (
            <div className="space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
              {matchingCareers.map(career => (
                <Card key={career.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{career.title}</span>
                      <Badge variant="outline">{Math.round(career.matchPercentage)}% Fit</Badge>
                    </CardTitle>
                     <Progress value={career.matchPercentage} className="h-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                       <p className="text-sm font-medium">Skills to Learn ({career.missing.length})</p>
                       {career.missing.length > 0 ? (
                         <div className="flex flex-wrap gap-2">
                          {career.missing.map(skill => (
                            <Badge key={skill} variant="destructive" className="font-normal">{skill}</Badge>
                          ))}
                        </div>
                       ): (
                        <p className="text-sm text-green-600">You have all the required skills!</p>
                       )}
                    </div>
                  </CardContent>
                  <CardContent>
                    <Button asChild className="w-full" variant="ghost">
                        <Link href={`/dashboard/explore/${career.id}`}>
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
