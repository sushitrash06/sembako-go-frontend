import React from 'react';
import './App.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'react-bootstrap';
import Routes from './Router';


class App extends React.Component {
  render(){
    return(
      <div className="root">
          <Routes/>
      </div>
    )
  }
}
export default App;