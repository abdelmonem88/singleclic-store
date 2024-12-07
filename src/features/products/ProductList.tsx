import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../../services/api';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { dispatch } = useCart();

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-b-2 border-blue-600 animate-spin"></div>
      </div>
    );
  }

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products?.filter(product => product.category === selectedCategory);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Our Products</h1>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts?.map((product) => (
          <div
            key={product.id}
            className="flex overflow-hidden flex-col bg-white rounded-lg shadow-sm transition-shadow hover:shadow-md"
          >
            <Link to={`/products/${product.id}`} className="block p-4">
              <div className="relative w-full aspect-square">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain absolute inset-0 w-full h-full"
                />
              </div>
            </Link>
            <div className="flex flex-col flex-1 p-4">
              <Link
                to={`/products/${product.id}`}
                className="text-lg font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                title={product.title}
              >
                {product.title}
              </Link>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center pt-4 mt-auto border-t">
                <span className="text-lg font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
                  className="btn btn-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
