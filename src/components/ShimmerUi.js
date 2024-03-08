const ShimmerUi = (props) => {
  const {n} = props;
  console.log("shimmer UI - loading");

  return (
    <div className="sh-res-container">
      {(() => {
        const shimmerCards = [];
        for (let i = 0; i < n; i++) {
          shimmerCards.push(
            <div className="sh-res-card" key={i}>
              <div className="sh-res-logo"></div>
              <div className="sh-text sht-1"></div>
              <div className="sh-text sht-2"></div>
              <div className="sh-text sht-3"></div>
            </div>
          );
        }
        return shimmerCards;
      })()}
    </div>
  );
};

export default ShimmerUi;