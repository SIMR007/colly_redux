import React from 'react'
import commonimagepath from "../../../Components/commonimagepath/commonimagepath"

const HeaderSection = () => {
  return (
    <section className="banner">
    <div className="container_x">
      <div className="row">
        <div className="col-md-6">
          <div className="banner_content">
            <h1>Fairness in Limited Edition Releases</h1>
            <p>
              "tbd is highlighting commitment to balancing the
              <br /> scales in limited edition releases.
            </p>
            <div className="btn_search">
              {/* <i className="fa-solid fa-magnifying-glass" /> */}
              <button><img src={commonimagepath('Img_s.png')} /> BRAND SEARCH</button>
              
              <button className="join_btn">JOIN NOW</button>
            </div>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <div className="banner_img">
            <img src={commonimagepath('logo copy 2.png')} alt={"logo copy 2.png"}/>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default HeaderSection