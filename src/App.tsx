
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootLayout } from './layouts/RootLayout';
import { CartProvider } from './context/CartContext';
import { ProductList } from './features/products/ProductList';
import { ProductDetails } from './features/products/ProductDetails';
import { Cart } from './features/cart/Cart';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<ProductList />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
