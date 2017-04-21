import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import Welcome forme "./Welcome";


// function tick(){
//   const  element =(
//     <div>
//       <h1>hellow, wordl!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}</h2>
//     </div>
//   );
//   ReactDOM.render(
//     element,
//     document.getElementById("root")
//   );
// }

// setInterval(tick,1000);

// class Welcome extends React.Component{
//   render(){
//     return <h1>Hellow,Component</h1>;
//   }
// }
// ReactDOM.render(
//   <Welcome/>,
//   document.getElementById('root')
// )

// import Welcome from './Welcome'

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
  
