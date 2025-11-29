import React, { useState } from 'react';
import { Session, ScheduleGenerationParams, UserRole } from '../types';
import { generateSchedule } from '../services/geminiService';
import { Calendar, Clock, MapPin, User, Sparkles, Loader2, Plus, ArrowLeft, MoreVertical, Edit3 } from 'lucide-react';

interface ConferencesProps {
  sessions: Session[];
  onSetSessions: (sessions: Session[]) => void;
  role: UserRole;
}

interface Conference {
  id: string;
  name: string;
  date: string;
  location: string;
  theme: string;
  status: 'Upcoming' | 'Active' | 'Past';
}

const MOCK_CONFERENCES: Conference[] = [
  { id: '1', name: 'AI Summit 2025', date: 'Oct 15-17, 2025', location: 'San Francisco, CA', theme: 'Artificial Intelligence in 2025', status: 'Active' },
  { id: '2', name: 'Global Tech Symposium', date: 'Nov 12-14, 2024', location: 'London, UK', theme: 'Future of Computing', status: 'Past' },
  { id: '3', name: 'BioMed Future', date: 'Mar 10-12, 2026', location: 'Boston, MA', theme: 'Innovations in Medicine', status: 'Upcoming' },
];

const Conferences: React.FC<ConferencesProps> = ({ sessions, onSetSessions, role }) => {
  const [view, setView] = useState<'list' | 'details'>('list');
  const [selectedConf, setSelectedConf] = useState<Conference | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'speakers'>('overview');
  
  // Schedule Logic
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<ScheduleGenerationParams>({
    theme: 'Artificial Intelligence in 2025',
    days: 1,
    tracks: 2
  });

  const handleConferenceClick = (conf: Conference) => {
    setSelectedConf(conf);
    setParams(prev => ({ ...prev, theme: conf.theme }));
    setView('details');
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const newSessions = await generateSchedule(params);
      onSetSessions(newSessions);
    } catch (e) {
      alert("Error generating schedule. Ensure API KEY is valid.");
    } finally {
      setLoading(false);
    }
  };

  if (view === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Conferences</h2>
            <p className="text-slate-500">Manage your events and schedules.</p>
          </div>
          {role === UserRole.ADMIN && (
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              <Plus size={18} />
              New Conference
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CONFERENCES.map((conf) => (
            <div 
              key={conf.id} 
              onClick={() => handleConferenceClick(conf)}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border
                  ${conf.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                    conf.status === 'Upcoming' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                    'bg-slate-50 text-slate-600 border-slate-200'}`}
                >
                  {conf.status}
                </div>
                <MoreVertical size={16} className="text-slate-400 hover:text-slate-600" />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                {conf.name}
              </h3>
              
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {conf.date}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {conf.location}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-400">Theme: {conf.theme}</span>
                <span className="text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Manage &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DETAILS VIEW
  return (
    <div className="space-y-6">
      <button 
        onClick={() => setView('list')} 
        className="flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Conferences
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{selectedConf?.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-500 mt-2">
            <span className="flex items-center gap-1"><Calendar size={16} /> {selectedConf?.date}</span>
            <span className="flex items-center gap-1"><MapPin size={16} /> {selectedConf?.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {role === UserRole.ADMIN && (
             <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
               <Edit3 size={16} />
               Edit Details
             </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'schedule', 'speakers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize
                ${activeTab === tab 
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'schedule' && (
        <div className="space-y-6 animate-fade-in">
          {role === UserRole.ADMIN && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900">AI Schedule Generator</h3>
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-70 text-sm font-medium"
                >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                    Generate Schedule
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Theme</label>
                  <input
                    type="text"
                    value={params.theme}
                    onChange={(e) => setParams({ ...params, theme: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Days)</label>
                  <select
                    value={params.days}
                    onChange={(e) => setParams({ ...params, days: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    <option value={1}>1 Day</option>
                    <option value={2}>2 Days</option>
                    <option value={3}>3 Days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tracks</label>
                  <select
                    value={params.tracks}
                    onChange={(e) => setParams({ ...params, tracks: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    <option value={1}>Single Track</option>
                    <option value={2}>2 Tracks</option>
                    <option value={3}>3 Tracks</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {sessions.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
              <Calendar className="mx-auto text-slate-300 w-12 h-12 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No sessions scheduled</h3>
              <p className="text-slate-500">
                {role === UserRole.ADMIN ? 'Use the generator above to create a schedule.' : 'Schedule not yet released.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {sessions.map((session) => (
                <div key={session.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                      {session.track}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{session.time}</span>
                  </div>
                  
                  <h4 className="text-md font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {session.title}
                  </h4>
                  
                  <div className="space-y-1.5 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      <span>{session.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400" />
                      <span>{session.room}</span>
                    </div>
                  </div>

                  {session.description && (
                    <div className="mt-3 pt-3 border-t border-slate-50 text-xs text-slate-500 line-clamp-2">
                      {session.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">About the Conference</h3>
              <p className="text-slate-600 leading-relaxed">
                {selectedConf?.theme} aims to bring together leading researchers, practitioners, and industry experts to share their latest findings and discuss the future of the field. This year's conference features keynotes from Nobel laureates, over 40 breakout sessions, and exclusive networking opportunities.
              </p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Registration Status</h3>
              <div className="w-full bg-slate-100 rounded-full h-4 mb-2">
                 <div className="bg-indigo-600 h-4 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>1,240 Registered</span>
                <span>Target: 1,600</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
             <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg">
                <h3 className="font-semibold mb-2">Important Dates</h3>
                <ul className="space-y-3 text-sm text-indigo-100">
                    <li className="flex justify-between">
                        <span>Abstract Submission</span>
                        <span className="font-mono bg-indigo-800 px-2 rounded">Closed</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Early Bird Reg</span>
                        <span className="font-mono">Oct 01</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Conference Start</span>
                        <span className="font-mono">Oct 15</span>
                    </li>
                </ul>
             </div>
          </div>
        </div>
      )}
      
      {activeTab === 'speakers' && (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-100">
            <User className="mx-auto w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-slate-900">Speakers List</h3>
            <p className="text-slate-500">Speaker management coming soon.</p>
        </div>
      )}
    </div>
  );
};

export default Conferences;