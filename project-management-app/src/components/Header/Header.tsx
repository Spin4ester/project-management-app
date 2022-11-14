import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export function Header() {
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">Tik-Task</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/login">
              <Nav.Link href="#login">Sing In</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/registration">
              <Nav.Link href="#registration">Sign Up</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/boards">
              <Nav.Link href="#boards">Boards</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <Button variant="primary">RU | EN</Button>
      </Container>
    </Navbar>
  );
}
