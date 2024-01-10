import React, { useState } from "react";
import { useEffect } from "react";
import commonimagepath from "../../../commonimagepath/commonimagepath";
import { useParams } from "react-router-dom";

const ReleaseChannels = (props) => {
  const [brandCategoryData, setBrandCategoryData] = useState([]);

  const { brand_id: brandId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://c-olly-default-rtdb.firebaseio.com/brandcategory.json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        const dataArray = Object.keys(responseData).map((key) => ({
          id: key,
          ...responseData[key],
        }));

        const filteredData = dataArray.filter(
          (item) => item.brandid === brandId
        );

        setBrandCategoryData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchData();
  }, []);

  const releaseChannelHandler = (id) => {
    props.releaseChannelSideBarIds(id);
  };

  return (
    <>
      <div class="col-xl-3 col-lg-4 col-md-5">
        <div className="sidebar_left">
          <h2 className="mb-4">Release Channels</h2>
          <div className="sidebar_left_tabs">
            {brandCategoryData.map((brand) => (
              <button onClick={() => releaseChannelHandler(brand.id)}>
                {brand.categories}
                <span>
                  <img className="mr-2" src={commonimagepath("Star 9.svg")} alt="" />
                  4.5
                </span>
              </button>
            ))}
          </div>
          {/* <button className="sidebar_left_view-all">VIEW ALL</button> */}
        </div>
      </div>
    </>
  );
};

export default ReleaseChannels;
