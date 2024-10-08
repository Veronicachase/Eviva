import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./components/authLoginComponents/RequireAuth";
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
import { store } from "./Redux/store/store";
import { Toaster } from "react-hot-toast";

import "./App.css";

// confirmar si resetPassword va dentro o fuera de auth
//crear Require auth
// paginas para pago y carrito
function App() {
  return (
    <Provider store={store}>
      <>
        <Toaster />
        <Routes>
          {/*Public routes*/}

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/objectives-info"
            element={<InfoAccordingToObjective />}
          />
          <Route path="/objective" element={<Objective />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test-results" element={<TestResults />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/plans-info" element={<SuscriptionAndPlansInfo />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          {/* require being logged 
          <Route element={<RequireAuth />}>  </Route>*/}
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/userOptions" element={<LoggedUserOptionsPage />} />
            <Route path="/user-profile/userId" element={<UserProfile />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/settings" element={<Settings />} />
         

          {/* Admin section / requiere admin cred */}
          <Route path="/blog-admin-panel" element={<BlogAdminPanel />} />
          <Route path="/video-admin-panel" element={<VideoAdminPanel />} />
          <Route path="/recipe-admin-panel" element={<RecipeAdminPanel />} />

          {/* Require  being logged  and susbcription */}
          <Route element={<RequireAuth requiredSubscription={true} />}>
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
        </Routes>
      </>
    </Provider>
  );
}

export default App;
