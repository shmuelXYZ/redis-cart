import { useEffect, useState } from 'react';
import { useNavigate, useFetcher } from 'react-router-dom';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface BasketItem {
  id: number;
  quantity: number;
}

interface CartProduct extends Product {
  quantity: number;
}

export default function BasketPage() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Use fetcher to get basket data
  const basketFetcher = useFetcher<BasketItem[]>();

  useEffect(() => {
    // Fetch all products
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/basket/all-products');
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    basketFetcher.load('/api/basket');
  }, []);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Delete item
      basketFetcher.submit({}, { method: 'DELETE', action: `/api/basket/${id}` });
    } else {
      // Update quantity
      basketFetcher.submit({ id, quantity: newQuantity }, { method: 'PUT', action: `/api/basket/${id}` });
    }
  };

  // Combine basket items with product details
  const basketItems = basketFetcher.data || [];
  const cartProducts: CartProduct[] = basketItems
    .map((basketItem) => {
      const product = allProducts.find((p) => p.id === basketItem.id);
      return product ? { ...product, quantity: basketItem.quantity } : null;
    })
    .filter(Boolean) as CartProduct[];

  const totalPrice = cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className='p-6'>
      <button onClick={() => navigate(-1)} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4'>
        Go back
      </button>

      <h1 className='text-2xl font-bold mb-4'>Your Basket</h1>

      {basketFetcher.state === 'loading' && <div>Loading...</div>}

      {cartProducts.length === 0 ? (
        <p>Your basket is empty</p>
      ) : (
        <div>
          {cartProducts.map((item) => (
            <div key={item.id} className='border p-4 mb-4 rounded'>
              <div className='flex justify-between items-center'>
                <div>
                  <h3 className='font-semibold'>{item.title}</h3>
                  <p>${item.price}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className='bg-red-500 text-white px-2 py-1 rounded'
                  >
                    -
                  </button>
                  <span className='px-4'>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className='bg-green-500 text-white px-2 py-1 rounded'
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='text-right mt-2'>Subtotal: ${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}

          <div className='text-xl font-bold text-right mt-4'>Total: ${totalPrice.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
