import React from "react";
import commonimagepath from "../../../Components/commonimagepath/commonimagepath"

const TBD_News = () => {
  return (
    <section className="news">
      <div className="container_x">
        <div className="row">
          <div className="col-md-12">
            <div className="news_head">
              <h2>TBD News</h2>
              <p>
                Explore the latest fashion, lifestyle, and release curated
                 by TBD. dedicated market team.
              </p>
            </div>
          </div>
        </div>
        <div className=" d-flex flex-wrap gap-4 Categories_box_x">
        
            <div className="news_box">
              <img src={commonimagepath("news_1.png")} alt={"news_1.png"} />
              <p>RUNWAY</p>
              <h1>
                The Best Street Style Photos from the Spring 2024 Shows in
                Shanghai
              </h1>
            </div>
            <div className="news_box">
              <img src={commonimagepath("news_2.png")} alt={"news_2.png"} />
              <p>RUNWAY</p>
              <h1>Street Style’s Most Wanted Bags of the Spring 2024 Season</h1>
            </div>
            <div className="news_box">
              <img src={commonimagepath("news_3.png")} alt={"news_3.png"} />
              <p>CELEBRITY STYLE</p>
              <h1>Taylor Swift Takes the Sheer Trend for a Spin</h1>
            </div>
            <div className="news_box">
              <img src={commonimagepath("news_4.png")} alt={"news_4.png"} />
              <p>RUNWAY</p>
              <h1>From Dressing Like a Polly Pocket to Baring It All.</h1>
            </div>
          </div>
          <div className="col-md-12">
            <div className="news_btn">
              <a href="#">view more</a>
            </div>
          </div>
        
      </div>
    </section>
  );
};

export default TBD_News;
