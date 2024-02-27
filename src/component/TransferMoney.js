import React, { useEffect,useState } from 'react';
import { Select, Input, Button } from 'antd';
import '../style/TransferMoney.css';
import { useNavigate } from 'react-router-dom' ;
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {BASE_URL} from "../util/UrlConstant";
import axios from "axios";
const { Option } = Select;


export default function TransferMoney() {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const [fromAccountOptions, setFromAccountOptions] = useState([]);
    const [toAccountOptions, setToAccountOptions] = useState([]);
    const [accountOptions, setAccountOptions] = useState([]);
    const [fromAccount, setFromAccount] = useState(null);
    const [toAccount, setToAccount] = useState(null);
    const [amount, setAmount] = useState(null);

    useEffect(() => {

        if (cookies.token) {
            console.log(cookies.token) 
            getAccountList(cookies.token);
        } else {
            //console.log(cookies.token) 
            navigate('/');
        }
    }, []);

    const handleTransfer = () => {
        // Add logic to handle money transfer using 'fromAccount', 'toAccount', and 'amount'
        console.log('Transferring money from', fromAccount, 'to', toAccount, 'Amount:', amount);
        transferMoney(fromAccount,toAccount,amount,cookies.token)
    };

    async function getAccountList(token) {
        var config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: BASE_URL + "api/accounts",
            headers: {
                'Authorization': token
            }
        };

        axios(config)
            .then(function (response) {
                
                if(response.status==200){
                    console.log(response.data.responseBody)
                    setAccountOptions(response.data.responseBody)
                }
            })
            .catch(function (error) {
                
            });

    }

    async function transferMoney(fromAccount,toAccount,amount,token){

        var data = JSON.stringify({
            to: toAccount,
            from: fromAccount,
            amount:amount
        });

        var config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: BASE_URL + "api/transactions/transfer",
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
                  toast("Money Transferred")
                }
            })
            .catch(function (error) {
                //console.log(error.response.status)
                if(error.response.status == 401){
                    toast("You dont have enough money")
                }else if(error.response.status == 402){
                    toast("You are not the account owner")
                }
                else{
                toast("System exception. Please try again later")
            }
            });
    }


    const onFinish = (values) => {
        // Add logic to handle account creation using 'values.number' and 'values.name'
        console.log('Received values:', values);
       
    };

    return (
        <div className="transfer-form">
            <h2>Transfer Money</h2>
            <div className="select-container">
                <Select style={{ width: '100%' }} onChange={(value) => setFromAccount(value)}>
                    {accountOptions.map((account) => (
                        <Option key={account.accountId} value={account.accountId}>
                            {account.name}
                        </Option>
                    ))}
                </Select>
                <span className="arrow">&#8658;</span>
                <Select style={{ width: '100%' }} onChange={(value) => setToAccount(value)}>
                    {accountOptions.map((account) => (
                        <Option key={account.accountId} value={account.accountId}>
                            {account.name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div>
                <label>Amount: </label>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>
            <div>
                <Button type="primary" onClick={handleTransfer}>
                    Transfer
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
};