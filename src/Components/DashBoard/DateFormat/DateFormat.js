import React from 'react';

const formatDate = (inputDate) => {
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(inputDate);
    const monthAndDay = date.toLocaleDateString('en-US', options);
    const dayWithSuffix = addSuffixToDay(date.getDate());
  
    return `${monthAndDay}`;
  };
  
  const addSuffixToDay = (day) => {
    // if (day >= 11 && day <= 13) {
      // return `${day}`;
    // }
    // switch (day % 10) {
    //   case 1:
    //     return `${day}`;
    //   case 2:
    //     return `${day}`;
    //   case 3:
    //     return `${day}`;
    //   default:
    //     return ``;
    // }
  };
  

const DateFormat = (props) => {
//   const originalDate = date;
  const formattedDate = formatDate(props.date);

  return (
    <>
     {formattedDate}
    </>
  );
};

export default DateFormat;
