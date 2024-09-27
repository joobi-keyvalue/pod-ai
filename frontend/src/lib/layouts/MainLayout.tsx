import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../screens/home';
import Splash from '../screens/splash/Splash';
import OnBoarding from './onBoarding/OnBoarding';
import OnBoardingFirst from '../screens/onboarding-first/OnboardingFirst';
import OnBoardingSecond from '../screens/onboarding-second/OnboardingSecond';
import SignUp from '../screens/signup/Signup';

const MainLayout = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/onboarding" element={<OnBoarding />}>
              <Route path="/onboarding/first" element={<OnBoardingFirst />  } />
              <Route path="/onboarding/second" element={<OnBoardingSecond />} />
              <Route path="/onboarding/signup" element={<SignUp />} />
            </Route>
        </Routes>
      </Router>
    </div>
  )
};

export default MainLayout;