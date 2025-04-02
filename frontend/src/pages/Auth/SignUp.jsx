import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signUp.scss";
import { useEffect, useState } from "react";
import { LiaMountainSolid } from "react-icons/lia";
import Buttoni from "../../components/Shared/Button/Button";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../store/authSlice";

const SignUp = () => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isRegistered, error} = useSelector(state=> state.auth)

  useEffect(() => {
    if( isRegistered){ 
      navigate('/login')
    }
  }, [isRegistered])

  useEffect(() => {
    if(error) {
      setErrorMessage(error)
    }
  }, [error])

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      dispatch(registerUser(values))
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  const validateName = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your name!"));
    }
    if (/\s/.test(value)) {
      return Promise.reject(
        new Error("Name cannot contain spaces between letters.")
      );
    }
    if (/^[A-Z][a-z]*$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        "Name must start with a capital letter followed by lowercase letters."
      )
    );
  };

  const validateLastname = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your last name!"));
    }
    if (/\s/.test(value)) {
      return Promise.reject(
        new Error("Last name cannot contain spaces between letters.")
      );
    }
    if (/^[A-Z][a-z]*$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        "Last name must start with a capital letter followed by lowercase letters."
      )
    );
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your password!"));
    }
    if (value && /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        "Password must contain at least one uppercase letter, one number, and be at least 6 characters long."
      )
    );
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="signup">
      <div className="signUp-title ">
        <LiaMountainSolid className="mount-icon" />
        <div className="title animate-from-bottom">
          <h2>Join us! </h2>
          <p>
            Sign up now and start exploring the great outdoors with us.
            Adventure awaits!
          </p>
          <Buttoni type="button" className="basic-btn" onClick={handleGoBack}>
            Go back home
          </Buttoni>
        </div>
      </div>
      <Form form={form} onFinish={onSubmit} layout="vertical" className="form">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "",
            },
            {
              validator: validateName,
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "",
            },
            {
              validator: validateLastname,
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter a valid email!",
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
            {
              required: true,
              message: "",
            },
            {
              validator: validatePassword,
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
        <p className="error-message">{errorMessage}</p>

        <div className="signup-footer">
          <p>You have an account?</p>
          <div className="centered-column">
            <Link to="/login" className="to-login">
              Login
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
