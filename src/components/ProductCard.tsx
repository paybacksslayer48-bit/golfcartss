import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Check, AlertTriangle, ArrowRight, Eye, ChevronLeft, ChevronRight, Cpu } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  language?: 'en' | 'ru';
  selectedModel: string;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedModel,
  onViewDetails,
  onAddToCart,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getCompatibilityStatus = () => {
    if (!selectedModel) return 'unknown';
    const isCompatible = product.compatibleModels.some(model => 
      model.toLowerCase().includes(selectedModel.toLowerCase()) || 
      selectedModel.toLowerCase().includes(model.toLowerCase())
    );
    return isCompatible ? 'compatible' : 'incompatible';
  };

  const compatibility = getCompatibilityStatus();

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const getCategoryLabel = (cat: string) => {
    const labelsEn: { [key: string]: string } = {
      resort: 'Resort & Cruiser',
      offroad: 'Lifted Offroad',
      four_seater: 'Luxury 4-Seater',
      six_seater: 'Grand 6-Seater Limo',
      vintage: 'Classic Vintage Roadster',
    };
    return labelsEn[cat] || cat.toUpperCase();
  };

  const [tilt, setTilt] = useState({ x: 0, y: 0, sheenX: 50, sheenY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;
    
    setTilt({
      x: normY * -3, // subtle luxury rotateX
      y: normX * 3,  // subtle luxury rotateY
      sheenX: (x / rect.width) * 100,
      sheenY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, sheenX: 50, sheenY: 50 });
  };

  const productName = product.name;
  const productDescription = product.description;
  const productSpecs = product.specs;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX: tilt.x, 
        rotateY: tilt.y, 
        transformStyle: 'preserve-3d', 
        perspective: 1200 
      }}
      className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col hover:shadow-[0_45px_95px_rgba(0,0,0,0.11)]"
    >
      {/* High-Polish Protective Wet Look Sheen */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.14] transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle 260px at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(255,255,255,1), transparent)`
        }}
      />

      {/* Luxury Metallic corner hardware tick markers */}
      <span className="absolute top-3 left-3 w-2 h-2 border-t border-l border-zinc-300 pointer-events-none group-hover:border-zinc-500 z-20 transition-colors" />
      <span className="absolute top-3 right-3 w-2 h-2 border-t border-r border-zinc-300 pointer-events-none group-hover:border-zinc-500 z-20 transition-colors" />
      <span className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-zinc-300 pointer-events-none group-hover:border-zinc-500 z-20 transition-colors" />
      <span className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-zinc-300 pointer-events-none group-hover:border-zinc-500 z-20 transition-colors" />

      {/* Top badges bar with larger, readable elements */}
      <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between pointer-events-none">
        <span className="bg-white/95 backdrop-blur-md text-zinc-950 border border-zinc-200/90 text-[11px] font-mono uppercase tracking-widest px-3.5 py-1.5 rounded-lg font-black shadow-sm">
          {getCategoryLabel(product.category)}
        </span>

        {/* Stock / Condition tag */}
        <span className="bg-zinc-950 text-white text-[11px] font-mono px-3.5 py-1.5 rounded-lg uppercase font-black tracking-widest shadow-lg border border-zinc-900">
          {product.condition.replace('-', ' ')}
        </span>
      </div>

      {/* Image Container with Hover Slider - Taller aspect ratio for grand presence */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 flex-shrink-0 border-b border-zinc-200/80">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Shadowed vignette edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Multi-image indicators */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/95 hover:bg-white text-zinc-950 shadow-lg border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer pointer-events-auto z-10"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/95 hover:bg-white text-zinc-950 shadow-lg border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer pointer-events-auto z-10"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
              {product.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? 'bg-white w-5 shadow-md' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Description main block - Super dry & condensed info */}
      <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-3.5">
          {/* OEM code with clean technical aesthetic */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Cpu className="w-3.5 h-3.5 text-zinc-450" />
            <span className="uppercase text-[9px] font-bold text-zinc-400 tracking-wider">
              BUILD CODE:
            </span>
            <span className="text-zinc-950 font-black tracking-wider font-mono bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded text-[10px] select-all">{product.oemNumber}</span>
          </div>

          <h3 
            onClick={() => onViewDetails(product)}
            className="text-lg md:text-xl font-black tracking-tight uppercase text-zinc-950 hover:text-zinc-700 transition-colors cursor-pointer leading-tight"
          >
            {productName}
          </h3>

          {/* Genuine Golf Cart model chassis index */}
          <div className="py-2.5 px-3 bg-zinc-100/70 border border-zinc-200/60 rounded-xl space-y-1">
            <span className="block text-[8px] font-mono text-zinc-400 font-extrabold uppercase tracking-widest">
              SUPPORTED BASE PLATFORMS
            </span>
            <p className="text-xs font-mono font-black text-zinc-800 leading-normal">
              {product.compatibleModels.join(' • ')}
            </p>
          </div>
        </div>

        {/* Fitment Widget Checker inline - Bigger and more readable */}
        {selectedModel && (
          <div className="p-4 rounded-xl bg-zinc-50/80 border border-zinc-200 text-xs flex items-center gap-3 shadow-inner transition-colors group-hover:bg-zinc-50">
            {compatibility === 'compatible' ? (
              <>
                <span className="w-3 h-3 rounded-full bg-zinc-950 animate-pulse" />
                <span className="text-zinc-950 font-black font-mono tracking-wide">
                  MATCHED WITH {selectedModel.toUpperCase()}
                </span>
                <Check className="w-5 h-5 text-zinc-950 ml-auto flex-shrink-0 stroke-[3.5]" />
              </>
            ) : (
              <>
                <span className="w-3 h-3 rounded-full bg-zinc-400" />
                <span className="text-zinc-500 font-mono font-bold tracking-wide">
                  REQUIRES ALIGNMENT CHECK
                </span>
                <AlertTriangle className="w-5 h-5 text-zinc-400 ml-auto flex-shrink-0" />
              </>
            )}
          </div>
        )}

        {/* Pricing & Call to Actions */}
        <div className="pt-5 border-t border-zinc-200 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div>
            <span className="block text-[10px] text-zinc-400 uppercase font-mono tracking-widest font-black">
              CUSTOM BUILD PRICE
            </span>
            <span className="text-3xl font-mono font-black tracking-tighter text-zinc-950 flex items-center gap-1">
              <span className="text-lg font-bold text-zinc-500">€</span>
              <span>{product.priceEur.toLocaleString('en-US')}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onViewDetails(product)}
              className="p-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-950 text-zinc-650 hover:text-white transition-all border border-zinc-200/90 cursor-pointer shadow-sm hover:shadow-md flex-shrink-0"
              title="View Spec Matrix"
            >
              <Eye className="w-5 h-5" />
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className="flex-grow sm:flex-grow-0 px-6 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-950 text-white font-mono font-black text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-xl active:scale-[0.98]"
            >
              <span>Add to order</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
