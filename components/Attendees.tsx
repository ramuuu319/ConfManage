import React, { useState } from 'react';
import { Search, Mail, Calendar, Download, Filter, MoreHorizontal, User, Tag } from 'lucide-react';

interface Attendee {
  id: string;
  name: string;
  email: string;
  ticketType: 'VIP' | 'Regular' | 'Student';
  registrationDate: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  organization: string;
}

const MOCK_ATTENDEES: Attendee[] = [
  { id: '1', name: 'Alice Freeman', email: 'alice.f@university.edu', ticketType: 'Student', registrationDate: '2023-10-01', status: 'Confirmed', organization: 'MIT' },
  { id: '2', name: 'Robert Chen', email: 'r.chen@techcorp.com', ticketType: 'VIP', registrationDate: '2023-09-28', status: 'Confirmed', organization: 'TechCorp AI' },
  { id: '3', name: 'Sarah Miller', email: 'sarah.m@institute.org', ticketType: 'Regular', registrationDate: '2023-10-05', status: 'Pending', organization: 'Open Science Inst' },
  { id: '4', name: 'David Kim', email: 'dkim@startup.io', ticketType: 'Regular', registrationDate: '2023-10-02', status: 'Confirmed', organization: 'NeuralNet Inc' },
  { id: '5', name: 'Elena Rodriguez', email: 'elena.r@university.edu', ticketType: 'Student', registrationDate: '2023-10-10', status: 'Confirmed', organization: 'Stanford' },
];

const Attendees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredAttendees = MOCK_ATTENDEES.filter(attendee => {
    const matchesSearch = attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          attendee.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || attendee.ticketType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Attendees</h2>
          <p className="text-slate-500">Manage registrations and participant details.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 bg-white shadow-sm transition-colors">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search attendees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Filter size={18} className="text-slate-400" />
          {['All', 'VIP', 'Regular', 'Student'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filterType === type 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900">Name</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Organization</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Ticket</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAttendees.length > 0 ? (
                filteredAttendees.map((attendee) => (
                  <tr key={attendee.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                          {attendee.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{attendee.name}</div>
                          <div className="text-xs text-slate-400">{attendee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-slate-400" />
                        {attendee.organization}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md
                        ${attendee.ticketType === 'VIP' ? 'bg-purple-100 text-purple-700' :
                          attendee.ticketType === 'Student' ? 'bg-blue-100 text-blue-700' :
                          'bg-indigo-100 text-indigo-700'
                        }
                      `}>
                        {attendee.ticketType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(attendee.registrationDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${attendee.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          attendee.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-slate-50 text-slate-600 border-slate-200'
                        }
                      `}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          attendee.status === 'Confirmed' ? 'bg-emerald-500' :
                          attendee.status === 'Pending' ? 'bg-amber-500' : 'bg-slate-400'
                        }`}></span>
                        {attendee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-slate-400 hover:text-indigo-600 transition-colors rounded hover:bg-slate-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <User className="mx-auto h-10 w-10 text-slate-300 mb-3" />
                    <p className="font-medium">No attendees found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendees;