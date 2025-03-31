
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Plane, MapPin, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const goToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 map-pattern">
      <div className="max-w-7xl mx-auto w-full px-4 py-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left side: Branding */}
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="bg-primary p-3 rounded-full text-white">
              <Plane className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TravelNexa</h1>
          </div>
          
          <h2 className="text-4xl font-bold leading-tight">Discover Your Perfect <span className="text-primary">Adventure</span></h2>
          <p className="text-lg text-muted-foreground">
            Your all-in-one travel companion for discovering new places, connecting with travelers, 
            and creating unforgettable experiences around the globe.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <Globe className="h-5 w-5 text-primary" />
              <span className="font-medium">Smart Recommendations</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium">Location Insights</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Travel Community</span>
            </div>
          </div>
          
          <div className="pt-4">
            <Button variant="outline" onClick={goToAdmin} className="shadow-md hover:shadow-lg transition-all">
              Admin Dashboard
            </Button>
          </div>
        </div>
      
        {/* Right side: Auth form */}
        <div className="md:w-5/12 w-full">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-100">
            {showRegister ? (
              <RegisterForm onToggleForm={toggleForm} />
            ) : (
              <LoginForm onToggleForm={toggleForm} />
            )}
          </div>
        </div>
      </div>
      
      <footer className="bg-white/70 backdrop-blur-sm py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TravelNexa. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
