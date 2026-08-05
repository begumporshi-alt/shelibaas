'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package, Heart, MapPin, User, LogOut, Settings,
  ShoppingBag, LayoutDashboard, Phone, Mail, Shield,
  Plus, Trash2, Loader2, ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { formatBDT, formatDate } from '@/lib/format';
import type { Order, Address, Profile } from '@/lib/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
};

export default function AccountPage() {
  const router = useRouter();
  const { user, profile, isAdmin, signOut, setProfileData } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [editingName, setEditingName] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [savingField, setSavingField] = useState<string | null>(null);
  const [addingAddress, setAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: 'Home', full_name: '', phone: '', address_line1: '', city: '', district: '', postcode: '' });
  const [addrSaving, setAddrSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace('/signin');
      return;
    }

    const fetchData = async () => {
      const [{ data: ordersData }, { data: addrData }] = await Promise.all([
        supabase
          .from('orders')
          .select('*, order_items(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase.from('addresses').select('*').eq('user_id', user.id).order('created_at'),
      ]);
      setOrders((ordersData as Order[]) || []);
      setAddresses((addrData as Address[]) || []);
    };
    fetchData();
  }, [user, router]);

  useEffect(() => {
    setFullName(profile?.full_name || '');
    setPhone(profile?.phone || '');
  }, [profile]);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const saveField = async (field: 'full_name' | 'phone', value: string) => {
    setSavingField(field);

    // Use SECURITY DEFINER function — it returns the updated row directly,
    // so we can update the UI immediately without a separate (cached) fetch.
    const { data, error } = await supabase.rpc('upsert_my_profile', {
      p_full_name: field === 'full_name' ? value : (profile?.full_name || null),
      p_phone: field === 'phone' ? value : (profile?.phone || null),
    });

    setSavingField(null);
    if (error || !data) {
      toast.error('Could not update profile. Please try signing out and back in.');
      return;
    }

    // Update the auth context profile directly from the returned data
    setProfileData(data as Profile);
    toast.success('Profile updated');
    if (field === 'full_name') setEditingName(false);
    else setEditingPhone(false);
  };

  const addAddress = async () => {
    if (!newAddr.full_name || !newAddr.phone || !newAddr.address_line1 || !newAddr.city) {
      toast.error('Please fill all required fields');
      return;
    }
    setAddrSaving(true);
    const { data, error } = await supabase
      .from('addresses')
      .insert({ ...newAddr, user_id: user.id })
      .select()
      .single();
    setAddrSaving(false);
    if (error) {
      toast.error('Could not save address');
      return;
    }
    setAddresses([...addresses, data as Address]);
    setNewAddr({ label: 'Home', full_name: '', phone: '', address_line1: '', city: '', district: '', postcode: '' });
    setAddingAddress(false);
    toast.success('Address saved');
  };

  const deleteAddress = async (id: string) => {
    const { error } = await supabase.from('addresses').delete().eq('id', id);
    if (error) {
      toast.error('Could not delete address');
      return;
    }
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.success('Address removed');
  };

  const tabs = [
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const initials = (profile?.full_name || user.email || 'U')[0].toUpperCase();

  return (
    <div className="container-luxury py-28 md:py-32">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl mb-2">My Account</h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <Mail size={15} className="text-muted-foreground" />
          {user.email}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Profile card */}
          <div className="bg-muted/30 rounded-xl p-5 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-serif text-xl shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{profile?.full_name || 'Member'}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-medium capitalize',
                    isAdmin ? 'bg-gold-500/15 text-gold-700' : 'bg-muted text-muted-foreground'
                  )}>
                    {isAdmin ? (
                      <span className="flex items-center gap-1">
                        <Shield size={10} /> Admin
                      </span>
                    ) : 'Customer'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Admin link */}
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-gold-500/10 text-gold-700 hover:bg-gold-500/20 transition-colors mb-4 border border-gold-500/20"
            >
              <LayoutDashboard size={18} />
              Admin Dashboard
              <ChevronRight size={16} className="ml-auto" />
            </Link>
          )}

          {/* Nav */}
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'bg-ink-900 text-white'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => router.push('/wishlist')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Heart size={18} />
              Wishlist
            </button>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h2 className="font-serif text-2xl mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-16 border border-border rounded-xl bg-muted/20">
                    <Package size={40} className="mx-auto text-muted-foreground mb-4" />
                    <p className="font-medium mb-2">No orders yet</p>
                    <p className="text-sm text-muted-foreground mb-6">When you place orders, they will appear here.</p>
                    <Link
                      href="/shop"
                      className="inline-block px-6 py-3 bg-ink-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-gold-500 transition-colors rounded-lg"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-border rounded-xl p-5 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                          <div>
                            <p className="font-medium text-sm">{order.order_number}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(order.created_at)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={cn('px-3 py-1 rounded-full text-xs font-medium capitalize', statusColors[order.status] || 'bg-muted text-muted-foreground')}>
                              {order.status}
                            </span>
                            <span className="font-serif text-lg">{formatBDT(order.total)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                          {order.order_items?.map((item) => (
                            <img
                              key={item.id}
                              src={item.product_image || ''}
                              alt={item.product_name}
                              className="w-12 h-14 object-cover rounded shrink-0"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div key="addresses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl">Saved Addresses</h2>
                  <button
                    onClick={() => setAddingAddress(!addingAddress)}
                    className="flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:underline"
                  >
                    <Plus size={16} /> Add New
                  </button>
                </div>

                {addingAddress && (
                  <div className="border border-border rounded-xl p-5 mb-4 bg-muted/20">
                    <h3 className="font-medium text-sm mb-4">New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">Label</label>
                        <select
                          value={newAddr.label}
                          onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-gold-500"
                        >
                          <option>Home</option>
                          <option>Work</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={newAddr.full_name}
                          onChange={(e) => setNewAddr({ ...newAddr, full_name: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Phone *</label>
                        <input
                          type="tel"
                          value={newAddr.phone}
                          onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Postcode</label>
                        <input
                          type="text"
                          value={newAddr.postcode}
                          onChange={(e) => setNewAddr({ ...newAddr, postcode: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium mb-1">Address *</label>
                        <input
                          type="text"
                          value={newAddr.address_line1}
                          onChange={(e) => setNewAddr({ ...newAddr, address_line1: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">City *</label>
                        <input
                          type="text"
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">District *</label>
                        <input
                          type="text"
                          value={newAddr.district}
                          onChange={(e) => setNewAddr({ ...newAddr, district: e.target.value })}
                          className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={addAddress}
                        disabled={addrSaving}
                        className="px-5 py-2.5 bg-ink-900 text-white text-sm font-medium rounded-lg hover:bg-gold-500 transition-colors disabled:opacity-50"
                      >
                        {addrSaving ? 'Saving...' : 'Save Address'}
                      </button>
                      <button
                        onClick={() => setAddingAddress(false)}
                        className="px-5 py-2.5 border border-border text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {addresses.length === 0 && !addingAddress ? (
                  <div className="text-center py-16 border border-border rounded-xl bg-muted/20">
                    <MapPin size={40} className="mx-auto text-muted-foreground mb-4" />
                    <p className="font-medium mb-2">No saved addresses</p>
                    <p className="text-sm text-muted-foreground mb-6">Add an address for faster checkout.</p>
                    <button
                      onClick={() => setAddingAddress(true)}
                      className="inline-flex items-center gap-1.5 px-6 py-3 bg-ink-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-gold-500 transition-colors rounded-lg"
                    >
                      <Plus size={16} /> Add Address
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="border border-border rounded-xl p-5 relative group">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-0.5 bg-muted text-xs rounded font-medium">{addr.label}</span>
                          {addr.is_default && (
                            <span className="px-2 py-0.5 bg-gold-500/10 text-gold-700 text-xs rounded font-medium">Default</span>
                          )}
                        </div>
                        <p className="font-medium text-sm">{addr.full_name}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{addr.phone}</p>
                        <p className="text-sm text-muted-foreground">{addr.address_line1}</p>
                        <p className="text-sm text-muted-foreground">{addr.city}, {addr.district}{addr.postcode ? ` ${addr.postcode}` : ''}</p>
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all p-1.5 rounded-lg hover:bg-destructive/5"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h2 className="font-serif text-2xl mb-6">Account Settings</h2>

                {/* Profile section */}
                <div className="border border-border rounded-xl p-6 mb-4 max-w-lg">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-serif text-lg">
                      {initials}
                    </div>
                    <div>
                      <p className="font-medium">{profile?.full_name || 'Member'}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  {/* Full name */}
                  <div className="space-y-4">
                    <div className="border-t border-border pt-4">
                      <label className="block text-sm font-medium mb-1.5">Full Name</label>
                      {editingName ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500 bg-background"
                          />
                          <button
                            onClick={() => saveField('full_name', fullName)}
                            disabled={savingField === 'full_name'}
                            className="px-4 py-2.5 bg-ink-900 text-white text-sm rounded-lg hover:bg-gold-500 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {savingField === 'full_name' ? <Loader2 size={15} className="animate-spin" /> : null}
                            Save
                          </button>
                          <button
                            onClick={() => { setEditingName(false); setFullName(profile?.full_name || ''); }}
                            className="px-4 py-2.5 border border-border text-sm rounded-lg hover:bg-muted transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-sm">{profile?.full_name || 'Not set'}</p>
                          <button onClick={() => setEditingName(true)} className="text-sm text-gold-600 hover:underline font-medium">
                            Edit
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="border-t border-border pt-4">
                      <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                      {editingPhone ? (
                        <div className="flex gap-2">
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+880 1XXX XXXXXX"
                            className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500 bg-background"
                          />
                          <button
                            onClick={() => saveField('phone', phone)}
                            disabled={savingField === 'phone'}
                            className="px-4 py-2.5 bg-ink-900 text-white text-sm rounded-lg hover:bg-gold-500 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {savingField === 'phone' ? <Loader2 size={15} className="animate-spin" /> : null}
                            Save
                          </button>
                          <button
                            onClick={() => { setEditingPhone(false); setPhone(profile?.phone || ''); }}
                            className="px-4 py-2.5 border border-border text-sm rounded-lg hover:bg-muted transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-sm flex items-center gap-2">
                            <Phone size={14} className="text-muted-foreground" />
                            {profile?.phone || 'Not set'}
                          </p>
                          <button onClick={() => setEditingPhone(true)} className="text-sm text-gold-600 hover:underline font-medium">
                            Edit
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Email (read-only) */}
                    <div className="border-t border-border pt-4">
                      <label className="block text-sm font-medium mb-1.5">Email</label>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail size={14} />
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">Email cannot be changed</p>
                    </div>

                    {/* Role */}
                    <div className="border-t border-border pt-4">
                      <label className="block text-sm font-medium mb-1.5">Role</label>
                      <p className="text-sm flex items-center gap-2 capitalize">
                        <Shield size={14} className={isAdmin ? 'text-gold-600' : 'text-muted-foreground'} />
                        {profile?.role || 'customer'}
                      </p>
                    </div>

                    {/* Member since */}
                    <div className="border-t border-border pt-4">
                      <label className="block text-sm font-medium mb-1.5">Member Since</label>
                      <p className="text-sm text-muted-foreground">{formatDate(profile?.created_at || new Date().toISOString())}</p>
                    </div>
                  </div>
                </div>

                {/* Danger zone */}
                <div className="border border-destructive/20 rounded-xl p-6 max-w-lg bg-destructive/5">
                  <h3 className="font-medium text-sm mb-1">Sign Out</h3>
                  <p className="text-xs text-muted-foreground mb-3">End your session on this device.</p>
                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-destructive/30 text-destructive text-sm font-medium rounded-lg hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
