import React, { useEffect, useState } from "react";
import { Button, Form, message, Input } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const axiosInstance1 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const axiosInstance2 = axios.create({
  baseURL: process.env.REACT_APP_USR_URL,
});

function Login() {
  let nav = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const loggedInUser = localStorage.getItem("accessToken");
  const [authenticated, setauthenticated] = useState(loggedInUser);

  const onFinish = (values) => {
    axiosInstance2.post(`/login`, values).then((response) => {
      if (response.data.error) {
        messageApi.open({
          type: "error",
          content: "Wrong Username or Password",
        });
      } else {
        messageApi.open({
          type: "success",
          content: "Logged in!",
        });
        localStorage.setItem("accessToken", response.data);
        localStorage.setItem("username", values.username);
        localStorage.setItem("lName", response.data.lName);
        localStorage.setItem("fName", response.data.fName);
        localStorage.setItem("id", response.data.id);
        return nav("/home");
      }
    });
  };

  if (authenticated) {
    return <Navigate replace to="/home" />;
  } else {
    return (
      <div className="loginMainContainer">
        {contextHolder}
        <div className="webTitle">WASTE BIN MANAGEMENT SYSTEM</div>
        <div>
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            className="login"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="loginBtn">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="loginNews">Random News Here or Updates</div>
      </div>
    );
  }
}

export default Login;
