import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    // Token
    const token = localStorage.getItem('token');
    const history = useNavigate();
    console.log(token)

    // CheckLogin
    const loggedin = () => {
        if (!token) {
            history('/');
        }
    }

    loggedin();

    const [checklist, setChecklist] = useState([]);
    const [infolist, setInfolist] = useState([]);
    const [delStats, setDetStats] = useState(false);
    const [newList, setNewList] = useState("");
    const [validation, setValidation] = useState([]);

    // Modal
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const axiosInstance = axios.create({
        baseURL: 'http://94.74.86.174:8080/api',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('http://94.74.86.174:8080/api/checklist')
                const data = response.data;
                setChecklist(data.data);
            } catch (error) {
                console.log('Gagal Get ALL List : ', error)
            }
        }
        fetchData();
        loggedin();
    }, [delStats, validation])

    const handleLogout = () => {
        localStorage.setItem('token', '');
        history('/');
    }

    const handleAddChecklist = async () => {
        const newChecklist = {
            "name": newList,
        }
        if (newList === "") {
            alert('Data List Tidak Boleh Kosong')
        } else {
            try {
                const response = await axiosInstance.post('http://94.74.86.174:8080/api/checklist', newChecklist);
                setValidation("Data List Berhasil di tambah")
                setDetStats(!delStats);
            } catch (error) {
                setValidation(error)
            }
        }
    }

    const handleDelChecklist = async (id) => {
        try {
            const response = await axiosInstance.delete('http://94.74.86.174:8080/api/checklist/' + id)
            setDetStats(!delStats);
        } catch (error) {
            console.error('Gagal Delete Checklist : ', error);
        }
    }

    const handleInfoChecklist = async (id) => {
        setInfolist([]);
        toggleModal();
        try {
            const response = await axiosInstance.get(`http://94.74.86.174:8080/api/checklist/${id}/item`)
            const data = response.data;
            setInfolist(data.data);
        } catch (error) {
            console.error('Gagal Info : ', error);
        }
    }

    return (
        <>
            <div className="container" style={{ marginTop: "120px" }}>
                <button onClick={() => handleLogout} className="mb-3 bg-danger btn btn-outline-light">Logotut</button>
                <div className='card card-body'>
                    <div className="row justify-content-center">
                        <div className="col-md-12 justify-content-between">
                            <div className='mb-2 d-flex justify-content-between'>
                                <h4 className='text text-sm fw-bold'>TODO LIST :</h4>
                            </div>
                            <div className="input-group mb-3">
                                {
                                    validation.data && (
                                        <div className="alert alert-danger">
                                            {validation.data}
                                        </div>
                                    )
                                }
                                <input type="text" className="form-control" placeholder="Tambah Todo List" value={newList} onChange={(e) => setNewList(e.target.value)} />
                                <button onClick={handleAddChecklist} className="bg-success btn btn-outline-light" type="button">Tambah</button>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                {
                                    checklist.map((item) => (
                                        < div key={item.id} className="col-md-3 mt-3">
                                            <div className="card border-0 rounded shadow-sm note_checklist">
                                                <div className="card-body">
                                                    <p>{item.name}</p>
                                                    <span>...</span>
                                                </div>
                                                <div className="card-footer d-flex justify-content-between">
                                                    <span onClick={() => handleInfoChecklist(item.id)} className='text-primary text-sm fw-bold act small-font'>Info</span>
                                                    <span onClick={() => handleDelChecklist(item.id)} className='text-danger text-sm fw-bold act small-font'>Hapus</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Detail */}
            {showModal && (
                <div className="modal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content note_checklist">
                            <div className="modal-header">
                                <h5 className="modal-title">Todo List</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <ul className="list-group">
                                    {
                                        infolist.map((item) => (
                                            <li className="list-group-item note_checklist">
                                                <input className="form-check-input me-1 mr-2" type="checkbox" checked={item.itemCompletionStatus == true ? 'checked' : ''} />
                                                <span className={item.itemCompletionStatus == true ? 'strikethrough' : ''}>{item.name}</span>
                                            </li>

                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={toggleModal}>Tutup</button>
                                <button type="button" className="btn btn-warning" onClick={toggleModal}>Ubah</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default Dashboard;