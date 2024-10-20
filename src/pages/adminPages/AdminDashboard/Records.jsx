/* eslint-disable react/prop-types */
function Records({ userData }) {
  let blockedData = 0;

  blockedData = userData.filter((data) => data.state == "block").length;

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">user Status</h5>
          {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}

          <div>
            <p className="card-text">Total Users:{userData.length}</p>
            <p className="card-text text-danger">
              {" "}
              Blocked Users:{blockedData}
            </p>
            <p className="card-text text-success">
              Active Users:{userData.length - blockedData}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Records;
