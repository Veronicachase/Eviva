import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './components/authLoginComponents/RequireAuth';
import ResponsiveAppBar from './components/layout/ResponsiveNavBar';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  AllBlogs,
  AllRecipes,
  AllVideos,
  BlogAdminPanel,
  ContactUs,
  DashBoard,
  ForgotPassword,
  Home,
  InfoAccordingToObjective,
  LoggedUserOptionsPage,
  Login,
  MainCalendar,
  MainEval,
  Objective,
  PaymentDetails,
  PaymentPage,
  PaymentSuccess,
  Register,
  Reports,
  ResetPassword,
  SelectedBlog,
  SelectedRecipe,
  SelectedVideo,
  SelfAssessment,
  SelfAssessmentResults,
  Settings,
  SuscriptionAndPlansInfo,
  TermsAndConditions,
  UserDetails,
  UserProfile,
  RecipeAdminPanel,
  VideoAdminPanel,
} from './views/Index';
import { Provider } from 'react-redux';
import { store } from './Redux/store/store';
import { v4 as uuidv4 } from 'uuid';
import { Toaster } from 'react-hot-toast';

import './App.css';
import { useEffect } from 'react';

// confirmar si resetPassword va dentro o fuera de auth
//crear Require auth
// paginas para pago y carrito
function App() {
  useEffect(() => {
    let userUUID = localStorage.getItem('userUUID');
    if (!userUUID) {
      userUUID = uuidv4();
      localStorage.setItem('userUUID', userUUID);
    }
  }, []);

  return (
    <Provider store={store}>
      <>
        <Toaster />
        <Routes>
          {/* Admin section / requiere admin cred */}
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/blog-admin-panel" element={<BlogAdminPanel />} />
          <Route path="/video-admin-panel" element={<VideoAdminPanel />} />
          <Route path="/recipe-admin-panel" element={<RecipeAdminPanel />} />

          {/*Public routes*/}

          <Route path="/" element={<ResponsiveAppBar />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/objectives-info"
              element={<InfoAccordingToObjective />}
            />
            <Route path="/main-eval" element={<MainEval />} />
            <Route path="/objective" element={<Objective />} />
            <Route
              path="/objectives-result"
              element={<InfoAccordingToObjective />}
            />
            <Route path="/assessment" element={<SelfAssessment />} />
            <Route
              path="/assessmente-result"
              element={<SelfAssessmentResults />}
            />
          
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/plans-info" element={<SuscriptionAndPlansInfo />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />

            {/* require being logged */}
            <Route element={<RequireAuth requiredSubscription={false}/>}>
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/userOptions" element={<LoggedUserOptionsPage />} />
              <Route path="/user-profile/userId" element={<UserProfile />} />
              <Route path="/user-details" element={<UserDetails />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Require  being logged  and susbcription */}

            <Route element={<RequireAuth requiredSubscription={true} />}>
              <Route
                path="/logged-user-options"
                element={<LoggedUserOptionsPage />}
              />
              <Route path="/all-Blogs" element={<AllBlogs />} />
              <Route path="/selected-blog/blogId" element={<SelectedBlog />} />
              <Route path="/main-calendar" element={<MainCalendar />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/payment-details" element={<PaymentDetails />} />
              <Route path="/all-recipes" element={<AllRecipes />} />
              <Route
                path="/selected-recipe/:recipeId"
                element={<SelectedRecipe />}
              />
              <Route path="/all-videos" element={<AllVideos />} />
              <Route
                path="/selected-video/:videoId"
                element={<SelectedVideo />}
              />
            </Route>
          </Route>
        </Routes>
      </>
    </Provider>
  );
}

export default App;
