import React from 'react';
import './App.css';
import TopBar from './components/TopBar'
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CandidateSearch from './components/CandidateSearch';
import Curriculum from './components/Curriculum';

function App() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <CssBaseline/>
      <Router>
        <TopBar />
        <Route exact component={CandidateSearch} path="/" />
        <Route exact component={CandidateSearch} path="/candidates" />
        <Route exact component={Curriculum} path="/candidates/:id" />
      </Router>
    </>
  );
}

export default App;
