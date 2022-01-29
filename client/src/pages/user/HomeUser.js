import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import './homeuser.css';
import User from './User';
import Sidebar from '../../components/UserComponent/Sidebar/SideBars';
import UserSide from './UserSide';
import HeaderTop from '../../components/UserComponent/Header/HeaderTop';

const HomeUser = () => {
    return (
       <div>
        <Router>
            <HeaderTop />
        <Sidebar />
        <Switch>
          <Route path="/search" exact component= {User} />
          <Route path="/search1" exact component= {UserSide} />
        </Switch>
      </Router>
      </div>
    )
}

export default HomeUser
