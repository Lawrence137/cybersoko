import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-4">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>KSh {item.price.toLocaleString()}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 p-1 border rounded"
                  min="1"
                />
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-bold">Total: KSh {total.toLocaleString()}</p>
            <button className="mt-4 bg-primary text-white py-2 px-6 rounded hover:bg-opacity-90">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;