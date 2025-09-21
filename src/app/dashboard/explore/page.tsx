'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, DollarSign, TrendingUp, Search, Code, CheckCircle } from 'lucide-react';
import { careers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CareerExplorerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [demandFilter, setDemandFilter] = useState('all');

  const filteredCareers = careers.filter((career) => {
    const titleMatch = career.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const demandMatch =
      demandFilter === 'all' || career.demand === demandFilter;
    return titleMatch && demandMatch;
  });

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search careers by title..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={demandFilter} onValueChange={setDemandFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by demand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Demands</SelectItem>
                <SelectItem value="High">High Demand</SelectItem>
                <SelectItem value="Medium">Medium Demand</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career) => {
          const image = PlaceHolderImages.find((img) => img.id === career.image);
          return (
            <Card key={career.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={career.title}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                  />
                   <div className="absolute top-2 right-2">
                     <Badge
                      variant={career.demand === 'High' ? 'default' : 'secondary'}
                      className={career.demand === 'High' ? 'bg-primary/90' : ''}
                    >
                      {career.demand} Demand
                    </Badge>
                   </div>
                </div>
              )}
              <CardHeader>
                <CardTitle>{career.title}</CardTitle>
                <CardDescription className="line-clamp-2 h-10">
                  {career.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Avg. Salary: {career.averageSalary}</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2"><Code className="h-4 w-4" /> Top Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.requiredSkills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="outline" className="font-normal">{skill}</Badge>
                    ))}
                    {career.requiredSkills.length > 3 && <Badge variant="outline">...</Badge>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-4">
                <Button asChild className="w-full" variant="secondary">
                  <Link href={`/dashboard/explore/${career.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
       {filteredCareers.length === 0 && (
          <div className="text-center col-span-full py-12 bg-muted/50 rounded-lg">
            <p className="text-lg font-medium">No careers found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
    </div>
  );
}
