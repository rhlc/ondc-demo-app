import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserProducts from '@wasp/queries/getUserProducts';
import deleteProduct from '@wasp/actions/deleteProduct';

export function Dashboard() {
  const { data: products, isLoading, error } = useQuery(getUserProducts);
  const deleteProductFn = useAction(deleteProduct);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleDeleteProduct = (productId) => {
    deleteProductFn({ productId });
  };

  return (
    <div className='p-4'>
      {products.map((product) => (
        <div
          key={product.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{product.title}</div>
          <div>{product.price}</div>
          <div>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
            <Link
              to={`/product/${product.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
      <Link
        to='/new-product'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Add Product
      </Link>
    </div>
  );
}