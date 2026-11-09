
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Shirt,
  Sofa,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Car,
  BookOpen,
  HeartPulse,
  Search,
  ArrowRight,
  ShoppingBag,
  X,
} from "lucide-react";
import "./Categories.css";

const categories = [
  {
    name: "Electronics",
    description: "Smartphones, laptops and gadgets",
    icon: Smartphone,
    emoji: "📱",
    color: "blue",
    keywords: "mobile laptop headphones camera",
  },
  {
    name: "Fashion",
    description: "Discover your everyday style",
    icon: Shirt,
    emoji: "👗",
    color: "pink",
    keywords: "clothing shoes accessories",
  },
  {
    name: "Home & Living",
    description: "Make your home feel special",
    icon: Sofa,
    emoji: "🏠",
    color: "orange",
    keywords: "furniture kitchen decor",
  },
  {
    name: "Beauty",
    description: "Beauty and personal care essentials",
    icon: Sparkles,
    emoji: "✨",
    color: "purple",
    keywords: "skincare makeup cosmetics",
  },
  {
    name: "Sports",
    description: "Gear up for an active lifestyle",
    icon: Dumbbell,
    emoji: "🏀",
    color: "green",
    keywords: "fitness gym outdoor equipment",
  },
  {
    name: "Toys & Games",
    description: "Fun and entertainment for everyone",
    icon: Gamepad2,
    emoji: "🎮",
    color: "yellow",
    keywords: "toys games puzzles",
  },
  {
    name: "Automotive",
    description: "Accessories for every journey",
    icon: Car,
    emoji: "🚗",
    color: "cyan",
    keywords: "car bike accessories",
  },
  {
    name: "Books",
    description: "Stories, knowledge and inspiration",
    icon: BookOpen,
    emoji: "📚",
    color: "indigo",
    keywords: "novels education textbooks",
  },
  {
    name: "Health & Wellness",
    description: "Everyday health and wellness needs",
    icon: HeartPulse,
    emoji: "💚",
    color: "teal",
    keywords: "wellness healthcare fitness",
  },
];

function Categories() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return categories;

    return categories.filter((category) =>
      [
        category.name,
        category.description,
        category.keywords,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  return (
    <main className="categories-page">
      <div className="categories-container">

        <section className="categories-hero">
          <div className="categories-hero-content">
            <span className="categories-eyebrow">
              <ShoppingBag size={15} />
              EXPLORE SHOPSPHERE
            </span>

            <h1>
              Find what you <span>love.</span>
            </h1>

            <p>
              Explore our collections and discover products
              across all your favourite categories.
            </p>

            <div className="categories-search">
              <Search size={20} />

              <input
                type="search"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search categories"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <span className="categories-count">
              {filteredCategories.length} categories available
            </span>
          </div>

          <div className="categories-hero-art" aria-hidden="true">
            <div className="hero-circle hero-circle-one" />
            <div className="hero-circle hero-circle-two" />
            <div className="hero-shopping-icon">
              <ShoppingBag size={85} strokeWidth={1.2} />
            </div>
            <span className="hero-floating hero-float-one">🛍️</span>
            <span className="hero-floating hero-float-two">✨</span>
            <span className="hero-floating hero-float-three">🎁</span>
          </div>
        </section>

        <section className="categories-section">
          <div className="categories-section-heading">
            <div>
              <span>SHOP BY INTEREST</span>
              <h2>Explore Categories</h2>
              <p>Everything you need, organised in one place.</p>
            </div>

            <Link to="/" className="categories-home-link">
              Back to Home <ArrowRight size={16} />
            </Link>
          </div>

          {filteredCategories.length > 0 ? (
            <div className="categories-grid">
              {filteredCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    to={`/?category=${encodeURIComponent(category.name)}#products`}
                    className={`category-card ${category.color}`}
                    key={category.name}
                  >
                    <div className="category-card-top">
                      <div className="category-icon">
                        <Icon size={29} strokeWidth={1.7} />
                      </div>

                      <span className="category-emoji">
                        {category.emoji}
                      </span>
                    </div>

                    <div className="category-card-content">
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                    </div>

                    <div className="category-card-footer">
                      <span>Explore products</span>
                      <span className="category-arrow">
                        <ArrowRight size={17} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="categories-no-results">
              <Search size={38} />
              <h3>No categories found</h3>
              <p>Try searching with a different keyword.</p>
              <button onClick={() => setSearch("")}>
                Clear Search
              </button>
            </div>
          )}
        </section>

        <section className="categories-promo">
          <div>
            <span>SHOP SMARTER</span>
            <h2>Your next favourite find is waiting.</h2>
            <p>
              Explore our collections and make every shopping
              experience count.
            </p>
          </div>

          <Link to="/" className="categories-promo-btn">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </section>

      </div>
    </main>
  );
}

export default Categories;


