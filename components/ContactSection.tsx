import React, { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please specify a message subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 800);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#090d16] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Me
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Interested in discussing full-stack engineering opportunities, API architecture, or consulting engagements? Send a message directly below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Direct Channels
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                I am actively considering full-time software engineering roles, contract projects, and remote engineering positions.
              </p>

              {/* Email item */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex-shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Primary Email</span>
                    <a 
                      href={`mailto:${PORTFOLIO_CONFIG.email}`}
                      className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 truncate block"
                    >
                      {PORTFOLIO_CONFIG.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-mono transition-colors flex-shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={PORTFOLIO_CONFIG.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 transition-colors flex items-center gap-2.5"
                >
                  <Github size={16} className="text-slate-800 dark:text-slate-200" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">GitHub</span>
                </a>

                <a
                  href={PORTFOLIO_CONFIG.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 transition-colors flex items-center gap-2.5"
                >
                  <Linkedin size={16} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">LinkedIn</span>
                </a>
              </div>

              <div className="pt-2 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span>Location: {PORTFOLIO_CONFIG.location} · UTC+3</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800 shadow-sm">
            
            {submitSuccess ? (
              <div className="p-8 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Message Sent Successfully
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been recorded and I will respond to your email address promptly.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label 
                      htmlFor="contact-name" 
                      className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-1 text-slate-900 dark:text-white transition-colors ${
                        errors.name 
                          ? 'border-rose-500 focus:ring-rose-500' 
                          : 'border-slate-200 dark:border-slate-800 focus:ring-purple-600 focus:border-purple-600'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label 
                      htmlFor="contact-email" 
                      className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. alex@company.com"
                      className={`w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-1 text-slate-900 dark:text-white transition-colors ${
                        errors.email 
                          ? 'border-rose-500 focus:ring-rose-500' 
                          : 'border-slate-200 dark:border-slate-800 focus:ring-purple-600 focus:border-purple-600'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label 
                    htmlFor="contact-subject" 
                    className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="e.g. Senior Full-Stack .NET Engineer Opportunity"
                    className={`w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-1 text-slate-900 dark:text-white transition-colors ${
                      errors.subject 
                        ? 'border-rose-500 focus:ring-rose-500' 
                        : 'border-slate-200 dark:border-slate-800 focus:ring-purple-600 focus:border-purple-600'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <label 
                    htmlFor="contact-message" 
                    className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe your project, team requirements, or role details..."
                    className={`w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-1 text-slate-900 dark:text-white transition-colors ${
                      errors.message 
                        ? 'border-rose-500 focus:ring-rose-500' 
                        : 'border-slate-200 dark:border-slate-800 focus:ring-purple-600 focus:border-purple-600'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  {isSubmitting ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={13} />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
