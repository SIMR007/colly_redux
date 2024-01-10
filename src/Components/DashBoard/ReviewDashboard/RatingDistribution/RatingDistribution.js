import React from "react";

const RatingDistribution = ({ revewsData = [] }) => {
  const fivestar = revewsData.filter((brand) => brand.rating === 5);
  const fourstar = revewsData.filter((brand) => brand.rating === 4);
  const threestar = revewsData.filter((brand) => brand.rating === 3);
  const twostar = revewsData.filter((brand) => brand.rating === 2);
  const onestar = revewsData.filter((brand) => brand.rating === 1);

  return (
    <div className="d-md-block d-none">
      <div className="sidebar_right">
        <div className="Distribution_sidebar">
          <h2 className="mb-2">Rating Distribution</h2>
          <p className="mb-3">
            All Reviews <span>total of</span> {revewsData.length}{" "}
          </p>

          <div className="progress">
            <div className="progress-bar bg-dark" style={{ width: "100%" }}>
              5 Stars
            </div>
            <h3 className="mt-1 ml-2">{fivestar.length}</h3>
          </div>
          <div className="progress my-2">
            <div className="progress-bar bg-dark" style={{ width: "80%" }}>
              4 Stars
            </div>
            <h3 className="mt-1 ml-2">{fourstar.length}</h3>
          </div>
          <div className="progress mb-2">
            <div className="progress-bar bg-dark" style={{ width: "60%" }}>
              3 Stars
            </div>
            <h3 className="mt-1 ml-2">{threestar.length}</h3>
          </div>
          <div className="progress mb-2">
            <div className="progress-bar bg-dark" style={{ width: "40%" }}>
              2 Stars
            </div>
            <h3 className="mt-1 ml-2">{twostar.length}</h3>
          </div>
          <div className="progress">
            <div className="progress-bar bg-dark " style={{ width: "20%" }}>
              1 Stars
            </div>
            <h3 className="mt-1 ml-2">{onestar.length}</h3>
          </div>
        </div>
      </div>
      <div className="Customer_Support mt-2">
        <h2 className="mb-2">Customer Support</h2>
        <p className="mb-3">
          All Reviews <span>Average reply time: 2 hours</span> 2 hours{" "}
        </p>
        <button>Contact</button>
      </div>
    </div>
  );
};

export default RatingDistribution;
