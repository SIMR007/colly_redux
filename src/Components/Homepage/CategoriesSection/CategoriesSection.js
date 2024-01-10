import React from "react";
import commonimagepath from "../../../Components/commonimagepath/commonimagepath"

const CategoriesSection = () => {
  return (
    <section className="Categories">
      <div className="container_x">
        <div className="row">
          <div className="col-md-12">
            <div className="Categories_head">
              <h2>Categories</h2>
            </div>
          </div>
        </div>
        <div className=" d-flex flex-wrap gap-4 Categories_box_x">
         
            <div className="Categories_box">
              <img src={commonimagepath("box_1.png")} alt={"box_1.png"} />
              <h1>Sports</h1>
            </div>
            <div className="Categories_box">
              <img src={commonimagepath("box_2.png")} alt={"box_2.png"} />
              <h1>High-End</h1>
            </div>
            <div className="Categories_box">
              <img src={commonimagepath("box_3.png")} alt={"box_3.png"} />
              <h1>Boutiques</h1>
            </div>
            <div className="Categories_box">
              <img src={commonimagepath("box_4.png")} alt={"box_4.png"} />
              <h1>Street Fashion</h1>
            </div>
            <div className="Categories_box">
              <img src={commonimagepath("box_5.png")} alt={"box_5.png"} />
              <h1>Collectibles</h1>
            </div>
         
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
