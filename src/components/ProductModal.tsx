import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { X, Check, Shield, Truck, ShoppingCart } from 'lucide-react';
import { COMPATIBLE_MODELS } from '../data';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  language?: 'en' | 'ru';
  onAddToCart: (product: Product, modelFit?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedFit, setSelectedFit] = useState('');
  const [typedVin, setTypedVin] = useState('');
  const [vinVerified, setVinVerified] = useState<boolean | null>(null);
  const [isVerifyingVin, setIsVerifyingVin] = useState(false);

  if (!product) return null;

  const handleVerifyVin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedVin || typedVin.length < 5) return;
    setIsVerifyingVin(true);
    setVinVerified(null);
    setTimeout(() => {
      setIsVerifyingVin(false);
      setVinVerified(true);
    }, 1200);
  };

  const handleAddToCartWithLocalSpecs = () => {
    onAddToCart(product, selectedFit || undefined);
    onClose();
    // Reset states
    setSelectedFit('');
    setTypedVin('');
    setVinVerified(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 transition-colors border border-zinc-200 z-30 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Visual Gallery on Pedestal */}
            <div className="w-full md:w-1/2 p-7 md:p-9 bg-zinc-50/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-200 max-h-[45vh] md:max-h-[inherit] overflow-y-auto">
              <div className="space-y-5">
                <span className="inline-block bg-zinc-900 text-white font-mono text-[11px] tracking-widest uppercase px-3.5 py-1.5 rounded-lg">
                  ORIGINAL OEM STOCK RECORD
                </span>
                
                <h2 className="text-xl md:text-3xl font-black text-zinc-950 uppercase tracking-tight leading-tight font-sans">
                  {product.name}
                </h2>

                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Quality certification guidelines with enlarged text sizing */}
              <div className="grid grid-cols-2 gap-4 pt-6 text-xs font-mono text-zinc-600 tracking-wider">
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 flex items-start gap-3 shadow-sm">
                  <Shield className="w-5 h-5 text-zinc-900 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-zinc-900 uppercase">Chassis Warranty</span>
                    <span className="text-zinc-400">24 Months</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 flex items-start gap-3 shadow-sm">
                  <Truck className="w-5 h-5 text-zinc-900 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-zinc-900 uppercase">Insured Freight</span>
                    <span className="text-zinc-400">Florida Depot / Home</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Specifications & EPC verification */}
            <div className="w-full md:w-1/2 p-7 md:p-9 flex flex-col justify-between overflow-y-auto bg-white">
              
              <div className="space-y-6">
                {/* Tech Specs */}
                <div>
                  <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-4 font-black">
                    Technical Specifications
                  </h4>
                  <div className="space-y-3 font-mono text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-zinc-150 text-zinc-700">
                        <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-bold">{key}</span>
                        <span className="text-zinc-900 text-right font-black">{val}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 border-b border-zinc-150">
                      <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-bold">Bespoke Build S/N Code</span>
                      <span className="text-zinc-950 font-bold tracking-widest uppercase select-all bg-zinc-100 px-1.5 py-0.5 rounded text-[11px]">{product.oemNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Compatibility checking framework */}
                <div className="space-y-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block font-black">
                      Chassis Alignment & Fit Match
                    </label>
                    <span className="text-[10px] text-zinc-400 font-mono tracking-wider font-semibold">GOLFCARTS Lab</span>
                  </div>

                  <select
                    value={selectedFit}
                    onChange={(e) => setSelectedFit(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white border border-zinc-300 hover:border-zinc-400 text-xs text-zinc-850 outline-none focus:ring-2 focus:ring-zinc-950 transition-all font-mono"
                  >
                    <option value="">-- Select base chassis model --</option>
                    {COMPATIBLE_MODELS.map((model) => (
                      <option key={model} value={model}>
                        {model} {product.compatibleModels.includes(model) ? '✓' : '⚙️'}
                      </option>
                    ))}
                  </select>

                  {/* S/N fitment check */}
                  <div className="pt-3 border-t border-zinc-200">
                    <form onSubmit={handleVerifyVin} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter S/N for verification check"
                        value={typedVin}
                        onChange={(e) => setTypedVin(e.target.value.toUpperCase())}
                        maxLength={17}
                        className="flex-grow p-3 rounded-lg bg-white border border-zinc-300 text-xs font-mono tracking-wider text-zinc-950 uppercase placeholder-zinc-400 outline-none focus:border-zinc-950"
                      />
                      <button
                        type="submit"
                        disabled={isVerifyingVin || !typedVin}
                        className="px-5 py-3 rounded-lg bg-zinc-950 hover:bg-zinc-850 border border-zinc-900 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                      >
                        {isVerifyingVin ? 'Checking...' : 'Verify Fit'}
                      </button>
                    </form>

                    {/* Result matching indicator */}
                    {vinVerified !== null && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="mt-3 p-3 rounded-xl bg-zinc-950 text-white text-[11px] flex items-center gap-2.5 border border-zinc-900"
                      >
                        <Check className="w-4 h-4 text-zinc-100 stroke-[2.5]" />
                        <span className="font-mono tracking-wider uppercase font-black">
                          100% Genuine Chassis S/N Alignment Certified!
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom purchase assembly */}
              <div className="pt-6 mt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="block text-[10px] text-zinc-400 uppercase font-mono tracking-widest font-black">
                    Bespoke Build Price
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-mono font-black text-zinc-950">
                      €{product.priceEur.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono font-bold">EUR</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleAddToCartWithLocalSpecs}
                    className="px-7 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-850 text-white font-mono font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
                  >
                    <ShoppingCart className="w-4.5 h-4.5 text-white" />
                    <span>Select & Add To Order</span>
                  </button>

                  <p className="text-[10px] text-zinc-400 font-mono text-center sm:text-right uppercase tracking-wider font-extrabold">
                    Instant allocation hold for next 24 Hours
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
