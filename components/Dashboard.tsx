import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Paper, PaperStatus } from '../types';
import { Users, FileText, Calendar, DollarSign } from 'lucide-react';

interface DashboardProps {
  papers: Paper[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard: React.FC<DashboardProps> = ({ papers }) => {
  const statusCounts = [
    { name: 'Submitted', value: papers.filter(p => p.status === PaperStatus.SUBMITTED).length },
    { name: 'Under Review', value: papers.filter(p => p.status === PaperStatus.UNDER_REVIEW).length },
    { name: 'Accepted', value: papers.filter(p => p.status === PaperStatus.ACCEPTED).length },
    { name: 'Rejected', value: papers.filter(p => p.status === PaperStatus.REJECTED).length },
  ];

  const dailySubs = [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 19 },
    { day: 'Wed', count: 8 },
    { day: 'Thu', count: 24 },
    { day: 'Fri', count: 15 },
    { day: 'Sat', count: 5 },
    { day: 'Sun', count: 2 },
  ];

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Admin Overview</h2>
        <p className="text-slate-500">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Papers" value={papers.length} icon={FileText} color="bg-indigo-500" />
        <StatCard title="Registered Users" value="1,248" icon={Users} color="bg-emerald-500" />
        <StatCard title="Sessions Scheduled" value="42" icon={Calendar} color="bg-amber-500" />
        <StatCard title="Revenue" value="$48,200" icon={DollarSign} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Paper Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusCounts}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-sm text-slate-500">
            {statusCounts.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                <span>{s.name}: {s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Submissions Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySubs}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;