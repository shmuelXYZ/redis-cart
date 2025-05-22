import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../components/ProductItem';
import ProductItem from '../components/ProductItem';
import axios from 'axios';

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/basket/all-products');
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const data = response.data;
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='size-full p-6'>
        <div>Our Products</div>
        <div>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        <div className='flex justify-center mt-4'>
          <button
            onClick={() => navigate('/basket')}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Go to Basket
          </button>
        </div>
      </div>
    </div>
  );
}
