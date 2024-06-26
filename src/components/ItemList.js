import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

function ItemList(props) {
  const { itemList } = props;
  const dispatch = useDispatch();
  const handleAddItem = (...props) => {
    dispatch(addItem(...props));
  };
  return (
    <>
      {itemList.map((item) => {
        const { name, description, imageId, price, defaultPrice, finalPrice } =
          item?.card?.info;
        let priceToPass = 0;
        function getPrice() {
          if (finalPrice != undefined) {
            priceToPass = finalPrice;
            return (
              <>
                <span className="cut-price">{price / 100}</span>
                <span> {finalPrice / 100}</span>
              </>
            );
          } else if (defaultPrice != undefined) {
            priceToPass = defaultPrice;
            return defaultPrice / 100;
          } else if (price != undefined) {
            priceToPass = price;
            return price / 100;
          }
        }
        return (
          <div key={item?.card?.info?.id} className="menu-dish">
            <div className="dish-info">
              <h2>{name}</h2>
              <h2>₹ {getPrice()}</h2>
              <h3 className="dish-disc">
                {description ? description.slice(0, 80) + " ..." : ""}
              </h3>
            </div>
            <div className="imag-and-btn">
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddItem({ item, priceToPass })}
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
