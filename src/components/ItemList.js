import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

function ItemList(props) {
  const { itemList } = props;
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    // dispatch an action
    dispatch(addItem(item));
  };
  return (
    <>
      {itemList.map((item) => {
        console.log(item);
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
          <div key={item?.card?.info?.id} className="menu-dish">
            <div className="dish-info">
              <h2>{name}</h2>
              <h2>Rs. {getPrice()}</h2>
              <h3>{description ? description.slice(0, 80) : ""}...</h3>
              {/* <h3>{description}</h3> */}
            </div>
            <div className="imag-and-btn">
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddItem(item)}
              >
                ADD+
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
