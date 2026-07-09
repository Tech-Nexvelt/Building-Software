"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCustomerStore } from "@/store/useCustomerStore";
import { MapPin, Search } from "lucide-react";

export default function DigitalMenuPage() {
  const params = useParams();
  const sessionToken = params.session_token as string;
  const router = useRouter();
  
  const { session, cart, addToCart, updateQuantity, getCartItemCount } = useCustomerStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [activeCategory, setActiveCategory] = useState('All');

  // Mock Menu Items for UI presentation
  const menuItems = [
    { id: '1', name: 'Paneer Butter Masala', category: 'Main Course', price: 299, type: 'veg', desc: 'Rich and creamy curry made with paneer, spices, onions, tomatoes, and butter.' },
    { id: '2', name: 'Chicken Biryani', category: 'Biryani', price: 349, type: 'non-veg', desc: 'Fragrant basmati rice cooked with aromatic biryani spices, herbs & boiled eggs.' },
    { id: '3', name: 'Garlic Naan', category: 'Main Course', price: 59, type: 'veg', desc: 'Soft and fluffy flatbread infused with garlic flavor.' },
    { id: '4', name: 'Spring Rolls', category: 'Starters', price: 149, type: 'veg', desc: 'Crispy deep fried snacks filled with a delicious stuffing of lightly spiced and crunchy vegetables.' },
    { id: '5', name: 'Hakka Noodles', category: 'Chinese', price: 199, type: 'veg', desc: 'Classic chinese noodles tossed with garlic and veggies.' },
    { id: '6', name: 'Gulab Jamun', category: 'Desserts', price: 99, type: 'veg', desc: 'Fried dough balls soaked in a sweet, sticky sugar syrup.' },
  ];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    setMounted(true);
    // If there's no session in the global store, redirect back to QR scan
    if (!session && sessionToken) {
      router.replace(`/qr/${sessionToken}`);
    }
  }, [session, sessionToken, router]);

  if (!mounted || !session) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-24 font-sans text-gray-900">
      {/* Header Area */}
      <header className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-button-gradient text-white shadow-sm">
              <span className="text-xl">🍽️</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-gray-900">The Green Bowl</h1>
              <div className="flex items-center text-xs font-medium text-gray-500">
                <MapPin className="mr-1 h-3 w-3" />
                Main Branch, Mumbai
              </div>
            </div>
          </div>
          
          <div className="flex h-10 items-center justify-center rounded-xl border border-[#00D9D9]/30 bg-[#00D9D9]/5 px-3 text-sm font-bold text-[#00D9D9]">
            {session.tableNumber}
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for dishes, cuisines..."
              className="w-full rounded-xl border-none bg-gray-100 py-3 pl-10 pr-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D9D9]/50 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-6 space-y-8">
        
        {/* --- MENU VIEW --- */}
        {activeTab === 'menu' && (
          <>
            {/* Banner Section */}
            <section>
              <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-gray-900 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 max-w-[60%]">
                  <span className="mb-1 inline-block rounded bg-[#00D9D9] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    Today's Special
                  </span>
                  <h2 className="text-2xl font-bold text-white">20% OFF</h2>
                  <p className="mt-1 text-xs text-gray-300">On all pastas</p>
                </div>
              </div>
            </section>

        {/* Categories Section */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Popular Categories</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Starters', 'Main Course', 'Chinese', 'Biryani', 'Desserts'].map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCategory(cat)}
                className="flex flex-col items-center gap-2 outline-none group"
              >
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-sm border transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#00D9D9]/10 border-[#00D9D9]' 
                    : 'bg-white border-gray-100 group-hover:border-gray-200'
                }`}>
                  <span className="text-2xl">
                    {cat === 'Starters' ? '🥟' : cat === 'Main Course' ? '🍲' : cat === 'Chinese' ? '🍜' : cat === 'Biryani' ? '🍚' : cat === 'Desserts' ? '🍨' : '🍽️'}
                  </span>
                </div>
                <span className={`text-[11px] font-bold ${activeCategory === cat ? 'text-[#00D9D9]' : 'text-gray-600'}`}>{cat}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Menu Items Grid */}
        <section className="pb-10">
          <div className="flex flex-col gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100 relative overflow-hidden">
                {/* Veg / Non-Veg Indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`flex h-4 w-4 items-center justify-center rounded-sm border ${item.type === 'veg' ? 'border-green-600' : 'border-red-600'}`}>
                    <div className={`h-2 w-2 rounded-full ${item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                  </div>
                </div>

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <span className="text-4xl">
                    {item.category === 'Starters' ? '🥟' : item.category === 'Main Course' ? '🍲' : item.category === 'Chinese' ? '🍜' : item.category === 'Biryani' ? '🍚' : item.category === 'Desserts' ? '🍨' : '🍽️'}
                  </span>
                </div>
                
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 pr-6 leading-tight">{item.name}</h4>
                    <p className="text-lg font-bold text-gray-900 mt-1">₹{item.price}</p>
                    <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{item.desc}</p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    {cart.find(c => c.productId === item.id) ? (
                      <div className="flex items-center rounded-lg border border-[#00D9D9] bg-[#00D9D9]/5 h-8">
                        <button 
                          onClick={() => {
                            const cartItem = cart.find(c => c.productId === item.id);
                            if (cartItem) updateQuantity(cartItem.id, cartItem.quantity - 1);
                          }}
                          className="px-3 h-full text-[#00D9D9] font-bold outline-none"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-gray-900 w-4 text-center">
                          {cart.find(c => c.productId === item.id)?.quantity}
                        </span>
                        <button 
                          onClick={() => {
                            const cartItem = cart.find(c => c.productId === item.id);
                            if (cartItem) updateQuantity(cartItem.id, cartItem.quantity + 1);
                          }}
                          className="px-3 h-full text-[#00D9D9] font-bold outline-none"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart({
                          id: item.id + '-' + Date.now(),
                          productId: item.id,
                          name: item.name,
                          price: item.price,
                          quantity: 1
                        })}
                        className="rounded-lg bg-[#00D9D9]/10 px-6 py-1.5 text-xs font-bold text-[#00D9D9] border border-[#00D9D9]/30 hover:bg-[#00D9D9]/20 transition-colors"
                      >
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="text-4xl mb-3">🔍</span>
                <h4 className="text-sm font-bold text-gray-900">No items found</h4>
                <p className="text-xs text-gray-500 mt-1">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </section>
        </>
        )}

        {/* --- CART VIEW --- */}
        {activeTab === 'cart' && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
            
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">🛒</span>
                <h4 className="text-lg font-bold text-gray-900">Your cart is empty</h4>
                <p className="text-sm text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
                <button 
                  onClick={() => setActiveTab('menu')}
                  className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-bold text-white shadow-lg"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                      <div className="flex flex-col justify-between flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 leading-tight">{item.name}</h4>
                            <p className="text-sm font-bold text-gray-900 mt-1">₹{item.price * item.quantity}</p>
                          </div>
                          <div className="flex items-center rounded-lg border border-[#00D9D9] bg-[#00D9D9]/5 h-8">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 h-full text-[#00D9D9] font-bold outline-none">-</button>
                            <span className="text-xs font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 h-full text-[#00D9D9] font-bold outline-none">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm">Bill Summary</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{useCustomerStore.getState().getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                    <span>Taxes (5%)</span>
                    <span className="font-medium">₹{(useCustomerStore.getState().getCartTotal() * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Grand Total</span>
                    <span>₹{(useCustomerStore.getState().getCartTotal() * 1.05).toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert("Order Placed Successfully! (Backend Integration Pending)")}
                  className="mt-2 w-full rounded-2xl bg-button-gradient py-4 text-sm font-bold text-white shadow-[0_8px_30px_rgb(0,217,217,0.3)] transition-all hover:scale-[1.02]"
                >
                  Place Order
                </button>
              </>
            )}
          </div>
        )}

      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-gray-100 bg-white pb-safe">
        <button 
          onClick={() => setActiveTab('menu')}
          className={`flex flex-col items-center outline-none ${activeTab === 'menu' ? 'text-[#00D9D9]' : 'text-gray-400 hover:text-gray-900'}`}
        >
          <span className="text-xl">🏠</span>
          <span className="mt-1 text-[10px] font-bold">Menu</span>
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center outline-none ${activeTab === 'orders' ? 'text-[#00D9D9]' : 'text-gray-400 hover:text-gray-900'}`}
        >
          <span className="text-xl">🍽️</span>
          <span className="mt-1 text-[10px] font-bold">Orders</span>
        </button>
        <button 
          onClick={() => setActiveTab('cart')}
          className={`flex flex-col items-center outline-none ${activeTab === 'cart' ? 'text-[#00D9D9]' : 'text-gray-400 hover:text-gray-900'}`}
        >
          <span className="text-xl relative">
            🛒
            {getCartItemCount() > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {getCartItemCount()}
              </span>
            )}
          </span>
          <span className="mt-1 text-[10px] font-bold">Cart</span>
        </button>
        <button 
          onClick={() => setActiveTab('bill')}
          className={`flex flex-col items-center outline-none ${activeTab === 'bill' ? 'text-[#00D9D9]' : 'text-gray-400 hover:text-gray-900'}`}
        >
          <span className="text-xl">🧾</span>
          <span className="mt-1 text-[10px] font-bold">Bill</span>
        </button>
      </div>
    </div>
  );
}
