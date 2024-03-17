import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const totalBill = useSelector((store) => store.cart.totalBill);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Cart</h1>
        <button
          className="clear-cart-btn"
          onClick={() => {
            handleClearCart();
          }}
        >
          Clear Cart
        </button>
      </div>
      {cartItems.length == 0 ? (
        <>
          <h2 className="cart-info-top">ADD Items to the cart ser..</h2>
          <div className="cart-res-btn-container">
          <Link to="/restaurants" className="restaurants-btn">
            See All Restaurants
          </Link>
          </div>
        </>
      ) : (
        <>
          <div className="cart-checkout">
            <h2 className="cart-info-top">
              <span>Total Items : {cartItems.length}</span>
              <span>Total Bill : ₹ {totalBill.toFixed(2)}/-</span>
            </h2>
            <br />
            <button className="checkout-btn">Proceed to checkout</button>
          </div>
          <CartList itemList={cartItems} />
        </>
      )}
    </div>
  );
}

export default Cart;
