import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';
import { X, Search, CheckCircle, Clock, Sliders, ChevronDown } from 'lucide-react';

interface ClientOrdersProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  language?: 'en' | 'ru';
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const ClientOrders: React.FC<ClientOrdersProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
}) => {
  const [searchVin, setSearchVin] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAdminControls, setShowAdminControls] = useState(false);

  const filteredOrders = searchVin.trim()
    ? orders.filter(o => o.vin.toLowerCase().includes(searchVin.toLowerCase()) || o.orderNumber.toLowerCase().includes(searchVin.toLowerCase()))
    : orders;

  const getStatusDetails = (status: Order['status']) => {
    const details = {
      pending_verification: {
        label: { en: 'S/N Verification' },
        color: 'bg-zinc-100 text-zinc-800 border-zinc-250',
        desc: { en: 'Our technician is matching custom golf cart build options against your chassis serial number S/N.' }
      },
      parts_found: {
        label: { en: 'Build Options Approved' },
        color: 'bg-zinc-100 text-zinc-900 border-zinc-300 font-bold',
        desc: { en: 'Bespoke custom options verified on-chassis in Palm Beach depot. Physical modifications scheduled.' }
      },
      ready_for_dispatch: {
        label: { en: 'Secure Packing' },
        color: 'bg-zinc-900 text-white border-zinc-950',
        desc: { en: 'Vehicle wrapped in heavy shockproof padding and loaded on steel-reinforced base crate.' }
      },
      dispatched: {
        label: { en: 'Shipped (Insured Freight)' },
        color: 'bg-zinc-950 text-white border-zinc-950 font-bold tracking-widest',
        desc: { en: 'On the way to your address. Insured freight tracking registered with heavy cargo carrier.' }
      },
      completed: {
        label: { en: 'Delivered & Handed Over' },
        color: 'bg-zinc-50 text-zinc-900 border-zinc-300 font-bold',
        desc: { en: 'Vehicle delivered. Remote custom configuration and high-capacity luxury workbook handover verified!' }
      }
    };
    return details[status] || {
      label: { en: status },
      color: 'bg-zinc-100 text-zinc-600 border-zinc-200',
      desc: { en: 'Milestone tracking active' }
    };
  };

  const getTimelineSteps = (currentStatus: Order['status']) => {
    const steps: Order['status'][] = [
      'pending_verification',
      'parts_found',
      'ready_for_dispatch',
      'dispatched',
      'completed'
    ];
    return steps;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
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
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-3xl bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-2xl flex flex-col z-10 max-h-[88vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-200 bg-zinc-50 flex justify-between items-center">
              <div>
                <h2 className="text-base md:text-lg font-black text-zinc-950 uppercase tracking-tight flex items-center gap-2">
                  <span>Order Tracking & Registry</span>
                  <span className="text-[10px] bg-white border border-zinc-250 px-2.5 py-0.5 rounded text-zinc-650 font-mono font-bold">
                    {orders.length} ACTIVE
                  </span>
                </h2>
                <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
                  Real-time logistical milestones of custom components verification
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded hover:bg-zinc-200 text-zinc-650 hover:text-zinc-950 transition-colors cursor-pointer border border-zinc-200 bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Search filter board */}
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={searchVin}
                    onChange={(e) => setSearchVin(e.target.value)}
                    placeholder="Filter by Order ID or Serial S/N number..."
                    className="w-full pl-10 pr-4 py-2.5 rounded bg-zinc-50 border border-zinc-200 text-xs text-zinc-950 placeholder-zinc-400 outline-none focus:border-zinc-900 font-mono"
                  />
                </div>

                {/* Admin controls view toggles */}
                {orders.length > 0 && (
                  <button
                    onClick={() => setShowAdminControls(!showAdminControls)}
                    className={`px-4 rounded border text-[10px] font-mono font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      showAdminControls 
                        ? 'bg-zinc-900 text-white border-zinc-950' 
                        : 'bg-zinc-50 text-zinc-500 border-zinc-255 hover:border-zinc-350'
                    }`}
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Dev Simulator</span>
                  </button>
                )}
              </div>

              {/* Status information and simulation guidelines */}
              {showAdminControls && (
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded space-y-1.5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 font-mono">
                    Interactive Status Simulator
                  </h4>
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    Mock Workshop Tools: Manually shift shipment status settings directly to test dynamic tracking milestone timelines.
                  </p>
                </div>
              )}

              {/* Orders registry list */}
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-zinc-500">
                  <p className="font-mono text-xs font-black uppercase tracking-widest text-zinc-400">
                    No matching records found
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider font-mono">
                    Go back to products catalog and compile an order sheet first.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const statusInfo = getStatusDetails(order.status);
                    const isExpanded = selectedOrder?.id === order.id;

                    return (
                      <div
                        key={order.id}
                        className={`p-4 rounded bg-white border transition-all ${
                          isExpanded ? 'border-zinc-900 ring-1 ring-zinc-900' : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        {/* Summary inline header layout */}
                        <div
                          onClick={() => setSelectedOrder(isExpanded ? null : order)}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-black text-zinc-950 px-2.5 py-0.5 rounded bg-zinc-50 border border-zinc-200 select-all uppercase">
                                {order.orderNumber}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-mono font-semibold">
                                {order.createdAt}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-zinc-650 font-sans">
                              Client: {order.customerName} |{' '}
                              <span className="font-mono text-[11.5px] text-zinc-900 font-bold uppercase select-all">S/N: {order.vin}</span>
                            </p>
                          </div>

                          <div className="flex sm:flex-col items-start sm:items-end justify-between gap-2.5">
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded border ${statusInfo.color}`}>
                              {statusInfo.label.en}
                            </span>
                            <span className="text-sm font-mono font-black text-zinc-950 italic">
                              €{order.totalPriceEur.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Admin simulation controls */}
                        {showAdminControls && (
                          <div className="mt-4 pt-4 border-t border-zinc-150 flex flex-wrap gap-1 bg-zinc-50 p-2.5 rounded border border-zinc-200">
                            <span className="text-[9px] text-zinc-500 uppercase font-mono font-black tracking-widest block w-full mb-1">
                              Update shipment milestone (Developer simulation action):
                            </span>
                            {(['pending_verification', 'parts_found', 'ready_for_dispatch', 'dispatched', 'completed'] as Order['status'][]).map((st) => (
                              <button
                                key={st}
                                onClick={() => onUpdateOrderStatus(order.id, st)}
                                className={`text-[9px] px-2.5 py-1.5 rounded font-bold font-mono transition-all uppercase tracking-wider cursor-pointer ${
                                  order.status === st
                                    ? 'bg-zinc-950 text-white'
                                    : 'bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200'
                                }`}
                              >
                                {getStatusDetails(st).label.en}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Detailed expansion card timeline info */}
                        {isExpanded && (
                          <div className="mt-5 pt-5 border-t border-zinc-200 space-y-5">
                            
                            {/* Inner description detail of current status */}
                            <div className="p-3.5 bg-zinc-50 rounded border border-zinc-200 flex items-start gap-2.5 text-xs">
                              <Clock className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                              <div>
                                <span className="block font-black text-zinc-500 uppercase text-[9px] tracking-widest font-mono">
                                  Milestone Details
                                </span>
                                <p className="text-zinc-800 text-xs leading-relaxed mt-0.5 font-bold font-sans">
                                  {statusInfo.desc.en}
                                </p>
                              </div>
                            </div>

                            {/* visual timeline dots */}
                            <div className="relative pt-2 pb-4">
                              {/* Horizontal track line */}
                              <div className="absolute top-[17px] left-3 right-3 h-[2px] bg-zinc-100" />
                              <div
                                className="absolute top-[17px] left-3 h-[2px] bg-zinc-950 transition-all"
                                style={{
                                  width: `${
                                    (getTimelineSteps(order.status).indexOf(order.status) / 4) * 98
                                  }%`
                                }}
                              />

                              {/* Timeline milestones nodes */}
                              <div className="relative flex justify-between">
                                {getTimelineSteps(order.status).map((st, sIdx) => {
                                  const currentIdx = getTimelineSteps(order.status).indexOf(order.status);
                                  const active = sIdx <= currentIdx;
                                  const isCurrent = sIdx === currentIdx;

                                  return (
                                    <div key={st} className="flex flex-col items-center">
                                      <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] ring-4 ring-white z-10 transition-all ${
                                          active 
                                            ? (isCurrent ? 'bg-zinc-950 text-white font-black' : 'bg-white border-2 border-zinc-900 text-zinc-900 font-bold') 
                                            : 'bg-zinc-100 border border-zinc-200 text-zinc-400'
                                        }`}
                                      >
                                        {active ? '✓' : sIdx + 1}
                                      </div>
                                      <span
                                        className={`text-[9px] font-black font-mono tracking-tighter uppercase mt-2 text-center transition-all px-0.5 ${
                                          active ? 'text-zinc-900' : 'text-zinc-400'
                                        }`}
                                      >
                                        {getStatusDetails(st).label.en}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Item details list overview */}
                            <div className="space-y-2 p-3.5 bg-zinc-50 rounded border border-zinc-200 text-xs">
                              <span className="block font-black text-zinc-400 text-[9px] uppercase tracking-widest font-mono">Part Specification Components</span>
                              {order.items.map(item => (
                                <div key={item.productId} className="flex justify-between font-mono text-xs border-b border-zinc-150 py-0.5 last:border-0 text-zinc-800">
                                  <span className="truncate pr-2 uppercase font-semibold">
                                    {item.productName} (x{item.quantity})
                                  </span>
                                  <span className="text-zinc-500 font-bold shrink-0">€{(item.priceEur * item.quantity).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
