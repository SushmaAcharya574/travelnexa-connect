
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
    <div className="min-h-screen flex flex-col bg-palette-prussian map-pattern animate-fade-in">
      <div className="max-w-7xl mx-auto w-full px-4 py-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left side: Branding */}
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="bg-palette-teal p-3 rounded-full text-white shadow-lg">
              <Plane className="h-8 w-8" />
            </div>
            <h1 className="text-5xl font-bold text-palette-amber">TravelNexa</h1>
          </div>
          
          <h2 className="text-4xl font-bold leading-tight text-white">Discover the Magic of <span className="text-palette-amber">India</span></h2>
          <p className="text-lg text-white bg-palette-cerulean/90 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-palette-teal/20">
            Your all-in-one travel companion for exploring India's rich heritage, diverse cultures, 
            magnificent landscapes, and creating unforgettable experiences across the subcontinent.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center space-x-2 bg-palette-cerulean rounded-full px-4 py-2 shadow-md border border-palette-teal/20 hover:shadow-lg transition-all">
              <Globe className="h-5 w-5 text-palette-amber" />
              <span className="font-medium text-white">Cultural Experiences</span>
            </div>
            <div className="flex items-center space-x-2 bg-palette-cerulean rounded-full px-4 py-2 shadow-md border border-palette-amber/20 hover:shadow-lg transition-all">
              <MapPin className="h-5 w-5 text-palette-amber" />
              <span className="font-medium text-white">Heritage Sites</span>
            </div>
            <div className="flex items-center space-x-2 bg-palette-cerulean rounded-full px-4 py-2 shadow-md border border-palette-teal/20 hover:shadow-lg transition-all">
              <Users className="h-5 w-5 text-palette-amber" />
              <span className="font-medium text-white">Local Guides</span>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center md:justify-start pt-4">
            <Button variant="outline" onClick={goToAdmin} className="bg-palette-cerulean shadow-md hover:shadow-lg transition-all border-palette-teal/20 hover:border-palette-teal/40 text-white">
              Admin Dashboard
            </Button>
            <Button className="bg-palette-amber hover:bg-palette-amber/90 shadow-md hover:shadow-lg transition-all text-palette-prussian">
              <Sparkles className="h-4 w-4 mr-1" />
              Explore India
            </Button>
          </div>
        </div>
      
        {/* Right side: Auth form */}
        <div className="md:w-5/12 w-full">
          <div className="bg-palette-cerulean/90 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-palette-teal/10">
            {showRegister ? (
              <RegisterForm onToggleForm={toggleForm} />
            ) : (
              <LoginForm onToggleForm={toggleForm} />
            )}
          </div>
        </div>
      </div>
      
      <footer className="bg-palette-prussian/80 backdrop-blur-sm py-6 border-t border-palette-teal/10">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-palette-amber">
          <div className="flex justify-center gap-4 mb-3">
            <div className="h-2 w-2 rounded-full bg-palette-teal"></div>
            <div className="h-2 w-2 rounded-full bg-palette-amber"></div>
            <div className="h-2 w-2 rounded-full bg-palette-crimson"></div>
          </div>
          &copy; {new Date().getFullYear()} TravelNexa India. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
