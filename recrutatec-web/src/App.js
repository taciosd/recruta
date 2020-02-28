import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopBar from './components/TopBar'
import WelcomePage from './components/WelcomePage';
import CandidateSearch from './components/candidate/CandidateSearch';
import OpportunitySearch from './components/opportunity/OpportunitySearch';
import Opportunity from './components/opportunity/Opportunity';
import Curriculum from './components/candidate/Curriculum';

// <Route exact component={LinkedInCallback} path="/candidates/linkedin/callback" />

function App() {
  return (
    <>
      <CssBaseline/>
      <Router>
        <TopBar />
        <Route exact component={WelcomePage} path="/" />
        <Route exact component={CandidateSearch} path="/candidates" />
        <Route exact component={Curriculum} path="/candidates/:id" />
        <Route exact component={OpportunitySearch} path="/opportunities" />
        <Route exact component={Opportunity} path="/opportunities/:id" />
      </Router>
    </>
  );
}

export default App;
