'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import moment from 'moment';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function ProfilePage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile');
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (!isHydrated || loading || !user || !profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  const sessionFrequencyData = profile.sessions.reduce((acc: any[], session: any) => {
    const date = moment(session.createdOn).format('YYYY-MM-DD');
    const existing = acc.find((item) => item.date === date);
    if (existing) existing.count += 1;
    else acc.push({ date, count: 1 });
    return acc;
  }, []);

  return (
    <div className="relative px-6 md:px-20 py-10 min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-100 dark:from-neutral-900 dark:via-black dark:to-neutral-800">

      {/* 🎨 Smooth Gradient Blobs */}
      <motion.div
        className="absolute top-[-150px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-tr from-blue-400 via-sky-300 to-purple-400 opacity-30 rounded-full blur-3xl z-0"
        animate={{ x: [0, 40, 0], y: [0, 40, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-gradient-to-tr from-purple-500 via-indigo-400 to-blue-300 opacity-25 rounded-full blur-3xl z-0"
        animate={{ x: [0, -40, 0], y: [0, -40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* Main Glass Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 space-y-8 border rounded-3xl p-8 md:p-12 bg-white/70 dark:bg-black/30 backdrop-blur-md shadow-xl"
      >

        {/* 🧑 User Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <img
            src={user?.imageUrl}
            className="w-30 h-30 rounded-full border-4 border-blue-500 shadow-md"
            alt="User Avatar"
          />
          <div>
            <h2 className="text-3xl font-semibold text-neutral-800 dark:text-white pl-5">{user?.fullName}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 pl-5">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </motion.div>

        {/* 📊 Stylish Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Credits',
              value: profile.user.credits,
              gradient: 'from-blue-400 to-blue-600',
              text: 'text-blue-100'
            },
            {
              title: 'Total Sessions',
              value: profile.sessions.length,
              gradient: 'from-green-400 to-green-600',
              text: 'text-green-100'
            },
            {
              title: 'Last Doctor',
              value: profile.sessions.at(-1)?.selectedDoctor?.specialist ?? 'N/A',
              gradient: 'from-purple-400 to-purple-600',
              text: 'text-purple-100'
            }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className={`rounded-xl p-6 text-white bg-gradient-to-br ${stat.gradient} shadow-md transition-all duration-300`}
            >
              <h3 className={`text-md font-semibold ${stat.text}`}>{stat.title}</h3>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 📈 Bar Graph */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow space-y-4"
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Session Frequency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={sessionFrequencyData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ⏳ Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow space-y-4"
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Session Timeline</h3>
          <ul className="space-y-4">
            {profile.sessions.map((session: any, index: number) => (
              <li key={index} className="border-l-4 pl-4 border-blue-500">
                <div className="flex justify-between">
                  <h4 className="font-semibold text-md text-neutral-800 dark:text-white">
                    {session.selectedDoctor?.specialist ?? 'Unknown Doctor'}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {moment(session.createdOn).fromNow()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{session.notes}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}