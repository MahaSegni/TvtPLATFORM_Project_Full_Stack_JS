
import React, { useEffect, useState } from 'react';
import "../../assets/css/cardmodule.css"
import { useApi } from '../../utils/useApi';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const ListRecom = () => {
    var [modulerecom, setmodulerecom] = useApi('module/modulerecom', null, 'GET', false);
    /*
    
      <div class="breadcrumbs">
            <div class="container">
              <h2>Recommendation</h2>
           </div>
          </div>
    
          */
    return (
        <>
            <div class="container" data-aos="fade-up">

                <div class="row" data-aos="zoom-in" data-aos-delay="100">
                    {modulerecom && modulerecom.map((e) => (
                        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                            <div class="course-item" id="mydiv">

                                <div  >
                                    {e.img != null &&
                                        <img class="img-fluid" alt="..." src={e.img} style={{ height: "200px", width: "330px" }} />
                                    }
                                    {e.img == null &&
                                        <img class="img-fluid" src={require('../../assets/img/Courses.jpg')} alt="" style={{ height: "200px", width: "400px" }} />}
                                </div>
                                <div class="course-content">
                                    <h3><a href={e.lien}>{e.title}</a></h3>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!modulerecom && <><div class="spinner-border text-success" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <br/></>}

                </div>
            </div>
        </>

    )

}

export default ListRecom;