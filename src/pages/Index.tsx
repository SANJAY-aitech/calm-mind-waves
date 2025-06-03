
import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import StudentDashboard from '@/components/StudentDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';

interface User {
  type: 'student' | 'teacher';
  username: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('mindmate_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('mindmate_user');
      }
    }
  }, []);

  const handleLogin = (userType: 'student' | 'teacher', username: string) => {
    const userData = { type: userType, username };
    setUser(userData);
    localStorage.setItem('mindmate_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mindmate_user');
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (user.type === 'student') {
    return <StudentDashboard username={user.username} onLogout={handleLogout} />;
  }

  return <TeacherDashboard username={user.username} onLogout={handleLogout} />;
};

export default Index;
