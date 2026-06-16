import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';
import { CheckCircle, Phone, Mail, X, ArrowUpRight, Printer } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  language?: 'en' | 'ru';
  tiktokUrl?: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  order,
  onClose,
  tiktokUrl = 'https://www.tiktok.com/@golfcarts25800',
}) => {
  if (!order) return null;

  // Generate pre-filled WhatsApp link with professional structured message
  const getWhatsAppLink = () => {
    const phone = '15615550291'; // USA-based Palm Beach / Pinehurst Area Mock Phone or real custom contact
    let text = `Hello GolfCarts Custom! 🚨\n\nI have generated a custom golf car specification on your website.\n\n📄 *Order ID:* ${order.orderNumber}\n👤 *Customer:* ${order.customerName}\n🔧 *Chassis S/N:* ${order.vin}\n🚚 *Delivery:* ${order.deliveryMethod === 'shipping' ? `Shipping to: ${order.address || ''}` : 'Florida Depot pickup'}\n📞 *Contact:* ${order.contactValue}\n\n*Golf Cart Selection List:*\n`;
    order.items.forEach((item) => {
      text += `- ${item.productName} (${item.oemNumber}) x${item.quantity} — €${(item.priceEur * item.quantity).toLocaleString()}\n`;
    });
    text += `\n💶 *Grand Total:* €${order.totalPriceEur.toLocaleString()}\n`;
    if (order.notes) {
      text += `📝 *Notes:* ${order.notes}\n`;
    }
    text += `\nPlease verify custom chassis specifications and share availability and estimated lead time!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  // Generate Email mailto link
  const getMailtoLink = () => {
    const email = 'builds@golfcarts-custom.com';
    const subject = `GolfCarts Custom Build Specification ${order.orderNumber}`;
    let body = `Hello GolfCarts Custom,\n\nA new custom golf car specification order ${order.orderNumber} has been finalized.\n\nCustomer Details:\nName: ${order.customerName}\nPrefer Contact: ${order.contactMethod} (${order.contactValue})\nChassis S/N: ${order.vin}\nDelivery: ${order.deliveryMethod === 'shipping' ? order.address : 'Florida Depot pickup'}\n\nBuild Selection List:\n`;
    order.items.forEach((item) => {
      body += `- ${item.productName} [Build Code: ${item.oemNumber}] x${item.quantity} — €${item.priceEur * item.quantity}\n`;
    });
    body += `\nGrand Total: €${order.totalPriceEur}\n\nPlease reach out to me with availability, lithium battery setup details, and shipping lead times!`;

    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
          />

          {/* Dialog container box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-2xl flex flex-col z-10 max-h-[92vh] print:border-none print:shadow-none bg-white text-zinc-900"
          >
            {/* Close trigger button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-650 hover:text-zinc-950 transition-colors duration-150 border border-zinc-200 print:hidden cursor-pointer z-30"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content holder area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              
              {/* Success Badge */}
              <div className="text-center space-y-2 print:hidden pt-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-50 border border-zinc-350 text-zinc-900">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-zinc-950 uppercase tracking-tight">
                  Specification order created
                </h2>
                <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider font-bold">
                  Reserved in custom build database. Select communication channel below to finalize customized options:
                </p>
              </div>

              {/* Direct Communication Channels (CRITICAL FOR BUSINESS FLOW) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 print:hidden">
                {/* Visit TikTok Profile */}
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded bg-zinc-950 hover:bg-zinc-850 text-white font-mono font-bold text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-sm group cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.43-.4-.63-.62v7.39c.04 2.44-.93 4.87-2.68 6.51-1.8 1.67-4.4 2.47-6.81 2.15-2.53-.34-4.9-1.92-6.16-4.14-1.39-2.42-1.54-5.56-.4-8.1 1.15-2.56 3.73-4.38 6.54-4.66.29-.03.59-.04.88-.04v3.91c-.3.04-.61.1-.9.2-.82.26-1.57.75-2.11 1.4-.64.76-.94 1.77-.87 2.76.08 1.11.64 2.16 1.52 2.82.91.69 2.13.92 3.24.64 1.16-.3 2.11-1.22 2.49-2.33.15-.43.21-.89.21-1.34V.02Z"/>
                  </svg>
                  <span>Visit TikTok Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Send via Email */}
                <a
                  href={getMailtoLink()}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 font-mono font-bold text-[11px] uppercase tracking-widest transition-all active:scale-95 group cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-zinc-900" />
                  <span>Submit via Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Premium Printable/Digital Invoice Sheet */}
              <div className="p-6 rounded bg-zinc-50 border border-zinc-200 space-y-4 print:bg-white print:text-black print:border-none print:p-0">
                <div className="flex justify-between items-start pb-4 border-b border-zinc-200">
                  <div>
                    <h3 className="text-xs font-black tracking-widest uppercase text-zinc-900 font-sans">
                      GOLFCARTS CUSTOMS
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Premium Customized Golf Carts & Luxury Cruisers</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-zinc-500 block">Invoice Number</span>
                    <span className="text-xs font-mono font-black text-zinc-950 select-all">{order.orderNumber}</span>
                  </div>
                </div>

                {/* Basic client stats */}
                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-zinc-500 block uppercase text-[10px] font-black tracking-wider">Client Name</span>
                    <span className="font-bold text-zinc-900 block">{order.customerName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[10px] font-black tracking-wider">Chassis S/N</span>
                    <span className="font-mono text-zinc-900 font-bold block uppercase select-all">{order.vin}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[10px] font-black tracking-wider">Contact Coordinate</span>
                    <span className="font-mono text-zinc-900 block">{order.contactValue} ({order.contactMethod.toUpperCase()})</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[10px] font-black tracking-wider">Logistics Setup</span>
                    <span className="text-zinc-900 block font-bold uppercase tracking-tight text-[11px]">
                      {order.deliveryMethod === 'shipping' 
                        ? 'Insured Freight Delivery' 
                        : 'Florida Depot Pickup'}
                    </span>
                  </div>
                </div>

                {/* Order inventory table mapping */}
                <div className="space-y-2 pt-2 border-t border-zinc-200">
                  <span className="text-zinc-500 block uppercase text-[10px] font-black tracking-wider">Custom build selection</span>
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center py-1.5 text-xs font-sans border-b border-zinc-150">
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-zinc-900 line-clamp-1 uppercase tracking-tight text-[11px]">
                          {item.productName}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-mono">Build Code: {item.oemNumber} x{item.quantity}</p>
                      </div>
                      <span className="font-mono font-black text-zinc-900 italic shrink-0">
                        €{(item.priceEur * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price final overview */}
                <div className="pt-4 border-t border-zinc-200 flex justify-between items-baseline">
                  <span className="font-black text-xs text-zinc-500 uppercase tracking-widest font-sans">Grand Total Allocation</span>
                  <span className="text-2xl font-mono font-black text-zinc-950 italic">
                    €{order.totalPriceEur.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Utility actions inside success modal */}
              <div className="flex items-center justify-between pt-2 text-xs print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-3.5 py-2 rounded bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 text-zinc-650 hover:text-zinc-950 font-mono font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-zinc-500" />
                  <span>Print Invoice Statement</span>
                </button>

                <p className="text-[9px] text-zinc-400 font-mono text-right italic leading-tight uppercase tracking-wider font-semibold max-w-xs">
                  Click 'Send via WhatsApp' to transmit your unique chassis S/N specifications list to our custom builder.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
