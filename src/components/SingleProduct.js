import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CartContext } from "../CartContext";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const params = useParams(); // we use params to get id of any thing

  useEffect(() => {
    fetch(`https://star-spark-pasta.glitch.me/api/products/${params._id}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
      });
  }, [params._id]);

  const addToCart = (event, product) => {
    event.preventDefault();
    let _cart = { ...cart }; // { items: {}}
    if (!_cart.items) {
      _cart.items = {};
    }
    if (_cart.items[product._id]) {
      _cart.items[product._id] += 1;
    } else {
      _cart.items[product._id] = 1;
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;
    setCart(_cart);
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };
  const history = useHistory();

  return (
    <div className="container mx-auto mt-12">
      <button
        className="font-bold mb-12"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </button>
      <div className="flex ">
        <img src={product.image} draggable="false" alt="pizza" />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">₹{product.price}</div>
          <button
            disabled={isAdding}
            onClick={(e) => {
              addToCart(e, product);
            }}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 mt-4 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
