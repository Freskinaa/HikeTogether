import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LiaMountainSolid } from 'react-icons/lia';
import Button from '../../components/Shared/Button/Button';
import "./login.scss";
import { loginUser } from '../../store/authSlice';

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {user, error} = useSelector(state=> state.auth)
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate('/')
    }
  }, [user])

  useEffect(() => {
    if(error) {
      setErrorMessage(error)
    }
  }, [error])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      dispatch(loginUser(values));
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="login">
      <div className="login-title ">
        <LiaMountainSolid className="mount-icon" />
        <div className="title animate-from-bottom">
          <h2>Welcome back!</h2>
          <p>
            🌄 Please log in to access your account and start exploring trails.
            Happy hiking!
          </p>
          <Button
            type="button"
            className="basic-btn"
            onClick={handleGoBack}
          >
            Go back home
          </Button>
        </div>
      </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="form"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter a valid email",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter a correct password" },
            { min: 6 },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <p>Forgot password?</p>
        <button type="submit">Login</button>
        <p className="error-message">{errorMessage}</p>

        <div className="login-footer">
          <p>you don't have an account?</p>
          <Link to="/signup">
            <p className="to-signup">Sign up</p>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
