import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AdminHeaderTop from '../../components/UserComponent/Header/AdminHeaderTop';
import AdminSidebar from '../../components/AdminComponent/AdminSidebar';
import AdminDashboard from './AdminDashboard'

const HomeAdmin = () => {
    return (
        <div>
            <Router>
                <AdminHeaderTop/>
                <AdminSidebar/>
                    <Switch>
                        <Route path="/admin/dashboard" exact component= {AdminDashboard} />
                    </Switch>
                
            </Router>
            
        </div>
    )
}

export default HomeAdmin
