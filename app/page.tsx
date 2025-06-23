import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, Calendar, Shield } from 'lucide-react';
import { categories } from '@/lib/mock-data';

export default function HomePage() {
  const featuredStats = [
    { icon: Users, label: '500+ Artists', value: '500+' },
    { icon: Calendar, label: 'Events Booked', value: '2,000+' },
    { icon: Star, label: 'Average Rating', value: '4.8' },
    { icon: Shield, label: 'Verified Artists', value: '95%' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-indigo-600/10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">
              🎭 Trusted by 1000+ Event Planners
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Find the Perfect
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Artist{' '}
              </span>
              for Your Event
            </h1>
            <p className="mb-10 text-xl text-gray-600 sm:text-2xl">
              Connect with talented performing artists including singers, dancers, DJs, and speakers. 
              Make your event unforgettable with verified professionals.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-3 h-auto"
                asChild
              >
                <Link href="/artists">
                  Explore Artists <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-3 h-auto border-2 hover:bg-purple-50"
                asChild
              >
                <Link href="/onboard">
                  Join as Artist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {featuredStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect artist for your event from our diverse categories of talented professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/artists?category=${category.id}`}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-purple-200">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 text-4xl">{category.icon}</div>
                    <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to book the perfect artist for your event.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="mb-4 text-xl font-semibold">Browse Artists</h3>
              <p className="text-gray-600">
                Explore our curated selection of verified performing artists across multiple categories.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="mb-4 text-xl font-semibold">Request Quote</h3>
              <p className="text-gray-600">
                Contact artists directly and request custom quotes based on your event requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="mb-4 text-xl font-semibold">Book & Enjoy</h3>
              <p className="text-gray-600">
                Finalize the booking and enjoy an unforgettable performance at your event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Find Your Perfect Artist?
            </h2>
            <p className="mb-8 text-xl text-purple-100">
              Join thousands of event planners who trust Artistly for their entertainment needs.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-3 h-auto bg-white text-purple-600 hover:bg-gray-100"
              asChild
            >
              <Link href="/artists">
                Start Browsing Artists <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}