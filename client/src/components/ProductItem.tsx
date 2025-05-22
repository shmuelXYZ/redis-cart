import axios from 'axios';
import { useState } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number };
}

const ProductItem = ({ product }: { product: Product }) => {
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/basket', { productId: product.id });
      alert(`${product.title} added to cart!`);
      console.log(product.id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='border p-4 rounded-lg shadow-md'>
      <img src={product.image} alt={product.title} className='w-full h-48 object-cover' />
      <h3 className='text-lg font-semibold mt-2'>{product.title}</h3>
      <p className='text-gray-600'>${product.price.toFixed(2)}</p>
      <p className='text-sm text-gray-500'>{product.description.substring(0, 100)}...</p>
      <button
        onClick={addToCart}
        disabled={loading}
        className='mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400'
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductItem;
