
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Plane, MapPin, Globe, Users, Sparkles, Sun, Flower } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 map-pattern animate-fade-in">
      <div className="max-w-7xl mx-auto w-full px-4 py-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left side: Branding */}
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="bg-gradient-to-tr from-primary to-accent p-3 rounded-full text-white shadow-lg">
              <Plane className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">TravelNexa</h1>
          </div>
          
          <h2 className="text-4xl font-bold leading-tight">Discover Your Perfect <span className="text-transparent bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text">Adventure</span></h2>
          <p className="text-lg text-muted-foreground bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-white/70">
            Your all-in-one travel companion for discovering new places, connecting with travelers, 
            and creating unforgettable experiences around the globe.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full px-4 py-2 shadow-md border border-blue-200 hover:shadow-lg transition-all">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-blue-700">Smart Recommendations</span>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-green-100 rounded-full px-4 py-2 shadow-md border border-green-200 hover:shadow-lg transition-all">
              <MapPin className="h-5 w-5 text-green-500" />
              <span className="font-medium text-green-700">Location Insights</span>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-purple-100 rounded-full px-4 py-2 shadow-md border border-purple-200 hover:shadow-lg transition-all">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="font-medium text-purple-700">Travel Community</span>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center md:justify-start pt-4">
            <Button variant="outline" onClick={goToAdmin} className="bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-all border-gray-300 hover:border-gray-400 hover:bg-white/90">
              <Sun className="h-4 w-4 text-amber-500 mr-1" />
              Admin Dashboard
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-md hover:shadow-lg transition-all">
              <Sparkles className="h-4 w-4 mr-1" />
              Explore Now
            </Button>
          </div>
          
          <div className="absolute -z-10 top-20 left-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -z-10 top-20 right-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -z-10 bottom-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      
        {/* Right side: Auth form */}
        <div className="md:w-5/12 w-full">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white">
            <div className="absolute right-4 top-4">
              <div className="bg-gradient-to-br from-pink-200 to-pink-100 p-2 rounded-full">
                <Flower className="h-4 w-4 text-pink-500" />
              </div>
            </div>
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
          <div className="flex justify-center gap-4 mb-3">
            <div className="h-2 w-2 rounded-full bg-pink-400"></div>
            <div className="h-2 w-2 rounded-full bg-blue-400"></div>
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
            <div className="h-2 w-2 rounded-full bg-purple-400"></div>
          </div>
          &copy; {new Date().getFullYear()} TravelNexa. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
