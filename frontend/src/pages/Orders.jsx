
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  PackageCheck,
  ArrowLeft,
} from "lucide-react";
import "./Orders.css";

const getOrders = () => {
  try {
    const saved = JSON.parse(
      localStorage.getItem("shopsphere-orders") || "[]"
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const trackingSteps = [
  { label: "Order Placed", icon: ShoppingBag },
  { label: "Confirmed", icon: CheckCircle },
  { label: "Shipped", icon: Package },
  { label: "Out for Delivery", icon: Truck },
  { label: "Delivered", icon: PackageCheck },
];

const statusIndex = (status = "Order Placed") => {
  const index = trackingSteps.findIndex(
    (step) => step.label.toLowerCase() === status.toLowerCase()
  );
  return index === -1 ? 0 : index;
};

function formatDate(date) {
  if (!date) return "Date unavailable";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? "Date unavailable"
    : parsed.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

function Orders() {
  const [orders] = useState(getOrders);
  const [expanded, setExpanded] = useState(
    orders.length > 0 ? orders[0].orderId : null
  );

  const sortedOrders = useMemo(() => orders, [orders]);

  const toggleOrder = (id) => {
    setExpanded((current) => (current === id ? null : id));
  };

  if (sortedOrders.length === 0) {
    return (
      <div className="orders-page">
        <div className="orders-empty">
          <div className="orders-empty-icon">
            <Package size={48} />
          </div>
          <h2>No orders yet!</h2>
          <p>
            You haven't placed any orders. Explore our products and
            find something you'll love.
          </p>
          <Link to="/categories" className="orders-primary-btn">
            Start Shopping
          </Link>
          <Link to="/" className="orders-back-link">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-container">
        <div className="orders-heading">
          <div>
            <span className="orders-eyebrow">SHOPSPHERE ACCOUNT</span>
            <h1>My Orders</h1>
            <p>View your purchases and track your deliveries.</p>
          </div>
          <Link to="/categories" className="orders-shop-btn">
            <ShoppingBag size={17} /> Continue Shopping
          </Link>
        </div>

        <div className="orders-summary">
          <div>
            <span>Total Orders</span>
            <strong>{sortedOrders.length}</strong>
          </div>
          <div>
            <span>Total Items</span>
            <strong>
              {sortedOrders.reduce(
                (sum, order) =>
                  sum +
                  (order.items || []).reduce(
                    (itemSum, item) =>
                      itemSum + Number(item.quantity || 1),
                    0
                  ),
                0
              )}
            </strong>
          </div>
          <div>
            <span>Recent Order</span>
            <strong>{formatDate(sortedOrders[0].date).split(",")[0]}</strong>
          </div>
        </div>

        <h2 className="orders-section-title">Your Purchase History</h2>

        <div className="orders-list">
          {sortedOrders.map((order) => {
            const isOpen = expanded === order.orderId;
            const currentStep = statusIndex(order.status);

            return (
              <article className="order-card" key={order.orderId}>
                <div className="order-card-header">
                  <div className="order-id-block">
                    <span>ORDER ID</span>
                    <strong>{order.orderId}</strong>
                    <small>{formatDate(order.date)}</small>
                  </div>

                  <div className="order-status-block">
                    <span className="order-status">
                      <CheckCircle size={14} />
                      {order.status || "Order Placed"}
                    </span>
                    <strong>
                      ₹{Number(order.total || 0).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <button
                    className="order-expand-btn"
                    onClick={() => toggleOrder(order.orderId)}
                    aria-label="Toggle order details"
                  >
                    {isOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>

                <div className="order-product-preview">
                  {(order.items || []).slice(0, 3).map((item, index) => (
                    <div
                      className="order-preview-item"
                      key={item.id || item._id || index}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name || "Product"} />
                      ) : (
                        <div className="order-no-image">
                          <Package size={22} />
                        </div>
                      )}
                      <div>
                        <strong>{item.name || item.title || "Product"}</strong>
                        <span>Qty: {item.quantity || 1}</span>
                      </div>
                    </div>
                  ))}
                  {(order.items || []).length > 3 && (
                    <span className="order-more">
                      +{order.items.length - 3} more
                    </span>
                  )}
                </div>

                {isOpen && (
                  <div className="order-details">
                    <div className="order-tracking">
                      <h3>Order Tracking</h3>
                      <div className="tracking-timeline">
                        {trackingSteps.map((step, index) => {
                          const StepIcon = step.icon;
                          const completed = index <= currentStep;

                          return (
                            <div
                              className={`tracking-step ${
                                completed ? "completed" : ""
                              }`}
                              key={step.label}
                            >
                              <div className="tracking-icon">
                                <StepIcon size={18} />
                              </div>
                              <span>{step.label}</span>
                              {index < trackingSteps.length - 1 && (
                                <div className="tracking-line" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p className="tracking-note">
                        <Clock size={15} />
                        Latest status: {order.status || "Order Placed"}
                      </p>
                    </div>

                    <div className="order-detail-grid">
                      <div className="order-detail-box">
                        <h3>
                          <MapPin size={17} /> Delivery Address
                        </h3>
                        <p>
                          {order.customer?.name || "Customer"}
                          <br />
                          {order.address?.address || "Address unavailable"}
                          <br />
                          {[
                            order.address?.city,
                            order.address?.state,
                            order.address?.pincode,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                          {order.customer?.phone && (
                            <>
                              <br />Phone: {order.customer.phone}
                            </>
                          )}
                        </p>
                      </div>

                      <div className="order-detail-box">
                        <h3>
                          <CreditCard size={17} /> Payment Information
                        </h3>
                        <p>
                          Payment Method: {order.paymentMethod || "Not specified"}
                          <br />
                          Delivery: {order.deliveryMethod || "Standard"}
                          <br />
                          Subtotal: ₹
                          {Number(order.subtotal || 0).toLocaleString("en-IN")}
                          <br />
                          Delivery: ₹
                          {Number(order.deliveryCharge || 0).toLocaleString("en-IN")}
                          <br />
                          <strong>
                            Total: ₹
                            {Number(order.total || 0).toLocaleString("en-IN")}
                          </strong>
                        </p>
                      </div>
                    </div>

                    <div className="order-full-items">
                      <h3>All Ordered Products</h3>
                      {(order.items || []).map((item, index) => (
                        <div
                          className="order-full-item"
                          key={item.id || item._id || index}
                        >
                          <div>
                            <strong>{item.name || item.title || "Product"}</strong>
                            <span>Quantity: {item.quantity || 1}</span>
                          </div>
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
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Orders;


