// import React from 'react'
// import SidebarFilterContext from '../../../Pages/store/sidebarFilterContext';
// import StarRating from '../../DashBoard/StarRating/StarRating';
// import { useContext,useMemo } from 'react';

// import { Link } from 'react-router-dom';
// import { Loader } from '../../../Components//Loader/Loader';
// import commonimagepath from "../../../Components/commonimagepath/commonimagepath"

// const BrandsGridView = () => {


//     const ctx = useContext(SidebarFilterContext);
//   // Use useMemo to memoize the filtered products array
//     const reversedBrands = useMemo(() => ctx.filteredProducts, [ctx.filteredProducts]);   
//   const loading = ctx.isLoading 

//   const filteredProducts = reversedBrands.slice().reverse();


 
//   return (
    
//         <div className='row'>
//          {loading ? <Loader/> :   filteredProducts.map((product) => (
//           <div className="col-md-6 col-lg-4 mt-4" key={product.id}>
//             <div className="filter_item">
//               <div className="item_head">
//                 <div className="item_rev">
//                   <img src={product.images} alt="Review" />
//                   <div className="item_data">
//                     <h1>
//                       {product.brand_name} <sub>(824 reviews)</sub>     {/**here reviews should come from backend  it might be  if reviews's nodes's brandid ==  brands's nodes's id's   means () reviews.brsndid == brands.id   same in the BrandListView  and there followers should also be displayed from thhe backend  )*/}
//                     </h1>
//                     <p>
//                       {" "}
//                       <StarRating rating={product.rating} />{" "}
//                       <span>{product.rating}</span>
//                     </p>
//                   </div>
//                 </div>
//                 <img src={commonimagepath("Star11.svg")} alt="Star11" className="star11" />
//               </div>

//               <ul className="fil_list">
//                 <li>
//                   <span>
//                   <img src={commonimagepath("Price.svg")} alt="Star11" className="star11" />
//                   </span>{" "}
//                   {product.price}
//                 </li>
//                 <li>
//                   <span>
//                     <img src={commonimagepath("location.svg")} alt="Star11" className="star11" />
//                   </span>{" "}
//                   {product.location}
//                 </li>
//                 <li>
//                   <span>
//                   <img src={commonimagepath("Retail-categories.svg")} alt="Star11" className="star11" />
//                   </span>
//                   {product.retailcategories}
//                 </li>
//               </ul>

//               <div className="user_social">
//                 <a href="#">
//                 <img src={commonimagepath("web.svg")} alt="Star11" className="star11" />
//                 </a>
//                 <a href="#">
//                 <img src={commonimagepath("mail.svg")} alt="Star11" className="star11" />
//                 </a>
//                 <a href="#">
//                 <img src={commonimagepath("twit.svg")} alt="Star11" className="star11" />
//                 </a>
//                 <a href="#">
//                 <img src={commonimagepath("insta.svg")} alt="Star11" className="star11" />
//                 </a>
//               </div>
              
//               <div className="item_footer">
//               <Link to={`/dashboard/${encodeURIComponent(product.id)}`}>REVIEW</Link>

//                 <a href="#">VIEW</a>
//               </div>
//             </div>
//           </div>
//         ))}
      
//         </div>
    
//   )
// }

// export default BrandsGridView








// ----------------------implementing same logic via redux ---------------------
import React from 'react'
import StarRating from '../../DashBoard/StarRating/StarRating';
import {useMemo,useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Loader } from '../../../Components//Loader/Loader';
import commonimagepath from "../../../Components/commonimagepath/commonimagepath"
import { useSelector,useDispatch } from 'react-redux';
import { fetchBrandData } from '../../../Pages/store/filterBrandActions';
const BrandsGridView = () => {
  const dispatch = useDispatch();

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchBrandData());
  }, [dispatch]);

  // Select data from the Redux store
  const filteredBrands = useSelector((state) => state.filterBrands.filteredBrands);
  const loading = useSelector((state) => state.filterBrands.isLoading);

  // Check if data is available
  if (loading) {
    return <Loader />;
  }
  
  return (
    
        <div className='row'>
         {loading ? <Loader/> :   filteredBrands.map((product) => (
          <div className="col-md-6 col-lg-4 mt-4" key={product.id}>
            <div className="filter_item">
              <div className="item_head">
                <div className="item_rev">
                  <img src={product.images} alt="Review" />
                  <div className="item_data">
                    <h1>
                      {product.brand_name} <sub>(824 reviews)</sub>     {/**here reviews should come from backend  it might be  if reviews's nodes's brandid ==  brands's nodes's id's   means () reviews.brsndid == brands.id   same in the BrandListView  and there followers should also be displayed from thhe backend  )*/}
                    </h1>
                    <p>
                      {" "}
                      <StarRating rating={product.rating} />{" "}
                      <span>{product.rating}</span>
                    </p>
                  </div>
                </div>
                <img src={commonimagepath("Star11.svg")} alt="Star11" className="star11" />
              </div>

              <ul className="fil_list">
                <li>
                  <span>
                  <img src={commonimagepath("Price.svg")} alt="Star11" className="star11" />
                  </span>{" "}
                  {product.price}
                </li>
                <li>
                  <span>
                    <img src={commonimagepath("location.svg")} alt="Star11" className="star11" />
                  </span>{" "}
                  {product.location}
                </li>
                <li>
                  <span>
                  <img src={commonimagepath("Retail-categories.svg")} alt="Star11" className="star11" />
                  </span>
                  {product.retailcategories}
                </li>
              </ul>

              <div className="user_social">
                <a href="#">
                <img src={commonimagepath("web.svg")} alt="Star11" className="star11" />
                </a>
                <a href="#">
                <img src={commonimagepath("mail.svg")} alt="Star11" className="star11" />
                </a>
                <a href="#">
                <img src={commonimagepath("twit.svg")} alt="Star11" className="star11" />
                </a>
                <a href="#">
                <img src={commonimagepath("insta.svg")} alt="Star11" className="star11" />
                </a>
              </div>
              
              <div className="item_footer">
              <Link to={`/dashboard/${encodeURIComponent(product.id)}`}>REVIEW</Link>

                <a href="#">VIEW</a>
              </div>
            </div>
          </div>
        ))}
      
        </div>
    
  )
}

export default BrandsGridView

