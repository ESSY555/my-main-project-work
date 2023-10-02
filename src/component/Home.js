import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
const Home =()=> (
 <Fragment className='bg-dark'>
 <Helmet>
 <title className="title">Quiz app - Home</title>
 </Helmet>
 <div className='pp'>
 <nav id="nnav-b" class="pe-5 navbar text-light navbar-expand-lg bg-body-tertiary text-center  ps-3">
 <div class="nav-con container-fluid text-md-center">
 <div className="alien-part justify-content-center col-xm-6 col-md-4 col-sm-4 col-lg-3 d-flex">
 <p className="footer-hover fs-4">ESSY</p>
 <div>  <img class="qui-imag" src={require('../mainComponent/images/QUIZ1.png')} alt=""/></div>
 </div>
     <button class="navbar-toggler " type="button" data-bs-toggle="collapse"
         data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
         aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarSupportedContent"> 
         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
         </ul>
         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
             <li class="nav-item">
                 <a class="nav-link active" aria-current="page" href="#"><span
                         class=" nav-home nav-demo text-light">Home</span></a>  
             </li>
             <li class="nav-item">
                 <a class="nav-link active text-light" aria-current="page" href="#"><span class="nav-demo">About
                         Us</span></a>
             </li>
             <li class="nav-item">
                 <a class="nav-link active" aria-current="page" href="#"><span
                         class="nav-contact text-light">Help</span></a>
             </li>

         </ul>
         <ul class="navbar-nav me-1 mb-2 mb-lg-0">
             <li class="nav-item">
                 <a class="nav-link active" aria-current="page" href="SignIn"><button class="btn btn-dark">Login
                         </button></a>
             </li>

         </ul>
         <ul class="navbar-nav me-1 mb-2 mb-lg-0">
             <li class="nav-item">
                 <a class="nav-link active" aria-current="page" href="SignIn"><button class="btn btn-dark">Registration
                         </button></a>
             </li>

         </ul>
     </div>
 </div>
</nav>
</div>

<div>
<div className=' pt-5 container m-auto ps-5'>
<div className='row justify-content-between'>
<div className='col-md-9 pt-5'>
<h3><b>Daily Quiz, Daily Bonus- Play Today!</b></h3>
<p>Quiz is the daily Trivia and playing platform. it brings some exicting surprises every day</p>
<a href='SignIn'><button className='btn btn-primary'>Play Now</button></a>
</div>
<div className='col-md-3 pt-5'>
<img class="qui-ima img-fluid" src={require('../mainComponent/images/flag2.png')} alt=""/>
</div>
</div>
</div>


<div className='row mb-5 comple p-5 container m-auto'>
<div className='options text-light col-md-4 align-middle d-flex align-items-center'>
<div>
<h3 className=''>Choose the Option</h3>
<p>Go to study in the year of your choice</p>
</div>
</div>
<div className='col-md-8 p-5 mddd shadow-lg'>


<div className='row'>
<div className='col-md-12 midd-d shadow-lg d-flex justify-content-between border border-1'>
<div className='d-flex align-items-center'>
<div className=''><img className="w-75 "
src={require('../mainComponent/images/seecond1.JPG')} alt=""/></div>
<h1 className='pt-2 ms-5'><b> Daily Trivia</b></h1></div>
<a href='SignIn'><p className=' bbd pt-3'><button className=' text-dark pe-4'>start Now &#8594;</button></p></a>
</div>
<div className='col-md-12 midd-dg d-flex justify-content-between border border-1'>
<div className='d-flex align-items-center'>
<div className=''><img className="w-75 "
src={require('../mainComponent/images/second2.JPG')} alt=""/></div>
<h3 className='text-light pt-2 dialy-pla'> Daily play and win</h3></div>
<a href='SignIn'><p className=' bbc pt-3'><button className=' text-dark pe-4'>start Now &#8594;</button></p></a>
</div>
<div className='col-md-12 midd-dd text-dark d-flex justify-content-between shadow-lg border border-1'>
<div className='d-flex align-items-center'>
<div className=''><img className="w-75 "
src={require('../mainComponent/images/second3.JPG')} alt=""/></div>
<h3 className=' pt-2 ms-5 Play-Like-King'><b>Play Like King</b></h3></div>
<a href='SignIn'><p className=' bb pt-3'><button className=' text-dark pe-4'>start Now &#8594;</button></p></a>
</div>
<div>
</div>
<div>
</div>
</div>
</div>
</div>
</div>


<div
        className="row footer-secti px-3 pt-5 text-center text-light justify-content-between text-md-center container-fluid mt-5 bg-dark">
        <div className="alien-part col-xm-6 col-md-4 col-sm-4 col-lg-3 d-flex  justify-content-center">
        <p className="footer_hover fs-4 pt-4">ESSY</p>
        <div>  <img class="qui-imag" src={require('../mainComponent/images/QUIZ1.png')} alt=""/></div>
        </div>

        <div className="alien-part col-xm-6 col-md-4 col-sm-4 col-lg-3">
          <p className="footer_hover">Quick Link</p>
          <div>
            <p className="footer_hover">Login</p>
            <p className="footer_hover">Payment</p>
          </div>
        </div>

        <div className="alien-part col-xm-6 col-md-4 col-sm-4 col-lg-3">
          <p className="footer_hover">Menu</p>
          <p className="footer_hover">About Us</p>
          <p className="footer_hover">Help</p>
        </div>

        <div className="alien-part col-xm-6 col-md-4 col-sm-4 col-lg-3">
          <p className="footer_hover">Subscribe to the news letter</p>
          <div className="my-abso">
            <input type="text" className="my-formm form-control" placeholder="Email" />
            <img class="arro-imagg" src="images/arrow.png" alt="" />
          </div>



          <div class="row justify-content-between text-center pt-5 container-fluid pb-5">
            <div class="col-md-3">
              <p>@2023 Quiz App</p>
            </div>
            <div class="col-md-9">
              <div class="row">
                <p class="col-md-6 col-lg-3">Terms</p>
                <p class="col-md-6 col-lg-3">Privacy policy</p>
                <p class="col-md-6 col-lg-3">Ligal notice</p>
                <p class="col-md-6 col-lg-3">Accessibility</p>
              </div>
            </div>
 
            <div>
            <div class="col-12 justify-content-between pb-5 pt-3 p-3">
              <i class="pe-3 fa-brands fa-youtube"></i>
              <i class="pe-3 ffac fa-brands fa-facebook"></i>
              <i class="pe-3 fa-brands fa-twitter"></i>
              <i class="pe-3 fa-brands fa-instagram"></i>
              <i class="pe-3 fa-brands fa-linkedin"></i>
            </div>
            </div>
          </div>
        </div>

      </div>

 </Fragment>
  
);
export default Home;

