import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import { RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from 'redux/UserSlice';

export function Header() {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">Tik-Task</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isAuth && (
              <LinkContainer to="/login">
                <Nav.Link href="#login">{t('SignIn')}</Nav.Link>
              </LinkContainer>
            )}
            {!isAuth && (
              <LinkContainer to="/registration">
                <Nav.Link href="#registration">{t('SignUp')}</Nav.Link>
              </LinkContainer>
            )}
            {isAuth && (
              <LinkContainer to="/profile">
                <Nav.Link href="#profile">{t('Profile')}</Nav.Link>
              </LinkContainer>
            )}
            {isAuth && (
              <LinkContainer to="/boards">
                <Nav.Link href="#boards">{t('Workspace')}</Nav.Link>
              </LinkContainer>
            )}
            {isAuth && (
              <Navbar.Text
                onClick={() => {
                  removeUserFromLocalStorage();
                  dispatch(signOutUser());
                }}
              >
                {t('SignOut')}
              </Navbar.Text>
            )}
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

export function removeUserFromLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  localStorage.removeItem('userLogin');
}
