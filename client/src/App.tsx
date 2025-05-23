// App.tsx - Updated with data router

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import BasketPage from './pages/BasketPage';
import axios from 'axios';

/// API action handlers
const basketActions = {
  // Loader for getting basket data
  loader: async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/basket');
      return response.data;
    } catch (error) {
      console.error('Error fetching basket:', error);
      return [];
    }
  },

  // Action for POST/PUT/DELETE operations
  action: async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const method = request.method;
    const url = new URL(request.url);

    try {
      let response;

      if (method === 'POST') {
        // Add item to basket
        const productId = formData.get('id');
        response = await axios.post('http://localhost:8080/api/basket', { id: Number(productId) });
      } else if (method === 'PUT') {
        // Update item quantity
        const productId = url.pathname.split('/').pop();
        const quantity = formData.get('quantity');
        response = await axios.put(`http://localhost:8080/api/basket/${productId}`, {
          id: Number(productId),
          quantity: Number(quantity),
        });
      } else if (method === 'DELETE') {
        // Delete item
        const productId = url.pathname.split('/').pop();
        response = await axios.delete(`http://localhost:8080/api/basket/${productId}`);
      }

      return response?.data || [];
    } catch (error) {
      console.error('Error with basket action:', error);
      throw error;
    }
  },
};

// Create the router with API routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to='home' />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'basket',
        element: <BasketPage />,
      },
    ],
  },
  // API routes for useFetcher
  {
    path: '/api/basket',
    loader: basketActions.loader,
    action: basketActions.action,
  },
  {
    path: '/api/basket/:id',
    action: basketActions.action,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
