"use client";

import { useState, useEffect } from "react";
import { useMenuAdminStore, MenuItem } from "@/store/useMenuAdminStore";
import { MenuSquare, Search, Filter, Plus, Download, Upload, Eye, Edit3, MoreVertical, LayoutGrid, PackageOpen, AlertCircle, Ban, X, Image as ImageIcon, Flame, Leaf, Clock, Drumstick } from "lucide-react";

export default function MenuManagementDashboardPage() {
  const { items, getStats, searchQuery, setSearchQuery, isDrawerOpen, editingItem, openDrawer, closeDrawer } = useMenuAdminStore();
  const [mounted, setMounted] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'details' | 'variants' | 'addons'>('details');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const stats = getStats();

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: MenuItem['status']) => {
    switch (status) {
      case 'active': return <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">Active</span>;
      case 'out_of_stock': return <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">Out of Stock</span>;
      case 'inactive': return <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">Disabled</span>;
      default: return <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50/50">
      
      {/* Top Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-button-gradient text-white shadow-sm">
            <MenuSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Menu Management</h1>
            <p className="text-xs font-medium text-gray-500">Manage categories, variants, add-ons and pricing</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* KPI Row */}
        <div className="grid grid-cols-5 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Total Items</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.totalItems}</h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center"><PackageOpen className="h-5 w-5" /></div>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-green-700 uppercase">Available</p>
              <h3 className="text-2xl font-black text-green-800 mt-1">{stats.available}</h3>
            </div>
          </div>
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-orange-700 uppercase">Out of Stock</p>
              <h3 className="text-2xl font-black text-orange-800 mt-1">{stats.outOfStock}</h3>
            </div>
            <AlertCircle className="h-5 w-5 text-orange-400 opacity-50" />
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-red-700 uppercase">Disabled Items</p>
              <h3 className="text-2xl font-black text-red-800 mt-1">{stats.disabled}</h3>
            </div>
            <Ban className="h-5 w-5 text-red-400 opacity-50" />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Categories</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">12</h3>
            </div>
            <div className="h-10 w-10 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center"><LayoutGrid className="h-5 w-5" /></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex gap-6">
          
          {/* Left Panel: Item List */}
          <div className="flex-1 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-100 p-4 bg-gray-50/50">
              <h2 className="font-bold text-gray-900">All Menu Items</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50">
                  <Filter className="h-3 w-3" /> Filters
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50">
                  <Download className="h-3 w-3" /> Export
                </button>
                <button onClick={() => openDrawer()} className="flex items-center gap-2 rounded-lg bg-button-gradient px-4 py-1.5 text-xs font-bold text-white hover:opacity-90 shadow-sm">
                  <Plus className="h-4 w-4" /> Add Item
                </button>
              </div>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-white text-xs font-bold text-gray-400 uppercase border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Item</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Price</th>
                    <th className="px-4 py-4 text-center">Variants</th>
                    <th className="px-4 py-4 text-center">Add-ons</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.id}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-700">{item.category}</td>
                      <td className="px-4 py-4 font-bold text-gray-900">₹{item.price}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                          {item.variantsCount}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-50 text-xs font-bold text-purple-600">
                          {item.addonsCount}
                        </span>
                      </td>
                      <td className="px-4 py-4">{getStatusBadge(item.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#00D9D9]"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => openDrawer(item)} className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#00D9D9]"><Edit3 className="h-4 w-4" /></button>
                          <button className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900"><MoreVertical className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No menu items match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="border-t border-gray-100 p-4 flex items-center justify-between bg-white">
              <span className="text-xs font-medium text-gray-400">Showing 1 to {filteredItems.length} of {items.length} items</span>
              <div className="flex items-center gap-1">
                <button className="h-8 px-3 border border-gray-200 rounded-lg bg-white text-xs font-medium text-gray-400" disabled>Previous</button>
                <button className="h-8 w-8 border rounded-lg border-[#00D9D9] bg-[#00D9D9]/10 text-xs font-bold text-[#00D9D9]">1</button>
                <button className="h-8 px-3 border border-gray-200 rounded-lg bg-white text-xs font-medium text-gray-600 hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>

          {/* Right Panel: Quick Actions & Alerts */}
          <div className="w-80 flex-shrink-0 flex flex-col gap-6">
            
            <div className="rounded-2xl border border-[#00D9D9]/20 bg-gradient-to-b from-[#00D9D9]/5 to-transparent p-5">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <button className="w-full flex items-center justify-between rounded-xl bg-white p-3 border border-gray-200 shadow-sm hover:border-[#00D9D9] hover:text-[#00D9D9] transition-colors group">
                  <span className="text-sm font-bold text-gray-700 group-hover:text-[#00D9D9]">Add Menu Item</span>
                  <Plus className="h-4 w-4 text-gray-400 group-hover:text-[#00D9D9]" />
                </button>
                <button className="w-full flex items-center justify-between rounded-xl bg-white p-3 border border-gray-200 shadow-sm hover:border-[#00D9D9] hover:text-[#00D9D9] transition-colors group">
                  <span className="text-sm font-bold text-gray-700 group-hover:text-[#00D9D9]">Add Category</span>
                  <LayoutGrid className="h-4 w-4 text-gray-400 group-hover:text-[#00D9D9]" />
                </button>
                <button className="w-full flex items-center justify-between rounded-xl bg-white p-3 border border-gray-200 shadow-sm hover:border-[#00D9D9] hover:text-[#00D9D9] transition-colors group">
                  <span className="text-sm font-bold text-gray-700 group-hover:text-[#00D9D9]">Bulk Upload (CSV)</span>
                  <Upload className="h-4 w-4 text-gray-400 group-hover:text-[#00D9D9]" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Menu Alerts</h3>
                <span className="text-xs font-bold text-[#00D9D9] hover:underline cursor-pointer">View All</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3 rounded-lg bg-orange-50/50 p-3 border border-orange-100">
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-orange-800">1 Item Out of Stock</p>
                    <p className="text-[10px] text-orange-600 mt-0.5">Garlic Bread needs stock update.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 border border-gray-100">
                  <Eye className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-700">Customer Preview</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">See how the menu looks to diners.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Item Edit Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40 backdrop-blur-sm transition-opacity">
          <div className="w-[600px] h-full bg-white shadow-2xl flex flex-col transform transition-transform border-l border-gray-200">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{editingItem ? 'Edit Menu Item' : 'Add New Item'}</h2>
                <p className="text-sm text-gray-500 mt-1">Configure pricing, variants, and dietary tags.</p>
              </div>
              <button onClick={closeDrawer} className="rounded-full p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Tabs */}
            <div className="flex border-b border-gray-200 px-6">
              <button onClick={() => setDrawerTab('details')} className={`py-4 text-sm font-bold border-b-2 mr-6 transition-colors ${drawerTab === 'details' ? 'border-[#00D9D9] text-[#00D9D9]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Basic Details</button>
              <button onClick={() => setDrawerTab('variants')} className={`py-4 text-sm font-bold border-b-2 mr-6 transition-colors ${drawerTab === 'variants' ? 'border-[#00D9D9] text-[#00D9D9]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Variants (Sizes)</button>
              <button onClick={() => setDrawerTab('addons')} className={`py-4 text-sm font-bold border-b-2 transition-colors ${drawerTab === 'addons' ? 'border-[#00D9D9] text-[#00D9D9]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Add-ons</button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {drawerTab === 'details' && (
                <div className="space-y-6">
                  {/* Image Upload Mock */}
                  <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#00D9D9]/50 hover:bg-[#00D9D9]/5 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">Click to upload item image</p>
                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG (max 2MB)</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-xs font-bold text-gray-700 uppercase">Item Name</label>
                      <input type="text" defaultValue={editingItem?.name} className="mt-1.5 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9]" placeholder="e.g., Paneer Butter Masala" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase">Base Price (₹)</label>
                      <input type="number" defaultValue={editingItem?.price} className="mt-1.5 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9]" placeholder="0.00" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase">Category</label>
                      <select className="mt-1.5 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9]">
                        <option>Main Course</option>
                        <option>Starters</option>
                        <option>Beverages</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-bold text-gray-700 uppercase">Short Description</label>
                      <textarea rows={3} className="mt-1.5 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9]" placeholder="A brief description for the customer menu..."></textarea>
                    </div>
                  </div>

                  {/* Dietary Tags */}
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase block mb-3">Dietary & Kitchen Tags</label>
                    <div className="flex flex-wrap gap-2">
                      <label className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 cursor-pointer hover:bg-green-100 transition-colors">
                        <Leaf className="h-3 w-3" /> Veg
                      </label>
                      <label className="flex items-center gap-2 rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-700 cursor-pointer hover:bg-red-50 transition-colors">
                        <Drumstick className="h-3 w-3" /> Non-Veg
                      </label>
                      <label className="flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 cursor-pointer hover:bg-orange-50 transition-colors">
                        <Flame className="h-3 w-3 text-orange-500" /> Spicy
                      </label>
                      <label className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">
                        <Clock className="h-3 w-3" /> Quick Prep (15m)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === 'variants' && (
                <div className="text-center py-12">
                  <PackageOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900">No Variants Defined</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-6">Add size or crust options with custom pricing.</p>
                  <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
                    + Add Variant Group
                  </button>
                </div>
              )}

              {drawerTab === 'addons' && (
                <div className="text-center py-12">
                  <Plus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900">No Add-ons Defined</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-6">Add extra cheese, dips, or customizations.</p>
                  <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
                    + Add Customization Option
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
              <button onClick={closeDrawer} className="rounded-lg px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button className="rounded-lg bg-[#00D9D9] px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_15px_rgb(0,217,217,0.2)] hover:opacity-90 transition-opacity">
                Save Item
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
