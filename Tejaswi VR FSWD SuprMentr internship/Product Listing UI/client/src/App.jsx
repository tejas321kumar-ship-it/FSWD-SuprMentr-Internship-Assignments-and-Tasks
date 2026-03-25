import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(5000);

  useEffect(function () {
    fetch('http://localhost:4000/api/products')
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setProducts(data);
        setLoading(false);
      })
      .catch(function () {
        setError('Unable to load products from server.');
        setLoading(false);
      });
  }, []);

  function getCategories() {
    const list = ['All'];

    for (let i = 0; i < products.length; i = i + 1) {
      const current = products[i].category;
      if (list.indexOf(current) === -1) {
        list.push(current);
      }
    }

    return list;
  }

  function getFilteredProducts() {
    const result = [];

    for (let i = 0; i < products.length; i = i + 1) {
      const item = products[i];
      const nameMatch = item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      const categoryMatch = category === 'All' || item.category === category;
      const priceMatch = item.price <= maxPrice;

      if (nameMatch && categoryMatch && priceMatch) {
        result.push(item);
      }
    }

    return result;
  }

  const categoryOptions = getCategories();
  const filteredProducts = getFilteredProducts();

  return (
    <div className="shop-page">
      <header className="hero-box">
        <p className="small-tag">Mini E-Commerce UI</p>
        <h1>Product Listing</h1>
        <p className="hero-text">Filter products by name, category, and budget.</p>
      </header>

      <section className="filter-panel">
        <div className="field">
          <label>Search</label>
          <input
            type="text"
            placeholder="Type product name"
            value={searchText}
            onChange={function (e) {
              setSearchText(e.target.value);
            }}
          />
        </div>

        <div className="field">
          <label>Category</label>
          <select
            value={category}
            onChange={function (e) {
              setCategory(e.target.value);
            }}
          >
            {categoryOptions.map(function (option) {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        <div className="field">
          <label>Max Price: Rs {maxPrice}</label>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={function (e) {
              setMaxPrice(Number(e.target.value));
            }}
          />
        </div>
      </section>

      <div className="result-strip">
        <p>
          Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
        </p>
      </div>

      {loading && <p className="state">Loading products...</p>}
      {error !== '' && <p className="state error">{error}</p>}

      {!loading && error === '' && (
        <section className="grid-box">
          {filteredProducts.length === 0 && (
            <p className="state">No products match these filters.</p>
          )}

          {filteredProducts.map(function (item) {
            return (
              <article className="product-card" key={item.id}>
                <div className="card-top">
                  <span className="chip">{item.category}</span>
                  <span className="rating">{item.rating} / 5</span>
                </div>
                <h3>{item.name}</h3>
                <p className="desc">{item.description}</p>
                <p className="price">Rs {item.price}</p>
                <button>Add to Cart</button>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default App;
