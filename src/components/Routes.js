import React from 'react';
import BankInterest from './BankInterest';
import DisqusBox from './Disqus';

const  Home = (props) => {
    
    return (
        <BankInterest classes={props.classes} />
    );
  };
  
  const Standings = (props) => {
    return (
      <h1>Another One</h1>
    );
  };
  
  const FeatureRequests = (props) => {
    return (
      <DisqusBox classes={props.classes}></DisqusBox>
    );
  };
  
  const Routes = [
    {
      path: '/',
      sidebarName: 'Home',
      component: Home
    },
    {
      path: '/another-one',
      sidebarName: 'Another One',
      component: Standings
    },
    {
      path: '/feature-requests',
      sidebarName: 'Feature Requests',
      component: FeatureRequests
    },
  ];
  
  export default Routes;