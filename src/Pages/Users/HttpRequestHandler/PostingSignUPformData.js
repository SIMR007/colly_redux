
import React from 'react'
import FormSignup from '../FormSignup/FormSignup';

const PostingSignUPformData = (props) => {

    const postSubmitHandler = async (enteredData) => {
      try{
        const response   =  await  fetch("https://c-olly-default-rtdb.firebaseio.com/userprofile.json", {
          method: "POST",
          body: JSON.stringify(enteredData),
          headers: {
            "Content-type": "Application.json",
          },
        });

        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const postedData = await response.json();
        console.log('posting dataaa ',postedData);
      } catch(error){
        console.error('Error posting data:', error.message);
      }

      

    };


    
    

  return (
    <div>
        <FormSignup onSubmitSignupData={postSubmitHandler}/>
        {/* <ToastContainer /> */}
    </div>
  )
}

export default PostingSignUPformData