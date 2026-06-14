"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type NotificationType = {
  id: number;
  type: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
};

type NotificationContextType = {
  notifications: NotificationType[];
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
  unreadCount: number;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: NotificationType[] = [
  { id: 1, type: 'alert', title: 'Pembaruan Sistem', desc: 'Pemeliharaan server akan dilakukan besok jam 02:00 WIB.', time: '10 menit yang lalu', read: false },
  { id: 2, type: 'success', title: 'Properti Berhasil Dihapus', desc: 'Listing "Villa Cemara Asri" berhasil masuk ke Arsip.', time: '2 jam yang lalu', read: false },
  { id: 3, type: 'info', title: 'Login Baru Terdeteksi', desc: 'Superadmin login dari perangkat baru (Chrome, Windows).', time: '1 hari yang lalu', read: true },
  { id: 4, type: 'success', title: 'Listing Baru Ditambahkan', desc: 'Properti "Setiabudi Bisnis Center" telah tayang.', time: '2 hari yang lalu', read: true },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationType[]>(INITIAL_NOTIFICATIONS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load state from localStorage on mount
    const saved = localStorage.getItem('prime_notifications_v1');
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save state to localStorage whenever it changes
    if (isLoaded) {
      localStorage.setItem('prime_notifications_v1', JSON.stringify(notifications));
    }
  }, [notifications, isLoaded]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, markAllAsRead, deleteNotification, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
