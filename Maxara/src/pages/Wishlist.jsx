import { useSelector } from "react-redux";

function Wishlist() {

  const likeItem = useSelector(
    (state) => state.wishlist.likeItem
  );

  console.log("WISHLIST:", likeItem);

  return (
    <div>
      {likeItem.map((v, i) => (
        <div key={i}>
          <h1>{v.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;