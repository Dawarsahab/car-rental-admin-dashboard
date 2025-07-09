import { useAuth } from '@/context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          {user && (
            <button 
              onClick={logout}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          )}
        </div>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}