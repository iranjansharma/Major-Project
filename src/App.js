import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import SingleProduct from "./components/SingleProduct";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import { CartContext } from "./CartContext";
import { useState, useEffect } from "react";
import { getCart, storeCart } from "././helpers";
import Products from "./components/Products";

function App() {
  const [cart, setCart] = useState({});
  //  local Storage Se Fetch cart  Krna hai Data
  useEffect(() => {
    getCart().then((cart) => {
      setCart(JSON.parse(cart));
    });
  }, []);

  useEffect(() => {
    storeCart(JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/products/:_id" component={SingleProduct}></Route>
            <Route path="/products" component={Products}></Route>
            <Route path="/cart" exact component={Cart}></Route>
          </Switch>
        </CartContext.Provider>
      </Router>
    </>
  );
}

export default App;
