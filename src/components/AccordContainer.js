import React from "react";
import ItemList from "./ItemList";

function Categories(props) {
  const { c, showItems, setShowIndex, index } = props;
  const handleHideAcordBody = () => {
    if (showItems) setShowIndex(null);
    else setShowIndex(index);
  };
  const itemCards = c?.card?.card?.itemCards;
  return (
    <div key={c?.card?.card?.title} className="acord-container">
      <div
        className="acord-header"
        onClick={() => {
          handleHideAcordBody();
        }}
      >
        <span>
          {c?.card?.card?.title} ({itemCards.length})
        </span>
        <span>{showItems ? "⬆️" : "⬇️"}</span>
      </div>
      {showItems ? (
        <div className="acord-body">
          <ItemList itemList={itemCards} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Categories;
