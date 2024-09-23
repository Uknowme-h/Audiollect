import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { createContext, useEffect, useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import { Profile } from "./pages/Profile";
import Layout from "./components/Layout";
import { BackgroundGradientAnimation } from "./components/Background-gradient-animation";
import OcrPage from "./pages/OcrPage";
import AboutUs from "./pages/AboutUs";
import Library from "./pages/Library";

export const AuthContext = createContext();

// protect routes that require authentication
const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerfied) {
    return <Navigate to="/verify-email" replace />;
  }
  return <Outlet />;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  const [ischatvisible, setischatvisible] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <AuthContext.Provider value={{ ischatvisible, setischatvisible }}>
      <div className="min-h-screen bg-[#17153B] flex items-center justify-center relative overflow-hidden">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ocr" element={<OcrPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/library" element={<Library />} />
            </Route>
          </Route>

          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <BackgroundGradientAnimation
                  className={
                    "flex items-center justify-center relative overflow-hidden"
                  }
                >
                  <SignUpPage />
                </BackgroundGradientAnimation>
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <BackgroundGradientAnimation
                  className={
                    "flex items-center justify-center relative overflow-hidden"
                  }
                >
                  <LoginPage />
                </BackgroundGradientAnimation>
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/verify-email"
            element={
              <BackgroundGradientAnimation
                className={
                  "flex items-center justify-center relative overflow-hidden"
                }
              >
                <EmailVerificationPage />
              </BackgroundGradientAnimation>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <BackgroundGradientAnimation
                  className={
                    "flex items-center justify-center relative overflow-hidden"
                  }
                >
                  <ForgotPasswordPage />
                </BackgroundGradientAnimation>
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <BackgroundGradientAnimation
                  className={
                    "flex items-center justify-center relative overflow-hidden"
                  }
                >
                  {" "}
                  <ResetPasswordPage />
                </BackgroundGradientAnimation>
              </RedirectAuthenticatedUser>
            }
          />
          {/* catch all routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
