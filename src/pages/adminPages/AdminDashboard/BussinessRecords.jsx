/* eslint-disable react/prop-types */
function BussinessRecords({ productData, orderData }) {
  let revenue = 0;

  if (orderData.length > 0) {
    revenue = orderData.reduce((acc, record) => acc + record.amount, 0);
  }
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Records</h5>
          {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}

          <div>
            <p className="card-text text-warning">
              {" "}
              Total Number of Products :{productData.length}
            </p>
            <p className="card-text text-primary">Gross Sales:{revenue} $</p>
            <p className="card-text text-Success">Profit :19%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BussinessRecords;
