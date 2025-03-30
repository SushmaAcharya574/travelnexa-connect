
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Plane } from "lucide-react";

const Index = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 map-pattern">
      <div className="max-w-6xl mx-auto w-full px-4 py-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left side: Branding */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <Plane className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-primary ml-2">TravelNexa</h1>
          </div>
          
          <h2 className="text-3xl font-bold">Explore the world with us</h2>
          <p className="text-lg text-muted-foreground">
            Your all-in-one travel companion for discovering new places, connecting with travelers, 
            and creating unforgettable experiences.
          </p>
          
          <div className="hidden md:flex flex-wrap gap-3 text-muted-foreground">
            <span className="bg-white rounded-full px-4 py-1 text-sm shadow-sm">Smart Recommendations</span>
            <span className="bg-white rounded-full px-4 py-1 text-sm shadow-sm">Location-Based Insights</span>
            <span className="bg-white rounded-full px-4 py-1 text-sm shadow-sm">Travel Community</span>
            <span className="bg-white rounded-full px-4 py-1 text-sm shadow-sm">Interactive Maps</span>
          </div>
        </div>
      
        {/* Right side: Auth form */}
        <div className="md:w-1/2 w-full">
          {showRegister ? (
            <RegisterForm onToggleForm={toggleForm} />
          ) : (
            <LoginForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>
      
      <footer className="bg-white py-4">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TravelNexa. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
