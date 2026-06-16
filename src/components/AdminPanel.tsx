import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Order } from '../types';
import { X, Plus, Trash2, Edit, Save, ShieldCheck, Database, ShoppingBag, Truck, MapPin, Contact, Key, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';
import { COMPATIBLE_MODELS } from '../data';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onResetCatalog: () => void;
  tiktokUrl: string;
  onUpdateTiktokUrl: (url: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onResetCatalog,
  tiktokUrl,
  onUpdateTiktokUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'settings'>('orders');

  // New product form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemOem, setNewItemOem] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<Product['category']>('resort');
  const [newItemCondition, setNewItemCondition] = useState<Product['condition']>('new');
  const [newItemPrice, setNewItemPrice] = useState<number>(1000);
  const [newItemImages, setNewItemImages] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [newItemSpecs, setNewItemSpecs] = useState('Drivetrain: High-Output AC-Motor, Battery: Lithium 72V');
  const [newItemCompatibleModels, setNewItemCompatibleModels] = useState<string[]>(['Club Car Onward HP Drive']);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUploadedImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file as Blob);
    });
  };

  const handleRemoveUploadedImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };
  
  // Edit product state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editOem, setEditOem] = useState('');
  const [editCompatible, setEditCompatible] = useState<string[]>([]);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemOem || !newItemPrice) return;

    // Parse specs string "Key: Value, Key2: Value2"
    const parsedSpecs: { [key: string]: string } = {};
    newItemSpecs.split(',').forEach(item => {
      const parts = item.split(':');
      if (parts.length >= 2) {
        parsedSpecs[parts[0].trim()] = parts[1].trim();
      }
    });

    let finalImages: string[] = [];
    if (uploadedImages.length > 0) {
      finalImages = uploadedImages;
    } else {
      finalImages = newItemImages.split(',').map(url => url.trim()).filter(Boolean);
    }
    
    if (finalImages.length === 0) {
      // elegant placeholder
      finalImages = ['https://images.unsplash.com/photo-1611245801311-5a0248d28e78?auto=format&fit=crop&q=80&w=800'];
    }

    const newProduct: Product = {
      id: `custom-prod-${Date.now()}`,
      name: newItemName,
      nameRu: newItemName,
      oemNumber: newItemOem,
      category: newItemCategory,
      description: `Compatible fitment component ${newItemOem}`,
      descriptionRu: `Compatible fitment component ${newItemOem}`,
      priceEur: Number(newItemPrice),
      condition: newItemCondition,
      conditionRu: newItemCondition === 'new' ? 'New Genuine' : newItemCondition === 'refurbished' ? 'Refurbished' : 'Original Used',
      images: finalImages,
      specs: parsedSpecs,
      specsRu: parsedSpecs,
      compatibleModels: newItemCompatibleModels,
      inStock: true
    };

    onAddProduct(newProduct);

    // Reset Form
    setNewItemName('');
    setNewItemOem('');
    setNewItemPrice(1000);
    setNewItemSpecs('Size: 19 Inches, Material: Forged Alloy');
    setNewItemImages('');
    setUploadedImages([]);
  };

  const handleStartEdit = (product: Product) => {
    setEditingProductId(product.id);
    setEditName(product.name);
    setEditPrice(product.priceEur);
    setEditOem(product.oemNumber);
    setEditCompatible(product.compatibleModels);
  };

  const handleSaveEdit = (product: Product) => {
    const updatedProd: Product = {
      ...product,
      name: editName,
      priceEur: editPrice,
      oemNumber: editOem,
      compatibleModels: editCompatible,
    };
    onUpdateProduct(updatedProd);
    setEditingProductId(null);
  };

  const toggleCompatibleModelForNew = (model: string) => {
    if (newItemCompatibleModels.includes(model)) {
      setNewItemCompatibleModels(newItemCompatibleModels.filter(m => m !== model));
    } else {
      setNewItemCompatibleModels([...newItemCompatibleModels, model]);
    }
  };

  const toggleCompatibleModelForEdit = (model: string) => {
    if (editCompatible.includes(model)) {
      setEditCompatible(editCompatible.filter(m => m !== model));
    } else {
      setEditCompatible([...editCompatible, model]);
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels: { [key in Order['status']]: string } = {
      pending_verification: 'Pending S/N Match',
      parts_found: 'Upgrades Allocated',
      ready_for_dispatch: 'Secure Crating Completed',
      dispatched: 'Freight Dispatched',
      completed: 'Closed & Upgrades Flipped'
    };
    return labels[status] || status;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-stretch md:items-center justify-center p-0 md:p-6 bg-zinc-950/80 backdrop-blur-md">
          {/* Inner container with solid carbon metal look */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-5xl bg-[#09090b] text-zinc-100 border-none md:border md:border-zinc-800 rounded-none md:rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden min-h-screen md:min-h-[85vh] max-h-screen md:max-h-[88vh]"
          >
            {/* Top brand header */}
            <div className="p-6 border-b border-zinc-800/80 bg-zinc-950/90 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 10px)'
              }} />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-zinc-700 bg-black flex items-center justify-center text-white font-black">
                  ⭐
                </div>
                <div>
                  <h2 className="text-base font-black tracking-widest uppercase text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span>PROCART CUSTOM SECURE ADMIN CHAMBER</span>
                  </h2>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                    S/N Alignment Analysis, Upgrades Allocation holds, and logistics management
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto">
                <button
                  onClick={onResetCatalog}
                  title="Restore catalog to original system defaults"
                  className="px-3 py-2 text-[10px] font-mono font-black uppercase text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Defaults</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 border border-zinc-800 hover:border-zinc-650 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-all cursor-pointer bg-black shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sub-panels navigation tabs */}
            <div className="flex border-b border-zinc-800/60 bg-zinc-950/40 px-6 py-2 shrink-0">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest rounded-lg font-black transition-all ${
                  activeTab === 'orders'
                    ? 'bg-zinc-900 text-white border-b-2 border-emerald-500'
                    : 'text-zinc-550 hover:text-white'
                }`}
              >
                Inbound Orders holds ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest rounded-lg font-black transition-all ${
                  activeTab === 'catalog'
                    ? 'bg-zinc-900 text-white border-b-2 border-emerald-500'
                    : 'text-zinc-550 hover:text-white'
                }`}
              >
                Catalog Control Room ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest rounded-lg font-black transition-all ${
                  activeTab === 'settings'
                    ? 'bg-zinc-900 text-white border-b-2 border-emerald-500'
                    : 'text-zinc-550 hover:text-white'
                }`}
              >
                System Settings
              </button>
            </div>

            {/* Scrollable control workspace */}
            <div className="flex-grow overflow-y-auto p-6 space-y-8 bg-[#0b0b0c]">
              
              {/* ORDERS MANAGEMENT PANEL */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  {orders.length === 0 ? (
                    <div className="p-16 text-center text-zinc-650 font-mono space-y-3 border border-zinc-900/60 bg-zinc-950 rounded-2xl">
                      <ShoppingBag className="w-10 h-10 text-zinc-805 mx-auto" />
                      <p className="text-xs uppercase font-extrabold tracking-widest text-zinc-500">NO ACTIVE DEPLOYMENT CHECKS</p>
                      <p className="text-[10px] uppercase text-zinc-500">Awaiting custom checkout requests from clients</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="p-5 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-4"
                        >
                          {/* Order identification */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-850 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="bg-zinc-900 text-white px-3 py-1 text-xs font-mono font-black border border-zinc-800 rounded">
                                  {order.orderNumber}
                                </span>
                                <span className="text-[10px] text-zinc-500 font-mono">
                                  {order.createdAt}
                                </span>
                              </div>
                              <h3 className="text-sm font-extrabold text-white mt-2 font-sans">
                                Client: <span className="text-zinc-300 select-all">{order.customerName}</span>
                              </h3>
                            </div>

                            <div className="text-right flex flex-col items-start sm:items-end gap-1.5">
                              <span className="text-lg font-mono font-black text-white italic">
                                total: €{order.totalPriceEur.toLocaleString('en-US')}
                              </span>
                              <span className="text-[10px] text-zinc-450 font-mono bg-zinc-900 px-2 py-0.5 border border-zinc-800 rounded uppercase">
                                STATUS: {order.status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>

                          {/* Contact and logistics delivery breakdowns */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-zinc-900/40 p-4 rounded-xl border border-zinc-900">
                            {/* Contact coordinate */}
                            <div className="space-y-1">
                              <span className="text-[9px] text-zinc-500 uppercase font-black block tracking-wider">SECURE COORDINATE</span>
                              <p className="text-zinc-200 flex items-center gap-1.5 text-[11px] font-black">
                                <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[10px] border border-zinc-700 uppercase">{order.contactMethod}</span>
                                <span className="select-all">{order.contactValue}</span>
                              </p>
                              <p className="text-[10px] text-zinc-500 mt-1 select-all">Chassis VIN: {order.vin}</p>
                            </div>

                            {/* Shipment logistics destination */}
                            <div className="space-y-1">
                              <span className="text-[9px] text-zinc-500 uppercase font-black block tracking-wider">SHIPPING LOGISTICS DESTINATION</span>
                              <p className="text-zinc-200 flex items-start gap-1.5 text-[11px] font-black">
                                <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[10px] border border-zinc-700 uppercase shrink-0">
                                  {order.deliveryMethod}
                                </span>
                                <span className="select-all leading-normal">{order.address || 'Florida Depot Pick-up'}</span>
                              </p>
                              {order.notes && <p className="text-[10px] text-amber-500 italic mt-1 font-bold">Client Notes: "{order.notes}"</p>}
                            </div>
                          </div>

                          {/* Items allocation list */}
                          <div className="space-y-1.5 p-3.5 bg-[#0e0e11] border border-zinc-900 rounded-xl">
                            <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-black">Parts Cart Items:</span>
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-[11.5px] font-mono border-b border-zinc-900 py-1 text-zinc-300">
                                <span className="truncate pr-4 uppercase">
                                  {item.productName} (x{item.quantity})
                                </span>
                                <span className="text-zinc-200 font-bold shrink-0">€{(item.priceEur * item.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>

                          {/* Status workflow triggers */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-2">
                            <span className="text-[9px] text-zinc-500 uppercase font-mono font-black tracking-widest block w-full mb-1">
                              Transition Logistics Status Milestone:
                            </span>
                            {(['pending_verification', 'parts_found', 'ready_for_dispatch', 'dispatched', 'completed'] as Order['status'][]).map((status) => (
                              <button
                                key={status}
                                onClick={() => onUpdateOrderStatus(order.id, status)}
                                className={`text-[9px] px-3.5 py-1.5 rounded font-bold font-mono uppercase tracking-widest border transition-all cursor-pointer ${
                                  order.status === status
                                    ? 'bg-white text-black border-white shadow-md'
                                    : 'bg-zinc-900 text-zinc-455 border-zinc-800 hover:border-zinc-700 hover:text-white'
                                }`}
                              >
                                {getStatusLabel(status)}
                              </button>
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}


              {/* CATALOG DESIGN AND MANAGER */}
              {activeTab === 'catalog' && (
                <div className="space-y-10">
                  
                  {/* Create product interface */}
                  <form onSubmit={handleCreateProduct} className="p-6 bg-zinc-950 rounded-2xl border border-zinc-850 space-y-5">
                    <h3 className="text-xs font-mono font-black uppercase text-white tracking-widest border-b border-zinc-850 pb-2.5 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-emerald-500" />
                      <span>Input New Premium Upgrade Catalog Card</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                          Component Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="E.g. Carbon Dynamic Steering Wheel"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs placeholder-zinc-550 text-white outline-none focus:border-zinc-500"
                        />
                      </div>

                      {/* OEM Number input */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                          Catalog S/N Part Serial *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="E.g. CC-4011700"
                          value={newItemOem}
                          onChange={(e) => setNewItemOem(e.target.value)}
                          className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono placeholder-zinc-550 text-white outline-none focus:border-zinc-500 uppercase tracking-wider"
                        />
                      </div>

                      {/* Price input */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                          Price in EUR *
                        </label>
                        <input
                          type="number"
                          required
                          min={1}
                          placeholder="1200"
                          value={newItemPrice}
                          onChange={(e) => setNewItemPrice(Number(e.target.value))}
                          className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white outline-none focus:border-zinc-500"
                        />
                      </div>

                      {/* Category select */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-zinc-400 uppercase block font-bold">
                          Category Selection
                        </label>
                        <select
                          value={newItemCategory}
                          onChange={(e) => setNewItemCategory(e.target.value as Product['category'])}
                          className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white"
                        >
                          <option value="resort">Resort & Cruiser</option>
                          <option value="offroad">Lifted Offroad Carts</option>
                          <option value="four_seater">Luxury 4-Seater Carts</option>
                          <option value="six_seater">Grand 6-Seater Shuttles</option>
                          <option value="vintage">Classic Vintage Roadsters</option>
                        </select>
                      </div>

                      {/* Condition select */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-zinc-400 uppercase block font-bold">
                          Product Condition State
                        </label>
                        <select
                          value={newItemCondition}
                          onChange={(e) => setNewItemCondition(e.target.value as Product['condition'])}
                          className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white"
                        >
                          <option value="new">New Genuine (OVP)</option>
                          <option value="refurbished">Certified Refurbished</option>
                          <option value="original-used">Original Dismantled (Used)</option>
                        </select>
                      </div>

                      {/* Image list selector & Upload Zone */}
                      <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-black">
                          Component Photos (Direct File Upload or Optional URL)
                        </label>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* File Uploader Target Area */}
                          <div className="border border-dashed border-zinc-800 rounded-xl p-6 bg-zinc-900/10 flex flex-col items-center justify-center text-center hover:border-zinc-700 hover:bg-zinc-90 w/20 transition-all relative cursor-pointer min-h-[140px]">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                            <p className="text-xs font-bold text-zinc-300">Drag & Drop or Click to Upload Images</p>
                            <p className="text-[9px] text-zinc-500 font-mono mt-1">Saves locally • Direct site loading</p>
                          </div>

                          {/* Preview container and Direct text fallback */}
                          <div className="space-y-3.5 flex flex-col justify-between">
                            <div className="space-y-1.5">
                              <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block font-extraboldShared">
                                OR FALLBACK IMAGE URLS (COMMA SEPARATED)
                              </label>
                              <input
                                type="text"
                                placeholder="E.g. https://images.unsplash.com/..."
                                value={newItemImages}
                                onChange={(e) => setNewItemImages(e.target.value)}
                                className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs placeholder-zinc-550 text-white outline-none focus:border-zinc-500 font-mono"
                              />
                            </div>

                            {/* Live responsive visual uploads carousel */}
                            {uploadedImages.length > 0 && (
                              <div className="space-y-1.5">
                                <span className="block text-[8px] font-mono text-zinc-500 uppercase font-black">
                                  CONVERTED SECURE PHOTO STAGES ({uploadedImages.length}):
                                </span>
                                <div className="flex flex-wrap gap-2 max-h-[105px] overflow-y-auto p-2 bg-zinc-900/40 rounded-lg border border-zinc-900/60">
                                  {uploadedImages.map((imgBase64, idx) => (
                                    <div key={idx} className="relative w-12 h-12 rounded border border-zinc-800 overflow-hidden bg-black shrink-0 group">
                                      <img src={imgBase64} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveUploadedImage(idx)}
                                        className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-200"
                                      >
                                        <X className="w-4 h-4 text-white" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Specifications key-values */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                        Technical specifications (Format as Key: Value, Key2: Value2)
                      </label>
                      <input
                        type="text"
                        placeholder="Drivetrain: High-Output 4.7 HP AC, Battery: Lithium 51V 105Ah, Range: up to 80 km"
                        value={newItemSpecs}
                        onChange={(e) => setNewItemSpecs(e.target.value)}
                        className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs placeholder-zinc-550 text-white outline-none focus:border-zinc-500 font-mono"
                      />
                    </div>

                    {/* Compatible car models checkboxes */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                        Compatible Golf Cart Chassis Models Select *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {COMPATIBLE_MODELS.map(model => {
                          const isSelected = newItemCompatibleModels.includes(model);
                          return (
                            <button
                              key={model}
                              type="button"
                              onClick={() => toggleCompatibleModelForNew(model)}
                              className={`px-3 py-1.5 rounded-lg font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-500 text-black border border-emerald-500 font-bold'
                                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                              }`}
                            >
                              {model}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-white text-black font-mono font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 cursor-pointer"
                      >
                        <Plus className="w-4.5 h-4.5" />
                        <span>Add To Live Inventory</span>
                      </button>
                    </div>

                  </form>

                  {/* Existing inventory controller grid */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono font-black uppercase text-white tracking-widest border-b border-zinc-850 pb-2.5">
                      Live Catalog Inventory ({products.length})
                    </h3>

                    <div className="space-y-3.5">
                      {products.map(product => {
                        const isEditing = editingProductId === product.id;
                        return (
                          <div
                            key={product.id}
                            className="p-4 bg-zinc-950 rounded-xl border border-zinc-855 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
                          >
                            <div className="flex items-center gap-3 w-full md:w-1/2">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded bg-zinc-900 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              {isEditing ? (
                                <div className="space-y-1.5 flex-grow">
                                  <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="p-1 text-xs bg-zinc-900 border border-zinc-700 text-white rounded w-full"
                                  />
                                  <input
                                    type="text"
                                    value={editOem}
                                    onChange={(e) => setEditOem(e.target.value)}
                                    className="p-1 text-[10px] font-mono bg-zinc-900 border border-zinc-700 text-zinc-350 rounded w-full"
                                  />
                                </div>
                              ) : (
                                <div className="min-w-0">
                                  <h4 className="text-xs font-extrabold text-white truncate uppercase tracking-tight">{product.name}</h4>
                                  <p className="text-[10px] text-zinc-400 font-mono">OEM: {product.oemNumber} | {product.category.toUpperCase()} | {product.condition.toUpperCase()}</p>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono w-full md:w-auto justify-between md:justify-end">
                              {/* Price manager */}
                              <div className="space-y-0.5">
                                <span className="block text-[8px] text-zinc-550 uppercase">SPEC PRICE</span>
                                {isEditing ? (
                                  <input
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(Number(e.target.value))}
                                    className="w-20 p-1 text-xs font-mono bg-zinc-900 border border-zinc-750 text-white rounded"
                                  />
                                ) : (
                                  <span className="font-extrabold text-white">€{product.priceEur.toLocaleString()}</span>
                                )}
                              </div>

                              {/* Compatible Models in Edit state */}
                              {isEditing && (
                                <div className="w-full md:w-auto mt-2">
                                  <div className="flex flex-wrap gap-1 max-w-sm">
                                    {COMPATIBLE_MODELS.map(model => {
                                      const isSel = editCompatible.includes(model);
                                      return (
                                        <button
                                          key={model}
                                          type="button"
                                          onClick={() => toggleCompatibleModelForEdit(model)}
                                          className={`px-2 py-1 rounded text-[8px] font-mono font-black border transition-all ${
                                            isSel ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                                          }`}
                                        >
                                          {model}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Interactive actions */}
                              <div className="flex items-center gap-1.5 ml-auto">
                                {isEditing ? (
                                  <>
                                    <button
                                      onClick={() => handleSaveEdit(product)}
                                      className="p-2 rounded bg-emerald-500 text-black border border-emerald-450 hover:bg-emerald-400 transition-all cursor-pointer"
                                      title="Save custom updates"
                                    >
                                      <Save className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => setEditingProductId(null)}
                                      className="p-2 rounded bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700 transition-all cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleStartEdit(product)}
                                      className="p-2 rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer"
                                      title="Edit details"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => onDeleteProduct(product.id)}
                                      className="p-2 rounded bg-zinc-900 text-zinc-400 hover:text-red-500 hover:bg-zinc-800 border border-zinc-850 transition-all cursor-pointer"
                                      title="Remove from Live Catalog"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>

                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* SYSTEM SETTINGS PANEL */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-xl">
                  <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                    <h3 className="text-sm font-bold tracking-wider text-white uppercase font-mono">
                      Shop Link Preferences
                    </h3>
                    <p className="text-xs text-zinc-400 font-semibold leading-relaxed">
                      Configure the default TikTok channel link promoted in the header and success panels.
                    </p>
                    
                    <div className="space-y-2 pt-2">
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                        TikTok Profile URL:
                      </label>
                      <input
                        type="url"
                        value={tiktokUrl}
                        onChange={(e) => onUpdateTiktokUrl(e.target.value)}
                        placeholder="https://www.tiktok.com/@youraccount"
                        className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-lg text-xs font-mono text-white outline-none focus:border-zinc-550 transition-all font-bold"
                      />
                    </div>
                    
                    <div className="text-[10px] font-mono text-zinc-500 pt-1 leading-relaxed">
                      * Changes are synchronized instantly using client local state and cached in your browser storage.
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer lock note */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 shrink-0 select-none">
              <span>ACTIVE SESSION STATUS: AUTHORIZED DIRECT ACCESS</span>
              <span className="flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-emerald-500" />
                <span>SPEC ALIGNMENT STATUS SECURE LEVEL 3</span>
              </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
