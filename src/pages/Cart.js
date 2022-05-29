import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

const Cart = () => {
  let total = 0;

  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  const [priceFetched, togglePriceFetched] = useState(false);

  useEffect(() => {
    if (!cart.items) {
      return;
    }
    if (priceFetched) {
      return;
    }
    fetch("https://star-spark-pasta.glitch.me/api/products/cart-items", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    })
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
        togglePriceFetched(true);
      });
  }, [cart, priceFetched]);

  const getQty = (productId) => {
    return cart.items[productId];
  };

  const increment = (productId) => {
    const existingQty = cart.items[productId];

    const _cart = { ...cart };

    _cart.items[productId] = existingQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrement = (productId) => {
    const existingQty = cart.items[productId];

    if (existingQty === 1) {
      return;
    }

    const _cart = { ...cart };

    _cart.items[productId] = existingQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  };

  const getSum = (productId, price) => {
    const sum = price * getQty(productId);
    total += sum;
    return sum;
  };

  const handleDelete = (productId) => {
    const _cart = { ...cart };
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;
    setCart(_cart);
    const updateProductList = products.filter(
      (product) => product._id !== productId
    );
    setProducts(updateProductList);
  };

  const handleOrderNow = () => {
    window.alert("Ordered Placed Successfully");
    setProducts([]);
    setCart({});
  };

  return !products.length ? (
    <img
      className="mx-auto w-1/3 mt-12"
      draggable="false"
      src="https://ouch-cdn2.icons8.com/VMiFvVm7fcjYmZ4HFlNQ3py3jCbUL5PbvbckSq7pv8Y/rs:fit:467:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTQ5/L2VhN2IzYjAzLTQ4/MTEtNGZjMS05NDYz/LThmMzIwMzhmNTY4/OC5wbmc.png"
      alt="Empty cart"
    />
  ) : (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart Items</h1>
      <ul>
        {products.map((product) => {
          return (
            <li className="mb-12" key={product._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-16"
                    draggable="false"
                    src={product.image}
                    alt={product.name}
                  />
                  <span className="font-bold ml-4 w-48">{product.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      decrement(product._id);
                    }}
                    className="bg-green-500 px-4 py-2 rounded-lg leading-none"
                  >
                    -
                  </button>
                  <b className="px-4">{getQty(product._id)}</b>
                  <button
                    onClick={() => {
                      increment(product._id);
                    }}
                    className="bg-green-500 px-4 py-2 rounded-lg leading-none"
                  >
                    +
                  </button>
                </div>
                <span>₹{getSum(product._id, product.price)}</span>
                <button
                  onClick={() => {
                    handleDelete(product._id);
                  }}
                  className="bg-red-500 px-4 py-2 rounded-lg leading-none text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <b>Grand Total : ₹ {total}</b>
      </div>
      <div className="text-right mt-4">
        <button
          onClick={handleOrderNow}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
