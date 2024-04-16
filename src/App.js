// App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from './components/ProductList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
      <ToastContainer />
        <ProductList/>
      </div>
    </QueryClientProvider>
  );
};

export default App;
