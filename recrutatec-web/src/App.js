import React from 'react';
import './App.css';
import TopBar from './components/TopBar'
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import CandidateSearch from './components/CandidateSearch';
import Curriculum from './components/Curriculum';
import JobOpportunities from './components/JobOpportunities';

// <Route exact component={LinkedInCallback} path="/candidates/linkedin/callback" />

function App() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <CssBaseline/>
      <Router>
        <TopBar />
        <Route exact component={WelcomePage} path="/" />
        <Route exact component={CandidateSearch} path="/candidates" />
        <Route exact component={Curriculum} path="/candidates/:id" />
        <Route component={JobOpportunities} path="/jobopportunities" />
      </Router>
    </>
  );
}

export default App;
