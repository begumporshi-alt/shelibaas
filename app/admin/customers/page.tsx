'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { formatDate, formatBDT } from '@/lib/format';
import type { Profile } from '@/lib/types';

type CustomerRow = Profile & {
  email: string;
  order_count: number;
  total_spent: number;
};

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      // Fetch profiles with emails via SECURITY DEFINER function
      const { data: profiles, error } = await supabase.rpc('get_admin_customers');

      if (error || !profiles) {
        setLoading(false);
        return;
      }

      // Fetch orders to compute stats
      const { data: orders } = await supabase.from('orders').select('user_id, total');

      const orderMap = new Map<string, { count: number; total: number }>();
      (orders || []).forEach((o: any) => {
        if (!o.user_id) return;
        const existing = orderMap.get(o.user_id) || { count: 0, total: 0 };
        existing.count += 1;
        existing.total += Number(o.total);
        orderMap.set(o.user_id, existing);
      });

      const enriched = (profiles as any[]).map((p) => ({
        id: p.id,
        full_name: p.full_name,
        phone: p.phone,
        avatar_url: p.avatar_url,
        role: p.role,
        created_at: p.created_at,
        email: p.email || '—',
        order_count: orderMap.get(p.id)?.count || 0,
        total_spent: orderMap.get(p.id)?.total || 0,
      }));

      setCustomers(enriched);
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1 className="font-serif text-3xl mb-2">Customers</h1>
      <p className="text-sm text-muted-foreground mb-6">{customers.length} registered customers</p>

      <div className="bg-white border border-border rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Email</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Phone</th>
              <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Joined</th>
              <th className="text-left px-4 py-3 font-medium">Orders</th>
              <th className="text-left px-4 py-3 font-medium">Spent</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</td></tr>
            ) : customers.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No customers yet</td></tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gold-500/10 text-gold-700 flex items-center justify-center text-sm font-medium shrink-0">
                        {(customer.full_name || customer.email || 'U')[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{customer.full_name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground capitalize">{customer.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{customer.email}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{customer.phone || '—'}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground whitespace-nowrap">{formatDate(customer.created_at)}</td>
                  <td className="px-4 py-3 font-medium">{customer.order_count}</td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{formatBDT(customer.total_spent)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
