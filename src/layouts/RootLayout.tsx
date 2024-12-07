import { Link, Outlet } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

export const RootLayout = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-gray-800">
              SingleClic Store
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <div className="relative">
                <ShoppingCartIcon className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white min-w-[20px] text-center">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-8 flex-grow mt-16">
        <Outlet />
      </main>

      <footer className="bg-gray-50 border-t mt-auto">
        <div className="container py-8">
          <p className="text-center text-gray-600">
            {new Date().getFullYear()} SingleClic Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
