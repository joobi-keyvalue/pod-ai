import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../screens/home';
import Splash from '../screens/splash/Splash';
import OnBoarding from './onBoarding/OnBoarding';
import OnBoardingFirst from '../screens/onboarding-first/OnboardingFirst';
import OnBoardingSecond from '../screens/onboarding-second/OnboardingSecond';
import SignUp from '../screens/signup/Signup';
import ProfileSetup from '../screens/profile-setup/ProfileSetUp';
import OTP from '../screens/otp/OTP';
import NotFound from '../screens/not-found/NotFound';

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
              <Route path="/onboarding/otp" element={<OTP />}/>
              <Route path="/onboarding/profile" element={<ProfileSetup />} />
            </Route>
            <Route path="/not-found" element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  )
};

export default MainLayout;