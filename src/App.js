// App.js
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from './components/ProductList';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ProductList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
