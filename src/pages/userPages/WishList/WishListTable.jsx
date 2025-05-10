import { Table } from "reactstrap";
import "./Wishlist.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlistItems,
  removeWishItem,
} from "../../../features/wishSlice";
import WishListRow from "./WishListRow";
function WishListTable() {
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.wish);

  console.log(wishList);

  useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  const handleremoveItem = (id) => {
    dispatch(removeWishItem(id));
  };
  return (
    <>
      <div className="wishList-container">
        <div className="wishlist-header">
          <h2 className="wishlist-title">Favorite Furniture Collection</h2>
        </div>

        <Table responsive>
          <thead>
            <tr>
              <th></th>
              <th>Preview</th>
              <th>Furniture Name</th>
              <th>Price &nbsp; ($)</th>
              <th>Availability</th>
              <th></th>
              <th></th>
            </tr>
            {wishList.map((item, ind) => (
              <WishListRow
                key={item.id}
                num={ind + 1}
                items={item}
                removeWishItem={handleremoveItem}
              />
            ))}
          </thead>
          <tbody></tbody>
        </Table>
      </div>
    </>
  );
}

export default WishListTable;
