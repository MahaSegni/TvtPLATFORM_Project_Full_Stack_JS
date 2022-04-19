
import React, { useEffect, useState } from 'react';
import "../../assets/css/cardmodule.css"
import { useApi } from '../../utils/useApi';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const ListRecom = () => {
    var [modulerecom, setmodulerecom] = useApi('module/modulerecom', null, 'GET', false);

    return (
        <>
        <div class="breadcrumbs">
        <div class="container">
          <h2>Recommendation</h2>
       </div>
      </div>
      <br/>
             <div className='container'>
            <Carousel class="carousel carousel-dark slide" >
            {modulerecom && modulerecom.map((e) => (
                
                            <div class="mySlides ">
                                   <a href={e.lien}> <img class="img-fluid" src={e.img} alt=""  />
                                        <div class="text">{e.title}</div> </a>
                                    
                            </div>
                        ))}
            
            </Carousel>
        </div>
        </>

    )

}

export default ListRecom;