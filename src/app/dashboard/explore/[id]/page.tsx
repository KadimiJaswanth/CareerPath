import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { careers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  Briefcase,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function CareerDetailPage({ params }: { params: { id: string } }) {
  const career = careers.find((c) => c.id === params.id);

  if (!career) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === career.image);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card className="overflow-hidden">
        <div className="relative h-64 md:h-80 w-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={career.title}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <Badge variant="secondary" className="mb-2">
              {career.demand} Demand
            </Badge>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              {career.title}
            </h1>
          </div>
        </div>
        <CardContent className="p-6">
          <p className="text-lg text-muted-foreground">{career.description}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Industry Stats
            </CardTitle>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <DollarSign className="h-6 w-6 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Average Salary</p>
                <p className="text-2xl font-bold">{career.averageSalary}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-4">
              <TrendingUp className="h-6 w-6 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Market Demand</p>
                <div className="text-2xl font-bold">
                  <Badge
                    variant={career.demand === 'High' ? 'default' : 'secondary'}
                    className={
                      career.demand === 'High'
                        ? 'bg-primary/80 text-base'
                        : 'text-base'
                    }
                  >
                    {career.demand}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Required Skills</CardTitle>
            <CardDescription>
              The typical skills required to succeed in this role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {career.requiredSkills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted"
                >
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Learning Resources
            </CardTitle>
            <CardDescription>
              Recommended platforms to learn the required skills.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {career.learningResources?.map((resource) => (
              <Button
                key={resource.title}
                asChild
                variant="outline"
                className="w-full justify-between"
              >
                <Link href={resource.url} target="_blank">
                  {resource.title}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Find Your Next Job
            </CardTitle>
            <CardDescription>
              Apply for {career.title} roles on these platforms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {career.jobPlatforms?.map((platform) => (
              <Button
                key={platform.name}
                asChild
                variant="outline"
                className="w-full justify-between"
              >
                <Link href={platform.url} target="_blank">
                  {platform.name}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
