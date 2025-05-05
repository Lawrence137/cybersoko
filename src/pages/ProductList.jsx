import { useState } from 'react';
import ProductCard from '../components/ui/ProductCard';

const ProductList = () => {
  const [filters, setFilters] = useState({ condition: 'all', category: 'all' });

  const products = [
    // Mock data (replace with API call)
    { id: 1, name: 'MacBook Pro', price: 200000, category: 'Laptop', condition: 'New', image: '/assets/macbook.jpg' },
    { id: 2, name: 'USB-C Hub', price: 5000, category: 'Accessory', condition: 'New', image: '/assets/hub.jpg' },
  ];

  const filteredProducts = products.filter((product) => {
    return (
      (filters.condition === 'all' || product.condition === filters.condition) &&
      (filters.category === 'all' || product.category === filters.category)
    );
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div>
            <label className="block mb-2">Condition</label>
            <select
              value={filters.condition}
              onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="Laptop">Laptops</option>
              <option value="Desktop">Desktops</option>
              <option value="Accessory">Accessories</option>
            </select>
          </div>
        </aside>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;