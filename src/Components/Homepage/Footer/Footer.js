import React from 'react'
import commonimagepath from "../../../Components/commonimagepath/commonimagepath"

const Footer = () => {
  return (
    <section className="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="footer_logo">
     
          <img src={commonimagepath("logo copy.png")} alt={"logo copy.png"} />
            <div className="footer_menu">
              <ul>
                <li>
                  <a href="#">@ 2023</a>
                </li>
                <li>
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Cookies</a>
                </li>
                <li>
                  <a href="#">Accessibility</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="footer_list">
            <ul>
              <li>
                <a href="#">HOME</a>
              </li>
              <li>
                <a href="#">SEARCH BRAND</a>
              </li>
              <li>
                <a href="#">CATEGORIES</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-2">
          <div className="footer_list">
            <ul>
              <li>
                <a href="#">NEWSLETTER SIGN UP</a>
              </li>
              <li>
                <a href="#">ABOUT US</a>
              </li>
              <li>
                <a href="#">HELP CENTER</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-2">
          <div className="footer_list">
            <ul>
              <li>
                <a href="#">LOG IN</a>
              </li>
              <li>
                <a href="#">SIGN UP</a>
              </li>
              <li>
                <a href="#">BUSINESS LOGIN</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Footer