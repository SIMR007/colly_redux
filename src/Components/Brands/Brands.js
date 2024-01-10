import React from "react";
import "../../../src/index.css";

import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";

import BrandsListView from "./BrandsListView/BrandsListView";
import BrandsGridView from "./BrandsGridView/BrandsGridView";

const Brands = () => {
  const [view, setView] = useState(true);

  const gridViewHandler = () => {
    setView(true);
  };

  const listViewHandler = () => {
    setView(false);
  };

  return (
    <>
      <section className="py-4">
        <div className="container">
          <h1 className="search_title">Search a retailer</h1>
          <div className="row">
            <div className="col-md-4">
              <Sidebar />
            </div>
            <div className="col-md-8">
              <div className="search_side_content">
                <div className="searc_header">
                  <form>
                    <div className="filter_box">
                      <label>Sort by</label>
                      <select>
                        <option selected disabled>
                          Recently Reviewed
                        </option>
                        <option>Reviewed</option>
                        <option>Recently</option>
                      </select>
                    </div>

                    <div className="filter_box">
                      <label>Filter</label>
                      <select>
                        <option selected disabled>
                          All
                        </option>
                        <option>Reviewed</option>
                        <option>Recently</option>
                      </select>
                    </div>

                    <div className="filter_box">
                      <label>Layout</label>

                      <select
                        onChange={(e) =>
                          e.target.value === "Grid View"
                            ? gridViewHandler()
                            : listViewHandler()
                        }
                      >
                        <option>Grid View</option>
                        <option>List View</option>
                      </select>
                    </div>

                    <div className="filter_box">
                      <a href="javasript:void(0)">RESET</a>
                    </div>
                  </form>
                </div>

                <div className="filter_body mt-3">
                  <div className="row">
                    {view && <BrandsGridView />}

                    {!view && <BrandsListView />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Brands;
