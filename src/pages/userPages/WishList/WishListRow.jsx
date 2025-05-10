/* eslint-disable react/prop-types */
function WishListRow({ num, items, removeWishItem }) {
  return (
    <tr>
      <th scope="row">{num}</th>
      <td>
        <img src={items.image} alt={items.name} className="wish-image" />
      </td>
      <td>{items.name}</td>
      <td>{items.price}</td>
      <td>
        {items.stock > 0 ? (
          <span className="text-success">In Stock</span>
        ) : (
          <span className="text-secondary">Out of Stock</span>
        )}
      </td>
      <td>
        <img
          src="src\components\assets\delete (2).svg"
          alt="Delete"
          className="delete-btn"
          onClick={() => removeWishItem(items.productId)}
        />
      </td>
      <td>
        <>
          <button type="button" className="btn btn-outline-secondary">
            Move To Cart
          </button>
        </>
      </td>
    </tr>
  );
}

export default WishListRow;
