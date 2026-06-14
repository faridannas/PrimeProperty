"use client";

import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, Trash2 } from 'lucide-react';
import { useNotifications } from '@/components/agent/NotificationContext';

export default function NotificationsPage() {
  const { notifications, markAllAsRead, deleteNotification } = useNotifications();

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Notifikasi Sistem</h2>
          <p className="text-gray-400">Pusat informasi dan peringatan sistem dasbor.</p>
        </div>
        <button onClick={markAllAsRead} className="text-sm font-semibold text-prime-gold hover:text-white transition">
          Tandai Semua Dibaca
        </button>
      </div>

      <div className="bg-[#111111]/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/5 flex flex-col gap-4 min-h-[300px]">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-10">Tidak ada notifikasi saat ini.</div>
        ) : (
          notifications.map((notif) => (
            <div key={notif.id} className={`p-4 rounded-2xl flex gap-4 transition group relative ${notif.read ? 'opacity-60 bg-transparent' : 'bg-white/5 border border-white/10 shadow-sm'}`}>
              <div className="shrink-0 mt-1">
                {notif.type === 'alert' && <AlertTriangle className="text-prime-red" size={24} />}
                {notif.type === 'success' && <CheckCircle2 className="text-green-500" size={24} />}
                {notif.type === 'info' && <Info className="text-prime-gold" size={24} />}
              </div>
              <div className="flex-1 pr-8">
                <div className="flex justify-between items-start mb-1">
                  <h5 className={`font-bold ${notif.read ? 'text-gray-300' : 'text-white'}`}>{notif.title}</h5>
                  <span className="text-xs text-gray-500">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-400">{notif.desc}</p>
              </div>
              
              {/* Tombol Hapus */}
              <button 
                onClick={() => deleteNotification(notif.id)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-prime-red/10 text-prime-red flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-prime-red hover:text-white"
                title="Hapus Notifikasi"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
