import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Check, Compass } from 'lucide-react';

interface TuningConsultationProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'en' | 'ru';
}

export const TuningConsultation: React.FC<TuningConsultationProps> = ({
  isOpen,
  onClose,
}) => {
  // Local state form elements
  const [customerName, setCustomerName] = useState('');
  const [vin, setVin] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // File Upload State mechanics (ADHERES TO REQUIREMENT: TOUCH + DRAG SUPPORTED)
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const filesArray = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !vin || !whatsapp) return;
    setIsSubmitted(true);
  };

  const handleSuccessClose = () => {
    setIsSubmitted(false);
    setCustomerName('');
    setVin('');
    setWhatsapp('');
    setCustomInstructions('');
    setUploadedFiles([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto w-full">
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md animate-fade-in"
          />

          {/* Modal layout box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-2xl flex flex-col z-10 max-h-[92vh] text-zinc-900"
          >
            {/* Header banner */}
            <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex justify-between items-center">
              <div className="space-y-0.5">
                <h3 className="text-base font-black tracking-tight text-zinc-950 uppercase flex items-center gap-2">
                  <Compass className="w-5 h-5 text-zinc-900" />
                  <span>Customization & Styling Console</span>
                </h3>
                <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
                  BMS calibration • Lithium power retrofits • custom assembly design
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded hover:bg-zinc-250 text-zinc-650 hover:text-zinc-950 transition-colors cursor-pointer border border-zinc-200 bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="p-6 overflow-y-auto flex-grow space-y-6">
              {!isSubmitted ? (
                <form onSubmit={handleConsultSubmit} className="space-y-5">
                  
                  {/* Basic Client Identity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                        Client Identity
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="E.g., George Sterling"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2.5 rounded bg-zinc-50 border border-zinc-250 text-xs text-zinc-950 placeholder-zinc-400 outline-none focus:border-zinc-900 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                        Cart Serial number (S/N)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="E.g. CCPRECEDENT..."
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        maxLength={17}
                        className="w-full p-2.5 rounded bg-zinc-50 border border-zinc-250 text-xs text-zinc-950 placeholder-zinc-400 outline-none focus:border-zinc-900 font-mono tracking-widest uppercase"
                      />
                    </div>
                  </div>

                  {/* Reach Coordinate */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                      WhatsApp Phone Coordinate
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="E.g., +15612283941"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full p-2.5 rounded bg-zinc-50 border border-zinc-250 text-xs text-zinc-950 placeholder-zinc-400 outline-none focus:border-zinc-900 font-mono"
                    />
                  </div>

                  {/* Drag-and-drop Image Attachment Area */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                        Cart Styling Reference Pictures
                      </label>
                      <span className="text-[9px] text-zinc-400 font-mono font-bold">Optional reference files</span>
                    </div>

                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={triggerFileInput}
                      className={`relative p-8 rounded-lg border-2 border-dashed text-center transition-all cursor-pointer ${
                        dragActive 
                          ? 'border-zinc-900 bg-zinc-50/50' 
                          : 'border-zinc-200 bg-zinc-50/20 hover:bg-zinc-50'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Upload className="w-8 h-8 text-zinc-400 stroke-1" />
                        <p className="text-xs font-mono font-bold text-zinc-800">
                          Drag reference images here or click to browse
                        </p>
                        <p className="text-[10px] text-zinc-400 font-mono">
                          Supports PNG, JPG, JPEG up to 10MB
                        </p>
                      </div>
                    </div>

                    {/* Show uploaded items list */}
                    {uploadedFiles.length > 0 && (
                      <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded text-xs font-mono text-zinc-700 space-y-1">
                        <span className="block font-black text-zinc-400 text-[9px] uppercase tracking-widest mb-1">
                          Attachments Queued ({uploadedFiles.length})
                        </span>
                        {uploadedFiles.map((file, idx) => (
                          <div key={idx} className="flex justify-between py-1 border-b border-zinc-150/50 last:border-0">
                            <span className="truncate pr-4 text-zinc-900">{file.name}</span>
                            <span className="text-zinc-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Requirements instructions */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">
                      Specification & Custom build details
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="List desired upgrades, custom color body designs, lift kit additions or performance parameters..."
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      className="w-full p-2.5 rounded bg-zinc-50 border border-zinc-250 text-xs text-zinc-950 placeholder-zinc-400 outline-none focus:border-zinc-900 font-sans"
                    />
                  </div>

                  {/* Action triggers */}
                  <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <p className="text-[9px] text-zinc-400 leading-normal max-w-xs font-mono">
                      Our Lead Customization Expert will review your golf cart specs and verify the compatible high-performance upgrades within 2 hours.
                    </p>

                    <button
                      type="submit"
                      disabled={!customerName || !vin || !whatsapp || !customInstructions}
                      className="px-6 py-3 rounded bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-bold text-[11px] uppercase tracking-widest transition-transform active:scale-95 disabled:opacity-50 cursor-pointer animate-fade-in"
                    >
                      Verify Spec Deck
                    </button>
                  </div>

                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-5 text-zinc-900"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-950 text-white border border-zinc-900 flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-black text-zinc-950 uppercase tracking-tight">
                      Customization Request Registered
                    </h4>
                    <p className="text-xs text-zinc-500 font-mono">
                      Your golf cart serial S/N {vin.toUpperCase()} has been submitted.
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded border border-zinc-200 text-xs text-zinc-650 leading-relaxed font-mono">
                    Our Palm Beach garage has been notified. We have initiated a certified physical fitment and wiring compatibility assessment.
                  </div>

                  <button
                    onClick={handleSuccessClose}
                    className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-bold text-xs uppercase tracking-widest rounded cursor-pointer"
                  >
                    Return to Catalog
                  </button>
                </motion.div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
