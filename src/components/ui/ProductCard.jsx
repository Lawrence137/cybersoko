import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">KSh {product.price.toLocaleString()}</p>
        <p className="text-sm text-gray-500">{product.condition}</p>
        <Link
          to={`/products/${product.id}`}
          className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;