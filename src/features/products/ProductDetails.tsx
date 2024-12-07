import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(Number(id)),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-b-2 border-blue-600 animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 btn btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="flex gap-2 items-center mb-8 text-white hover:text-gray-200"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-96"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <div className="flex gap-2 items-center mt-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`h-5 w-5 ${
                    index < Math.round(product.rating.rate)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="mt-6 text-gray-600">{product.description}</p>

          <div className="mt-8">
            <p className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
              className="mt-4 w-full btn btn-primary"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
