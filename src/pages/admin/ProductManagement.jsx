import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "../../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  // Handle form submission for adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `products/${newProduct.image.name}`);
      await uploadBytes(imageRef, newProduct.image);
      const imageUrl = await getDownloadURL(imageRef);

      // Add product to Firestore
      await addDoc(collection(db, "products"), {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        stock: parseInt(newProduct.stock),
        imageUrl,
      });

      // Reset form
      setNewProduct({ name: "", price: "", category: "", stock: "", image: null });
      // Refresh products
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Handle delete
  const handleDelete = async (productId) => {
    await deleteDoc(doc(db, "products", productId));
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Products</h1>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-8 max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded flex items-center">
              <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover mr-4" />
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>Stock: {product.stock}</p>
              </div>
              <div className="ml-auto flex space-x-2">
                <Link
                  to={`/admin/products/edit/${product.id}`}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;