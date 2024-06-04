//import hook react
import React, { useState } from 'react';

//import hook useHitory from react router dom
import { useNavigate } from 'react-router';

//import axios
import axios from 'axios';

function Register() {

    //define state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    //define history
    const history = useNavigate();

    //function "registerHanlder"
    const registerHandler = async (e) => {
        e.preventDefault();

        //initialize formData
        const formData = {
            "email": email,
            "username": name,
            "password": password
        };

        console.log(formData);

        // send data to server
        await axios.post('http://94.74.86.174:8080/api/register', formData)
            .then(() => {
                //redirect to logi page
                history.push('/');
            })
            .catch((error) => {
                //assign error to state "validation"
                setValidation(error.response.data);
            })
    };

    const handlerReg = async () => {
        //initialize formData
        const formData = {
            "email": email,
            "username": name,
            "password": password
        };
        try {
            const response = await axios.post('http://94.74.86.174:8080/api/register', formData);
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
                <div className="col-md-8">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">HALAMAN REGISTER</h4>
                            <hr />
                            <form onSubmit={registerHandler}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">USERNAME</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Nama Lengkap" />
                                        </div>
                                        {
                                            validation.name && (
                                                <div className="alert alert-danger">
                                                    {validation.name[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">ALAMAT EMAIL</label>
                                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email" />
                                        </div>
                                        {
                                            validation.email && (
                                                <div className="alert alert-danger">
                                                    {validation.email[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
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
                                    </div>
                                </div>
                                <button type="submit" onClick={handlerReg} className="btn btn-primary">REGISTER</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;