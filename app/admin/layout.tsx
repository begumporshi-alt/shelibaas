import { AdminLayoutClient } from '@/components/admin/admin-layout';

export const metadata = {
  title: 'Admin — Shelibaas',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
