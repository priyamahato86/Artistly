import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Languages, CheckCircle } from 'lucide-react';
import { Artist } from '@/lib/mock-data';
import Image from 'next/image';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {artist.verified && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-sm">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{artist.rating}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{artist.name}</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {artist.category.map((cat) => (
              <Badge key={cat} variant="outline" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{artist.bio}</p>
        
        <div className="space-y-2 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{artist.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4" />
            <span>{artist.languages.join(', ')}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-purple-600">
            {artist.priceRange}
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Ask for Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}