"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type UserProfileType = {
  name: string;
  phone: string;
  avatar: string;
  role: string;
  email: string;
};

type UserContextType = {
  profile: UserProfileType;
  updateProfile: (newProfile: Partial<UserProfileType>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfileType>({
    name: 'Memuat...',
    phone: '-',
    avatar: '',
    role: 'Memuat...',
    email: '-',
  });

  useEffect(() => {
    const saved = localStorage.getItem('prime_user');
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setProfile({
        name: 'Guest',
        phone: '-',
        avatar: 'https://i.pravatar.cc/150?img=11',
        role: 'Guest',
        email: 'guest@primeproperty.com',
      });
    }
  }, []);

  const updateProfile = (newProfile: Partial<UserProfileType>) => {
    setProfile(prev => {
      const updated = { ...prev, ...newProfile };
      localStorage.setItem('prime_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
