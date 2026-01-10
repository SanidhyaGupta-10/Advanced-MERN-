import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashBoardPage from "./pages/DashBoardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPass from "./pages/ForgotPass";
import ResetPassword from "./pages/ResetPassword";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if(!user.isVerified){
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};



// Redirect authenticated users to the home page;
const RedirectAuthenticated = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;  
}

function App(){

  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore();

  useEffect(() => {
    
      checkAuth();
  }, [checkAuth]);

  console.log("isAuthenticated", isAuthenticated)
  console.log("user", user)

  if(isCheckingAuth) return <LoadingSpinner />
      return (
    <> 
      <div className="min-h-screen bg-linear-to-br from-gray-900 
      via-green-900 to bg-emerald-900 flex items-center justify-center relative overflow-hidden">
        
      <FloatingShape color='bg-green-500' size="w-64 h-64" top='-5%' left='-10%' delay={0}/>
      <FloatingShape color='bg-emerald-500' size="w-48 h-48" top='70%' left='80%' delay={5}/>
      <FloatingShape color='bg-line-500' size="w-32 h-32" top='-5%' left='-10%' delay={2}/>

      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        } />
       <Route path='/signup' element={
        <RedirectAuthenticated>
          <SignUpPage />
        </RedirectAuthenticated>
       } />
       <Route path='/login' element={
        <RedirectAuthenticated>
          <LoginPage />
        </RedirectAuthenticated>
       } />
       <Route path='/verify-email' element={<VerifyEmail />} />
       <Route path='/forgot-password' element={
        <RedirectAuthenticated>
          <ForgotPass />
        </RedirectAuthenticated>
       } />

       <Route path='/reset-password/:token' element={
        <RedirectAuthenticated>
          <ResetPassword />
        </RedirectAuthenticated>
       }/>
      </Routes>
      <Toaster />


      </div>
    </>
  )
}

export default App;