import React from 'react'
import "./styles1.css"
import { FiMenu } from "react-icons/fi"

const Style = () => {
    // useEffect(() => {

    const openNav = () => {
        document.getElementById("mySidenav").style.width = "100%";
      }
      
      const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
      }
    
    const func = () => {
        var coll = document.getElementById("collapsible");
        coll.classList.toggle("active");
        var content = document.getElementById("hii");
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
    
      }
    


  return (
    <>
          <div className='landing-header'>
              <div className="header-sub-section">
                  <div className="logo-landing">
                      <div className="gg" onClick={(e) => { openNav()}}><FiMenu/></div>
                      <img src={require('./images/Siriuslogo.png')} alt="logo" />
                  </div>

                  <div id="mySidenav" className="sidenav2">
                      <ul>
                          <a href="javascript:void(0)" className="closebtn" onClick={(e) => { closeNav()}}>&times;</a>
                          <li>
                              <a href="#">About</a>
                          </li>
                          <li>
                              <a href="#">Features</a>
                          </li>
                          <li>
                              <a href="#">Pricing</a>
                          </li>
                          <li>
                              <a href="#">Help</a>
                          </li>
                          <li>
                              <a href="#">Contact</a>
                          </li>
                      </ul>
                  </div>
                  <div className="nav1">
                      <div id="mySidenav1" className="sidenav1">
                          <ul>
                              <li>
                                  <a href="#">About</a>
                              </li>
                              <li>
                                  <a href="#">Features</a>
                              </li>
                              <li>
                                  <a href="#">Pricing</a>
                              </li>
                              <li>
                                  <a href="#">Help</a>
                              </li>
                              <li>
                                  <a href="#">Contact</a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div id='login'>
                      <ul>
                          <li className="login-btn">
                              <a href="https://yokeaviation.ca/">Login</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <main>
              <div className="heroimage">
                  <h1>Fast & Efficient way to manage data in Pilot School.</h1>
                  <p>Pilot Schools can perchase this app for their daily tasks for maintaing students records and data. Students can update their profiles and request travel order and get approvals.</p>
                  <button className="get-started-btn">
                      Get Started
                  </button>
              </div>
              <div className="about-section">
                  <h2>About Yoke</h2>
                  <p>Yoke app is created for Pilot School Management Syetem. In our research, we found that one of the pilot school in Philippines, uses excel sheets for maintaing their students records and information. Whenever they need to update or search something, it becomes hard for them to organise students data regarding flights and licenses with traditional methods. For this reason, our team decided to create an app which will save time and organise data and records with an effective way. The admin can approve or decline students travel requests in a simple and easy way. The documents and licenses of students can be varified by the Admin. Apart from this, students can aslo use this app for updating their information in their profiles and request travel order within a second and got approval with the app features.
                  </p>
              </div>
              <div className="app-features">
                  <h2>App Features</h2>
                  <section className="first-feature">
                      <img src={require("./images/simon.png")} alt="feature-image"/>
                          <h3>Data Management & Verification</h3>
                          <p>The main feature is to maintain data and records of students by the Admin. Admin can varify documents of students before giving them approval for flight. Admin can send the approvals to Flight Coordinator in a easy way.</p>
                      </section>
                  <section className="second-feature">
                      <img src={require("./images/lukas.png")} alt="feature-image"/>
                          <h3>Documents Upload & Travel Order Request</h3>
                          <p>Students can upload and update their documents in their profiles for Admin's verification. They can also send request for the travel order. Student can also check their previous history of flights.</p>
                      </section>
                  <section className="first-feature">
                      <img src={require("./images/pexelscomp.png")} alt="feature-image"/>
                          <h3>Connect on Any Device</h3>
                          <p>This app is user friendly. It can be oprated on desktop as well as on mobile. Due to its responsive behavior, user can access this app on any gadget like desktops, tablets, mobile etc.</p>
                      </section>
              </div>
              <div className="testimonials">
                  <h2>Testimonials</h2>
                  <p className="testimonials-para">"As an admin of a Pilot School, its hard for me to do the daily tasks of handling records and giving approvals to student pilots for
                      their flights."</p>
                  <h3>John Deo</h3>
              </div>
              <div className="plans">
                  <h2>Our Plans</h2>
                  <div className="ourplans">
                      <div className="plan-one">
                          <h3>Freemium</h3>
                          <div className="charges">
                              <h1>$0</h1>
                              <h3>/month</h3>
                          </div>
                          <ul>
                              <li>50 Profile Accessible</li>
                              <li>Can give approvals for 1 month only</li>
                              <li>Student can Upload Documents only for one time</li>
                          </ul>
                          <button className="plan-btn">Start Trail</button>
                      </div>
                      <div className="plan-two">
                          <h3 className="pre">Premium</h3>
                          <div className="charges">
                              <h1>$30</h1>
                              <h3>/month</h3>
                          </div>
                          <ul>
                              <li>Unlimited Access for Admin</li>
                              <li>Unlimited Access for Students</li>
                              <li>Students will be able to request more than 10 times in a month</li>
                          </ul>
                          <button className="plan-btn getse">Get Started</button>
                      </div>
                  </div>
              </div>
              <div className="faq-section">
                  <h2>FAQ</h2>
                  <div className="fac-one">
                      <div className="heading-background">
                          <h3>What is the main feature of Yoke</h3>
                          <span  id="collapsible" onClick={(e) => { func()}}></span>
                  </div>
                  <div id="hii">
                      <p id="hello">Yoke app is created for Pilot School Management System. The admin can approve or decline students travel requests in a simple and easy way. The documents and licenses of students can be varified by the Admin. Apart from this, students can aslo use this app for updating their information in their profiles and request travel order within a second and got approval with the app features.</p>
                  </div>
              </div>
              <div className="fac-two">
                  <div className="heading-background">
                      <h3>How much is the cost of this app?</h3>
                      <span id='collapsible1'></span>
              </div>
              <div id="hola">
                  <p>Yoke app is created for Pilot School Management System. The admin can approve or decline students travel requests in a simple and easy way. The documents and licenses of students can be varified by the Admin. Apart from this, students can aslo use this app for updating their information in their profiles and request travel order within a second and got approval with the app features.</p>
              </div>
          </div><div className="fac-three">
              <div className="heading-background">
                  <h3>Can students use it free of cost?</h3>
                  <span id="collapsible2"></span>
          </div><div id="haha">
              <p>Yoke app is created for Pilot School Management System. The admin can approve or decline students travel requests in a simple and easy way. The documents and licenses of students can be varified by the Admin. Apart from this, students can aslo use this app for updating their information in their profiles and request travel order within a second and got approval with the app features.</p>
          </div>
        </div>
            <div className="fac-four">
                <div className="heading-background">
                    <h3>Do I need training to use this app?</h3>
                    <span id="collapsible3"></span>
                </div>
                <div id="hehe">
                <p>Yoke app is created for Pilot School Management System. The admin can approve or decline students travel requests in a simple and easy way. The documents and licenses of students can be varified by the Admin. Apart from this, students can aslo use this app for updating their information in their profiles and request travel order within a second and got approval with the app features.</p>
            </div>
        </div>
        </div>
    </main>
    <div className="newsletter">
        <h2>Fast & Efficient way to manage data in Pilot School.</h2>
        <div className="news-data">
            <p>Pilot Schools can perchase this app for their daily tasks for maintaing students records and data. Students can update their profiles and request travel order and get approvals.</p>
        </div>
<div className="foot">
            <input type="text" name="e-mail" id="e-mail" placeholder="Enter Your Email"/>
            <div className="news-btn">
            <input type="button" value="Get a Demo" className="demo-btn"/>
            </div>
        </div>
    </div>
    </>

  )
}

export default Style