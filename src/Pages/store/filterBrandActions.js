import { filterBrandActions } from "./filterBrand-slice";

export const fetchBrandData  =  () => {
    return async(dispatch) => {
        
        const fetchData = async() => {                      //NOTE: if we have defined a differnt method for loading , then here we can use that here and then we did not need to define { brandData:[]} only loading payload will be fine 
            dispatch(filterBrandActions.showBrands({brandData:[],loading:true}))    // we define brandData:[] here bcz otherwise we get an error here     Cannot read properties of undefined (reading 'slice')
                const response = await fetch(
                  "https://c-olly-default-rtdb.firebaseio.com/brands.json"
                );
        
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const responseData = await response.json();
                const dataArray = Object.keys(responseData).map((key) => ({
                  id: key,
                  ...responseData[key],
                }));
                
                // dispatch(filterBrandActions.showBrands({brandData:[],loading:false}))
                dispatch(filterBrandActions.showBrands( {brandData:dataArray,loading:false}))
              return dataArray ;
                
        }

        try {
             const data =  await fetchData()
             console.log("fetchedBrands via redux ", data)
            // let filterProduct = data
            // console.log("filterProduct",filterProduct)
          
             
        } catch (error) {
            console.log(error.message)
        }

    }
}

