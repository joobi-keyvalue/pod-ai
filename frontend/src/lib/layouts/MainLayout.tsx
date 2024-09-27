import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../screens/home';
import Splash from '../screens/splash/Splash';
import OnBoarding from './onBoarding/OnBoarding';
import OnBoardingFirst from '../screens/onboarding-first/OnboardingFirst';
import OnBoardingSecond from '../screens/onboarding-second/OnboardingSecond';
import SignUp from '../screens/signup/Signup';
import ProfileSetup from '../screens/profile-setup/ProfileSetUp';
import OTP from '../screens/otp/OTP';
import NotFound from '../screens/not-found/NotFound';
import TellUsInterest from '../screens/tellUsInterest/TellUsInterest';
import Customize from '../screens/customize/Customize';
import AppLayout from './App/App';
import OnBoardingFinal from '../screens/onboarding-final/OnboardingFinal';
import LandingPage from '../screens/landing/Landing';
import Topics from '../screens/topics/Topics';
import Preferences from '../screens/preferences/Preferences';
import Profile from '../screens/profile/Profile';

import Podcast from "../screens/podcast/Podcast";
import LikedPodcasts from '../screens/liked-podcasts/likedPodcasts';

const MainLayout = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/onboarding" element={<OnBoarding />}>
              <Route path="/onboarding" element={<Navigate to="/onboarding/first" />} />
              <Route path="/onboarding/first" element={<OnBoardingFirst />  } />
              <Route path="/onboarding/second" element={<OnBoardingSecond />} />
              <Route path="/onboarding/signup" element={<SignUp />} />
              <Route path="/onboarding/otp" element={<OTP />}/>
              <Route path="/onboarding/profile" element={<ProfileSetup />} />
              <Route path="/onboarding/interest" element={<TellUsInterest />} />
              <Route path="/onboarding/customize" element={<Customize />}/>
              <Route path="/onboarding/final" element={<OnBoardingFinal />} />
            </Route>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="/app/topics" element={<Topics />}/>
              <Route path="/app/preferences" element={<Preferences />} />
              <Route path="/app/profile" element={<Profile />} />
              <Route path="/app/player/:id" element={<Podcast />} />
              <Route path="/app/not-found" element={<NotFound/>} />
              <Route path="/app/liked-podcasts" element={<LikedPodcasts/>} />

            </Route>
            <Route path="/logout" element={<Navigate to="/splash" />} /> 
            <Route path="*" element={<Navigate to="/app/not-found"/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default MainLayout;
