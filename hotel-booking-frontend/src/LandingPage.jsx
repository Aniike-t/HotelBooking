import { useState, useEffect } from "react";
import './Landing.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useTypingText } from "./components/TypingEffect";
import { useNavigate } from 'react-router-dom';
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

      const [scrollY, setScrollY] = useState(0);

        useEffect(() => {
            const handleScroll = () => {
            setScrollY(window.scrollY);
            };

            window.addEventListener("scroll", handleScroll);

            return () => {
            window.removeEventListener("scroll", handleScroll);
            };
        }, []);
        const parallaxAmount = 0.2; 

    return (
        <div className="landing-page">
            
        <div className="section" >
            <div id="section1topnavbar">
            <nav id="section1topnavbar" className="navbar navbar-expand-lg navbar-light bg-light bg-white px-lg-3 py-lg-2shadow-sm sticky top ">
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

            <div id="firstcon" >
                <div>
                    <h2>Open The </h2>
                    <h2>Door For A </h2>
                    <h2>Spacious </h2>
                    <h2>Living - </h2>
                    <h2>{word}</h2>
                    <img style={{
                        position: "absolute",
                        marginTop: -670 + scrollY * parallaxAmount, // Apply parallax effect
                        zIndex: 2,
                        pointerEvents: "none",
                        transition: "transform 0.3s ease-out",
                        }} src={require("./assets/houseimglanding.png")} alt="image" />
                </div>
            </div>
            </div>

            <div>
                <div id="rownavbarcontainer" className="row" style={{ position: 'relative', width:"50vw",marginLeft: "25vw" }}>
                    <div id="rownavbarcontainer" className="col-lg-12 shadow p-4 rounded">
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

            <div  >
                <div style={{ position: 'relative'  }}>
                {/* Our Rooms */}
                <div className="container" style={{ position: 'relative' }}/>
                    <div className="row" style={{backgroundColor: "#CAC7B9",height:"100vh",padding:"30px",borderRadius:"50px",width:"95vw",marginLeft:"2.5vw",marginBottom:"10px"}}>

                        <div id="cardcon" class="col-lg-3 col-md-6 ny-3">
                            <div id="secondcon" style={{
                                                        position: "relative",
                                                        marginLeft: 10,
                                                        marginTop:  scrollY * parallaxAmount,
                                                        zIndex: 2,
                                                        pointerEvents: "none",
                                                        transition: "transform 0.3s ease-out",
                                                        
                            }}>
                                <h2>OUR</h2>
                                <h2>FEATURED</h2>
                                <h2>HOTELS</h2>
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
                </div>

                <div className="section1" style={{backgroundColor:"#333333",padding:"30px",borderRadius:"50px",width:"95vw",marginLeft:"2.5vw",marginBottom:"10px"}} >
                    <div style={{ display: 'flex' }}>
                        <div id="rotating-model" style={{ flex: 1 }}>
                            <GlbViewer />
                        </div>
                            <div id="hotelamenties" style={{ flex: 1, textAlign:"start" ,padding: "20px" }}>

     
                            </div>
                        </div>
                    </div >
                </div>

                <div className="section1" style={{backgroundColor:"#EAEAE6",padding:"30px",borderRadius:"50px",width:"95vw",marginLeft:"2.5vw",marginBottom:"10px"}}>
                    <div id="loginsection">
                        {/* Login Section goes here  */}
                    </div>
                </div>

                
            
            </div>	
        );}


export default LandingPage;
