import StarRatingComponent from 'react-star-rating-component';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../Redux/slices/sessionSlice';
import { queryApi } from '../../utils/queryApi';
const Rate = ({ id, test, rat }) => {
  var connectedUser = useSelector(selectConnectedUser)
  const [formData, setFormData] = useState({
    ratemodule: 1,
    user: connectedUser.id
  });
  const [tot, setTot] = useState({
    ratetot: 0,
  });

  useEffect(() => {
    let sum = 0;
    if (rat?.length != 0) {
      for (let i = 0; i < rat?.length; i++) {
        sum += rat[i].ratemodule;
      }
      let moy = sum / (rat?.length);
      tot.ratetot = parseInt(moy, 10);
    } else {
      tot.ratetot = parseInt(0, 10);
    }
  })

  const onStarClick = (nextValue, prevValue, name) => {
    console.log(nextValue)
    formData.ratemodule = nextValue;
    if (rat.filter(r => r.user == connectedUser.id).length == 0) {
      queryApi('module/updateRating/' + id, formData, "PUT", false);
    } else {
      queryApi('module/editrating/' + id, formData, "PUT", false);
    }
  }
  const { rating } = formData.ratemodule;
  return (
    <div>
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={rating}
        starColor={`#ffb400`}
        emptyStarColor={`#B8B8B8`}
        onStarClick={onStarClick.bind(this)}
      />
    </div>
  )
}

export default Rate;