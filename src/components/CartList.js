import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { removeItem } from "../utils/cartSlice";

function ItemList(props) {
  const { itemList } = props;
  const dispatch = useDispatch();
  const handleDelItem = (item) => {
    dispatch(removeItem(item));
  };
  let i = 0;
  return (
    <>
      {itemList.map((item) => {
        const { name, description, imageId, price, defaultPrice, finalPrice } =
          item?.card?.info;
        function getPrice() {
          if (finalPrice)
            return (
              <>
                <span className="cut-price">{price / 100}</span>
                <span> {finalPrice / 100}</span>
              </>
            );
          if (price) return price / 100;
          if (defaultPrice) return defaultPrice / 100;
        }
        return (
          <div key={item?.card?.info?.id + i++} className="menu-dish">
            <div className="dish-info">
              <h2>{name}</h2>
              <h2>₹ {getPrice()}</h2>
            </div>
            <div className="imag-and-btn">
              <button
                className="add-to-cart-btn"
                onClick={() => handleDelItem(item)}
              >
               Delete
              </button>
              {imageId ? <img src={CDN_URL + imageId} /> : <></>}
            </div>
            
          </div>
        );
      })}
    </>
  );
}

export default ItemList;
