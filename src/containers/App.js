import React from 'react';
import Layout from '../component/Layout/Layout';
import { Switch, Route} from 'react-router-dom';
import LoginForm from '../component/LoginForm/LoginForm';
import './App.css';
function App() {
  return (
      <div className="">
        <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/"  component={Layout} />
        </Switch>
      </div>
  );
}

export default App;
