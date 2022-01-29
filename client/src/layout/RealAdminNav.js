import React from 'react'
import './realadminnav.css' 
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const { SubMenu } = Menu;


function RealAdminNav() {
    const { user } = useSelector((state) =>  ({ ...state }))
    const dispatch = useDispatch();
    const history = useHistory();
    
    const logout = () => {
        dispatch({
          type: 'LOGOUT',
          payload: null
        })
        history.push('/')
        toast.success('Logout Success')
    }


    return (
        <div>
            <div className ="Header1">
                    <div> 
                        <img src={require('./CS.png').default} alt="CS image" className="Logo" />
                    </div>
                    <div className ="HeadTextNav">
                         ระบบการสืบค้นข้อมูลเอกสารอัตโนมัติ 
                    </div>

                    {user && (
                        <>
                            <div className ="StatusLoginText">{user.name}</div>
                            <a className="LogoutButton" onClick={logout}>ออกจากระบบ</a>
                        </>
                        
                    )}

               
            </div>
        </div>
    )
}

export default RealAdminNav
