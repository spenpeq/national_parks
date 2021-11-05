import React from 'react';
import { Route, Switch } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import ParkScreen from './screens/ParkScreen';
import BackendTest from './screens/BackendTest';
import AboutScreen from './screens/AboutScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/about' component={AboutScreen} />
        <Route path='/explore' component={ExploreScreen} exact/>
        <Route path='/explore/:parkcode' component={ParkScreen} />
        <Route path='/server' component={BackendTest} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
    </Switch> 
    </div>
    
  );
}

export default App;