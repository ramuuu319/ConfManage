import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PaperManagement from './components/PaperManagement';
import Conferences from './components/Conferences';
import Registration from './components/Registration';
import Reviews from './components/Reviews';
import Attendees from './components/Attendees';
import { LoginForm, SignUpForm } from './components/Auth';
import { UserRole, Paper, PaperStatus, Session, User } from './types';
import { Send, CheckCircle2 } from 'lucide-react';

const MOCK_PAPERS: Paper[] = [
  {
    id: '1',
    title: 'Advancements in Quantum Computing Architectures',
    author: 'Dr. Sarah Chen',
    abstract: 'This paper explores novel qubit connectivity topologies that reduce error rates in superconducting quantum processors. We present simulation results demonstrating a 40% reduction in crosstalk compared to standard grid architectures.',
    status: PaperStatus.SUBMITTED,
    submissionDate: '2023-10-15'
  },
  {
    id: '2',
    title: 'Sustainable AI: Reducing Model Inference Energy',
    author: 'James Wilson',
    abstract: 'Large Language Models (LLMs) consume significant energy. We propose a sparse activation technique that maintains 98% of model accuracy while reducing inference power consumption by 65%.',
    status: PaperStatus.UNDER_REVIEW,
    submissionDate: '2023-10-18'
  },
  {
    id: '3',
    title: 'Neural Interfaces for Prosthetic Limbs',
    author: 'Dr. Emily R. Thorne',
    abstract: 'A longitudinal study on the long-term biocompatibility of invasive neural probes. We discuss signal degradation patterns and propose a new coating material that extends probe life by 3 years.',
    status: PaperStatus.ACCEPTED,
    submissionDate: '2023-09-20'
  }
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [currentView, setCurrentView] = useState('dashboard');
  const [papers, setPapers] = useState<Paper[]>(MOCK_PAPERS);
  const [sessions, setSessions] = useState<Session[]>([]);

  // Submission Form State
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionAbstract, setSubmissionAbstract] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleLogin = (email: string, name: string) => {
    // Mock login logic: if email contains 'admin', grant admin role
    const role = email.toLowerCase().includes('admin') ? UserRole.ADMIN : UserRole.PARTICIPANT;
    const loggedInUser: User = { name, email, role };
    setUser(loggedInUser);
    setCurrentView(role === UserRole.ADMIN ? 'dashboard' : 'my-schedule');
  };

  const handleSignUp = (name: string, email: string, role: UserRole) => {
    const newUser: User = { name, email, role };
    setUser(newUser);
    setCurrentView(role === UserRole.ADMIN ? 'dashboard' : 'my-schedule');
  };

  const handleLogout = () => {
    setUser(null);
    setAuthView('login');
    setSubmissionSuccess(false);
  };

  const handleSubmitPaper = (e: React.FormEvent) => {
    e.preventDefault();
    const newPaper: Paper = {
      id: Math.random().toString(36).substr(2, 9),
      title: submissionTitle,
      author: user?.name || 'Anonymous', 
      abstract: submissionAbstract,
      status: PaperStatus.SUBMITTED,
      submissionDate: new Date().toISOString()
    };
    setPapers([...papers, newPaper]);
    setSubmissionSuccess(true);
    setSubmissionTitle('');
    setSubmissionAbstract('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        {authView === 'login' ? (
          <LoginForm 
            onLogin={handleLogin} 
            onSwitchToSignUp={() => setAuthView('signup')} 
          />
        ) : (
          <SignUpForm 
            onSignUp={handleSignUp} 
            onSwitchToLogin={() => setAuthView('login')} 
          />
        )}
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard papers={papers} />;
      case 'papers':
        return <PaperManagement papers={papers} onUpdatePaper={(updated) => {
          setPapers(papers.map(p => p.id === updated.id ? updated : p));
        }} />;
      case 'conferences':
      case 'schedule': // Fallback legacy
      case 'my-schedule':
        return <Conferences sessions={sessions} onSetSessions={setSessions} role={user.role} />;
      case 'submit-paper':
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Submit Your Paper</h2>
            <p className="text-slate-500 mb-8">Share your research with the world.</p>

            {submissionSuccess ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-emerald-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-2">Submission Received!</h3>
                <p className="text-emerald-700 mb-6">Your paper has been successfully submitted for review.</p>
                <button 
                  onClick={() => setSubmissionSuccess(false)}
                  className="text-emerald-700 font-medium hover:text-emerald-900 underline"
                >
                  Submit another paper
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitPaper} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Paper Title</label>
                  <input
                    required
                    type="text"
                    value={submissionTitle}
                    onChange={(e) => setSubmissionTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="e.g. The Future of AI"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Upload PDF (Optional)</label>
                   <input
                    type="file"
                    accept=".pdf"
                    className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100
                    "
                  />
                  <p className="mt-1 text-xs text-slate-400">PDF up to 10MB</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Abstract</label>
                  <textarea
                    required
                    rows={6}
                    value={submissionAbstract}
                    onChange={(e) => setSubmissionAbstract(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Paste your abstract here..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-indigo-500/30"
                  >
                    <Send size={18} />
                    Submit Paper
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      case 'registration':
        return <Registration />;
      case 'reviews':
          return <Reviews />;
      case 'attendees':
          return <Attendees />;
      default:
        return <div>View not found: {currentView}</div>;
    }
  };

  return (
    <Layout
      currentUser={user}
      currentView={currentView}
      onChangeView={setCurrentView}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;