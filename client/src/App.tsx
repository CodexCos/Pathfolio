import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Porfolio from "./pages/Portfolio";
import ProtectedRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthProvider";
import { useFormContext } from "./context/FormProvider";
import { Loader } from "lucide-react";

function App() {
  const { user, loading} = useAuth();
  
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <Loader className="w-12 h-12 animate-spin text-purple-800" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route path="/portfolio/:portfolioId" element={<Porfolio />} />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
    //{" "}
  );
}

export default App;
