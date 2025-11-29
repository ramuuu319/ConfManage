import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  User as UserIcon,
  ClipboardList
} from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: User;
  currentView: string;
  onChangeView: (view: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, currentView, onChangeView, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Admin Navigation aligned with "Dashboard, Conferences, Papers, Reviews, Attendees"
  const adminLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'conferences', label: 'Conferences', icon: Calendar },
    { id: 'papers', label: 'Papers', icon: FileText },
    { id: 'reviews', label: 'Reviews', icon: ClipboardList },
    { id: 'attendees', label: 'Attendees', icon: Users },
  ];

  const participantLinks = [
    { id: 'my-schedule', label: 'Conference Schedule', icon: Calendar },
    { id: 'submit-paper', label: 'Submit Paper', icon: FileText },
    { id: 'registration', label: 'Registration', icon: Settings },
  ];

  const links = currentUser.role === UserRole.ADMIN ? adminLinks : participantLinks;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 flex flex-col
      `}>
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            ConferencePro
          </h1>
          <p className="text-xs text-slate-400 mt-1">Academic Conference Management</p>
          
          <div className="mt-6 flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <UserIcon size={16} />
            </div>
            <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-400 truncate capitalize">{currentUser.role.toLowerCase()}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onChangeView(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${currentView === link.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <link.icon size={20} className="mr-3" />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;