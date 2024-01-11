
import React from 'react'
import SidebarFilterContext from '../../../Pages/store/sidebarFilterContext';

import StarRating from '../../DashBoard/StarRating/StarRating';
import { useContext,useMemo } from 'react';

import commonimagepath from "../../../Components/commonimagepath/commonimagepath"


const BrandsListView = () => {

    const ctx = useContext(SidebarFilterContext);
  // Use useMemo to memoize the filtered products array
    const reversedBrands = useMemo(() => ctx.filteredProductsByRating, [ctx.filteredProductsByRating]);   
  const loading = ctx.isLoading 

  const filteredProducts = reversedBrands.slice().reverse();


  return (
    <div className="">
        {filteredProducts.map((BrandListView) => (

      
                    <div className="retailer_list_viwe">
                        <div className="row">
                            <div className="col-md-4 p-0">
                                <div className="retailer_list_Reviews">
                                    <div className="retailer_list">
                                    <div className="item_rev">
                                        <img src={BrandListView.images} alt="Logobrnd" />
                                        <div className="retailer_list_rating">
                                        <div className="item_data">
                                            <h3 className="m-0">{BrandListView.brand_name}<sub>(824 reviews)</sub></h3>
                                         
                                            {/* <img src={commonimagepath("star.png")} alt="Logobrnd" /> */}
                                            <p>
                      {" "}
                      <StarRating rating={BrandListView.rating} />{" "}
                      <span>{BrandListView.rating}</span>
                    </p>
                    </div>
                                        </div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19"
                                            viewBox="0 0 21 19" fill="none">
                                            <path
                                                d="M9.07341 2.00886C9.52244 0.626889 11.4776 0.626889 11.9266 2.00885L12.8309 4.79204C13.1656 5.82209 14.1255 6.5195 15.2085 6.5195H18.135C19.588 6.5195 20.1922 8.37892 19.0166 9.23302L16.6491 10.9531C15.7729 11.5897 15.4062 12.7182 15.7409 13.7482L16.6452 16.5314C17.0943 17.9134 15.5126 19.0626 14.337 18.2084L11.9695 16.4883C11.0932 15.8517 9.90675 15.8517 9.03054 16.4883L6.66302 18.2085C5.48745 19.0626 3.90573 17.9134 4.35476 16.5314L5.25907 13.7482C5.59375 12.7182 5.22711 11.5897 4.35089 10.9531L1.98337 9.23302C0.807798 8.37892 1.41196 6.5195 2.86505 6.5195H5.79146C6.87453 6.5195 7.83442 5.8221 8.1691 4.79204L9.07341 2.00886Z"
                                                stroke="#2D2D2D" />
                                        </svg>
                                    </div>
                                    <div
                                        className="Followers_Reviews w-100 d-flex justify-content-between align-items-center ">
                                        <p className="m-0"><b>814</b> Reviews</p>
                                        <p className="m-0"><b>314</b> Followers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 p-0">
                                <div className="retailer_list_Reviews">
                                    <div className="retailer_Categories">
                                        <div className="d-flex align-items-center">
                                           
                                            <img src={commonimagepath("Grid.svg")} alt="Logobrnd" />
                                            <h5 className="m-0 ml-2">Categories</h5>
                                        </div>
                                        <div className="retailer_Categories_main">
                                            <p>{BrandListView.retailcategories}</p>
                                            
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-3 p-0">
                                <div className="retailer_list_Reviews  retailer_list_about">
                                    <h4>About</h4>
                                    <p className="m-0">{BrandListView.about
}</p>
                                </div>
                            </div>
                            <div className="col-md-2 p-0">
                                <div className="retailer_list_social border-none">
                                    <div className="social_icons d-md-flex h-100 w-100     ">
                                        <div className=" p-0">
                                            <div className="user_social_retailer mt-2">
                                                <a href="#" >
                                                   
                                                    <img  className="mb-2 d-md-block" src={commonimagepath("web.svg")} alt="web" />
                                                </a>
                                                <a href="#">
                                                    
                                                    <img  className="mb-2 d-md-block" src={commonimagepath("mail.svg")} alt="Mail" />
                                                </a>
                                                <a href="#">
                                               
                                                <img  className="mb-2 d-md-block" src={commonimagepath("twit.svg")} alt="Twitter" />
                                                </a>
                                                <a href="#">
                                                   
                                                    <img  className="mb-2 d-md-block" src={commonimagepath("insta.svg")} alt="Instagram" />
                                                </a>
                                            </div>

                                        </div>
                                        <div className=" p-0 w-100">
                                            <div className="user_social_viwe">
                                                <h6 className='mr-2'>VIEW</h6>
                                            </div>
                                          
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                       ))}
                </div>
          

  )
}

export default BrandsListView