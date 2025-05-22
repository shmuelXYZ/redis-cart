import { Outlet } from 'react-router-dom';
function AppLayout() {
  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-gray-800 text-white p-4'>
        <h1 className='text-xl'>My App</h1>
      </header>
      <main className='flex-grow p-4 overflow-auto'>
        {/* This is where the child routes will be rendered */}
        <Outlet />
      </main>
      <footer className='bg-gray-800 text-white p-4'>
        <p>&copy; 2025 My App</p>
      </footer>
    </div>
  );
}

export default AppLayout;
