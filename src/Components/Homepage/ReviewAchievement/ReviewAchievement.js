import React from "react";
import commonimagepath from "../../../Components/commonimagepath/commonimagepath"

const ReviewAchievement = () => {
  return (
    <section className="Review">
      <div className="container_x">
        <div className="row  align-items-center">
          <div className="col-md-6">
            <div className="Review_box">
              <h2>Review Latest Releases</h2>
              <p>
                Promoting fairness and transparency on unfair distribution of
                limited edition releases.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="Review_img">
              <img src={commonimagepath("review_img.png")} />
            </div>
          </div>
        </div>
        <div className="row my-4 Reviews_home align-items-center">
          <div className="col-md-6 d-sm-block d-none">
            <div className="Review_img">
              <img src={commonimagepath("review_2.png")} />
            </div>
          </div>
          <div className="col-md-6 Review_right">
            <div className="Review_box">
              <h2>Display Profile Achievements</h2>
              <p>
                We tailor our achievements program awards badges to customers’
                and retailers’ user journey. As benchmark of their contributions
                to our inclusive community.
              </p>
            </div>
          </div>
          <div className="col-md-6 d-sm-none d-block">
            <div className="Review_img">
              <img src={commonimagepath("review_2.png")} />
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="Review_box">
              <h2>Retailer Release Hub</h2>
              <p>
                Promoting fairness and transparency on unfair distribution of
                limited edition releases. We provide each verified Retailer the
                space to come forward about their releases with transparency.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="Review_img">
              <img src={commonimagepath("review_3.png")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewAchievement;
