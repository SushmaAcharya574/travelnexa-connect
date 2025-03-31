
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Plane, MapPin, Globe, Users, Sparkles } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-background map-pattern animate-fade-in">
      <div className="max-w-7xl mx-auto w-full px-4 py-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left side: Branding */}
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="bg-primary p-3 rounded-full text-white shadow-lg">
              <Plane className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-primary">TravelNexa</h1>
          </div>
          
          <h2 className="text-4xl font-bold leading-tight">Discover Your Perfect <span className="text-secondary">Adventure</span></h2>
          <p className="text-lg text-foreground bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-accent/20">
            Your all-in-one travel companion for discovering new places, connecting with travelers, 
            and creating unforgettable experiences around the globe.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md border border-primary/20 hover:shadow-lg transition-all">
              <Globe className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Smart Recommendations</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md border border-secondary/20 hover:shadow-lg transition-all">
              <MapPin className="h-5 w-5 text-secondary" />
              <span className="font-medium text-foreground">Location Insights</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md border border-accent/20 hover:shadow-lg transition-all">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Travel Community</span>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center md:justify-start pt-4">
            <Button variant="outline" onClick={goToAdmin} className="bg-white shadow-md hover:shadow-lg transition-all border-primary/20 hover:border-primary/40">
              Admin Dashboard
            </Button>
            <Button className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
              <Sparkles className="h-4 w-4 mr-1" />
              Explore Now
            </Button>
          </div>
        </div>
      
        {/* Right side: Auth form */}
        <div className="md:w-5/12 w-full">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-primary/10">
            {showRegister ? (
              <RegisterForm onToggleForm={toggleForm} />
            ) : (
              <LoginForm onToggleForm={toggleForm} />
            )}
          </div>
        </div>
      </div>
      
      <footer className="bg-white/50 backdrop-blur-sm py-6 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-4 mb-3">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <div className="h-2 w-2 rounded-full bg-secondary"></div>
            <div className="h-2 w-2 rounded-full bg-accent"></div>
          </div>
          &copy; {new Date().getFullYear()} TravelNexa. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
