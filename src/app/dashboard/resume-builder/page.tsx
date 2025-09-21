'use client';

import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Download, Loader2, PlusCircle, Trash2, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { generateResumeAction, ResumeGeneratorInput } from './actions';

type Experience = {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
};

type Education = {
  id: number;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
};

export default function ResumeBuilderPage() {
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/johndoe');
  const [summary, setSummary] = useState(
    'Highly motivated and results-oriented professional with experience in software development and project management. Seeking to leverage technical skills to drive innovation at a forward-thinking company.'
  );
  const [skills, setSkills] = useState(
    'JavaScript, React, Node.js, SQL, Python, Project Management, Agile Methodologies'
  );

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Corp, San Francisco, CA',
      startDate: '2022-01',
      endDate: 'Present',
      responsibilities:
        '- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to define and ship new features.',
    },
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      id: 1,
      school: 'State University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2018-08',
      endDate: '2022-05',
    },
  ]);
  
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const resumePreviewRef = useRef<HTMLDivElement>(null);


  const handleExperienceChange = (id: number, field: keyof Experience, value: string) => {
    setExperiences(
      experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
      },
    ]);
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };
  
  const handleEducationChange = (id: number, field: keyof Education, value: string) => {
    setEducations(
      educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };
  
  const removeEducation = (id: number) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const handleGenerateResume = async () => {
    setIsGenerating(true);
    const resumeData: ResumeGeneratorInput = {
      name: fullName,
      email,
      phone,
      linkedin,
      summary,
      skills: skills.split(',').map(s => s.trim()),
      education: educations.map(edu => ({
        degree: edu.degree,
        university: edu.school,
        year: edu.endDate,
        gpa: '',
      })),
      experience: experiences.map(exp => ({
        role: exp.title,
        company: exp.company,
        duration: `${exp.startDate} - ${exp.endDate}`,
        achievements: exp.responsibilities.split('\n').map(r => r.replace('-', '').trim()).filter(r => r),
      })),
      projects: [],
      certifications: [],
    };
    try {
      const result = await generateResumeAction(resumeData);
      setGeneratedHtml(result.resumeHTML);
    } catch (error) {
      console.error("Failed to generate resume:", error);
    }
    setIsGenerating(false);
  }

  const handleExportPdf = async () => {
    if (!resumePreviewRef.current) return;
    setIsExporting(true);

    const canvas = await html2canvas(resumePreviewRef.current, {
      scale: 2, 
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    const imgData = canvas.toDataURL('image/png');
    
    // a4 size
    const pdf = new jsPDF('p', 'mm', 'a4'); 
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;
    let width = pdfWidth;
    let height = width / ratio;

    if (height > pdfHeight) {
       // if content is taller than one page, we split it
       let position = 0;
       const pageHeight = pdfHeight - 20; // with margin
       let heightLeft = height;
       pdf.addImage(imgData, 'PNG', 10, 10, width-20, height-20);
       heightLeft -= pageHeight;
       while (heightLeft > 0) {
        position = -heightLeft;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position + 10, width-20, height-20);
        heightLeft -= pageHeight;
      }
    } else {
       pdf.addImage(imgData, 'PNG', 10, 10, width-20, height-20);
    }
    
    pdf.save('resume.pdf');
    setIsExporting(false);
  };


  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      {/* Form Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6 gap-2">
            <h2 className="text-2xl font-semibold">Resume Builder</h2>
            <div className="flex gap-2">
              <Button onClick={handleGenerateResume} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI Assist
                  </>
                )}
              </Button>
              <Button onClick={handleExportPdf} disabled={isExporting}>
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                  </>
                )}
              </Button>
            </div>
          </div>
          <Accordion type="multiple" defaultValue={['personal', 'experience', 'education']} className="w-full">
            <AccordionItem value="personal">
              <AccordionTrigger>Personal Information</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.doe@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(123) 456-7890" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="linkedin.com/in/johndoe" />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="summary">
              <AccordionTrigger>Professional Summary</AccordionTrigger>
              <AccordionContent>
                <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="A brief summary of your professional background..." />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="experience">
              <AccordionTrigger>Work Experience</AccordionTrigger>
              <AccordionContent className="space-y-4">
                {experiences.map((exp, index) => (
                   <div key={exp.id}>
                    <div className="space-y-4 border p-4 rounded-md relative">
                      <div className="grid gap-2">
                        <Label>Job Title</Label>
                        <Input value={exp.title} onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)} placeholder="Software Engineer" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Company</Label>
                        <Input value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} placeholder="Tech Corp, San Francisco, CA" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Start Date</Label>
                          <Input value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} type="month" />
                        </div>
                        <div className="grid gap-2">
                          <Label>End Date</Label>
                          <Input value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} type="text" placeholder="Present or YYYY-MM" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Responsibilities</Label>
                        <Textarea value={exp.responsibilities} onChange={(e) => handleExperienceChange(exp.id, 'responsibilities', e.target.value)} placeholder="- Developed new features..." />
                      </div>
                      {experiences.length > 1 && (
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(exp.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    {index < experiences.length - 1 && <Separator className="my-4" />}
                   </div>
                ))}
                <Button variant="outline" className="w-full" onClick={addExperience}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Another Experience
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="education">
              <AccordionTrigger>Education</AccordionTrigger>
              <AccordionContent className="space-y-4">
                 {educations.map((edu, index) => (
                  <div key={edu.id}>
                    <div className="space-y-4 border p-4 rounded-md relative">
                      <div className="grid gap-2">
                        <Label>School/University</Label>
                        <Input value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} placeholder="State University" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Degree</Label>
                        <Input value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
                      </div>
                       <div className="grid gap-2">
                        <Label>Field of Study</Label>
                        <Input value={edu.field} onChange={(e) => handleEducationChange(edu.id, 'field', e.target.value)} placeholder="Computer Science" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Start Date</Label>
                          <Input value={edu.startDate} onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)} type="month" />
                        </div>
                        <div className="grid gap-2">
                          <Label>End Date</Label>
                          <Input value={edu.endDate} onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)} type="month" />
                        </div>
                      </div>
                      {educations.length > 1 && (
                         <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(edu.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                     {index < educations.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={addEducation}>
                   <PlusCircle className="mr-2 h-4 w-4" /> Add Another Education
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skills">
              <AccordionTrigger>Skills</AccordionTrigger>
              <AccordionContent>
                <Textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="JavaScript, React, Node.js, Project Management..." />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <div className="sticky top-24">
        <Card className="h-[calc(100vh-8rem)] overflow-auto">
          <div ref={resumePreviewRef} className="p-8 bg-white text-black min-h-full font-serif">
            {generatedHtml ? (
               <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
            ) : (
            <>
              <div className="text-center border-b pb-4 mb-6 border-gray-300">
                <h1 className="text-4xl font-bold text-gray-800">{fullName}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {email} {phone && `| ${phone}`} {linkedin && `| ${linkedin}`}
                </p>
              </div>
              <div className="space-y-6">
                {summary && (
                  <div>
                    <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2 text-primary">Professional Summary</h2>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{summary}</p>
                  </div>
                )}
                {experiences.length > 0 && experiences[0].title && (
                   <div>
                    <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2 text-primary">Work Experience</h2>
                    {experiences.map(exp => (
                      <div className="mb-4" key={exp.id}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-md font-bold text-gray-800">{exp.title}</h3>
                           <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
                        <ul className="list-disc list-inside text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                          {exp.responsibilities.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {educations.length > 0 && educations[0].school && (
                  <div>
                    <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2 text-primary">Education</h2>
                     {educations.map(edu => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-md font-bold text-gray-800">{edu.school}</h3>
                          <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-sm italic text-gray-700">{edu.degree} in {edu.field}</p>
                      </div>
                    ))}
                  </div>
                )}
                 {skills && (
                  <div>
                    <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2 text-primary">Skills</h2>
                    <p className="text-sm text-gray-700">{skills}</p>
                  </div>
                )}
              </div>
            </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
