import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';

export function Header() {
  const { t, i18n } = useTranslation();
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
              <Nav.Link href="#login">{t('SignIn')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link href="#profile">{t('Profile')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/registration">
              <Nav.Link href="#registration">{t('SignUp')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/boards">
              <Nav.Link href="#boards">{t('Boards')}</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <Button variant="primary" onClick={() => i18n.changeLanguage('en')}>
          EN
        </Button>
        <div> | </div>
        <Button variant="primary" onClick={() => i18n.changeLanguage('ru')}>
          RU
        </Button>
      </Container>
    </Navbar>
  );
}
