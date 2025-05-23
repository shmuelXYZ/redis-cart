import ProductItem from '../components/ProductItem';

import { useEffect, useState } from 'react';
import { useNavigate, useFetcher } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  // add other product properties as needed
}

interface BasketItem {
  id: number;
  quantity: number;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  // Use fetcher to get basket data
  const basketFetcher = useFetcher<BasketItem[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/basket/all-products');
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        setProducts(response.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchData();

    // Fetch basket data
    basketFetcher.load('/api/basket'); // This should match your basket endpoint
  }, []);

  const handleAddToCart = (product: Product) => {
    basketFetcher.submit(
      { id: product.id }, // Only send ID, not entire product
      { method: 'POST', action: '/api/basket' },
    );
  };

  // Get basket data (default to empty array if still loading)
  const basketItems = basketFetcher.data || [];

  // Create a map for quick lookup of quantities
  const basketMap = basketItems.reduce(
    (acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    },
    {} as Record<number, number>,
  );

  return (
    <div>
      <div className='size-full p-6'>
        <div>Our Products</div>
        <div>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              quantity={basketMap[product.id] || 0}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
        <div className='flex justify-center mt-4'>
          <button
            onClick={() => navigate('/basket')}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Go to Basket ({basketItems.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      </div>
    </div>
  );
}
