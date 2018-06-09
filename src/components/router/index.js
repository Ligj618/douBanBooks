import React, { Component } from 'react';
import Home from '../home';
import Films from '../films';
import Books from '../books';
import Search from '../search';
import Radio from '../radio';
import Group from '../group';
import Detail from '../detail';
import More from '../more';
import {Switch, Route,Redirect} from 'react-router-dom';
class myRouter extends Component {
    render() {
      return (
        <div>
          <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/films' component={Films}/>
              <Route path='/books' component={Books}/>
              <Route path='/radio' component={Radio}/>
              <Route path='/group' component={Group}/>
              <Route path='/detail/:type/:id' component={Detail}/>
              <Route path='/more/:type?' component={More}/>
              <Route path='/search' component={Search}/>
              <Redirect to='./books'/>
          </Switch>
        </div>
      );
    }
  }
  
  export default myRouter;