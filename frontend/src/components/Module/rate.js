import StarRatingComponent from 'react-star-rating-component';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from '../../utils/queryApi';
const Rate = ({id ,test }) => {
    var connectedUser = useSelector(selectConnectedUser)
    const [formData, setFormData] = useState({
      ratemodule: 1,
        user : connectedUser.id
      });

      const [userRate, setUsetRate] = useState(true);

      
     const onStarClick = (nextValue, prevValue, name) => {
        console.log(nextValue)
        formData.ratemodule= nextValue;
        queryApi('module/updateRating/'+id , formData, "PUT", false);
        setUsetRate(false);
        console.log(formData)
      }
      const { rating } = formData.ratemodule;
return (
    <div>
     {userRate==true  && test == true && 
    <StarRatingComponent 
      name="rate1" 
      starCount={5}
      value={rating}
      starColor={`#ffb400`}
      emptyStarColor={`#B8B8B8`}
      onStarClick={onStarClick.bind(this)}
    />}
    
    {userRate==false &&
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={formData.ratemodule}
          starColor={`#ffb400`}
          emptyStarColor={`#B8B8B8`}
          editing={false}
        />
      }
     
      
  </div>

)

}

export default Rate;