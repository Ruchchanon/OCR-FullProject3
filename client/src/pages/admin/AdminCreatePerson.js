import React, { useState, useEffect } from 'react';
import DownloadLink from "react-download-link";

import DocUpload from './DocUpload';
import AdminNav from '../../layout/AdminNav';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, Avatar, Image } from 'antd';
import "./upload.css";

import { createPerson, getPerson, removePerson } from '../../functions/person';
import { DeleteOutlined, VerifiedOutlined } from '@ant-design/icons';
import { AiOutlineVerticalAlignBottom} from "react-icons/ai";


const AdminCreatePerson = () => {
    const { user } = useSelector((state) => ({ ...state }))

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [person, setPerson] = useState([]);

    const [ file, setFile] = useState('');
    const [ filename, setFilename] = useState('')

    const [ dateFirst, setDateFirst] = useState('');
    const [ numTo, setNumTo] = useState('');
    const [ locate, setLocate ] = useState('');
    const [ dateGen, setDateGen] = useState('');
    const [ from, setFrom] = useState('');
    const [ to, setTo] = useState('');
    

    useEffect(() => {
        loadPerson(user.token);
    }, [])
    const loadPerson = (authtoken) => {
        getPerson(authtoken)
            .then((res) => {
                setPerson(res.data)
            }).catch((err) => {
                toast.error(err)
                console.log(err)
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', name)
        formData.append('data', dateFirst)
        formData.append('data', numTo)
        formData.append('data', locate)
        formData.append('data', dateGen)
        formData.append('data', from)
        formData.append('data', to)


        
        createPerson(formData, user.token)
            .then(res=>{
                loadPerson(user.token);
                setLoading(false)
                toast.success('????????????????????????????????? '+ res.data.name + ' ?????????????????? ')
            }).catch(err=>{
                setLoading(false)
                toast.error(err.response)
            })
    }

    const handleRemove = (id) => {
        if (window.confirm("?????????????????????????????????????????????????????????!")){
            setLoading(true);
            removePerson(id, user.token)
                .then(res=>{
                    loadPerson(user.token);
                    setLoading(false)
                    toast.success('?????????????????? '+ res.data.name + ' ?????????????????? ')
                }).catch(err=>{
                    setLoading(false)
                    toast.error(err.response)
                })
        }
    }


 

  







    const columns = [

        {
            title: '??????????????????',
            dataIndex: 'dateFirst',
            key: 'dateFirst'
        },
        {
            title: '???????????????????????????',
            dataIndex: 'numTo',
            key: 'numTo'
        },
        {
            title: '?????????',
            dataIndex: 'locate',
            key: 'locate'
        },
        {
            title: '????????????????????????',
            dataIndex: 'dateGen',
            key: 'dateGen'
        },
        {
            title: '?????????',
            dataIndex: 'from',
            key: 'from'
        },
        {
            title: '?????????',
            dataIndex: 'to',
            key: 'to'
        },
        {
            title: 'Download',
            render: (record) => (
                <a className="button-field-download"  href={`http://localhost:5000/uploads/${record.pic}`}   download={`http://localhost:5000/uploads/${record.pic}`}>
                   
                    <AiOutlineVerticalAlignBottom className="button-icon-download"/>          
                    <div className="button-text-download">
                    ???????????????????????????</div>
                </a>
            )
        },
        {
            title: '??????????????????',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '????????????',
            render: (record) => (
                <>
                
                    <Avatar 
                        src={<Image src={`http://localhost:5000/uploads/${record.pic}`}  />}  
                    />
                </>
            )
        },
        {
            title: 'Actions',
            render: (record) => (
                <span className="btn btn-sm fload-right"
                onClick={()=> handleRemove(record._id)}>
                    <DeleteOutlined className="text-danger"/>
                </span>
            )
        }

    ]


    return (
        
        <div className="container-fluid">
            
            <div className="row">
                <div className="col-md-2">
                  
                </div>
                <div className="col">
                
                  
                    <form onSubmit={onSubmit}>
                    <div className="custom-file mb-4">
                            <input
                                type="file"
                                className="custom-file-input" 
                                onChange={(e) => setFile(e.target.files[0])}                  
                            />
                         
                            <label className="custom-file-label"
                                htmlFor="customfile"
                            >
                                {filename} 
                            </label>
                        </div>

                <div className="col">

                        <div className="form-group">
                            <label>??????????????????</label>
                            <input type="date"
                                className="form-control"
                                autoFocus
                                required
                                onChange={(e) => setDateFirst(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>???????????????????????????</label>
                            <input type="number"
                                className="form-control"
                                autoFocus
                                required
                                onChange={(e) => setNumTo(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>?????????</label>
                            <input type="text"
                                className="form-control"
                                autoFocus
                                required
                                onChange={(e) => setLocate(e.target.value)}
                            />
                        </div>


                        <div className="form-group">
                            <label>????????????????????????</label>
                            <input type="date"
                                className="form-control"
                                autoFocus
                                required
                                onChange={(e) => setDateGen(e.target.value)}
                            />
                        </div>

                






                        <div className="form-group">
                            <label>?????????</label>
                            <input type="text"
                                className="form-control"
                                autoFocus
                                required
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>?????????</label>
                            <input type="text"
                                className="form-control"
                                autoFocus
                                required
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>










                        <div className="form-group">
                            <label>??????????????????</label>
                            <input type="text"
                                className="form-control"
                                autoFocus
                                required
                                onChange={(e) => setName(e.target.value)}
                            />



                        </div>

               </div>

                       


                    
                        <hr />

                        <button className="btn btn-outline-primary">???????????????</button>
                    </form>
                    <hr />
                    
                    <Table columns={columns} dataSource={person} rowKey="_id" className="upload-table"/>
                 
                </div>
            </div>
        </div>
    )
}

export default AdminCreatePerson
