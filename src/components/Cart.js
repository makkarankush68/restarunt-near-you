import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";
function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="cart-container">
      <h1>Cart</h1>

      {cartItems.length == 0 ? (
        <h2>ADD Items to the cart ser..</h2>
      ) : (
        <button
          className="clear-cart-btn"
          onClick={() => {
            handleClearCart();
          }}
        >
          Clear Cart
        </button>
      )}
      <ItemList itemList={cartItems} />
    </div>
  );
}

export default Cart;
