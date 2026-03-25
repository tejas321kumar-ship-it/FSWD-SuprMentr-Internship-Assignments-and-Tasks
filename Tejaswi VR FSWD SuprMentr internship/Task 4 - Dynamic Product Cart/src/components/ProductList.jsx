function ProductList(props) {
  return (
    <div className="grid">
      {props.products.map(function (item) {
        return (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: Rs {item.price}</p>
            <button onClick={function () { props.onAdd(item); }}>
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
