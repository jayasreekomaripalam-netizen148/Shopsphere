import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Package, ArrowLeft, ChevronRight } from "lucide-react";
import "./Categories.css";

const categories = [
  { name: "Electronics", icon: "📱", description: "Mobiles, laptops, audio and smart devices", color: "blue" },
  { name: "Fashion", icon: "👕", description: "Clothing, footwear and everyday style", color: "pink" },
  { name: "Home & Living", icon: "🛋️", description: "Furniture, decor and home essentials", color: "orange" },
  { name: "Beauty", icon: "💄", description: "Beauty, skincare and personal care", color: "purple" },
  { name: "Sports", icon: "👟", description: "Sportswear, fitness and outdoor gear", color: "green" },
  { name: "Toys & Games", icon: "🧸", description: "Toys, games and entertainment", color: "yellow" },
  { name: "Automotive", icon: "🚗", description: "Car and bike accessories", color: "cyan" },
  { name: "Books", icon: "📚", description: "Fiction, education and more", color: "indigo" },
  { name: "Health & Wellness", icon: "💊", description: "Wellness and healthcare essentials", color: "teal" },
  { name: "Stationery", icon: "✏️", description: "Office, school and creative supplies", color: "rose" }
];

export default function Categories() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return categories.filter((category) =>
      `${category.name} ${category.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="categories-page">
      <header className="categories-header">
        <Link to="/" className="categories-brand">
          <Package size={29} />
          <span>Shop<span>Sphere</span></span>
        </Link>
        <Link to="/" className="back-home">
          <ArrowLeft size={17} /> Back to Home
        </Link>
      </header>

      <main className="categories-main">
        <div className="categories-hero">
          <span className="categories-kicker">EXPLORE SHOPSPHERE</span>
          <h1>Explore all categories</h1>
          <p>Discover products across all your favourite collections.</p>

          <div className="categories-search">
            <Search size={20} />
            <input
              type="search"
              placeholder="Search categories..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button type="button" onClick={() => setSearch("")}>
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="categories-section-heading">
          <div>
            <span>OUR COLLECTIONS</span>
            <h2>Shop by Category</h2>
          </div>
          <p>{filtered.length} categories</p>
        </div>

        <div className="categories-grid">
          {filtered.map((category) => (
            <Link
              to={`/?category=${encodeURIComponent(category.name)}#products`}
              className="category-page-card"
              key={category.name}
            >
              <div className={`category-page-icon ${category.color}`}>
                {category.icon}
              </div>
              <div className="category-page-info">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span>Explore collection <ChevronRight size={15} /></span>
              </div>
            </Link>
          ))}
        </div>




<div className="product-card" key={product.id}>
  <img src={product.image} alt={product.name} />

  <h3>{product.name}</h3>

  <p>₹{product.price}</p>

  <Link
    to={`/product/${product.id}`}
    className="view-product-btn"
  >
    View Product
  </Link>
</div>

        {filtered.length === 0 && (
          <div className="categories-empty">
            <Search size={34} />
            <h3>No categories found</h3>
            <p>Try searching with another category name.</p>
            <button onClick={() => setSearch("")}>Clear Search</button>
          </div>
        )}

        <section className="categories-bottom-banner">
          <div>
            <span>YOUR SHOPPING JOURNEY STARTS HERE</span>
            <h2>Find what you love at ShopSphere.</h2>
            <p>Explore our collections and discover your next favourite product.</p>
          </div>
          <Link to="/">Visit Homepage <ChevronRight size={17} /></Link>
        </section>
      </main>

      <footer className="categories-footer">
        © {new Date().getFullYear()} ShopSphere. All rights reserved.
      </footer>
    </div>
  );
}
