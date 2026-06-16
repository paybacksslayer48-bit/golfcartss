import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS, COMPATIBLE_MODELS } from './data';
import { Product, CartItem, Order } from './types';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { TuningConsultation } from './components/TuningConsultation';
import { ClientOrders } from './components/ClientOrders';
import { AdminPanel } from './components/AdminPanel';
import { 
  Search, 
  Car, 
  ShoppingCart, 
  Compass, 
  Info,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Interactive mouse tracking state for high-end gloss parallax backlights
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Product inventory state with persistence
  const [products, setProducts] = useState<Product[]>([]);

  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals alignment states
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [recentSubmittedOrder, setRecentSubmittedOrder] = useState<Order | null>(null);

  // Dynamic TikTok Link editable in Admin panel
  const [tiktokUrl, setTiktokUrl] = useState<string>(() => {
    return localStorage.getItem('golfcart_tiktok_url') || 'https://www.tiktok.com/@golfcarts25800';
  });

  const handleUpdateTiktokUrl = (url: string) => {
    setTiktokUrl(url);
    localStorage.setItem('golfcart_tiktok_url', url);
  };

  // Check hashtag router coordinate to open hidden admin deck directly
  useEffect(() => {
    const handleCheckHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    handleCheckHash();
    window.addEventListener('hashchange', handleCheckHash);
    return () => window.removeEventListener('hashchange', handleCheckHash);
  }, []);

  // Orders database list state with LocalStorage persistence
  const [orders, setOrders] = useState<Order[]>([]);

  // Seed default order history on first boot
  useEffect(() => {
    // Load products
    const cachedProducts = localStorage.getItem('golfcart_catalog_products');
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    } else {
      localStorage.setItem('golfcart_catalog_products', JSON.stringify(PRODUCTS));
      setProducts(PRODUCTS);
    }

    const existingOrders = localStorage.getItem('golfcart_parts_orders');
    if (existingOrders) {
      setOrders(JSON.parse(existingOrders));
    } else {
      const seedOrder: Order = {
        id: 'seed-order-1',
        orderNumber: 'GC-309104',
        createdAt: '2026-06-12 14:30',
        customerName: 'Marcus Sterling (Palm Beach Club)',
        contactMethod: 'whatsapp',
        contactValue: '+1 561 228 3941',
        deliveryMethod: 'shipping',
        address: 'USA, Florida, 120 Ocean Drive, Palm Beach, 33480',
        vin: 'CCPRECEDENTX4591Z',
        items: [
          {
            productId: 'prod-3',
            productName: 'Luxury Contour Double-Stitched Yacht Seat Cushions',
            productNameRu: 'Роскошные Сиденья Яхтенной Кожи с Повышенной Поддержкой',
            oemNumber: 'LC-SE8039',
            priceEur: 1450,
            quantity: 1,
          }
        ],
        totalPriceEur: 1600,
        shippingCostEur: 150,
        status: 'completed'
      };
      const initialList = [seedOrder];
      localStorage.setItem('golfcart_parts_orders', JSON.stringify(initialList));
      setOrders(initialList);
    }

    // Load cart if exists
    const existingCart = localStorage.getItem('golfcart_parts_cart');
    if (existingCart) {
      setCart(JSON.parse(existingCart));
    }
  }, []);

  // Update Cart to localStorage on changes
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('golfcart_parts_cart', JSON.stringify(updatedCart));
  };

  // Add Item to cart logic
  const handleAddToCart = (product: Product, modelFit?: string) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let updatedCart: CartItem[] = [...cart];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        product,
        quantity: 1,
        selectedModelFit: modelFit || selectedModel || undefined,
      });
    }

    saveCartToStorage(updatedCart);
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    const updatedCart = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: quantity < 1 ? 1 : quantity };
      }
      return item;
    });
    saveCartToStorage(updatedCart);
  };

  // Remove item from cart
  const handleRemoveCartItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    saveCartToStorage(updatedCart);
  };

  // Final Checkout processing
  const handleCheckoutSubmit = (newOrder: Order) => {
    const updatedOrdersList = [newOrder, ...orders];
    setOrders(updatedOrdersList);
    localStorage.setItem('golfcart_parts_orders', JSON.stringify(updatedOrdersList));

    // Reset shopping cart
    saveCartToStorage([]);
    setIsCartOpen(false);

    // Trigger invoice success overlay
    setRecentSubmittedOrder(newOrder);
  };

  // Admin simulation update status handler
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem('golfcart_parts_orders', JSON.stringify(updated));
  };

  const handleAddProduct = (newProduct: Product) => {
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem('golfcart_catalog_products', JSON.stringify(updated));
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updated);
    localStorage.setItem('golfcart_catalog_products', JSON.stringify(updated));
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    localStorage.setItem('golfcart_catalog_products', JSON.stringify(updated));
  };

  const handleResetCatalog = () => {
    const confirmRestore = window.confirm("Are you sure you want to restore the official Golf Cart catalog? This will overwrite your custom additions.");
    if (confirmRestore) {
      localStorage.setItem('golfcart_catalog_products', JSON.stringify(PRODUCTS));
      setProducts(PRODUCTS);
    }
  };

  // Filters logic - mapped to reactive products state array
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesModel = !selectedModel || product.compatibleModels.some(model => 
      model.toLowerCase().includes(selectedModel.toLowerCase()) || 
      selectedModel.toLowerCase().includes(model.toLowerCase())
    );
    const searchLow = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchLow) ||
      product.oemNumber.toLowerCase().includes(searchLow) ||
      product.description.toLowerCase().includes(searchLow);
    
    return matchesCategory && matchesModel && matchesSearch;
  });

  const CATEGORIES = [
    { id: 'all', en: 'All Golf Carts' },
    { id: 'resort', en: 'Resort & Cruiser' },
    { id: 'offroad', en: 'Lifted Offroad Carts' },
    { id: 'four_seater', en: 'Luxury 4-Seater Carts' },
    { id: 'six_seater', en: 'Grand 6-Seater Shuttles' },
    { id: 'vintage', en: 'Classic Vintage Roadsters' }
  ];

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 font-sans selection:bg-zinc-950 selection:text-white relative overflow-hidden">
      
      {/* 1. Technical Grid Blueprint Overlay (Detailing Workshop Vibe) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.22]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #d4d4d8 1.2px, transparent 1.2px), 
            linear-gradient(to right, #e4e4e7 1px, transparent 1px),
            linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 240px 240px, 240px 240px'
        }}
      />

      {/* 2. Interactive Parallax Backlight Spotlight (Gloss Lens Glow) */}
      <motion.div
        animate={{
          x: mousePosition.x * 60,
          y: mousePosition.y * 60
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.15 }}
        className="absolute top-[10vh] right-[5vw] w-[600px] h-[600px] bg-zinc-200/40 blur-[130px] rounded-full pointer-events-none mix-blend-multiply"
      />
      
      <motion.div
        animate={{
          x: mousePosition.x * -40,
          y: mousePosition.y * -40
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.15 }}
        className="absolute bottom-[20vh] left-[2vw] w-[500px] h-[500px] bg-zinc-300/20 blur-[110px] rounded-full pointer-events-none mix-blend-multiply"
      />

      {/* Brand Header component */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onAdminActivate={() => setIsAdminOpen(true)}
        tiktokUrl={tiktokUrl}
      />

      {/* Floating Shopping cart element at screen side */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative group p-4 rounded-xl bg-zinc-950 hover:bg-zinc-850 text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6 stroke-[2]" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-zinc-950 border-2 border-zinc-950 font-mono text-xs font-black">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Main Core Catalog Stage */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        
        {/* Bento Control Deck for Models & Search Filters - LARGE COMPONENT SIZES */}
        <div className="p-8 rounded-2xl bg-white border border-zinc-200/90 flex flex-col md:flex-row gap-6 items-stretch md:items-center shadow-[0_35px_80px_rgba(0,0,0,0.04)] relative">
          
          {/* Search block */}
          <div className="relative w-full md:w-5/12 flex flex-col">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-black">
              Search Custom Golf Carts:
            </span>
            <div className="relative">
              <Search className="absolute left-4 top-4 w-4.5 h-4.5 text-zinc-450" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by cart model, specs or S/N..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs md:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:bg-white outline-none font-sans font-black transition-all"
              />
            </div>
          </div>

          {/* Genuine Golf Cart model chassis select drop */}
          <div className="relative w-full md:w-5/12 flex flex-col">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-black">
              Filter by Compatible Chassis (Verify Serial S/N):
            </span>
            <div className="relative">
              <Car className="absolute left-4 top-4 w-4.5 h-4.5 text-zinc-450" />
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs md:text-sm text-zinc-900 outline-none focus:border-zinc-950 focus:bg-white cursor-pointer font-mono font-black transition-all appearance-none"
              >
                <option value="">
                  Show all customized golf cars
                </option>
                {COMPATIBLE_MODELS.map((model) => (
                  <option key={model} value={model}>
                    {model} Platform
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-4.5 pointer-events-none text-zinc-450 text-xs">▼</div>
            </div>
          </div>

          {/* Active inventory stock meter box */}
          <div className="text-[11px] text-zinc-500 font-mono text-center md:text-right hidden md:block md:w-2/12 uppercase font-black tracking-widest pt-5 border-t md:border-t-0 md:pt-0 self-center">
            <div className="text-[10px] text-zinc-405 mb-0.5">Active Fleet</div>
            <span className="font-mono text-zinc-950 font-black text-lg block leading-none">
              {filteredProducts.length} <span className="text-xs text-zinc-450 font-bold">CARTS</span>
            </span>
          </div>

        </div>

        {/* Sliding category pills - Larger with comfortable touch space */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer font-black uppercase tracking-widest border shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-zinc-950 text-white border-zinc-950 shadow-md scale-[1.01]'
                  : 'bg-white text-zinc-650 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-300'
              }`}
            >
              {cat.en}
            </button>
          ))}
        </div>

        {/* Symmetrical, solid 2-column Catalogue Section layout */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm md:text-base font-black text-zinc-950 uppercase tracking-widest flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-zinc-950" />
              <span>PREMIER CUSTOM ROYAL GOLF CARTS</span>
            </h2>
            {selectedModel && (
              <span className="text-[10px] text-white font-mono bg-zinc-950 px-4 py-1.5 rounded-lg border border-zinc-900 uppercase font-black tracking-widest shadow-md">
                BASE COMPATIBLE: {selectedModel}
              </span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-20 rounded-2xl bg-white border border-zinc-200 text-center space-y-5 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-500 font-bold text-lg shadow-sm">
                !
              </div>
              <p className="text-zinc-550 text-sm font-mono font-black uppercase tracking-wider">
                No matching components found for this configuration
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedModel('');
                  setSearchQuery('');
                }}
                className="text-xs text-zinc-950 hover:text-zinc-700 underline font-mono uppercase font-black tracking-widest cursor-pointer"
              >
                Reset catalog filters
              </button>
            </div>
          ) : (
            /* PERFECTLY SYMMETRIC GRAND 2-COLUMN GRID - EXTENSIVE SPACE */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {filteredProducts.map((product) => (
                <div key={product.id} className="w-full">
                  <ProductCard
                    product={product}
                    selectedModel={selectedModel}
                    onViewDetails={(prod) => setActiveProduct(prod)}
                    onAddToCart={(prod) => handleAddToCart(prod)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Symmetrical retrofit agency workshop service block */}
        <div className="p-8 md:p-12 rounded-2xl bg-white border border-zinc-200/90 flex flex-col md:flex-row items-center gap-8 shadow-[0_35px_80px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-zinc-50 pointer-events-none opacity-[0.25] hidden lg:block" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 10px)'
          }} />

          <div className="space-y-4 md:w-2/3 relative z-10">
            <span className="bg-zinc-100 text-zinc-800 font-mono font-black text-[10px] uppercase tracking-est px-3 py-1.5 rounded-lg inline-block border border-zinc-200/90 shadow-sm">
              AUTHORIZED EV TUNING & CUSTOMIZATION WORKFLOW
            </span>
            <h3 className="text-xl md:text-3xl font-black text-zinc-950 uppercase tracking-tight leading-tight">
              Lithium Power Conversions & Bespoke Accessories
            </h3>
            <p className="text-sm text-zinc-550 leading-relaxed font-semibold max-w-xl">
              We operate state-of-the-art golf cart service bays and power benches. If you purchase custom conversions (such as 72V Lithium battery packs, high-output electric AC motors, or dual-speed controller setups), we install them professionally, route heavy gauge copper leads, and calibrate safety controllers. Contact our customization experts to book a bay.
            </p>
          </div>

          <div className="md:w-1/3 w-full shrink-0 relative z-10">
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="w-full py-5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-white font-mono font-black text-xs uppercase tracking-widest transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Compass className="w-5 h-5 stroke-[2.5]" />
              <span>Book Styling & Power Bay</span>
            </button>
          </div>
        </div>

      </main>

      {/* Symmetrical footer */}
      <footer className="bg-white border-t border-zinc-200 py-16 text-center text-xs text-zinc-500 font-mono space-y-3 mt-24">
        <p>© 2026 ProCart Custom. Premium Golf Cart Upgrades & Luxury Parts Depot.</p>
        <p className="text-[11px] text-zinc-400">
          This system serves certified high-quality custom and OEM items matching chassis structural parameters.
        </p>
      </footer>

      {/* DECK REGISTER MODALS */}
      <ProductModal
        isOpen={activeProduct !== null}
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={(prod, model) => handleAddToCart(prod, model)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCreateOrder={handleCheckoutSubmit}
      />

      <OrderSuccessModal
        isOpen={recentSubmittedOrder !== null}
        order={recentSubmittedOrder}
        onClose={() => setRecentSubmittedOrder(null)}
        tiktokUrl={tiktokUrl}
      />

      <TuningConsultation
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <ClientOrders
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onResetCatalog={handleResetCatalog}
        tiktokUrl={tiktokUrl}
        onUpdateTiktokUrl={handleUpdateTiktokUrl}
      />

    </div>
  );
}
