import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createProduct from '@wasp/actions/createProduct';

export function NewProduct() {
  const createProductFn = useAction(createProduct);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleCreateProduct = () => {
    createProductFn({ title, description, price });
    setTitle('');
    setDescription('');
    setPrice(0);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>New Product</h1>
      <input
        type='text'
        placeholder='Title'
        className='px-1 py-2 border rounded mb-2'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Description'
        className='px-1 py-2 border rounded mb-2'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type='number'
        placeholder='Price'
        className='px-1 py-2 border rounded mb-2'
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <button
        onClick={handleCreateProduct}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Product
      </button>
      <Link to='/' className='text-blue-500 hover:underline'>Back to Dashboard</Link>
    </div>
  );
}