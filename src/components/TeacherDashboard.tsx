
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOutIcon, TrendingUpIcon, AlertTriangleIcon, UsersIcon } from "lucide-react";

interface TeacherDashboardProps {
  username: string;
  onLogout: () => void;
}

interface StudentData {
  id: string;
  name: string;
  moodHistory: Array<{
    date: string;
    mood: 'happy' | 'sad' | 'angry' | 'anxious' | 'confused' | 'tired';
    score: number;
  }>;
  averageMood: number;
  needsAttention: boolean;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ username, onLogout }) => {
  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  // Mock student data
  const [studentsData] = useState<StudentData[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      moodHistory: [
        { date: '2024-01-01', mood: 'happy', score: 8 },
        { date: '2024-01-02', mood: 'anxious', score: 4 },
        { date: '2024-01-03', mood: 'happy', score: 7 },
        { date: '2024-01-04', mood: 'sad', score: 3 },
        { date: '2024-01-05', mood: 'confused', score: 5 },
      ],
      averageMood: 5.4,
      needsAttention: false
    },
    {
      id: '2',
      name: 'Emma Davis',
      moodHistory: [
        { date: '2024-01-01', mood: 'sad', score: 3 },
        { date: '2024-01-02', mood: 'sad', score: 2 },
        { date: '2024-01-03', mood: 'anxious', score: 3 },
        { date: '2024-01-04', mood: 'angry', score: 2 },
        { date: '2024-01-05', mood: 'sad', score: 3 },
      ],
      averageMood: 2.6,
      needsAttention: true
    },
    {
      id: '3',
      name: 'Michael Chen',
      moodHistory: [
        { date: '2024-01-01', mood: 'happy', score: 9 },
        { date: '2024-01-02', mood: 'happy', score: 8 },
        { date: '2024-01-03', mood: 'confused', score: 6 },
        { date: '2024-01-04', mood: 'happy', score: 8 },
        { date: '2024-01-05', mood: 'tired', score: 6 },
      ],
      averageMood: 7.4,
      needsAttention: false
    }
  ]);

  const getMoodEmoji = (mood: string) => {
    const moodMap = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      anxious: '😰',
      confused: '🤔',
      tired: '😴'
    };
    return moodMap[mood as keyof typeof moodMap] || '😐';
  };

  const getMoodColor = (score: number) => {
    if (score >= 7) return 'bg-green-500';
    if (score >= 5) return 'bg-yellow-500';
    if (score >= 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getClassAverage = () => {
    const total = studentsData.reduce((sum, student) => sum + student.averageMood, 0);
    return (total / studentsData.length).toFixed(1);
  };

  const getAlertsCount = () => {
    return studentsData.filter(student => student.needsAttention).length;
  };

  const selectedStudentData = selectedStudent === 'all' 
    ? null 
    : studentsData.find(s => s.id === selectedStudent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-300/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 bg-white/80 backdrop-blur-sm border-b border-white/50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">📊</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Teacher Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {username}</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-gray-600 hover:text-gray-800"
          >
            <LogOutIcon size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <UsersIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{studentsData.length}</div>
              <p className="text-xs text-muted-foreground">
                Active in wellness program
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Average</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{getClassAverage()}/10</div>
              <p className="text-xs text-muted-foreground">
                Overall mood score
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
              <AlertTriangleIcon className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{getAlertsCount()}</div>
              <p className="text-xs text-muted-foreground">
                Students requiring support
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student List */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Student Overview</CardTitle>
              <CardDescription>Click on a student to view detailed analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {studentsData.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedStudent === student.id 
                      ? 'bg-blue-100 border-blue-300 border-2' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{student.name}</h3>
                      <p className="text-sm text-gray-600">
                        Avg: {student.averageMood.toFixed(1)}/10
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {student.needsAttention && (
                        <AlertTriangleIcon size={16} className="text-orange-500" />
                      )}
                      <div className={`w-3 h-3 rounded-full ${getMoodColor(student.averageMood)}`} />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Detailed Analytics */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {selectedStudentData ? `${selectedStudentData.name}'s Analytics` : 'Class Overview'}
                    </CardTitle>
                    <CardDescription>
                      {timeRange === 'week' ? 'Past 7 days' : 'Past 30 days'} mood tracking
                    </CardDescription>
                  </div>
                  <Select value={timeRange} onValueChange={(value: 'week' | 'month') => setTimeRange(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {selectedStudentData ? (
                  <div className="space-y-6">
                    {/* Mood Timeline */}
                    <div>
                      <h3 className="font-medium mb-3">Recent Mood History</h3>
                      <div className="space-y-2">
                        {selectedStudentData.moodHistory.slice(-5).map((entry, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
                              <div>
                                <p className="font-medium capitalize">{entry.mood}</p>
                                <p className="text-sm text-gray-600">{entry.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full ${getMoodColor(entry.score)}`} />
                              <span className="font-medium">{entry.score}/10</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alerts */}
                    {selectedStudentData.needsAttention && (
                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangleIcon size={16} className="text-orange-600" />
                          <h3 className="font-medium text-orange-800">Attention Needed</h3>
                        </div>
                        <p className="text-sm text-orange-700">
                          This student has shown consistently low mood scores. Consider reaching out for a one-on-one conversation.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UsersIcon size={24} className="text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-800 mb-2">Select a Student</h3>
                    <p className="text-gray-600">Choose a student from the list to view their detailed mood analytics.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
