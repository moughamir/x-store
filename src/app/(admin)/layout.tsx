import { ReactNode } from 'react';


export const metadata = {
  title: 'X-Store Admin',
  description: 'X-Store Admin Dashboard',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-grow">
        <AdminHeader />
        <main className="flex-grow p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
