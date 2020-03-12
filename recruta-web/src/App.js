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
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/candidates" component={CandidateSearch} />
        <Route exact path="/candidates/:id" component={Curriculum} />
        <Route exact path="/opportunities" component={OpportunitySearch} />
        <Route exact path="/opportunities/new" component={Opportunity} />
        <Route exact path="/opportunities/:id" component={Opportunity} />
      </Router>
    </>
  );
}

export default App;
