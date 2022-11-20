import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import { RootState } from 'Store';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from 'UserSlice';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">Tik-Task</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/login" hidden={isAuth}>
              <Nav.Link href="#login">{t('SignIn')}</Nav.Link>
            </LinkContainer>
            <Navbar.Text
              hidden={!isAuth}
              onClick={() => {
                localStorage.removeItem('token');
                dispatch(signOutUser());
                navigate('/');
              }}
            >
              {t('SignOut')}
            </Navbar.Text>
            <LinkContainer to="/profile" hidden={!isAuth}>
              <Nav.Link href="#profile">{t('Profile')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/registration" hidden={isAuth}>
              <Nav.Link href="#registration">{t('SignUp')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/boards" hidden={!isAuth}>
              <Nav.Link href="#boards">{t('Workspace')}</Nav.Link>
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
