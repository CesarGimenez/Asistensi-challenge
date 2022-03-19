import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Filter } from "../pages/Filter";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Navigation = () => {
  return (
    <div>
      <Router>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to={"/"}>
              Home
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/filter-users"}>
                Filter Users
              </Nav.Link>
              <Nav.Link as={Link} to={"/sign-in"}>
                Login
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/filter-users" element={<Filter />} />
          <Route exact path="/sign-in" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};
