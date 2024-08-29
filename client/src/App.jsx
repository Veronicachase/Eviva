import { Routes, Route, Navigate  } from "react-router-dom";
import { isLoggedIn, isSubscribe }  from './Redux/slices/userSlice'

import {
  AllBlogs,
  BlogAdminPanel,
  SelectedBlog,
  MainCalendar,
  Reports,
  Home,
  InfoAccordingToObjective,
  Objective,
  SuscriptionAndPlansInfo,
  Test,
  TestResults,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  UserProfile,
  UserDetails,
  Settings,
  PaymentDetails,
  AllRecipes,
  RecipeAdminPanel,
  SelectedRecipe,
  AllVideos,
  VideoAdminPanel,
  SelectedVideo,
  ContactUs,
  LoggedUserOptionsPage,
  TermsAndConditions,
  PaymentPage,
} from "./views/Index";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store"
import { Toaster } from "react-hot-toast";

import "./App.css";
//import { RequireAuth } from "./components/authLoginComponents/RequireAuth";
// confirmar si resetPassword va dentro o fuera de auth
//crear Require auth
// paginas para pago y carrito
function App() {
  return (
    <Provider store={store}>
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/objectives-info" element={<InfoAccordingToObjective />} />
        <Route path="/objective" element={<Objective />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test-results" element={<TestResults />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/plans-info" element={<SuscriptionAndPlansInfo />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/payment" element={isLoggedIn ? <PaymentPage />:<Navigate to="/login" /> } />

          {/*<Route element={<RequireAuth />}>*/}
          <Route path="/userOptions" element={isLoggedIn  ? <LoggedUserOptionsPage /> :<Navigate to="/login" /> } />
          <Route path="/blog-admin-panel" element={isLoggedIn  ? <BlogAdminPanel /> :<Navigate to="/login" /> } />
          <Route path="/video-admin-panel" element={isLoggedIn  ? <VideoAdminPanel /> :<Navigate to="/login" />} />
          <Route path="/recipe-admin-panel" element={ isLoggedIn ? <RecipeAdminPanel />:<Navigate to="/login" />} />

          <Route path="/all-Blogs" element={ isLoggedIn && isSubscribe ? <AllBlogs />:<Navigate to="/login" />} />
          <Route path="/selected-blog/blogId" element={isLoggedIn && isSubscribe? <SelectedBlog /> :<Navigate to="/login" />} />
          <Route path="/main-calendar" element={isLoggedIn && isSubscribe ? <MainCalendar /> :<Navigate to="/login" />} />
          <Route path="/reports" element={isLoggedIn && isSubscribe ?<Reports />:<Navigate to="/login" />} />
          <Route path="/user-profile/userId" element={isLoggedIn ? <UserProfile /> :<Navigate to="/login" />} />
          <Route path="/payment-details" element={isLoggedIn && isSubscribe?<PaymentDetails /> :<Navigate to="/login" />} />
          <Route path="/settings" element={isLoggedIn ?<Settings />:<Navigate to="/login" />} />
          <Route path="/user-details" element={isLoggedIn ?<UserDetails /> :<Navigate to="/login" />} />
          <Route path="/all-recipes" element={isLoggedIn && isSubscribe?<AllRecipes /> :<Navigate to="/login" />} />
          <Route
            path="/selected-recipe/:recipeId"
            element={isLoggedIn && isSubscribe ?<SelectedRecipe /> :<Navigate to="/login" />}
          />
          <Route path="/all-videos" element={isLoggedIn  && isSubscribe?<AllVideos />:<Navigate to="/login" />} />
          <Route path="/selected-video/:videoId" element={isLoggedIn && isSubscribe ?<SelectedVideo /> :<Navigate to="/login" />} />
        {/*</Route> */}
        
      </Routes>
      </>
    </Provider>
  );
}

export default App;
