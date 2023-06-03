import React from 'react';
import './App.css';
import LogIn from './components/logIn/LogIn';
import AuthContextProvider from './contexts/AuthContext';
import Routers from './routes/Routes';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
        <AuthContextProvider>
        <Router>
        <Routers/>
       </Router>    
       <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
       </AuthContextProvider>
    </div>
  );
}

export default App;
