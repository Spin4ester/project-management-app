import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SignIn } from 'pages/SignIn/SignIn';
import { Main } from 'pages/Main/Main';
import { Welcome } from 'pages/Welcome/Welcome';
import { Profile } from 'pages/Profile/Profile';
import { ErrorPage } from 'pages/Error/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignUp } from 'pages/SignUp/SignUp';
import { Footer } from 'components/Footer/Footer';
import { Board } from 'pages/Board/Board';
import { RootState } from 'redux/Store';
import { useSelector } from 'react-redux';
import { HeaderAlt } from 'components/Header/HeaderAlt';

function App() {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const error = useSelector((state: RootState) => state.serverError);

  return (
    <div className="App">
      <HeaderAlt />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/boards" element={!isAuth ? <Navigate replace to="/" /> : <Main />} />
        <Route path="/boards/:id" element={!isAuth ? <Navigate replace to="/" /> : <Board />} />
        <Route path="/login" element={isAuth ? <Navigate replace to="/boards" /> : <SignIn />} />
        <Route
          path="/registration"
          element={isAuth ? <Navigate replace to="/boards" /> : <SignUp />}
        />
        <Route
          path="/profile"
          element={
            !isAuth ? <Navigate replace to={error.statusCode ? '/login' : '/'} /> : <Profile />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
