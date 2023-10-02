import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
const root = ReactDOM.createRoot (document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

//ReactDOM.render (<App />, document.getElementById('root'));




//const root = ReactDOM.createRoot (document.getElementById('root'))


// 👇️ if you use TypeScript, add non-null (!) assertion operator
// const root = createRoot(rootElement!);

//root.render(
 // <React.StrictMode>
  //  <App />
  //</React.StrictMode>,
//);
