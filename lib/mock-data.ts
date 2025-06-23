export interface Artist {
  id: string;
  name: string;
  category: string[];
  bio: string;
  priceRange: string;
  location: string;
  languages: string[];
  image: string;
  rating: number;
  verified: boolean;
}

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Sofia Martinez',
    category: ['Singer', 'Performer'],
    bio: 'Professional vocalist specializing in jazz, pop, and Latin music with 8+ years of experience.',
    priceRange: '$500-1000',
    location: 'New York, NY',
    languages: ['English', 'Spanish'],
    image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    verified: true,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    category: ['DJ', 'Producer'],
    bio: 'Electronic music producer and DJ specializing in house, techno, and ambient music.',
    priceRange: '$300-750',
    location: 'Los Angeles, CA',
    languages: ['English'],
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    verified: true,
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    category: ['Dancer', 'Choreographer'],
    bio: 'Contemporary and ballroom dance instructor with competitive dance background.',
    priceRange: '$400-800',
    location: 'Miami, FL',
    languages: ['English', 'Spanish', 'Portuguese'],
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    verified: true,
  },
  {
    id: '4',
    name: 'David Chen',
    category: ['Speaker', 'Comedian'],
    bio: 'Motivational speaker and stand-up comedian with expertise in corporate events.',
    priceRange: '$600-1200',
    location: 'San Francisco, CA',
    languages: ['English', 'Mandarin'],
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    verified: false,
  },
  {
    id: '5',
    name: 'Aria Thompson',
    category: ['Singer', 'Songwriter'],
    bio: 'Indie folk singer-songwriter with a soulful voice and original compositions.',
    priceRange: '$350-650',
    location: 'Austin, TX',
    languages: ['English'],
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    verified: true,
  },
  {
    id: '6',
    name: 'Ryan O\'Connor',
    category: ['Magician', 'Performer'],
    bio: 'Professional close-up and stage magician specializing in corporate entertainment.',
    priceRange: '$450-900',
    location: 'Chicago, IL',
    languages: ['English'],
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    verified: true,
  },
];

export const categories = [
  { id: 'singer', name: 'Singer', icon: '🎤' },
  { id: 'dj', name: 'DJ', icon: '🎧' },
  { id: 'dancer', name: 'Dancer', icon: '💃' },
  { id: 'speaker', name: 'Speaker', icon: '🎯' },
  { id: 'comedian', name: 'Comedian', icon: '😄' },
  { id: 'magician', name: 'Magician', icon: '🎩' },
  { id: 'musician', name: 'Musician', icon: '🎸' },
  { id: 'performer', name: 'Performer', icon: '🎭' },
];

export const locations = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Miami, FL',
  'Austin, TX',
  'San Francisco, CA',
  'Seattle, WA',
  'Boston, MA',
];

export const priceRanges = [
  '$0-250',
  '$250-500',
  '$500-750',
  '$750-1000',
  '$1000-1500',
  '$1500+',
];

export const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Mandarin',
  'Japanese',
  'Korean',
  'Arabic',
];