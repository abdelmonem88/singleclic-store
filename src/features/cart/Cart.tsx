import { Link, useNavigate } from 'react-router-dom';

import { TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

export const Cart = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <Link to="/" className="inline-block mt-4 btn btn-primary">
          Continue Shopping
        </Link>
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

      <h1 className="mb-8 text-2xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 py-6 border-b last:border-b-0"
            >
              <div className="flex-shrink-0 w-24 h-24">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="flex-1">
                <Link
                  to={`/products/${item.id}`}
                  className="text-lg font-medium text-gray-900 hover:text-blue-600"
                >
                  {item.title}
                </Link>

                <div className="flex gap-4 items-center mt-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) {
                          dispatch({ type: 'REMOVE_ITEM', payload: item.id });
                        } else {
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: {
                              id: item.id,
                              quantity: item.quantity - 1,
                            },
                          });
                        }
                      }}
                      className="px-2 py-1 btn btn-secondary"
                    >
                      -
                    </button>
                    <span className="mx-4 min-w-[2rem] text-center text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: 'UPDATE_QUANTITY',
                          payload: {
                            id: item.id,
                            quantity: item.quantity + 1,
                          },
                        })
                      }
                      className="px-2 py-1 btn btn-secondary"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_ITEM', payload: item.id })
                    }
                    className="text-red-600 hover:text-red-700 bg-[#f9f9f9]"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-900">${state.total.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-900">Free</p>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center font-medium">
                  <p className="text-gray-900">Total</p>
                  <p className="text-gray-900">${state.total.toFixed(2)}</p>
                </div>
              </div>

              <button className="w-full btn btn-primary">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
