import { useEffect, useState } from "react";
import {
  Heart, ShoppingCart, Trash2, ArrowRight,
  ShoppingBag, HeartOff
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

const WISHLIST_KEY = "shopsphere-wishlist";
const CART_KEY = "shopsphere-cart";

const sampleProducts = [
  {
    id: "wish-1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 1499,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    rating: 4.5,
  },
  {
    id: "wish-2",
    name: "Classic Sports Sneakers",
    category: "Fashion",
    price: 1999,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    rating: 4.3,
  },
  {
    id: "wish-3",
    name: "Smart Watch",
    category: "Electronics",
    price: 2499,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    rating: 4.6,
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(WISHLIST_KEY));

      if (Array.isArray(saved)) {
        setWishlist(saved);
      } else {
        setWishlist(sampleProducts);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(sampleProducts));
      }
    } catch {
      setWishlist(sampleProducts);
    }
  }, []);

  const updateWishlist = (updated) => {
    setWishlist(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  };

  const removeProduct = (id) => {
    updateWishlist(wishlist.filter((product) => product.id !== id));
    setMessage("Product removed from wishlist.");
  };

  const addToCart = (product) => {
    try {
      const savedCart = JSON.parse(localStorage.getItem(CART_KEY));
      const cart = Array.isArray(savedCart) ? savedCart : [];

      const existing = cart.find(
        (item) => String(item.id) === String(product.id)
      );

      const updatedCart = existing
        ? cart.map((item) =>
            String(item.id) === String(product.id)
              ? { ...item, quantity: (Number(item.quantity) || 1) + 1 }
              : item
          )
        : [...cart, { ...product, quantity: 1 }];

      localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
      removeProduct(product.id);
      setMessage("Product moved to cart successfully!");
    } catch {
      setMessage("Could not update your cart. Please try again.");
    }
  };

  const clearWishlist = () => {
    updateWishlist([]);
    setMessage("Wishlist cleared.");
  };

  return (
    <main className="wishlist-page">
      <div className="wishlist-heading">
        <div>
          <span className="wishlist-eyebrow">YOUR COLLECTION</span>
          <h1>My Wishlist <Heart size={27} fill="currentColor" /></h1>
          <p>All the products you love, saved in one place.</p>
        </div>

        <div className="wishlist-count">
          <Heart size={22} />
          <strong>{wishlist.length}</strong>
          <span>Saved items</span>
        </div>
      </div>

      {message && (
        <div className="wishlist-message" role="status">
          {message}
          <button onClick={() => setMessage("")}>×</button>
        </div>
      )}

      {wishlist.length > 0 ? (
        <>
          <div className="wishlist-toolbar">
            <span>{wishlist.length} products saved</span>
            <button onClick={clearWishlist}>
              <Trash2 size={16} /> Clear Wishlist
            </button>
          </div>

          <div className="wishlist-grid">
            {wishlist.map((product) => (
              <article className="wishlist-product" key={product.id}>
                <div className="wishlist-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                  <button
                    className="wishlist-remove"
                    onClick={() => removeProduct(product.id)}
                    aria-label={`Remove ${product.name}`}
                  >
                    <Heart size={19} fill="currentColor" />
                  </button>
                </div>

                <div className="wishlist-product-info">
                  <span className="wishlist-category">{product.category}</span>
                  <h2>{product.name}</h2>

                  <div className="wishlist-rating">
                    ★ {product.rating || "4.5"} / 5
                  </div>

                  <div className="wishlist-price">
                    <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
                    {product.originalPrice && (
                      <del>
                        ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                      </del>
                    )}
                  </div>

                  <button
                    className="wishlist-cart-button"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={17} />
                    Move to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <HeartOff size={45} />
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Explore our store and save products you love.</p>
          <Link to="/" className="wishlist-shop-button">
            <ShoppingBag size={18} /> Explore Products
            <ArrowRight size={17} />
          </Link>
        </div>
      )}
    </main>
  );
}

