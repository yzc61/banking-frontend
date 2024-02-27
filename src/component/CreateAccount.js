import React , { useEffect,useState } from 'react';
import { Form, Input, Button } from 'antd';
import '../style/CreateAccount.css';
import { useNavigate } from 'react-router-dom' ;
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {BASE_URL} from "../util/UrlConstant";
import axios from "axios";

export default function CreateAccount() {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();

    useEffect(() => {

        if (cookies.token) {

        } else {
            //console.log(cookies.token) 
            navigate('/');
        }
    }, []);

    async function createAccount(values,token){

        var data = JSON.stringify({
            name: values.name,
            number: values.number
        });

        var config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: BASE_URL + "api/accounts",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                if(response.status == 200){
                  //console.log(JSON.stringify(response.data));
                  toast("Account Created")
                }
            })
            .catch(function (error) {
                //console.log(error.response.status)
                if(error.response.status == 401){
                    toast("Account name already exists")
                }else if(error.response.status == 402){
                    toast("Account number already exists")
                }
                else{
                toast("System exception. Please try again later")
            }
            });
    }


    const onFinish = (values) => {
        // Add logic to handle account creation using 'values.number' and 'values.name'
        console.log('Received values:', values);
        createAccount(values,cookies.token);
    };

    return (
        <div className="form-container">
            <h2>Create Account</h2>
            <Form
                name="createAccountForm"
                onFinish={onFinish}
                initialValues={{ number: '', name: '' }}
            >
                <Form.Item
                    label="Number"
                    name="number"
                    rules={[{ required: true, message: 'Please input account number!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input account name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Account
                    </Button>
                </Form.Item>
            </Form>
            <ToastContainer />
        </div>
    );
};