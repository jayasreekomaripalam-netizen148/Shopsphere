
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  Package
} from "lucide-react";
import "./Checkout.css";

export default function Checkout() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shopsphere-cart") || "[]");
    } catch {
      return [];
    }
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [order, setOrder] = useState(null);

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const originalTotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.oldPrice || item.price) * item.quantity,
    0
  );

  const savings = originalTotal - subtotal;
  const deliveryCharge =
    subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const expressCharge = deliveryMethod === "express" ? 99 : 0;
  const total = subtotal + deliveryCharge + expressCharge;

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) return;

    const formData = new FormData(event.currentTarget);

    const orderDetails = {
      orderId: `SS${Date.now()}`,
      date: new Date().toISOString(),
      customer: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone")
      },
      address: {
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
        pincode: formData.get("pincode")
      },
      paymentMethod,
      deliveryMethod,
      items: cart,
      subtotal,
      savings,
      deliveryCharge: deliveryCharge + expressCharge,
      total,
      status: "Order Placed"
    };

    const previousOrders = JSON.parse(
      localStorage.getItem("shopsphere-orders") || "[]"
    );

    localStorage.setItem(
      "shopsphere-orders",
      JSON.stringify([orderDetails, ...previousOrders])
    );

    localStorage.removeItem("shopsphere-cart");

    setOrder(orderDetails);
    setCart([]);
  }

  if (order) {
    return (
      <main className="checkout-page">
        <section className="order-success">
          <div className="success-icon">
            <CheckCircle size={65} />
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with ShopSphere.
            Your order has been recorded successfully.
          </p>

          <div className="success-order-info">
            <span>Order ID</span>
            <strong>{order.orderId}</strong>

            <span>Order Total</span>
            <strong>{formatPrice(order.total)}</strong>

            <span>Payment Method</span>
            <strong>{order.paymentMethod.toUpperCase()}</strong>

            <span>Order Status</span>
            <strong className="order-status">{order.status}</strong>
          </div>

          <div className="success-actions">
            <Link to="/" className="checkout-primary-btn">
              Continue Shopping
            </Link>
            <Link to="/orders" className="checkout-secondary-btn">
              View Orders
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <Package size={55} />
          <h1>Your cart is empty</h1>
          <p>Add products to your cart before proceeding to checkout.</p>
          <Link to="/categories" className="checkout-primary-btn">
            Explore Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-heading">
          <h1>Checkout</h1>
          <p>Complete your details to place your order.</p>
        </div>

        <form onSubmit={placeOrder}>
          <div className="checkout-layout">

            <section className="checkout-form-section">

              <div className="checkout-card">
                <div className="checkout-card-heading">
                  <span className="checkout-step">1</span>
                  <div>
                    <h2>Contact Information</h2>
                    <p>Enter your contact details.</p>
                  </div>
                </div>

                <div className="checkout-input-grid">
                  <div className="checkout-field full-width">
                    <label htmlFor="customer-name">Full Name *</label>
                    <input
                      id="customer-name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      minLength={2}
                      maxLength={80}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="customer-email">Email Address *</label>
                    <input
                      id="customer-email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="customer-phone">Phone Number *</label>
                    <input
                      id="customer-phone"
                      name="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="checkout-card">
                <div className="checkout-card-heading">
                  <span className="checkout-step">2</span>
                  <div>
                    <h2>Shipping Address</h2>
                    <p>Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="checkout-input-grid">
                  <div className="checkout-field full-width">
                    <label htmlFor="address">House / Street Address *</label>
                    <textarea
                      id="address"
                      name="address"
                      placeholder="Enter house number, street and locality"
                      rows="3"
                      maxLength={250}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="city">City *</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="state">State *</label>
                    <select id="state" name="state" required defaultValue="">
                      <option value="" disabled>Select State</option>
                      <option>Andhra Pradesh</option>
                      <option>Telangana</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                      <option>Kerala</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Gujarat</option>
                      <option>West Bengal</option>
                      <option>Uttar Pradesh</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="checkout-field">
                    <label htmlFor="pincode">PIN Code *</label>
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      placeholder="6-digit PIN code"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="checkout-card">
                <div className="checkout-card-heading">
                  <span className="checkout-step">3</span>
                  <div>
                    <h2>Delivery Method</h2>
                    <p>Choose your preferred delivery option.</p>
                  </div>
                </div>

                <div className="delivery-options">
                  <label className={`delivery-option ${deliveryMethod === "standard" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "standard"}
                      onChange={() => setDeliveryMethod("standard")}
                    />
                    <Truck size={23} />
                    <span>
                      <strong>Standard Delivery</strong>
                      <small>Estimated 5–7 business days</small>
                    </span>
                    <strong>{deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}</strong>
                  </label>

                  <label className={`delivery-option ${deliveryMethod === "express" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "express"}
                      onChange={() => setDeliveryMethod("express")}
                    />
                    <Package size={23} />
                    <span>
                      <strong>Express Delivery</strong>
                      <small>Estimated 2–3 business days</small>
                    </span>
                    <strong>+₹99</strong>
                  </label>
                </div>
              </div>

              <div className="checkout-card">
                <div className="checkout-card-heading">
                  <span className="checkout-step">4</span>
                  <div>
                    <h2>Payment Method</h2>
                    <p>Select how you want to pay.</p>
                  </div>
                </div>

                <div className="payment-options">

                  <label className={`payment-option ${paymentMethod === "upi" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                    />
                    <span>
                      <strong>UPI Payment</strong>
                      <small>Google Pay, PhonePe, Paytm</small>
                    </span>
                  </label>

                  <label className={`payment-option ${paymentMethod === "card" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <CreditCard size={22} />
                    <span>
                      <strong>Credit / Debit Card</strong>
                      <small>Demo selection only</small>
                    </span>
                  </label>

                  <label className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span>
                      <strong>Cash on Delivery</strong>
                      <small>Pay when your order arrives</small>
                    </span>
                  </label>

                </div>

                <p className="payment-demo-note">
                  <ShieldCheck size={17} />
                  Demo checkout: online payment methods are not charged.
                </p>
              </div>

              <div className="checkout-form-actions">
                <Link to="/cart" className="checkout-back-link">
                  <ArrowLeft size={17} />
                  Back to Cart
                </Link>

                <button type="submit" className="place-order-btn">
                  Place Order
                  <ArrowRight size={18} />
                </button>
              </div>
            </section>

            <aside className="checkout-order-summary">
              <h2>Order Summary</h2>

              <div className="checkout-products">
                {cart.map((item) => (
                  <div className="checkout-product" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div>
                      <strong>{item.name}</strong>
                      <small>Quantity: {item.quantity}</small>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-price-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <div className="checkout-price-row">
                <span>Savings</span>
                <strong className="checkout-savings">
                  -{formatPrice(savings)}
                </strong>
              </div>

              <div className="checkout-price-row">
                <span>Delivery</span>
                <strong>
                  {deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
                </strong>
              </div>

              {expressCharge > 0 && (
                <div className="checkout-price-row">
                  <span>Express delivery</span>
                  <strong>{formatPrice(expressCharge)}</strong>
                </div>
              )}

              <div className="checkout-total-row">
                <span>Total Payable</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <p className="checkout-tax-note">
                Inclusive of applicable taxes.
              </p>

              <div className="checkout-security">
                <ShieldCheck size={20} />
                <span>Your checkout information is handled locally in this demo.</span>
              </div>
            </aside>

          </div>
        </form>
      </div>
    </main>
  );
}


