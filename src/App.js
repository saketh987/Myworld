import './App.css';
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Contactus from "./components/Contactus";


function App() {
  return (
  <div>
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Flipkart</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse className='justify-content-end'>          
             
                {/* These links can be visible when no user logged in */}
                <NavLink className='nav-link'to="/">
                    Home
                  </NavLink>               
                
                  <NavLink className='nav-link'to="/signup">
                    Signup
                  </NavLink>
                               
                  <NavLink className='nav-link'to="/login">
                    Login
                  </NavLink>
                             
                  <NavLink className='nav-link' to="/contactus">
                    ContactUs
                  </NavLink>
                
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/contactus" element={<Contactus />} />
    </Routes>
  </div>   
  );
}

export default App;
