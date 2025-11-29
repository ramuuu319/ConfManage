import React, { useState } from 'react';
import { Star, MoreVertical, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const Reviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assignments' | 'reviewers'>('assignments');

  const reviewers = [
    { id: 1, name: 'Dr. Alan Grant', expertise: 'Paleontology, Genetics', papers: 12, rating: 4.8 },
    { id: 2, name: 'Dr. Ellie Sattler', expertise: 'Botany, Ecology', papers: 8, rating: 4.9 },
    { id: 3, name: 'Dr. Ian Malcolm', expertise: 'Chaos Theory, Mathematics', papers: 15, rating: 4.5 },
    { id: 4, name: 'Dr. Sarah Harding', expertise: 'Behavioral Biology', papers: 5, rating: 4.7 },
  ];

  const assignments = [
      { id: 101, paper: 'Advancements in Quantum Computing', reviewer: 'Dr. Ian Malcolm', status: 'Completed', score: 4.2, due: '2023-11-01' },
      { id: 102, paper: 'Sustainable AI Energy', reviewer: 'Dr. Ellie Sattler', status: 'Pending', score: null, due: '2023-11-05' },
      { id: 103, paper: 'Neural Interfaces', reviewer: 'Dr. Sarah Harding', status: 'Completed', score: 4.8, due: '2023-10-25' },
  ];

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reviews Management</h2>
          <p className="text-slate-500">Coordinate peer reviews and manage reviewer database.</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            Settings
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            Invite Reviewer
            </button>
        </div>
      </div>

      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'assignments' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          >
            Review Assignments
          </button>
          <button
            onClick={() => setActiveTab('reviewers')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'reviewers' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          >
            Reviewers Database
          </button>
        </nav>
      </div>

      {activeTab === 'assignments' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
             <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                    <th className="px-6 py-4 font-semibold text-slate-900">Paper Title</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Assigned Reviewer</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Status</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Score</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Due Date</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {assignments.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                        <FileText size={16} className="text-slate-400" />
                        {item.paper}
                    </td>
                    <td className="px-6 py-4">{item.reviewer}</td>
                    <td className="px-6 py-4">
                        {item.status === 'Completed' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">
                                <CheckCircle2 size={12} /> Completed
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-1 rounded-full text-xs font-medium">
                                <AlertCircle size={12} /> Pending
                            </span>
                        )}
                    </td>
                    <td className="px-6 py-4">
                        {item.score ? <span className="font-bold text-slate-900">{item.score}/5.0</span> : <span className="text-slate-400">-</span>}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{item.due}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
      )}

      {activeTab === 'reviewers' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                    <th className="px-6 py-4 font-semibold text-slate-900">Reviewer</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Expertise</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Assigned Papers</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Avg. Rating</th>
                    <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {reviewers.map((reviewer) => (
                    <tr key={reviewer.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                            {reviewer.name.charAt(0)}
                        </div>
                        <div>
                            <div className="font-medium text-slate-900">{reviewer.name}</div>
                            <div className="text-xs text-slate-400">active</div>
                        </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                        {reviewer.expertise.split(', ').map((exp) => (
                            <span key={exp} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                            {exp}
                            </span>
                        ))}
                        </div>
                    </td>
                    <td className="px-6 py-4 font-mono">{reviewer.papers}</td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-slate-700 font-medium">{reviewer.rating}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
                        <MoreVertical size={18} />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;