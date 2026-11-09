
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart
} from "lucide-react";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("shopsphere-cart") || "[]"
    );
    setCart(savedCart);
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("shopsphere-cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, change) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
    saveCart(updated);
  };

  const removeItem = (id) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <ShoppingBag size={65} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/categories" className="continue-shopping">
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <Link to="/" className="back-home">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>

        <h1>Shopping Cart</h1>
        <p className="cart-subtitle">
          You have {cart.length} product(s) in your cart.
        </p>

        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  src={item.imageUrl || item.image || "https://placehold.co/150"}
                  alt={item.name}
                />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.category || "General"}</p>
                  <strong>{formatPrice(item.price)}</strong>

                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      <Minus size={15} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <strong>
                    {formatPrice(Number(item.price || 0) * item.quantity)}
                  </strong>
                  <button
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <div>
              <span>Delivery</span>
              <strong>Free</strong>
            </div>
            <div className="cart-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>

            <p className="cart-security">
              Secure checkout experience
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}


