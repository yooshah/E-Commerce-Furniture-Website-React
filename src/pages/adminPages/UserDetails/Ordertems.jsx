/* eslint-disable react/prop-types */
function Ordertems({ data, ind }) {
  return (
    <tr>
      <th scope="row">{ind + 1}</th>

      <td>{data.productName}</td>
      <td>{data.price}</td>
      <td>{data.quantity}</td>
      <td>{data.totalPrice}</td>
    </tr>
  );
}

export default Ordertems;
