import React, { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Navigate,Link } from 'react-router-dom';
import './index.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
  });

  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      navigate('/login');
    }
  }, [isSubmitted, navigate]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmitSuccess = () => {
    setIsSubmitted(true)
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const url = 'https://todo-application-backend-rk3h.onrender.com/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, options);

    console.log(response)
    const data = await response.text();

    if (response.ok) {
      onSubmitSuccess();
      setFormData({
        username: '',
        password: '',
        name: '',
        email: '',
      })
      setErrorMsg('')
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const renderInputField = (label, name, type = 'text', placeholder) => (
    <>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="username-input-field-reg"
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </>
  );

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-form-container">
      <form className="form-container-reg" onSubmit={submitForm}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            fontWeight: '500',
          }}
        >
          <p style={{ fontSize: '18px' }}>Create your Todo</p>
          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
            alt="website login"
            style={{ height: '25px', width: '25px', marginLeft: '5px',marginRight:"5px" }}
          />
          <p style={{ fontSize: '18px' }}>Account</p>
        </div>

        <div className="input-container">
          {renderInputField('Create a Username', 'username', 'text', 'Username')}
        </div>
        <div className="input-container">
          {renderInputField('Name', 'name', 'text', 'Enter your name')}
        </div>
        <div className="input-container">
          {renderInputField('Email', 'email', 'email', 'Enter your email')}
        </div>
        <div className="input-container">
          {renderInputField('Create a Password', 'password', 'password', 'Password')}
        </div>
        <button type="submit" className="login-button">
          Register Now
        </button>
        <Link to="/login" style={{marginRight:"auto",fontSize:"14px",marginTop:"3px"}}>Already have an account</Link>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
