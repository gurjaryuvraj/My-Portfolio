import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Send, X } from 'lucide-react';
import { SERVICES } from '../data/portfolio';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const STUDIO_EMAIL = 'hello@mina3d.studio';

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICES[0].name);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-[36px] border-2 border-[#D7E2EA]/80 bg-[#0C0C0C] p-6 sm:p-8 md:p-10 text-[#D7E2EA]"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2
                  id="contact-modal-title"
                  className="hero-heading font-black uppercase tracking-tight leading-none text-3xl sm:text-5xl"
                >
                  Let&apos;s Talk
                </h2>
                <p className="mt-2 text-sm sm:text-base font-light text-[#D7E2EA]/70">
                  Tell Mina about your 3D project, timeline, and goals.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                aria-label="Close contact dialog"
                className="p-2.5 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-10 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-[#D7E2EA] flex items-center justify-center">
                  <Check className="w-7 h-7 text-[#D7E2EA]" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wide text-[#D7E2EA]">
                  Inquiry Received
                </h3>
                <p className="max-w-sm text-sm sm:text-base font-light text-[#D7E2EA]/75 leading-relaxed">
                  Thank you, {name}. Your brief for <span className="font-medium text-[#D7E2EA]">{selectedService}</span> has been noted — expect a reply at {email} shortly.
                </p>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="mt-4 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 text-sm hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                >
                  Back to Portfolio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5 text-xs uppercase tracking-widest text-[#D7E2EA]/70">
                    Your Name
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Kim"
                      className="rounded-2xl border border-[#D7E2EA]/25 bg-[#141416] px-4 py-3 text-sm sm:text-base font-normal normal-case tracking-normal text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 focus:border-[#D7E2EA] focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs uppercase tracking-widest text-[#D7E2EA]/70">
                    Email
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@studio.co"
                      className="rounded-2xl border border-[#D7E2EA]/25 bg-[#141416] px-4 py-3 text-sm sm:text-base font-normal normal-case tracking-normal text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 focus:border-[#D7E2EA] focus:outline-none"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/70">
                    Service Focus
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((service) => {
                      const active = selectedService === service.name;
                      return (
                        <button
                          key={service.number}
                          type="button"
                          onClick={() => setSelectedService(service.name)}
                          className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#D7E2EA] text-[#0C0C0C] border-[#D7E2EA]'
                              : 'border-[#D7E2EA]/25 text-[#D7E2EA]/80 hover:border-[#D7E2EA]/60'
                          }`}
                        >
                          {service.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="flex flex-col gap-1.5 text-xs uppercase tracking-widest text-[#D7E2EA]/70">
                  Project Details
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your vision, deliverables, and target launch window..."
                    className="rounded-2xl border border-[#D7E2EA]/25 bg-[#141416] px-4 py-3 text-sm sm:text-base font-normal normal-case tracking-normal text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 focus:border-[#D7E2EA] focus:outline-none resize-none"
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#D7E2EA]/70 hover:text-[#D7E2EA] transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Email Copied' : STUDIO_EMAIL}</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full text-white font-medium uppercase tracking-widest px-7 py-3 text-xs sm:text-sm cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow:
                        '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                      outline: '2px solid #FFFFFF',
                      outlineOffset: '-3px',
                    }}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
