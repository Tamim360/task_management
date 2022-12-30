import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {
  
  return (
    <div className="dark:bg-dark-bg min-h-screen">
      <div className='container mx-auto dark:text-white'>
      <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
     
      </RouterProvider>
      </QueryClientProvider>
      <Toaster/>
    </div>
    </div>
  );
}

export default App;
