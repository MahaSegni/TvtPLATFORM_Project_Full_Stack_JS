import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, Route, useHistory } from "react-router-dom";


import "../assets/css/cardmodule.css";
export default function Home() {
    const history = useHistory();
    return(
        <>
        <section id="hero" class="d-flex justify-content-center align-items-center">
    <div class="container position-relative" data-aos="zoom-in" data-aos-delay="100">
      <h1>Learning Today,<br/>Leading Tomorrow</h1>
      <h2>We are team of talented designers making websites with Bootstrap</h2>
      <button class="btn btn-template" onClick={()=>history.push("/module")} >Get Started</button> 
    </div>
  </section>

<section id="counts" class="counts section-bg">
<div class="container">

  <div class="row counters">

    <div class="col-lg-3 col-6 text-center">
      <span data-purecounter-start="0" data-purecounter-end="1232" data-purecounter-duration="1" class="purecounter">1232</span>
      <p>Students</p>
    </div>

    <div class="col-lg-3 col-6 text-center">
      <span data-purecounter-start="0" data-purecounter-end="64" data-purecounter-duration="1" class="purecounter">64</span>
      <p>Courses</p>
    </div>

    <div class="col-lg-3 col-6 text-center">
      <span data-purecounter-start="0" data-purecounter-end="42" data-purecounter-duration="1" class="purecounter">42</span>
      <p>Events</p>
    </div>

    <div class="col-lg-3 col-6 text-center">
      <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" class="purecounter">15</span>
      <p>Trainers</p>
    </div>

  </div>

</div>
</section>

<section id="why-us" class="why-us">
      <div class="container" data-aos="fade-up">

        <div class="row">
          <div class="col-lg-4 d-flex align-items-stretch">
            <div class="content">
              <h3>Why Choose TVT Platform?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio ad corporis.
              </p>
              <div class="text-center">
                <a href="about.html" class="more-btn">Learn More <i class="bx bx-chevron-right"></i></a>
              </div>
            </div>
          </div>
          <div class="col-lg-8 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-boxes d-flex flex-column justify-content-center">
              <div class="row">
                <div class="col-xl-4 d-flex align-items-stretch">
                  <div class="icon-box mt-4 mt-xl-0">
                    <i class="bx bx-receipt"></i>
                    <h4>Corporis voluptates sit</h4>
                    <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                  </div>
                </div>
                <div class="col-xl-4 d-flex align-items-stretch">
                  <div class="icon-box mt-4 mt-xl-0">
                    <i class="bx bx-cube-alt"></i>
                    <h4>Ullamco laboris ladore pan</h4>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                  </div>
                </div>
                <div class="col-xl-4 d-flex align-items-stretch">
                  <div class="icon-box mt-4 mt-xl-0">
                    <i class="bx bx-images"></i>
                    <h4>Labore consequatur</h4>
                    <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
</>
    )
}