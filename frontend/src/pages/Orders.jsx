
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  ArrowLeft,
  MapPin,
  CreditCard,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("shopsphere-orders") || "[]"
      );
      setOrders(Array.isArray(savedOrders) ? savedOrders : []);
    } catch {
      setOrders([]);
    }
  }, []);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const toggleOrder = (orderId) => {
    setExpandedOrder((current) =>
      current === orderId ? null : orderId
    );
  };

  const reorder = (order) => {
    try {
      const existingCart = JSON.parse(
        localStorage.getItem("shopsphere-cart") || "[]"
      );

      const cart = Array.isArray(existingCart) ? existingCart : [];

      order.items?.forEach((item) => {
        const existingItem = cart.find(
          (cartItem) => String(cartItem.id) === String(item.id)
        );

        if (existingItem) {
          existingItem.quantity =
            Number(existingItem.quantity || 1) +
            Number(item.quantity || 1);
        } else {
          cart.push({
            ...item,
            quantity: Number(item.quantity || 1),
          });
        }
      });

      localStorage.setItem("shopsphere-cart", JSON.stringify(cart));
      window.location.href = "/cart";
    } catch {
      alert("Unable to reorder. Please try again.");
    }
  };

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="orders-empty">
          <div className="orders-empty-icon">
            <ShoppingBag size={46} />
          </div>

          <h2>No orders yet</h2>
          <p>
            You haven't placed any orders. Explore ShopSphere
            and discover products you'll love.
          </p>

          <Link to="/categories" className="orders-shop-btn">
            <ShoppingBag size={18} />
            Start Shopping
          </Link>

          <Link to="/" className="orders-back-link">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-heading">
          <div>
            <span className="orders-eyebrow">YOUR ACCOUNT</span>
            <h1>My Orders</h1>
            <p>Track and manage your ShopSphere purchases.</p>
          </div>

          <Link to="/categories" className="orders-continue-btn">
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>
        </div>

        <div className="orders-count">
          <Package size={19} />
          <span>
            {orders.length} {orders.length === 1 ? "Order" : "Orders"} found
          </span>
        </div>

        <div className="orders-list">
          {orders.map((order, index) => {
            const orderKey = order.orderId || `order-${index}`;
            const isExpanded = expandedOrder === orderKey;

            return (
              <article className="order-card" key={orderKey}>
                <div className="order-card-header">
                  <div className="order-header-info">
                    <div className="order-icon">
                      <Package size={21} />
                    </div>

                    <div>
                      <h3>Order #{order.orderId || "N/A"}</h3>
                      <span>
                        <CalendarDays size={14} />
                        {formatDate(order.date)}
                      </span>
                    </div>
                  </div>

                  <span className="order-status">
                    {order.status || "Order Placed"}
                  </span>
                </div>

                <div className="order-card-body">
                  <div className="order-products-preview">
                    {(order.items || []).slice(0, 3).map((item, itemIndex) => (
                      <div className="order-product" key={`${item.id}-${itemIndex}`}>
                        <img
                          src={item.image || item.imageUrl || ""}
                          alt={item.name || "Product"}
                          onError={(event) => {
                            event.currentTarget.style.visibility = "hidden";
                          }}
                        />

                        <div className="order-product-info">
                          <h4>{item.name || item.title || "Product"}</h4>
                          <span>
                            Qty: {item.quantity || 1}
                          </span>
                        </div>
                      </div>
                    ))}

                    {(order.items || []).length > 3 && (
                      <span className="order-more-items">
                        +{order.items.length - 3} more items
                      </span>
                    )}
                  </div>

                  <div className="order-total">
                    <span>Order Total</span>
                    <strong>
                      ₹{Number(order.total || 0).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                <div className="order-card-footer">
                  <button
                    type="button"
                    className="order-details-btn"
                    onClick={() => toggleOrder(orderKey)}
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                    {isExpanded ? (
                      <ChevronUp size={17} />
                    ) : (
                      <ChevronDown size={17} />
                    )}
                  </button>

                  <button
                    type="button"
                    className="order-reorder-btn"
                    onClick={() => reorder(order)}
                  >
                    <RefreshCw size={15} />
                    Order Again
                  </button>
                </div>

                {isExpanded && (
                  <div className="order-expanded-details">
                    <h4>Order Information</h4>

                    <div className="order-detail-grid">
                      <div>
                        <span>Customer</span>
                        <strong>{order.customer?.name || "N/A"}</strong>
                      </div>

                      <div>
                        <span>Email</span>
                        <strong>{order.customer?.email || "N/A"}</strong>
                      </div>

                      <div>
                        <span>Phone</span>
                        <strong>{order.customer?.phone || "N/A"}</strong>
                      </div>

                      <div>
                        <span>
                          <CreditCard size={14} /> Payment Method
                        </span>
                        <strong>
                          {(order.paymentMethod || "N/A").toUpperCase()}
                        </strong>
                      </div>
                    </div>

                    <div className="order-address">
                      <span>
                        <MapPin size={15} /> Delivery Address
                      </span>
                      <p>
                        {order.address?.address || "N/A"},{" "}
                        {order.address?.city || ""},{" "}
                        {order.address?.state || ""} -{" "}
                        {order.address?.pincode || ""}
                      </p>
                    </div>

                    <h4>Items in this Order</h4>

                    {(order.items || []).map((item, itemIndex) => (
                      <div
                        className="order-detail-item"
                        key={`${item.id}-${itemIndex}`}
                      >
                        <span>
                          {item.name || item.title || "Product"} ×{" "}
                          {item.quantity || 1}
                        </span>

                        <strong>
                          ₹
                          {(
                            Number(item.price || 0) *
                            Number(item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Orders;


