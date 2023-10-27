import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProduct from '@wasp/queries/getProduct';
import updateProduct from '@wasp/actions/updateProduct';
import deleteProduct from '@wasp/actions/deleteProduct';

export function Product() {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useQuery(getProduct, { productId });
  const updateProductFn = useAction(updateProduct);
  const deleteProductFn = useAction(deleteProduct);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateProduct = (updatedProduct) => {
    updateProductFn({ ...product, ...updatedProduct });
  };

  const handleDeleteProduct = () => {
    deleteProductFn({ productId: product.id });
  };

  return (
    <div className='p-4'>
      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <div>{product.title}</div>
        <div>{product.description}</div>
        <div>{product.price}</div>
        <div>
          <button
            onClick={() => handleUpdateProduct({ title: 'Updated Title' })}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Update
          </button>
          <button
            onClick={handleDeleteProduct}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
          >
            Delete
          </button>
        </div>
      </div>
      <Link to={`/`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Go Back</Link>
    </div>
  );
}