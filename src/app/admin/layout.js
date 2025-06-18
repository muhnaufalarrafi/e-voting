export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md">
        <div className="p-6 font-bold text-lg text-blue-700">
          Admin Panel
        </div>
        <nav className="flex flex-col gap-2 p-4 text-sm">
          <a href="/admin/dashboard" className="text-gray-700 hover:text-blue-600">🧑‍💼 Manajemen Paslon</a>
          <a href="/admin/monitoring" className="text-gray-700 hover:text-blue-600">📊 Monitor Voting</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
