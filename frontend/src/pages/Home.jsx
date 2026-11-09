
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Search, UserRound, Heart, ShoppingCart, Menu,
  Truck, ShieldCheck, RefreshCw, Headset,
  ChevronRight, Star, Package, X, Plus, Minus,
  Zap, ArrowRight, Trash2, CheckCircle2
} from "lucide-react";

const categories = [
  { name: "Electronics", icon: "📱" },
  { name: "Fashion", icon: "👕" },
  { name: "Home & Living", icon: "🛋️" },
  { name: "Beauty", icon: "💄" },
  { name: "Sports", icon: "👟" },
  { name: "Toys & Games", icon: "🧸" },
  { name: "Automotive", icon: "🚗" },
  { name: "Books", icon: "📚" },
  { name: "Health & Wellness", icon: "💊" },
  { name: "Stationery", icon: "✏️" }
];

const demoProducts = [
  {
    id: 1, name: "Premium Wireless Earbuds",
    category: "Electronics", price: 2999, oldPrice: 4999,
    discount: 40, rating: 4.5, reviews: 128,
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600"
  },
  {
    id: 2, name: "Classic Smart Watch",
    category: "Electronics", price: 3499, oldPrice: 5999,
    discount: 42, rating: 4.4, reviews: 96,
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
  },
  {
    id: 3, name: "Travel Backpack",
    category: "Fashion", price: 1999, oldPrice: 2999,
    discount: 33, rating: 4.3, reviews: 74,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
  },
  {
    id: 4, name: "Running Sports Shoes",
    category: "Sports", price: 2499, oldPrice: 3999,
    discount: 38, rating: 4.6, reviews: 210,
    stock: 9,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
  },
  {
    id: 5, name: "Digital Photography Camera",
    category: "Electronics", price: 12999, oldPrice: 15999,
    discount: 19, rating: 4.7, reviews: 52,
    stock: 6,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600"
  },
  {
    id: 6, name: "Modern Living Room Sofa",
    category: "Home & Living", price: 18999, oldPrice: 24999,
    discount: 24, rating: 4.5, reviews: 31,
    stock: 4,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"
  },
  {
    id: 7, name: "Beauty Essentials Kit",
    category: "Beauty", price: 899, oldPrice: 1299,
    discount: 31, rating: 4.2, reviews: 88,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
  },
  {
    id: 8, name: "Classic Reading Books",
    category: "Books", price: 599, oldPrice: 899,
    discount: 33, rating: 4.4, reviews: 63,
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600"
  }
];

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

async function fetchProducts() {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error("Product API unavailable");
  }

  const result = await response.json();

  if (!Array.isArray(result)) {
    throw new Error("Invalid product response");
  }

  return result;
}

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get("category") || "All");
  const [cart, setCart] = useState(() => readStorage("shopsphere-cart", []));
  const [wishlist, setWishlist] = useState(() => readStorage("shopsphere-wishlist", []));
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 30000,
    retry: 1
  });

  useEffect(() => {
    localStorage.setItem("shopsphere-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shopsphere-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const products = Array.isArray(data) && data.length
    ? data
    : demoProducts;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity, 0
  );

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function addToCart(product) {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    showNotice(`${product.name} added to cart`);
  }

  function changeQuantity(id, amount) {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleWishlist(product) {
    const exists = wishlist.includes(product.id);

    setWishlist((previous) =>
      exists
        ? previous.filter((id) => id !== product.id)
        : [...previous, product.id]
    );

    showNotice(
      exists ? "Removed from wishlist" : "Added to wishlist"
    );
  }

  function selectCategory(name) {
    setSelectedCategory(name);
    setMenuOpen(false);

    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth"
    });
  }

  return (
    <div className="shop-home">

      <div className="announcement-bar">
        <span>⚡ ShopSphere Shopping Festival</span>
        <span>Great deals. Great prices. Great shopping.</span>
        <span>Customer support available</span>
      </div>

      <header className="main-header">
        <a href="#home" className="brand">
          <Package size={30} />
          <span>Shop<span className="brand-orange">Sphere</span></span>
        </a>

        <form
          className="search-box"
          onSubmit={(event) => {
            event.preventDefault();
            document.getElementById("products")?.scrollIntoView({
              behavior: "smooth"
            });
          }}
        >
          <Search size={19} />
          <input
            type="search"
            placeholder="Search for products, brands and more..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
          <button type="submit" aria-label="Search">
            Search
          </button>
        </form>

        <div className="header-actions">
          <button className="header-action" type="button" onClick={() =>
            showNotice("Account login will be connected to Spring Security.")
          }>
            <UserRound />
            <span>Account</span>
          </button>

          <button className="header-action" type="button"
            onClick={() => setWishlistOpen(true)}>
            <Heart />
            <span>Wishlist</span>
            {wishlist.length > 0 && (
              <b className="cart-count">{wishlist.length}</b>
            )}
          </button>

          <button className="header-action cart-action" type="button"
            onClick={() => setCartOpen(true)}>
            <ShoppingCart />
            <span>Cart</span>
            {cartCount > 0 && (
              <b className="cart-count">{cartCount}</b>
            )}
          </button>
        </div>
      </header>

      <nav className="main-nav">
        <button className="category-menu-button" type="button"
          onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={18} />
          Categories
        </button>

        <div className="nav-links">
          <a href="#home">Home</a>
          <Link to="/categories">Categories</Link>
          <a href="#products">Shop Products</a>
          <a href="#deals">Today's Deals</a>
          <a href="#benefits">Why Shop With Us</a>
        </div>
      </nav>

      <div className="home-layout">

        <aside className={`category-sidebar ${menuOpen ? "show-menu" : ""}`}>
          <h3>Shop by Category</h3>

          <button type="button"
            className={selectedCategory === "All" ? "category-active" : ""}
            onClick={() => selectCategory("All")}>
            <span>🛍️</span> All Products
          </button>

          {categories.map((category) => (
            <button type="button" key={category.name}
              className={selectedCategory === category.name ? "category-active" : ""}
              onClick={() => selectCategory(category.name)}>
              <span>{category.icon}</span> {category.name}
            </button>
          ))}
        </aside>

        <main className="home-content" id="home">

          <section className="hero-banner" id="deals">
            <div className="hero-content">
              <span className="hero-label">
                <Zap size={14} /> THE SHOPSPHERE COLLECTION
              </span>

              <h1>Everything you love. All in one place.</h1>

              <p>
                Explore electronics, fashion, home essentials and more.
                Discover your next favourite product today.
              </p>

              <a href="#products" className="hero-button">
                Start Shopping <ArrowRight size={17} />
              </a>

              <small className="hero-caption">
                A better way to shop online.
              </small>
            </div>

            <div className="hero-art">
              <div className="hero-circle">
                <span>🛍️</span>
              </div>
              <div className="hero-floating hero-floating-one">🎧</div>
              <div className="hero-floating hero-floating-two">⌚</div>
              <div className="hero-floating hero-floating-three">👟</div>
            </div>
          </section>

          <section className="benefit-strip" id="benefits">
            <div>
              <Truck />
              <span><strong>Delivery Options</strong><small>Convenient shipping</small></span>
            </div>
            <div>
              <ShieldCheck />
              <span><strong>Secure Shopping</strong><small>Protected checkout</small></span>
            </div>
            <div>
              <RefreshCw />
              <span><strong>Easy Returns</strong><small>Simple return process</small></span>
            </div>
            <div>
              <Headset />
              <span><strong>Customer Support</strong><small>We're here to help</small></span>
            </div>
          </section>

          <section className="home-section" id="categories">
            <div className="section-heading">
              <div>
                <span className="section-kicker">EXPLORE COLLECTIONS</span>
                <h2>Shop by Category</h2>
                <p>Find exactly what you're looking for.</p>
              </div>
              <Link to="/categories" className="explore-categories-link">View All Categories <ChevronRight size={16} /></Link>
            </div>

            <div className="category-grid">
              {categories.slice(0, 8).map((category) => (
                <button type="button" className="category-card"
                  key={category.name}
                  onClick={() => selectCategory(category.name)}>
                  <span className="category-emoji">{category.icon}</span>
                  <strong>{category.name}</strong>
                  <small>Explore now</small>
                </button>
              ))}
            </div>
          </section>

          <section className="deal-banner">
            <div>
              <span><Zap size={15} /> SHOPPING HIGHLIGHTS</span>
              <h2>Find something you'll love.</h2>
              <p>Explore our featured collection and discover great products.</p>
            </div>
            <a href="#products">View Collection <ArrowRight size={16} /></a>
          </section>

          <section className="home-section" id="products">
            <div className="section-heading">
              <div>
                <span className="section-kicker">HANDPICKED FOR YOU</span>
                <h2>
                  {selectedCategory === "All" ? "Popular Products" : selectedCategory}
                </h2>
                <p>Discover products for your everyday needs.</p>
              </div>
              <span className="product-count">
                {filteredProducts.length} items
              </span>
            </div>

            {isLoading && (
              <p className="loading-message">Loading products...</p>
            )}

            {isError && (
              <p className="demo-notice">
                Showing sample catalogue because the product API is unavailable.
              </p>
            )}

            <div className="product-grid">
              {filteredProducts.map((product) => {
                const isDemo = demoProducts.some((item) => item.id === product.id);
                const oldPrice = product.oldPrice;
                const discount = product.discount;
                const isWishlisted = wishlist.includes(product.id);

                return (
                  <article className="product-card" key={product.id}>
                    <div className="product-image">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }} />
                      ) : (
                        <Package size={45} />
                      )}

                      {discount && (
                        <span className="discount-badge">
                          {discount}% OFF
                        </span>
                      )}

                      <button type="button"
                        className={`wishlist-button ${isWishlisted ? "wishlisted" : ""}`}
                        onClick={() => toggleWishlist(product)}
                        aria-label="Toggle wishlist">
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className="product-info">
                      <small className="product-category">
                        {product.category || "General"}
                      </small>

                      <h3>{product.name}</h3>

                      <div className="product-rating">
                        <span className="rating-pill">
                          <Star size={12} fill="currentColor" />
                          {product.rating || "4.5"}
                        </span>
                        <span className="rating-text">
                          {product.reviews ? `(${product.reviews})` : "(Demo rating)"}
                        </span>
                      </div>

                      <div className="product-price">
                        <strong>{money(product.price)}</strong>
                        {oldPrice && (
                          <del>{money(oldPrice)}</del>
                        )}
                      </div>

                      <div className="product-stock">
                        {product.stock !== undefined ? (
                          product.stock > 0
                            ? `${product.stock} available`
                            : "Out of stock"
                        ) : "Availability subject to confirmation"}
                      </div>

                      <button type="button"
                        className="add-cart-button"
                        disabled={product.stock === 0}
                        onClick={() => addToCart(product)}>
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>

                      {isDemo && (
                        <small className="demo-product-label">Sample product</small>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {!isLoading && filteredProducts.length === 0 && (
              <div className="empty-products">
                <Search size={35} />
                <h3>No products found</h3>
                <p>Try another product name or category.</p>
                <button type="button" onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}>
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          <section className="bottom-promo">
            <Package size={34} />
            <div>
              <h2>Your next great find is waiting.</h2>
              <p>Explore the ShopSphere collection today.</p>
            </div>
            <a href="#products">Explore Now <ChevronRight size={16} /></a>
          </section>

          <footer className="shop-footer">
            <div className="footer-main">
              <div>
                <strong className="footer-brand">ShopSphere</strong>
                <p>Discover. Shop. Enjoy.</p>
              </div>
              <div>
                <strong>Customer Service</strong>
                <a href="#benefits">Help & Support</a>
                <a href="#benefits">Returns</a>
              </div>
              <div>
                <strong>About ShopSphere</strong>
                <a href="#home">Our Store</a>
                <Link to="/categories">Collections</Link>
              </div>
            </div>
            <div className="footer-bottom">
              © {new Date().getFullYear()} ShopSphere. All rights reserved.
              <span>Built with React and Spring Boot.</span>
            </div>
          </footer>
        </main>
      </div>

      {notice && (
        <div className="toast-notice">
          <CheckCircle2 size={18} /> {notice}
        </div>
      )}

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <section className="cart-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="cart-drawer-header">
              <div>
                <span className="section-kicker">YOUR SHOPPING BAG</span>
                <h2>Shopping Cart ({cartCount})</h2>
              </div>
              <button type="button" onClick={() => setCartOpen(false)}
                aria-label="Close cart"><X /></button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart size={45} />
                <h3>Your cart is empty</h3>
                <p>Discover products and add your favourites.</p>
                <button type="button" onClick={() => setCartOpen(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-image">
                      {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
                    </div>
                    <div className="cart-item-details">
                      <strong>{item.name}</strong>
                      <p>{money(item.price)}</p>
                      <div className="quantity-controls">
                        <button type="button" onClick={() => changeQuantity(item.id, -1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => changeQuantity(item.id, 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button type="button" className="remove-item"
                      onClick={() => setCart((previous) =>previous.filter((product) => product.id !== item.id)
                      )}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}

                <div className="cart-total">
                  <span>Subtotal</span><strong>{money(cartTotal)}</strong>
                </div>
                <p className="cart-disclaimer">
                  Shipping and taxes, if applicable, are calculated at checkout.
                </p>
                <button type="button" className="checkout-button"
                  onClick={() => showNotice("Checkout will be connected after backend order and payment integration.")}>
                  Proceed to Checkout <ArrowRight size={17} />
                </button>
              </>
            )}
          </section>
        </div>
      )}

      {wishlistOpen && (
        <div className="cart-overlay" onClick={() => setWishlistOpen(false)}>
          <section className="cart-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="cart-drawer-header">
              <h2>My Wishlist ({wishlist.length})</h2>
<button type="button" onClick={() => setWishlistOpen(false)}>
                <X />
              </button>
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="empty-cart">
                <Heart size={42} />
                <h3>Your wishlist is empty</h3>
                <p>Save products you would like to revisit.</p>
              </div>
            ) : wishlistProducts.map((product) => (
              <div className="cart-item" key={product.id}>
                <div className="cart-item-image">
                  {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
                </div>
                <div className="cart-item-details">
                  <strong>{product.name}</strong>
                  <p>{money(product.price)}</p>
                  <button className="wishlist-add-button" type="button"
                    onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
                <button className="remove-item" type="button"
                  onClick={() => toggleWishlist(product)}>
<Trash2 size={17} />
                </button>
              </div>
            ))}
          </section>
        </div>
      )}

    </div>
  );
}


