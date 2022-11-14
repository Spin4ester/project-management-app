import React from 'react';
import './Footer.css';
import SchoolLogo from '../../assets/icons/rs_school_js.svg';

export const Footer = () => {
  return (
    <footer className="footer_container">
      <a target="_blank" href="https://rs.school/react/" rel="noreferrer">
        RS School React
      </a>
      <div>2022</div>
      <img src={SchoolLogo} alt="School logo"></img>
    </footer>
  );
};
