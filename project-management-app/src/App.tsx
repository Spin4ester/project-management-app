import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from 'pages/SignIn/SignIn';
import { Main } from 'pages/Main/Main';
import { Welcome } from 'pages/Welcome/Welcome';
import { Profile } from 'pages/Profile/Profile';
import { ErrorPage } from 'pages/Error/ErrorPage';
import { Header } from 'components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignUp } from 'pages/SignUp/SignUp';
import { Footer } from 'components/Footer/Footer';
import Board from 'pages/Board/Board';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/boards" element={<Main />} />
        <Route path="/boards/1" element={<Board />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/registration" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
