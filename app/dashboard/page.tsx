'use client'; 

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Filter,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface ArtistSubmission {
  id: string;
  name: string;
  email: string;
  categories: string[];
  location: string;
  priceRange: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  languages: string[];
}

const mockSubmissions: ArtistSubmission[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    email: 'alex.rivera@email.com',
    categories: ['Singer', 'Songwriter'],
    location: 'Nashville, TN',
    priceRange: '$400-800',
    status: 'pending',
    submittedAt: '2025-01-12',
    languages: ['English', 'Spanish'],
  },
  {
    id: '2',
    name: 'Maya Patel',
    email: 'maya.patel@email.com',
    categories: ['Dancer', 'Choreographer'],
    location: 'Los Angeles, CA',
    priceRange: '$300-600',
    status: 'approved',
    submittedAt: '2025-01-11',
    languages: ['English', 'Hindi'],
  },
  {
    id: '3',
    name: 'Jordan Kim',
    email: 'jordan.kim@email.com',
    categories: ['DJ', 'Producer'],
    location: 'New York, NY',
    priceRange: '$500-1000',
    status: 'pending',
    submittedAt: '2025-01-10',
    languages: ['English', 'Korean'],
  },
  {
    id: '4',
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    categories: ['Speaker', 'Coach'],
    location: 'San Francisco, CA',
    priceRange: '$800-1500',
    status: 'approved',
    submittedAt: '2025-01-09',
    languages: ['English'],
  },
  {
    id: '5',
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    categories: ['Magician'],
    location: 'Miami, FL',
    priceRange: '$350-700',
    status: 'rejected',
    submittedAt: '2025-01-08',
    languages: ['English', 'Spanish', 'Portuguese'],
  },
];

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    {
      title: 'Total Artists',
      value: '156',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Bookings',
      value: '23',
      change: '+8%',
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      title: 'Revenue This Month',
      value: '$12,450',
      change: '+15%',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
    {
      title: 'Pending Applications',
      value: '7',
      change: '+3',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    setSubmissions(submissions.map(submission =>
      submission.id === id ? { ...submission, status: newStatus } : submission
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
          <p className="text-gray-600">
            Manage artist applications and monitor platform performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Artist Submissions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Artist Submissions</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search artists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artist</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price Range</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{submission.name}</div>
                          <div className="text-sm text-gray-500">{submission.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {submission.categories.map((category) => (
                            <Badge key={category} variant="outline" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {submission.location}
                      </TableCell>
                      <TableCell className="font-medium text-purple-600">
                        {submission.priceRange}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(submission.status)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(submission.submittedAt).toISOString().split('T')[0]}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {submission.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(submission.id, 'approved')}
                                className="text-green-600 border-green-200 hover:bg-green-50"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(submission.id, 'rejected')}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredSubmissions.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <Users className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No submissions found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'New artist applications will appear here.'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}