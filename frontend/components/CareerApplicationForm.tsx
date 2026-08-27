'use client';

import { useState, useRef, FormEvent } from 'react';
import { Send, Upload, X, CheckCircle2, AlertCircle, User, Briefcase, FileText, MessageSquare, FileSignature } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function CareerApplicationForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDeclarationChecked, setIsDeclarationChecked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    position: '',
    message: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file only');
        e.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        e.target.value = '';
        return;
      }
      setFileName(file.name);
    }
  };

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFileName('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setErrorMessage('Please upload your resume (PDF)');
      setFormStatus('error');
      return;
    }

    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('email', formData.email);
    submitData.append('contactNumber', formData.contactNumber);
    submitData.append('position', formData.position);
    submitData.append('message', formData.message);
    submitData.append('resume', file);

    try {
      const response = await fetch('/api/career', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus('success');
        setFormData({
          fullName: '',
          email: '',
          contactNumber: '',
          position: '',
          message: '',
        });
        setIsDeclarationChecked(false);
        clearFile();
        form.reset();
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Career form error:', error);
      setFormStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to submit application. Please try again.'
      );
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-8 text-center shadow-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
        <p className="text-slate-600 mb-6">
          Thank you for your interest. We&apos;ve received your application and will review it shortly.
        </p>
        <button
          type="button"
          onClick={() => setFormStatus('idle')}
          className="px-6 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two Column Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT COLUMN - Personal Details & Cover Note */}
          <div className="space-y-6">
            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--color-tertiary)]" />
                Personal Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--color-tertiary)] focus:border-transparent outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--color-tertiary)] focus:border-transparent outline-none transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-slate-700 mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    required
                    pattern="[0-9]{10}"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--color-tertiary)] focus:border-transparent outline-none transition-all"
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>
            </div>

            {/* Cover Note */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[var(--color-tertiary)]" />
                Cover Note (Optional)
              </h3>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--color-tertiary)] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us why you're interested in this position..."
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Job Details, Resume, Declaration */}
          <div className="space-y-6">
            {/* Job Details */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[var(--color-tertiary)]" />
                Job Details
              </h3>
              <label htmlFor="position" className="block text-sm font-medium text-slate-700 mb-1">
                Position Applied For <span className="text-red-500">*</span>
              </label>
              <select
                id="position"
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[var(--color-tertiary)] focus:border-transparent outline-none transition-all"
              >
                <option value="">Select a position</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Civil Engineer">Civil Engineer</option>
                <option value="Mechanical Engineer">Mechanical Engineer</option>
                <option value="Electrical Engineer">Electrical Engineer</option>
                <option value="STP/WTP Design Engineer">STP/WTP Design Engineer</option>
                <option value="MEPF Engineer">MEPF Engineer</option>
                <option value="Interior Designer">Interior Designer</option>
                <option value="Site Supervisor">Site Supervisor</option>
                <option value="Quality Control Engineer">Quality Control Engineer</option>
                <option value="Procurement Manager">Procurement Manager</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Resume Upload */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--color-tertiary)]" />
                Resume Upload
              </h3>
              <label htmlFor="resume" className="block text-sm font-medium text-slate-700 mb-2">
                Upload Resume (PDF) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="resume"
                ref={fileInputRef}
                accept=".pdf"
                required
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200 transition-all font-medium text-slate-700 whitespace-nowrap"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </button>
                {fileName ? (
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg flex-1 min-w-0">
                    <span className="text-sm text-green-700 truncate flex-1">{fileName}</span>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="text-green-600 hover:text-green-800 shrink-0"
                      aria-label="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="text-sm text-slate-500">No file chosen</span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-2">PDF only, max 5MB</p>
            </div>

            {/* Declaration */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-[var(--color-tertiary)]" />
                Declaration
              </h3>
              <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <input
                  type="checkbox"
                  id="declarationCheckbox"
                  checked={isDeclarationChecked}
                  onChange={(e) => setIsDeclarationChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[var(--color-tertiary)] bg-white border-slate-300 rounded focus:ring-[var(--color-tertiary)] focus:ring-offset-0 cursor-pointer accent-[var(--color-tertiary)]"
                />
                <label htmlFor="declarationCheckbox" className="text-sm text-slate-700 cursor-pointer">
                  I confirm that the information provided is accurate and complete to the best of my knowledge.
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {formStatus === 'error' && errorMessage && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formStatus === 'submitting' || !isDeclarationChecked}
          className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formStatus === 'submitting' ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <Send className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
