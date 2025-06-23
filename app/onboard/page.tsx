'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Upload, X, CheckCircle } from 'lucide-react';
import { categories, languages, priceRanges } from '@/lib/mock-data';
import Image from 'next/image';


const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  categories: z.array(z.string()).min(1, 'Please select at least one category'),
  languages: z.array(z.string()).min(1, 'Please select at least one language'),
  priceRange: z.string().min(1, 'Please select a price range'),
  location: z.string().min(2, 'Location is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

type FormData = z.infer<typeof formSchema>;

export default function OnboardPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
      languages: [],
    },
  });

  const selectedCategories = watch('categories') || [];
  const selectedLanguages = watch('languages') || [];

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    const current = selectedCategories;
    if (checked) {
      setValue('categories', [...current, categoryName]);
    } else {
      setValue('categories', current.filter((cat) => cat !== categoryName));
    }
  };

  const handleLanguageChange = (languageName: string, checked: boolean) => {
    const current = selectedLanguages;
    if (checked) {
      setValue('languages', [...current, languageName]);
    } else {
      setValue('languages', current.filter((lang) => lang !== languageName));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', { ...data, image: selectedImage });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for joining Artistly! We'll review your application and get back to you within 2-3 business days.
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              onClick={() => window.location.href = '/'}
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Artistly</h1>
          <p className="text-gray-600">
            Create your artist profile and start receiving booking requests
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Enter your full name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="Enter your email"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="Enter your phone number"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="City, State"
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  {...register('bio')}
                  placeholder="Tell us about yourself, your experience, and what makes you unique..."
                  className={`min-h-[120px] ${errors.bio ? 'border-red-500' : ''}`}
                />
                {errors.bio && (
                  <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categories */}
              <div>
                <Label>Categories * (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category.name, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={category.id}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {category.icon} {category.name}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedCategories.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                        <button
                          type="button"
                          onClick={() => handleCategoryChange(category, false)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                {errors.categories && (
                  <p className="text-sm text-red-500 mt-1">{errors.categories.message}</p>
                )}
              </div>

              {/* Languages */}
              <div>
                <Label>Languages Spoken * (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={selectedLanguages.includes(language)}
                        onCheckedChange={(checked) =>
                          handleLanguageChange(language, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={language}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedLanguages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedLanguages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                        <button
                          type="button"
                          onClick={() => handleLanguageChange(language, false)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                {errors.languages && (
                  <p className="text-sm text-red-500 mt-1">{errors.languages.message}</p>
                )}
              </div>

              {/* Price Range */}
              <div>
                <Label htmlFor="priceRange">Fee Range *</Label>
                <Controller
                  name="priceRange"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.priceRange ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select your fee range" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.priceRange && (
                  <p className="text-sm text-red-500 mt-1">{errors.priceRange.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Image */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Image (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                {selectedImage ? (
                  <div className="relative">
                    <Image
                      src={selectedImage}
                      alt="Profile preview"
                       width={128}
                       height={128}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedImage(null)}
                      className="mt-4"
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-sm text-gray-600 mb-4">
                      Upload a professional headshot to help clients connect with you
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button type="button" variant="outline" asChild>
                        <span className="cursor-pointer">Choose Image</span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8 py-3 text-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}