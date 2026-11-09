
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  ShoppingBag
} from "lucide-react";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopsphere-cart") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shopsphere-cart", JSON.stringify(cart));
  }, [cart]);

  const increaseQuantity = (id) => {
    setCart((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((previous) => previous.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const originalTotal = cart.reduce(
    (total, item) =>
      total + Number(item.oldPrice || item.price) * item.quantity,
    0
  );

  const savings = originalTotal - subtotal;
  const deliveryCharge = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const grandTotal = subtotal + deliveryCharge;

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <div className="empty-cart-icon">
            <ShoppingCart size={55} />
          </div>

          <h1>Your cart is empty!</h1>
          <p>
            Looks like you haven't added anything to your shopping cart yet.
            Discover amazing products at ShopSphere.
          </p>

          <Link to="/categories" className="continue-shopping-btn">
            <ShoppingBag size={19} />
            Start Shopping
          </Link>

          <Link to="/" className="cart-home-link">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">

        <div className="cart-heading">
          <div>
            <h1>Shopping Cart</h1>
            <p>
              You have {cart.reduce((sum, item) => sum + item.quantity, 0)}
              {" "}items in your cart.
            </p>
          </div>

          <button className="clear-cart-btn" onClick={clearCart}>
            <Trash2 size={17} />
            Clear Cart
          </button>
        </div>

        <div className="cart-layout">

          <section className="cart-items-section">
            <div className="cart-section-header">
              <h2>Cart Items</h2>
              <span>{cart.length} Products</span>
            </div>

            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link to={`/product/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="cart-item-details">
                  <span className="cart-item-category">
                    {item.category || "Product"}
                  </span>

                  <Link
                    to={`/product/${item.id}`}
                    className="cart-item-name"
                  >
                    {item.name}
                  </Link>

                  <div className="cart-item-prices">
                    <strong>{formatPrice(item.price)}</strong>
                    {item.oldPrice > item.price && (
                      <del>{formatPrice(item.oldPrice)}</del>
                    )}
                  </div>

                  <div className="cart-item-bottom">
                    <div className="cart-quantity">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    <button
                      className="remove-item-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  {formatPrice(Number(item.price) * item.quantity)}
                </div>
              </article>
            ))}

            <Link to="/categories" className="back-to-shopping">
              <ArrowLeft size={17} />
              Continue Shopping
            </Link>
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <div className="summary-row">
              <span>Discount Savings</span>
              <strong className="savings-value">
                -{formatPrice(savings)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <strong>
                {deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
              </strong>
            </div>

            <div className="free-delivery-note">
              <Truck size={18} />
              {subtotal >= 999
                ? "Congratulations! You unlocked free delivery."
                : `Add ${formatPrice(999 - subtotal)} more for free delivery.`}
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total Amount</span>
              <strong>{formatPrice(grandTotal)}</strong>
            </div>

            <p className="tax-note">Inclusive of applicable taxes.</p>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
              <ArrowRight size={19} />
            </Link>

            <div className="secure-checkout">
              <ShieldCheck size={19} />
              Secure checkout experience
            </div>

            <div className="cart-offer">
              <Tag size={20} />
              <div>
                <strong>Special savings!</strong>
                <p>
                  You save {formatPrice(savings)} on this order.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}


