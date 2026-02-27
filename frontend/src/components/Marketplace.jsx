import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CATEGORIES = ['All', 'Electronics', 'Collectibles'];

const CATEGORY_ICONS = {
  Electronics: '⬡',
  Collectibles: '◈',
  Accessories: '◉',
  Software: '⬢',
};

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then(({ data }) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'All'
    ? products
    : products.filter((p) => p.category === filter);

  if (loading) {
    return (
      <div className="mk-bg">
        <div className="main-content">
          <div className="mk-loading">
            <div className="mk-loading-dots">
              <span /><span /><span />
            </div>
            <div className="mk-loading-text">
              &gt;_ SCANNING MARKETPLACE...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mk-bg">
      <div className="main-content">

        {/* Terminal Header */}
        <div className="mk-terminal-header">
          <div className="mk-terminal-topbar">
            <div className="mk-terminal-dot mk-dot-red" />
            <div className="mk-terminal-dot mk-dot-yellow" />
            <div className="mk-terminal-dot mk-dot-green" />
            <div className="mk-terminal-title-bar">marketplace.exe — live feed</div>
          </div>
          <div className="mk-title-prompt">&gt;_ /marketplace --live --feed</div>
          <div className="mk-title-main">
            MARKET<span className="mk-title-accent">PLACE</span>
            <span className="mk-cursor" />
          </div>
          <div className="mk-title-sub">
            // Browse and acquire items from the community &nbsp;|&nbsp;{' '}
            <span className="mk-count">{filtered.length} ITEM{filtered.length !== 1 ? 'S' : ''}</span> INDEXED
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mk-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`mk-filter-tab ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              [{cat.toUpperCase()}]
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="mk-empty">
            <div className="mk-empty-code">404</div>
            <div className="mk-empty-msg">&gt;_ No products found in this sector</div>
          </div>
        ) : (
          <div className="mk-grid">
            {filtered.map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="mk-card">
                {/* Scan line effect */}
                <div className="mk-card-scan" />

                {/* Image */}
                <div className="mk-card-img">
                  {p.image && p.image !== '/uploads/default-product.png' ? (
                    <>
                      <img src={p.image} alt={p.name} />
                      <div className="mk-card-img-overlay" />
                    </>
                  ) : (
                    <span style={{ opacity: 0.4 }}>
                      {CATEGORY_ICONS[p.category] || '◆'}
                    </span>
                  )}
                  <div className="mk-card-corner">LIVE</div>
                </div>

                {/* Body */}
                <div className="mk-card-body">
                  <h3>{p.name}</h3>
                  <div className="mk-price">
                    <span className="mk-price-prefix">$ </span>
                    {parseFloat(p.price).toFixed(2)}
                  </div>
                  <div className="mk-category-tag">
                    ■ {p.category}
                  </div>
                  <div className="mk-seller">
                    <span className="mk-seller-prefix">@</span>{p.seller || 'unknown'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
