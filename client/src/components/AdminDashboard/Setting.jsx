import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext'; 
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Settingstyle.css";

const fetchTasks = async (admin_id) => {
  let url = `/api/admins/${admin_id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("zdata",data)
  return data;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2
  },
};
Modal.setAppElement('#root');


const Setting = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
}

  const {pageTitle, setPageTitle} = useContext(UserContext)
 
        const [admin,setAdmin] = useState({});
        const {loggedInUser, loginCredentials} = useContext(UserContext);
        console.log(loginCredentials.loggedInUser);

        useEffect(() => {
  setPageTitle("Setting")
  if(!JSON.parse(localStorage.getItem("loginCredentials")).isLoggedIn){
    handleClick();
    }

            const getTasks = async () => {
            const tfs = await fetchTasks(loginCredentials.loggedInUser.id);
            setAdmin(tfs);
            };
        
            getTasks();

        }, []);

        const { pathname } = useLocation();
if (pathname === "/landing") return null;

  return (
    <>
      <div className='fullpage'>
        <SideMenuAdmin/>
          <div className='division setting'>
            <div className="admin-settings">
              <h2>Admin Info</h2>
              { <><h3>Email: <span className="fontFira">{admin && admin.email}</span></h3>
              <h4>Password: <span className="maskPw">{admin && admin.password && admin.password.slice(0,8)}</span></h4></> }
              <div>
                <button className="dBlueBtn" onClick={openModal} >Change Password</button>
              </div>
            </div>
        </div>
      </div>


    {/* ============= modal ================== */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
       <img className='tickimg' src={require("../images/verified.gif")} alt="" />
        
        <div>Password reset email has been successfully sent to your email id.</div>
        <button className='dBlueBtn' onClick={closeModal}><span >OK</span></button>
        {/* <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
      </Modal>
    </>
  )
}

export default Setting