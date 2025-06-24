'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import ArtistCard from '@/components/artist-card';
import { mockArtists, categories, locations, priceRanges } from '@/lib/mock-data';

export default function ArtistsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredArtists = useMemo(() => {
    return mockArtists.filter((artist) => {
      const categoryMatch = selectedCategories.length === 0 || 
        selectedCategories.some(cat => 
          artist.category.some(artistCat => 
            artistCat.toLowerCase().includes(cat.toLowerCase())
          )
        );
      
      const locationMatch = selectedLocation === 'all' || artist.location === selectedLocation;
      const priceMatch = selectedPriceRange === 'all' || artist.priceRange === selectedPriceRange;
      
      return categoryMatch && locationMatch && priceMatch;
    });
  }, [selectedCategories, selectedLocation, selectedPriceRange]);

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryName]);
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLocation('all');
    setSelectedPriceRange('all');
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedLocation !== 'all' || selectedPriceRange !== 'all';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Artists</h1>
              <p className="text-gray-600">
                Discover talented performers for your next event
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-3">
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
                </div>

                {/* Location */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Location</h3>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ranges</SelectItem>
                      {priceRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                  >
                    {category}
                    <button
                      onClick={() => handleCategoryChange(category, false)}
                      className="ml-2 hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {selectedLocation !== 'all' && (
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                  >
                    {selectedLocation}
                    <button
                      onClick={() => setSelectedLocation('all')}
                      className="ml-2 hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedPriceRange !== 'all' && (
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                  >
                    {selectedPriceRange}
                    <button
                      onClick={() => setSelectedPriceRange('all')}
                      className="ml-2 hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Results Header */}
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Artists Grid */}
            {filteredArtists.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No artists found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
