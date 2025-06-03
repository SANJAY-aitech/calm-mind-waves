
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, GraduationCapIcon } from "lucide-react";

interface LoginFormProps {
  onLogin: (userType: 'student' | 'teacher', username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [studentUsername, setStudentUsername] = useState('');
  const [teacherUsername, setTeacherUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (userType: 'student' | 'teacher') => {
    setIsLoading(true);
    const username = userType === 'student' ? studentUsername : teacherUsername;
    
    // Simulate loading animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (username.trim()) {
      onLogin(userType, username);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md mx-4 backdrop-blur-sm bg-white/90 border-0 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">🧠</span>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MindMate AI
          </CardTitle>
          <CardDescription className="text-gray-600">
            Your AI-powered mental wellness companion
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <UserIcon size={16} />
                Student
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex items-center gap-2">
                <GraduationCapIcon size={16} />
                Teacher
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={studentUsername}
                  onChange={(e) => setStudentUsername(e.target.value)}
                  className="border-gray-300 focus:border-blue-400 transition-colors"
                />
              </div>
              <Button
                onClick={() => handleLogin('student')}
                disabled={isLoading || !studentUsername.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </div>
                ) : (
                  'Start Your Journey'
                )}
              </Button>
            </TabsContent>

            <TabsContent value="teacher" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Teacher ID</label>
                <Input
                  type="text"
                  placeholder="Enter your teacher ID"
                  value={teacherUsername}
                  onChange={(e) => setTeacherUsername(e.target.value)}
                  className="border-gray-300 focus:border-green-400 transition-colors"
                />
              </div>
              <Button
                onClick={() => handleLogin('teacher')}
                disabled={isLoading || !teacherUsername.trim()}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Accessing Dashboard...
                  </div>
                ) : (
                  'Access Dashboard'
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
