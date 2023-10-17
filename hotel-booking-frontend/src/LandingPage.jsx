import { useState, useEffect } from "react";
import './Landing.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useTypingText } from "./components/TypingEffect";
import { useNavigate } from 'react-router-dom';
import RotatingModel from "./components/RotatingRoom";
import GlbViewer from './components/RotatingRoom.jsx';

function LandingPage() {
    const navigate = useNavigate();

    if (localStorage.getItem('username')) {
        // Remove the item from local storage
        localStorage.removeItem('username');
        console.log(`Item removed from local storage.`);
    } else {
        console.log(`Item does not exist in local storage.`);
    }

    const scrollToLoginSection = () => {
        const loginSection = document.getElementById('loginsection');
        
        if (loginSection) {
          loginSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const GoToRegisterPage = () => {
        navigate('/register')
    }
    const { word, stop, start } = useTypingText(
        ['Villa', 'Cottage', 'Condo', 'Apartment', 'House', 'Mansion'],
        130,
        20
      );

    return (
        <div>
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light bg-white px-lg-3 py-lg-2shadow-sm sticky top ">
                <div className="container-fluid">
                    <a className="navbar-brand me-5 fw-bold fs-3 h-font" href="index.html">HOTEL</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active me-2" aria-current="page" href="/landingpage">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link me-2" href="/">Room</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link me-2" href="#">Facilities</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link me-2" href="#">Contact us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link me-2" href="#">About</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <button type="button" className="btn btn-outline-dark shadow-none me-lg-3 me-2" data-bs-toggle="modal" data-bs-target="#loginModal"  onClick={scrollToLoginSection}>
                                Login
                            </button>
                            <button type="button" className="btn btn-outline-dark shadow-none " data-bs-toggle="modal" data-bs-target="#registerModal" onClick={GoToRegisterPage}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            </div>

            <div className="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form>
                            <div className="container-fluid">
                                <div className="mb-3">
                                    <label className="form-label ">Email address</label>
                                    <input type="email" className="form-control shadow-none"/>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input type="password" class="form-control shadow-none"/>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <button type="submit" className=" btn btn-dark shadow-none">Login</button>
                                    <a href="javascript: void(0)" className="text-secondary text-decoration-none">Forgot Password?</a>
                                </div>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="registerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form >
                            <div className="modal-header">
                                <h5 className="modal-title d-flex align-items-center " >
                                    <i className="bi bi-person-lines-fill fs-3 me-2"></i>
                                    User Registeration</h5>
                                <button type="reset" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <span class="badge rounded-pill bg-light text-dark mb-3 text-wrap lh-base">
                                Note: Your details must match with your ID (Adhaar Card,Passport, Driving License, etc.)
                                that will be required during check-in.
                                </span>

                                {/* <!-- Carosel --> */}
                                <div className="container-fluid px-lg-4 mt-4">
                                    <div className="row">
                                        <div className="col-md-6 ps-0 mb-3">
                                            <label classNames="form-label">Name</label>
                                            <input type="email" className="form-control shadow-none"/>
                                        </div>
                                        <div className="col-md-6 p-0 mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control shadow-none"/>
                                        </div>
                                        <div className="col-md-6 ps-0 mb-3">
                                            <label className="form-label">Phone Number</label>
                                            <input type="number" className="form-control shadow-none"/>
                                        </div>
                                        <div className="col-md-6 p-0 mb-3">
                                            <label className="form-label">Picture</label>
                                            <input type="file" className="form-control shadow-none"/>
                                        </div>
                                        <div className="col-md-12 p-0 mb-3">
                                            <label className="form-label">Address</label>
                                            <textarea className="form-control shadow-none" rows="1"></textarea>
                                        </div>
                                        <div className="col-md-6 ps-0 mb-3">
                                            <label className="form-label">Pincode</label>
                                            <input type="number" className="form-control shadow-none"/>
                                        </div>
                                        <div className="col-md-6 p-0 mb-3">
                                            <label className="form-label">Date of Birth</label>
                                            <input type="date" className="form-control shadow-none"/>
                                        </div>
                                        <div className="col-md-6 ps-0 mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="password" className="form-control shadow-none"/>
                                        </div>
                                        <div class="col-md-6 p-0 mb-3">
                                            <label className="form-label">Confirm Password</label>
                                            <input type="password" className="form-control shadow-none"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center ny-1">
                                    <button type="submit" className=" btn btn-dark shadow-none">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        {/* Check point */}

            <div id="firstcon" >
                <h2>Find Your Perfect Hotel You Stay</h2>
                <h2>You Find It, We Got It</h2>
                <h2>{word}</h2>
                <br />
                <br />

                <div className="row">
                    <div className="col-lg-12 shadow p-4 rounded">
                        <div className="row align-items-end">
                            <div className="col-lg-3 mb-3">
                                <a id="link" href="#">Location</a>
                            </div>
                            <div className="col-lg-3 mb-3">
                                <a id="link" href="#">Booking</a>
                            </div>

                            <div className="col-lg-3 mb-3">
                                <a id="link" href="/">Rooms</a>
                            </div>

                            <div className="col-lg-1 mb-lg-3 nt-2">
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div id="secondcon">
                <h2>Featured</h2>
            </div>

            <div>
            {/* Our Rooms */}
            <div className="container" />
                <div className="row">

                    <div id="cardcon" class="col-lg-3 col-md-6 ny-3">
                        <div  id="cardborder0shadow" class="card border-0 shadow" >
                            <img src={require("./assets/hotelimg.png")} class="card-img-top" ></img>
                            <div class="card-body"> 
                                <h5> Room </h5>
                                <h6 class="mb-4">₹2500 per night</h6>
                                <div class="features mb-4">
                                    <h6 class="mb-1">Basics</h6>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    2 Rooms
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    1 Bathrooms
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    1 Balcony
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    2 Sofa
                                    </span>
                                </div>
                                <div class="features mb-4">
                                    <h6 class="mb-1">Amenities</h6>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    AC
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    Internet
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    Television
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    Room heater
                                    </span>
                                </div>
                                <div class="rating mb-4">
                                    <h6 class="mb-1">Rating</h6>
                                    <span class="badge rounded-pill bg-light">
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    </span>
                                </div>
                                <div class="d-flex justify-content-evenly mb-2">
                                    <a href="#" class="btn btn-sm text-white custom-bg shadow-none">Book Now</a>
                                    <a href="#" class="btn btn-sm btn-outline-dark shadow-none">More details</a>
                                </div>
                            </div>	
                        </div>
                    </div>


                    <div id="cardcon" class="col-lg-3 col-md-6 ny-3">
                        <div id="cardborder0shadow" class="card border-0 shadow" >
                            <img src={require("./assets/hotelimg.png")} class="card-img-top"></img>
                            <div class="card-body"> 
                                <h5>Room </h5>
                                <h6 class="mb-4">₹700 per night</h6>
                                <div class="features mb-4">
                                    <h6 class="mb-1">Features</h6>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    1 Room
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    1 Bathrooms
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    1 Sofa
                                    </span>
                                </div>
                                <div class="features mb-4">
                                    <h6 class="mb-1">Features</h6>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    AC
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    Internet
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    Room heater
                                    </span>
                                </div>
                                <div class="rating mb-4">
                                    <h6 class="mb-1">Rating</h6>
                                    <span class="badge rounded-pill bg-light">
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-half text-warning"></i>
                                    <i class="bi bi-star text-warning"></i>
                                    </span>
                                </div>
                                <div class="d-flex justify-content-evenly mb-2">
                                    <a href="#" class="btn btn-sm text-white custom-bg shadow-none">Book Now</a>
                                    <a href="#" class="btn btn-sm btn-outline-dark shadow-none">More details</a>
                                </div>
                            </div>
                        </div>
                    </div>	


                    <div id="cardcon" class="col-lg-3 col-md-6 ny-3">
                        <div id="cardborder0shadow" class="card border-0 shadow" >
                            <img src={require("./assets/hotelimg.png")} class="card-img-top"></img>
                            <div class="card-body"> 
                                <h5> Room </h5>
                                <h6 class="mb-4">₹2500 per night</h6>
                                <div class="features mb-4">
                                    <h6 class="mb-1">Features</h6>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    2 Rooms
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    1 Bathrooms
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    1 Balcony
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    2 Sofa
                                    </span>
                                </div>
                                <div class="features mb-4">
                                    <h6 class="mb-1">Features</h6>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    AC
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    Internet
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    Television
                                    </span>
                                    <span class="badge rounded-pill bg-light text-dark text-wrap">
                                    Room heater
                                    </span>
                                </div>
                                <div class="rating mb-4">
                                    <h6 class="mb-1">Rating</h6>
                                    <span class="badge rounded-pill bg-light">
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <i class="bi bi-star-fill text-warning"></i>
                                    </span>
                                </div>
                                <div class="d-flex justify-content-evenly mb-2">
                                    <a href="#" class="btn btn-sm text-white custom-bg shadow-none">Book Now</a>
                                    <a href="#" class="btn btn-sm btn-outline-dark shadow-none">More details</a>
                                </div>
                            </div>	
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <hr></hr>
                <div style={{ display: 'flex' }}>
                    <div id="rotating-model" style={{ flex: 1 }}>
                        <GlbViewer />
                    </div>
                    <div id="rotatingcon-info" style={{ flex: 1, textAlign:"flex-start" ,padding: "20px" }}>
                        <h1>Hotel</h1>
                    </div>
                </div>

                <div id="loginsection">
                    {/* Login Section goes here  */}
                </div>
                
            </div>
            </div>	
        );}


export default LandingPage;
