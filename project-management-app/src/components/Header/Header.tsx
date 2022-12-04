import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import { RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from 'redux/UserSlice';
import styles from './Header.module.css';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

export function Header() {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const error = useSelector((state: RootState) => state.serverError);
  const dispatch = useDispatch();

  return (
    <Navbar sticky="top" bg="dark" variant="dark" className={styles.container}>
      <Container>
        {error.show && <ErrorMessage error={error} />}
        <LinkContainer to="/">
          <Navbar.Brand href="#home" className={styles.logo}>
            <span>T</span>ik-<span>T</span>ask
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`${styles.links} mx-auto`}>
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
                className={styles.link}
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
        <Button
          variant="primary"
          className={styles.button}
          onClick={() => i18n.changeLanguage('en')}
        >
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
