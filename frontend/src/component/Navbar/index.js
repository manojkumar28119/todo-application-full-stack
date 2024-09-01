import Popup from 'reactjs-popup'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';


import "./index.css"





const Navbar = () => {

    const navigate = useNavigate()

    const onClickConfirmBtn = () => {
        Cookies.remove('jwt_token')
        Cookies.remove('user_id')
        navigate("/login")
    }

    


    return (
        <div className="nav-bar">
            <Link to="/" style={{textDecoration:"none"}}>
              <div style={{display:"flex",alignItems:"center"}}>
                  <img
                      src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                      alt="website login"
                      style={{ height: '25px', width: '25px', marginLeft: '5px' }}
                  />
                  <p style={{color:"#000",fontWeight:500,margin:"0px"}}>Todos</p>
              </div>
            </Link>
            <div style={{display:"flex",alignItems:"center"}}>
              <Link to="/profile" style={{display:"flex",alignItems:"center",textDecoration:"none",color:"#000"}}>
                <button type='button' style={{backgroundColor:"transparent",border:"none",outline:"none",cursor:"pointer"}}>
                    <FaUserCircle size={25}/>
                </button>
                <p style={{fontWeight:500}}>{Cookies.get('username')}</p>
              </Link>
            <div>
                <Popup
                  modal
                  trigger={
                    <button type="button" className='logout-btn'>
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div className='popup-container' >
                      <div>
                        <p style={{fontSize:"15px",fontWeight:500,marginBottom:"30px"}}>
                          Are you sure, you want to logout
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="cancel-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="confirm-btn"
                          onClick={onClickConfirmBtn}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
            </div>
            </div>
        </div>
    )
    
}

export default Navbar