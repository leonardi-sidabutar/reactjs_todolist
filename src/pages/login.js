//import hook react
import React, { useState } from 'react';

//import hook useHitory from react router dom
import { useNavigate } from 'react-router';

//import axios
import axios from 'axios';

function Login() {

    //define state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    //define history
    const history = useNavigate();

    //function "loginHanlder"
    const loginHandler = async (e) => {
        e.preventDefault();
    };

    const handlerLog = async () => {
        //initialize formData
        const formData = {
            "username": username,
            "password": password
        };
        try {
            const response = await axios.post('http://94.74.86.174:8080/api/login', formData);
            const data = response.data;
            localStorage.setItem('token', data.data.token);
            console.log('Registration successful:', data);
            history('/dashboard');
        } catch (error) {
            setValidation(error);
        }
    }

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">HALAMAN LOGIN</h4>
                            <hr />
                            {
                                validation.message && (
                                    <div className="alert alert-danger">
                                        {validation.message}
                                    </div>
                                )
                            }
                            <form onSubmit={loginHandler}>
                                <div className="mb-3">
                                    <label className="form-label">USERNAME</label>
                                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan Username" />
                                </div>
                                {
                                    validation.username && (
                                        <div className="alert alert-danger">
                                            {validation.username[0]}
                                        </div>
                                    )
                                }
                                <div className="mb-3">
                                    <label className="form-label">PASSWORD</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
                                </div>
                                {
                                    validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )
                                }
                                <div className="d-grid gap-2">
                                    <button onClick={handlerLog} type="submit" className="btn btn-primary">LOGIN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;