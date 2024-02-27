import { Button, Form, Input } from 'antd';
import '../style/LoginForm.css'
import { useNavigate } from 'react-router-dom' ;
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {BASE_URL} from "../util/UrlConstant";
import axios from "axios";

export default function LoginForm() {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();

    async function postLoginForm(values){

        var data = JSON.stringify({
            username: values.username,
            password: values.password
        });

        var config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: BASE_URL + "api/users/login",
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                if(response.status == 200){
                  //console.log(JSON.stringify(response.data));
                  setCookie('token', JSON.stringify(response.data.responseBody), { path: '/' , maxAge:3600});
                  navigate('/home');
                }
            })
            .catch(function (error) {
                //console.log(error.response.status)
                if(error.response.status == 401){
                    toast("Username or password wrong")
                }else{
                toast("System exception. Please try again later")
            }
            });
    }

    const onFinish = (values) => {
        console.log('Received values:', values);
        // Add your authentication logic here
        postLoginForm(values)
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <Form
                name="loginForm"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
            
            <div className="register-link">
                Don't have an account? <a href="/register">Register now</a>
            </div>
            <ToastContainer />
        </div>
    )
}
