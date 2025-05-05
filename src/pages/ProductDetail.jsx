import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Mock product data (replace with API call)
  const product = {
    id: id,
    name: 'MacBook Pro',
    price: 200000,
    condition: 'New',
    category: 'Laptop',
    description: 'A powerful laptop with M1 chip and 16GB RAM.',
    image: '/assets/macbook.jpg',
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-96 object-cover rounded" />
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-secondary mt-2">KSh {product.price.toLocaleString()}</p>
          <p className="text-gray-600 mt-2">Condition: {product.condition}</p>
          <p className="text-gray-600 mt-2">Category: {product.category}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-primary text-white py-2 px-6 rounded hover:bg-opacity-90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;