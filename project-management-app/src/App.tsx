import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Authorization } from 'pages/Authorization/Authorization';
import { Main } from 'pages/Main/Main';
import { Welcome } from 'pages/Welcome/Welcome';
import { Profile } from 'pages/Profile/Profile';
import { ErrorPage } from 'pages/Error/ErrorPage';
import { Header } from 'components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Registration } from 'pages/Registration/Registration';
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
        <Route path="/login" element={<Authorization />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
