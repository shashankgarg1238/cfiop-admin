import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Check,
  X,
  Building2,
  AlertTriangle,
  ZoomIn,
  FileText,
  User,
  LogOut,
  ChevronRight,
  ExternalLink,
  History,
  Info,
  RefreshCw,
  LayoutDashboard,
  Users,
  MessageSquare,
  Wallet,
  Settings,
  Sparkles
} from 'lucide-react';

const INITIAL_SUBMISSIONS = [
  {
    id: 'SUB-1001',
    userName: 'Ritesh Singh',
    userEmail: '325203garg@gmail.com',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    uai: 'CF000005',
    bankName: 'State Bank of India',
    accountNumber: '3829104857875',
    ifscCode: 'SBIN0001234',
    accountHolderName: 'Ritesh Singh',
    submittedAt: '08 Oct 2026, 02:15 PM',
    status: 'Pending',
    documentUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80',
    documentType: 'Cancelled Cheque',
    auditLog: [
      {
        id: '1',
        timestamp: '08 Oct 2026, 02:15 PM',
        actor: 'User (Ritesh Singh)',
        action: 'Submission Received',
        details: 'Uploaded cancelled cheque photo and submitted bank details.'
      }
    ]
  },
  {
    id: 'SUB-1002',
    userName: 'Ananya Sharma',
    userEmail: 'ananya.sharma@example.com',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    uai: 'CF000012',
    bankName: 'HDFC Bank',
    accountNumber: '50100284719284',
    ifscCode: 'HDFC0000128',
    accountHolderName: 'Ananya S. Sharma',
    submittedAt: '08 Oct 2026, 11:30 AM',
    status: 'Pending',
    documentUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    documentType: 'Bank Passbook Photo',
    auditLog: [
      {
        id: '1',
        timestamp: '08 Oct 2026, 11:30 AM',
        actor: 'User (Ananya Sharma)',
        action: 'Submission Received',
        details: 'Uploaded passbook front page copy.'
      }
    ]
  },
  {
    id: 'SUB-1003',
    userName: 'Vikramaditya Roy',
    userEmail: 'v.roy@techmail.com',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    uai: 'CF000028',
    bankName: 'ICICI Bank',
    accountNumber: '001205018392',
    ifscCode: 'ICIC0000012',
    accountHolderName: 'Vikram Roy',
    submittedAt: '07 Oct 2026, 04:45 PM',
    status: 'Pending',
    documentUrl: 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=1000&auto=format&fit=crop&q=80',
    documentType: 'Cancelled Cheque',
    auditLog: [
      {
        id: '1',
        timestamp: '07 Oct 2026, 04:45 PM',
        actor: 'User (Vikramaditya Roy)',
        action: 'Submission Received',
        details: 'Submitted details for verification.'
      }
    ]
  },
  {
    id: 'SUB-1004',
    userName: 'Priya Nair',
    userEmail: 'priya.nair@domain.org',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    uai: 'CF000041',
    bankName: 'Axis Bank',
    accountNumber: '918010048291039',
    ifscCode: 'UTIB0000210',
    accountHolderName: 'Priya Nair',
    submittedAt: '06 Oct 2026, 09:20 AM',
    status: 'Verified',
    verifiedAt: '06 Oct 2026, 02:10 PM',
    verifiedBy: 'Sarah M. (Admin)',
    documentUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80',
    documentType: 'Cancelled Cheque',
    auditLog: [
      {
        id: '1',
        timestamp: '06 Oct 2026, 09:20 AM',
        actor: 'User (Priya Nair)',
        action: 'Submission Received',
        details: 'Initial submission.'
      },
      {
        id: '2',
        timestamp: '06 Oct 2026, 02:10 PM',
        actor: 'Sarah M. (Admin)',
        action: 'Approved Verification',
        details: 'Document matched account number and name perfectly.'
      }
    ]
  },
  {
    id: 'SUB-1005',
    userName: 'Karan Verma',
    userEmail: 'karan.verma@work.co',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    uai: 'CF000055',
    bankName: 'Punjab National Bank',
    accountNumber: '018200010029381',
    ifscCode: 'PUNB0123400',
    accountHolderName: 'Karan Dev Verma',
    submittedAt: '05 Oct 2026, 06:10 PM',
    status: 'Rejected',
    rejectedAt: '06 Oct 2026, 10:05 AM',
    rejectedBy: 'Alex K. (Admin)',
    rejectionReason: 'Account holder name mismatch',
    rejectionNote: 'Name on document reads "Karan D. Verma" whereas bank record says "Karan Dev Verma".',
    documentUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    documentType: 'Bank Passbook Photo',
    auditLog: [
      {
        id: '1',
        timestamp: '05 Oct 2026, 06:10 PM',
        actor: 'User (Karan Verma)',
        action: 'Submission Received',
        details: 'Initial submission.'
      },
      {
        id: '2',
        timestamp: '06 Oct 2026, 10:05 AM',
        actor: 'Alex K. (Admin)',
        action: 'Rejected Verification',
        details: 'Reason: Account holder name mismatch.'
      }
    ]
  }
];

const PRESET_REJECT_REASONS = [
  'Account holder name mismatch',
  'Image unclear or unreadable',
  'Invalid or mismatched IFSC / account number',
  'Document not accepted',
  'Other'
];

export default function App() {
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'Verified' | 'Rejected'
  
  // Selected submission for detail drawer/modal
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  // Reject Modal State
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState(PRESET_REJECT_REASONS[0]);
  const [rejectNote, setRejectNote] = useState('');
  
  // Fullscreen Document Modal State
  const [imageZoomOpen, setImageZoomOpen] = useState(false);

  const maskAccount = (accNum) => {
    if (!accNum) return '•••••••• 0000';
    const clean = accNum.replace(/\D/g, '');
    if (clean.length <= 4) return '•••••••• ' + clean;
    return '•••••••• ' + clean.slice(-4);
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.uai.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' ? true : sub.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchQuery, statusFilter]);

  const pendingCount = useMemo(() => {
    return submissions.filter((s) => s.status === 'Pending').length;
  }, [submissions]);

  const handleApprove = (submissionId) => {
    const timestamp = new Date().toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === submissionId) {
          const updatedLog = [
            ...sub.auditLog,
            {
              id: String(Date.now()),
              timestamp,
              actor: 'You (Admin)',
              action: 'Approved Verification',
              details: 'Bank account details successfully verified and matched.'
            }
          ];
          return {
            ...sub,
            status: 'Verified',
            verifiedAt: timestamp,
            verifiedBy: 'You (Admin)',
            auditLog: updatedLog
          };
        }
        return sub;
      })
    );

    // If detail modal is open for this item, keep it updated
    if (selectedSubmission && selectedSubmission.id === submissionId) {
      setSelectedSubmission((prev) => ({
        ...prev,
        status: 'Verified',
        verifiedAt: timestamp,
        verifiedBy: 'You (Admin)'
      }));
    }
  };

  const handleOpenRejectModal = (submission) => {
    setSelectedSubmission(submission);
    setRejectReason(PRESET_REJECT_REASONS[0]);
    setRejectNote('');
    setRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (!selectedSubmission) return;

    const timestamp = new Date().toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const finalReasonText =
      rejectReason === 'Other' && rejectNote
        ? `Other: ${rejectNote}`
        : rejectReason;

    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === selectedSubmission.id) {
          const updatedLog = [
            ...sub.auditLog,
            {
              id: String(Date.now()),
              timestamp,
              actor: 'You (Admin)',
              action: 'Rejected Verification',
              details: `Reason: ${finalReasonText}. ${rejectNote ? 'Note: ' + rejectNote : ''}`
            }
          ];
          return {
            ...sub,
            status: 'Rejected',
            rejectedAt: timestamp,
            rejectedBy: 'You (Admin)',
            rejectionReason: rejectReason,
            rejectionNote: rejectNote,
            auditLog: updatedLog
          };
        }
        return sub;
      })
    );

    // Update current selected submission view
    setSelectedSubmission((prev) => ({
      ...prev,
      status: 'Rejected',
      rejectedAt: timestamp,
      rejectedBy: 'You (Admin)',
      rejectionReason: rejectReason,
      rejectionNote: rejectNote
    }));

    setRejectModalOpen(false);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        );
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" />
            <span>Rejected</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 flex flex-col md:flex-row font-sans selection:bg-[#6366f1] selection:text-white">
      
      {}
      <aside className="w-full md:w-64 bg-[#0a0d16] border-r border-[#192132] flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Block */}
          <div className="p-6 flex items-center space-x-3 border-b border-[#151c2b]">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg text-white tracking-wide">CFIOP Admin</h1>
              <p className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">Management Panel</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            <div className="text-[10px] font-bold text-slate-500 px-3 pb-2 uppercase tracking-wider">Main Navigation</div>
            
            <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#131926] flex items-center space-x-3 transition-colors">
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Dashboard</span>
            </button>

            <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#131926] flex items-center space-x-3 transition-colors">
              <Users className="w-4 h-4 text-slate-400" />
              <span>All Users</span>
            </button>

            {/* ACTIVE ITEM */}
            <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#6366f1] text-white shadow-lg shadow-indigo-950/50 flex items-center justify-between transition-all">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>KYC Review</span>
              </div>
              {pendingCount > 0 && (
                <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {pendingCount}
                </span>
              )}
            </button>

            <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#131926] flex items-center space-x-3 transition-colors">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <span>Chat Management</span>
            </button>

            <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#131926] flex items-center space-x-3 transition-colors">
              <Wallet className="w-4 h-4 text-slate-400" />
              <span>Withdrawals</span>
            </button>

            <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#131926] flex items-center space-x-3 transition-colors">
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#151c2b]">
          <div className="flex items-center justify-between px-2 py-1.5 mb-3 bg-[#131926] rounded-xl border border-[#1e273a]">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                A
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Admin Staff</p>
                <p className="text-[10px] text-slate-400">Reviewer ID #882</p>
              </div>
            </div>
          </div>

          <button className="flex items-center space-x-3 px-3.5 py-2.5 text-slate-400 hover:text-rose-400 text-xs font-medium w-full transition-colors rounded-xl hover:bg-[#131926]">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1b2336]">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-serif font-bold text-white tracking-tight">KYC Review — Bank Verification</h1>
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                Admin Panel
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block"></span>
              <span>{pendingCount} submission{pendingCount === 1 ? '' : 's'} awaiting review</span>
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or bank..."
              className="w-full bg-[#141926] border border-[#212a3e] focus:border-[#6366f1] focus:outline-none text-slate-100 rounded-xl pl-10 pr-4 py-2 text-xs transition-all placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#141926] p-2 rounded-2xl border border-[#212a3e]">
          
          {/* Status Filter Buttons */}
          <div className="flex items-center space-x-1 bg-[#0e121d] p-1 rounded-xl border border-[#1d2538] overflow-x-auto">
            {['All', 'Pending', 'Verified', 'Rejected'].map((status) => {
              const isActive = statusFilter === status;
              const count =
                status === 'All'
                  ? submissions.length
                  : submissions.filter((s) => s.status === status).length;

              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-[#6366f1] text-white shadow-md shadow-indigo-950/50 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#182030]'
                  }`}
                >
                  <span>{status}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#182030] text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Helper reset button for demo */}
          <div className="flex items-center space-x-2 px-2">
            <button
              onClick={() => setSubmissions(INITIAL_SUBMISSIONS)}
              className="text-slate-400 hover:text-indigo-400 text-xs font-medium inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#212a3e] hover:border-indigo-500/30 hover:bg-[#0e121d] transition-all"
              title="Reset mock data to initial state"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {}
        <div className="bg-[#141926] border border-[#212a3e] rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0e121d] border-b border-[#212a3e] text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">User</th>
                  <th className="py-3.5 px-4">Bank Name</th>
                  <th className="py-3.5 px-4">Account Number</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1d2538] text-xs">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <FileText className="w-8 h-8 text-slate-600" />
                        <p className="font-medium text-slate-400">No submissions found</p>
                        <p className="text-xs text-slate-600">Try adjusting your search query or status filter.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => {
                    const isPending = submission.status === 'Pending';

                    return (
                      <tr
                        key={submission.id}
                        onClick={() => setSelectedSubmission(submission)}
                        className="hover:bg-[#182030]/60 transition-colors cursor-pointer group"
                      >
                        {/* USER COLUMN */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center space-x-3">
                            <img
                              src={submission.userAvatar}
                              alt={submission.userName}
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#212a3e] group-hover:ring-indigo-500/50 transition-all shrink-0"
                            />
                            <div className="overflow-hidden">
                              <p className="font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                                {submission.userName}
                              </p>
                              <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                                <span className="truncate">{submission.userEmail}</span>
                                <span className="text-indigo-400 font-mono text-[10px] bg-indigo-950/40 px-1.5 py-0.2 rounded border border-indigo-500/20">
                                  {submission.uai}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* BANK NAME */}
                        <td className="py-3.5 px-4 font-semibold text-slate-200">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{submission.bankName}</span>
                          </div>
                        </td>

                        {/* ACCOUNT NUMBER (MASKED) */}
                        <td className="py-3.5 px-4 font-mono text-indigo-300 font-medium tracking-wider">
                          {maskAccount(submission.accountNumber)}
                        </td>

                        {/* SUBMITTED DATE */}
                        <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                          {submission.submittedAt}
                        </td>

                        {/* STATUS */}
                        <td className="py-3.5 px-4">
                          {renderStatusBadge(submission.status)}
                        </td>

                        {/* ACTIONS */}
                        <td className="py-3.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                          {isPending ? (
                            <div className="flex items-center justify-end space-x-2">
                              {/* Approve Button */}
                              <button
                                onClick={() => handleApprove(submission.id)}
                                className="bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 shadow-sm active:scale-95"
                                title="Approve Bank Verification"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Approve</span>
                              </button>

                              {/* Reject Button */}
                              <button
                                onClick={() => handleOpenRejectModal(submission)}
                                className="bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1 shadow-sm active:scale-95"
                                title="Reject Bank Verification"
                              >
                                <X className="w-3.5 h-3.5 text-rose-400" />
                                <span>Reject</span>
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end space-x-2 text-slate-400 font-medium">
                              <span className="text-[11px] bg-[#0e121d] px-2.5 py-1 rounded-lg border border-[#1d2538] text-slate-400">
                                Reviewed
                              </span>
                              <button
                                onClick={() => setSelectedSubmission(submission)}
                                className="text-indigo-400 hover:text-indigo-300 p-1.5 rounded-lg hover:bg-[#182030]"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {}
      {selectedSubmission && !rejectModalOpen && (
        <div className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm flex justify-end transition-opacity">
          <div className="w-full max-w-2xl bg-[#141926] border-l border-[#212a3e] h-full overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            
            {/* Modal Header */}
            <div>
              <div className="p-6 bg-[#0e121d] border-b border-[#212a3e] flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedSubmission.userAvatar}
                    alt={selectedSubmission.userName}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-lg font-bold text-white">{selectedSubmission.userName}</h2>
                      {renderStatusBadge(selectedSubmission.status)}
                    </div>
                    <p className="text-xs text-slate-400 font-mono">
                      UAI: <span className="text-indigo-400">{selectedSubmission.uai}</span> • {selectedSubmission.userEmail}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="w-8 h-8 rounded-full bg-[#182030] hover:bg-[#232d42] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Submission Details Card */}
                <div className="bg-[#0e121d] border border-[#1d2538] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1d2538] pb-3">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-indigo-400" />
                      <span>Bank Information Submitted</span>
                    </h3>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Submitted: {selectedSubmission.submittedAt}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* ACCOUNT HOLDER */}
                    <div className="bg-[#141926] p-3 rounded-xl border border-[#212a3e]">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Holder Name</p>
                      <p className="text-sm font-semibold text-white mt-0.5">{selectedSubmission.accountHolderName}</p>
                    </div>

                    {/* BANK NAME */}
                    <div className="bg-[#141926] p-3 rounded-xl border border-[#212a3e]">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bank Name</p>
                      <p className="text-sm font-semibold text-white mt-0.5">{selectedSubmission.bankName}</p>
                    </div>

                    {/* FULL UNMASKED ACCOUNT NUMBER */}
                    <div className="bg-[#141926] p-3 rounded-xl border border-[#212a3e] sm:col-span-2 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Full Account Number (Unmasked for Review)
                        </p>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                          RAW VIEW
                        </span>
                      </div>
                      <p className="text-lg font-bold text-indigo-300 font-mono tracking-widest mt-1">
                        {selectedSubmission.accountNumber}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        * Compare this full number against the uploaded cheque or passbook photo below.
                      </p>
                    </div>

                    {/* IFSC CODE */}
                    <div className="bg-[#141926] p-3 rounded-xl border border-[#212a3e] sm:col-span-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IFSC Code</p>
                      <p className="text-sm font-mono font-bold text-slate-200 mt-0.5 uppercase tracking-wider">
                        {selectedSubmission.ifscCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Document Viewer Card */}
                <div className="bg-[#0e121d] border border-[#1d2538] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      <span>Uploaded Document ({selectedSubmission.documentType})</span>
                    </h3>
                    <button
                      onClick={() => setImageZoomOpen(true)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 bg-[#141926] px-2.5 py-1 rounded-lg border border-[#212a3e] transition-colors"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Full Screen Zoom</span>
                    </button>
                  </div>

                  {/* Document Image Frame */}
                  <div className="relative group rounded-xl overflow-hidden border border-[#212a3e] bg-[#07090e] cursor-pointer" onClick={() => setImageZoomOpen(true)}>
                    <img
                      src={selectedSubmission.documentUrl}
                      alt="Uploaded Bank Document"
                      className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    
                    {/* Cheque Overlay Card for realism */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 pointer-events-none">
                      <div className="text-xs text-slate-300 font-mono">
                        <span className="text-slate-400">Document Type:</span> {selectedSubmission.documentType} • Click to enlarge
                      </div>
                    </div>
                  </div>
                </div>

                {}
                <div className="bg-[#0e121d] border border-[#1d2538] rounded-2xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <History className="w-4 h-4 text-indigo-400" />
                    <span>Audit Trail & History</span>
                  </h3>

                  <div className="space-y-3 pt-1">
                    {selectedSubmission.auditLog.map((log) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-xl bg-[#141926] border border-[#1d2538] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                          <span className="font-semibold text-indigo-300">{log.actor}</span>
                          <span>{log.timestamp}</span>
                        </div>
                        <p className="font-semibold text-slate-200">{log.action}</p>
                        <p className="text-slate-400 text-[11px]">{log.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Bottom Sticky Actions */}
            <div className="p-5 bg-[#0e121d] border-t border-[#212a3e] sticky bottom-0 z-10 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2.5 rounded-xl border border-[#212a3e] text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
              >
                Close Drawer
              </button>

              {selectedSubmission.status === 'Pending' ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleOpenRejectModal(selectedSubmission)}
                    className="bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 shadow-md active:scale-95"
                  >
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Reject Submission</span>
                  </button>

                  <button
                    onClick={() => handleApprove(selectedSubmission.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center space-x-2 active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve Submission</span>
                  </button>
                </div>
              ) : (
                <div className="text-xs text-slate-400 flex items-center space-x-2 font-mono">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Decision recorded on {selectedSubmission.verifiedAt || selectedSubmission.rejectedAt}</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {}
      {rejectModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141926] border border-[#212a3e] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            
            {/* Modal Title */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">Reject submission</h3>
                <p className="text-slate-400 text-xs mt-1">
                  User: <span className="text-slate-200 font-semibold">{selectedSubmission.userName}</span>
                </p>
              </div>
              <button
                onClick={() => setRejectModalOpen(false)}
                className="text-slate-500 hover:text-slate-300 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Note banner */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Note: The rejection reason selected below will be displayed directly to the user on their Account Settings page.
              </span>
            </div>

            {/* Preset Reason Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Select Rejection Reason
              </label>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full bg-[#0a0d16] border border-[#1f283b] focus:border-[#6366f1] focus:outline-none text-slate-100 rounded-xl px-3.5 py-2.5 text-xs transition-all cursor-pointer"
              >
                {PRESET_REJECT_REASONS.map((reason) => (
                  <option key={reason} value={reason} className="bg-[#141926] text-slate-200">
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional/Custom Reason Text Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Additional Note / Remarks {rejectReason === 'Other' && <span className="text-rose-400">*</span>}
              </label>
              <textarea
                rows={3}
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                placeholder="Specify details or instructions for the user..."
                className="w-full bg-[#0a0d16] border border-[#1f283b] focus:border-[#6366f1] focus:outline-none text-slate-100 rounded-xl p-3 text-xs transition-all placeholder:text-slate-600 resize-none"
              ></textarea>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-[#212a3e] text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleConfirmReject}
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-rose-950/50"
              >
                Confirm Reject
              </button>
            </div>

          </div>
        </div>
      )}

      {}
      {imageZoomOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#0e121d] border border-[#212a3e] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            
            <div className="p-4 bg-[#141926] border-b border-[#212a3e] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Full Screen Document Preview</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  User: {selectedSubmission.userName} ({selectedSubmission.uai}) • {selectedSubmission.documentType}
                </p>
              </div>
              <button
                onClick={() => setImageZoomOpen(false)}
                className="w-8 h-8 rounded-full bg-[#182030] hover:bg-[#232d42] text-slate-300 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex items-center justify-center max-h-[80vh] overflow-auto bg-black">
              <img
                src={selectedSubmission.documentUrl}
                alt="Document Full Screen"
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="p-3 bg-[#141926] border-t border-[#212a3e] text-center text-xs text-slate-400 font-mono">
              Comparing against: Account #{selectedSubmission.accountNumber} • Holder: {selectedSubmission.accountHolderName}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}