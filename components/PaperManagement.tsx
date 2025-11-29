import React, { useState } from 'react';
import { Paper, PaperStatus } from '../types';
import { reviewPaper } from '../services/geminiService';
import { Check, X, Bot, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

interface PaperManagementProps {
  papers: Paper[];
  onUpdatePaper: (paper: Paper) => void;
}

const PaperManagement: React.FC<PaperManagementProps> = ({ papers, onUpdatePaper }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAIReview = async (paper: Paper) => {
    setLoadingId(paper.id);
    try {
      const review = await reviewPaper(paper);
      onUpdatePaper({
        ...paper,
        status: PaperStatus.UNDER_REVIEW,
        aiReview: review
      });
    } catch (error) {
      alert("Failed to generate AI review. Please check your API key.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleStatusChange = (paper: Paper, newStatus: PaperStatus) => {
    onUpdatePaper({ ...paper, status: newStatus });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Paper Management</h2>
        <p className="text-slate-500">Review submissions and assign status.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-900">Title</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Author</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {papers.map((paper) => (
                <React.Fragment key={paper.id}>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <button onClick={() => toggleExpand(paper.id)} className="flex items-center gap-2 hover:text-indigo-600">
                        {expandedId === paper.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {paper.title}
                      </button>
                    </td>
                    <td className="px-6 py-4">{paper.author}</td>
                    <td className="px-6 py-4">{new Date(paper.submissionDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${paper.status === PaperStatus.ACCEPTED ? 'bg-emerald-100 text-emerald-800' : 
                          paper.status === PaperStatus.REJECTED ? 'bg-red-100 text-red-800' :
                          paper.status === PaperStatus.UNDER_REVIEW ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-800'}
                      `}>
                        {paper.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleStatusChange(paper, PaperStatus.ACCEPTED)}
                        className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg"
                        title="Accept"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(paper, PaperStatus.REJECTED)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                        title="Reject"
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                  
                  {expandedId === paper.id && (
                    <tr>
                      <td colSpan={5} className="px-6 py-6 bg-slate-50/50">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2 space-y-4">
                            <div>
                              <h4 className="font-semibold text-slate-900">Abstract</h4>
                              <p className="mt-2 text-slate-600 leading-relaxed">{paper.abstract}</p>
                            </div>
                          </div>

                          <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-indigo-900 flex items-center gap-2">
                                <Bot size={18} />
                                AI Review Assistant
                              </h4>
                              {!paper.aiReview && (
                                <button
                                  onClick={() => handleAIReview(paper)}
                                  disabled={loadingId === paper.id}
                                  className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                                >
                                  {loadingId === paper.id ? <Loader2 size={12} className="animate-spin" /> : 'Generate Review'}
                                </button>
                              )}
                            </div>

                            {paper.aiReview ? (
                              <div className="space-y-4 text-sm">
                                <div>
                                  <span className="font-medium text-slate-900">Verdict: </span>
                                  <span className="font-bold text-indigo-600">{paper.aiReview.verdict}</span>
                                </div>
                                <div className="bg-indigo-50 p-3 rounded-lg text-indigo-900">
                                  {paper.aiReview.summary}
                                </div>
                                <div>
                                  <p className="font-medium text-emerald-700 mb-1">Strengths</p>
                                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                                    {paper.aiReview.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                                  </ul>
                                </div>
                                <div>
                                  <p className="font-medium text-rose-700 mb-1">Weaknesses</p>
                                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                                    {paper.aiReview.cons.map((con, i) => <li key={i}>{con}</li>)}
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-8 text-slate-400 text-sm">
                                Click "Generate Review" to analyze this paper with Gemini.
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaperManagement;