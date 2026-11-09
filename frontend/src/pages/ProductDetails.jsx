
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, ShoppingCart, Heart, Star, Truck,
  ShieldCheck, RotateCcw, Minus, Plus, Check
} from "lucide-react";
import "./ProductDetails.css";

const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 2499,
    oldPrice: 3999,
    rating: 4.5,
    reviews: 128,
    stock: "In Stock",
    description:
      "Experience immersive sound with premium wireless headphones. Designed for comfort, crystal-clear audio and long-lasting battery performance.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
    features: ["Bluetooth connectivity", "Up to 30 hours battery", "Noise isolation", "Comfortable ear cushions"]
  },
  {
    id: "2",
    name: "Smart Watch Series",
    category: "Electronics",
    price: 1999,
    oldPrice: 2999,
    rating: 4.3,
    reviews: 96,
    stock: "In Stock",
    description:
      "Track your daily activity, monitor your fitness and stay connected with this stylish smartwatch.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
    features: ["Activity tracking", "Smart notifications", "Fitness monitoring", "Modern design"]
  },
  {
    id: "3",
    name: "Classic Casual Sneakers",
    category: "Fashion",
    price: 1499,
    oldPrice: 2499,
    rating: 4.4,
    reviews: 84,
    stock: "In Stock",
    description:
      "Upgrade your everyday style with comfortable and versatile casual sneakers.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
    features: ["Lightweight design", "Durable sole", "Comfortable fit", "Everyday style"]
  }
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  if (!product) {
    return (
      <main className="product-not-found">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/">Return to Home</Link>
      </main>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("shopsphere-cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("shopsphere-cart", JSON.stringify(cart));
    setAdded(true);
  }

  function buyNow() {
    addToCart();
    window.location.href = "/cart";
  }

  return (
    <main className="product-page">
      <div className="product-container">
        <Link to="/categories" className="back-link">
          <ArrowLeft size={18} /> Back to Categories
        </Link>

        <div className="product-details-grid">
          <section className="product-image-section">
            <div className="main-product-image">
              <img src={product.image} alt={product.name} />
              <span className="discount-badge">{discount}% OFF</span>
              <button
                className={`wishlist-button ${wishlist ? "active" : ""}`}
                onClick={() => setWishlist(!wishlist)}
                aria-label="Toggle wishlist"
              >
                <Heart size={21} fill={wishlist ? "currentColor" : "none"} />
              </button>
            </div>
          </section>

          <section className="product-info">
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>

            <div className="product-rating">
              <span className="rating-stars">
                <Star size={17} fill="currentColor" />
                {product.rating}
              </span>
              <span>{product.reviews} customer reviews</span>
            </div>

            <div className="product-price">
              <strong>₹{product.price.toLocaleString("en-IN")}</strong>
              <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
              <span>{discount}% off</span>
            </div>

            <p className="tax-info">Inclusive of all taxes</p>

            <div className="stock-status">
              <Check size={17} /> {product.stock}
            </div>

            <p className="product-description">{product.description}</p>

            <h3>Key Features</h3>
            <ul className="feature-list">
              {product.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} /> {feature}
                </li>
              ))}
            </ul>

            <div className="quantity-section">
              <span>Quantity</span>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button className="add-cart-button" onClick={addToCart}>
                <ShoppingCart size={19} />
                {added ? "Added to Cart" : "Add to Cart"}
              </button>
              <button className="buy-now-button" onClick={buyNow}>
                Buy Now
              </button>
            </div>

            {added && (
              <p className="cart-success">
                <Check size={16} /> Product added to your shopping cart!
                {" "}
                <Link to="/cart">View Cart</Link>
              </p>
            )}

            <div className="service-benefits">
              <div>
                <Truck size={22} />
                <span>Fast Delivery</span>
              </div>
              <div>
                <ShieldCheck size={22} />
                <span>Secure Payment</span>
              </div>
              <div>
                <RotateCcw size={22} />
                <span>Easy Returns</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}


