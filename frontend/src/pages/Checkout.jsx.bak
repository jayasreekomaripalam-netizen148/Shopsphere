
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  CheckCircle
} from "lucide-react";
import "./Checkout.css";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [placed, setPlaced] = useState(false);
  const [payment, setPayment] = useState("Cash on Delivery");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("shopsphere-cart") || "[]"));
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  const updateAddress = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value
    });
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (!cart.length) return;

    const order = {
      orderId: "SS" + Date.now(),
      items: cart,
      address,
      paymentMethod: payment,
      total: subtotal,
      orderDate: new Date().toISOString(),
      status: "Order Placed"
    };

    const previousOrders = JSON.parse(
      localStorage.getItem("shopsphere-orders") || "[]"
    );

    localStorage.setItem(
      "shopsphere-orders",
      JSON.stringify([order, ...previousOrders])
    );

    localStorage.removeItem("shopsphere-cart");
    setCart([]);
    setPlaced(true);
  };

  if (placed) {
    return (
      <main className="checkout-page">
        <div className="order-success">
          <CheckCircle size={68} />
          <h1>Order Placed Successfully!</h1>
          <p>Your ShopSphere order has been saved.</p>
          <Link to="/" className="checkout-primary-button">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <ShoppingBag size={55} />
          <h2>Your cart is empty</h2>
          <p>Add products before proceeding to checkout.</p>
          <Link to="/categories" className="checkout-primary-button">
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <Link to="/cart" className="checkout-back">
          ← Back to Cart
        </Link>

        <h1>Checkout</h1>
        <p className="checkout-subtitle">
          Complete your delivery and payment details.
        </p>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={placeOrder}>
            <section className="checkout-section">
              <h2><MapPin size={20} /> Delivery Address</h2>

              <div className="checkout-fields">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={address.name}
                  onChange={updateAddress}
                  required
                />

                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit phone number"
                  value={address.phone}
                  onChange={updateAddress}
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={address.email}
                  onChange={updateAddress}
                  required
                />

                <textarea
                  name="street"
                  placeholder="House number, street and area"
                  value={address.street}
                  onChange={updateAddress}
                  required
                />

                <input
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={updateAddress}
                  required
                />

                <input
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={updateAddress}
                  required
                />

                <input
                  name="pincode"
                  placeholder="PIN Code"
                  pattern="[0-9]{6}"
                  title="Enter a valid 6-digit PIN code"
                  value={address.pincode}
                  onChange={updateAddress}
                  required
                />
              </div>
            </section>

            <section className="checkout-section">
              <h2><CreditCard size={20} /> Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={payment === "Cash on Delivery"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <span>Cash on Delivery</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="UPI (Demo)"
                  checked={payment === "UPI (Demo)"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <span>UPI (Demo)</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="Card (Demo)"
                  checked={payment === "Card (Demo)"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <span>Credit / Debit Card (Demo)</span>
              </label>

              <p className="payment-note">
                Online payment methods are demo options only.
                No actual payment will be processed.
              </p>
            </section>

            <button type="submit" className="checkout-primary-button">
              Place Order · {formatPrice(subtotal)}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div className="checkout-product" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <strong>
                  {formatPrice(Number(item.price || 0) * item.quantity)}
                </strong>
              </div>
            ))}

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <div className="checkout-summary-row">
              <span>Delivery</span>
              <strong>Free</strong>
            </div>

            <div className="checkout-grand-total">
              <span>Total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <p className="checkout-trust">
              <ShieldCheck size={17} />
              Your order details are stored in this browser.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}


