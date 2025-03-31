
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { LogOut, Radio, Search, User, Settings, MapPin, Calendar } from "lucide-react";
import TravelQuestionnaire from "@/components/TravelQuestionnaire";
import TravelSearch from "@/components/TravelSearch";

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  // Check if user is admin (username contains 'admin')
  const isAdmin = user.username.toLowerCase().includes('admin');

  const tabs = [
    {
      id: "questionnaire",
      title: "Travel Recommendations",
      icon: <Radio className="h-4 w-4" />,
      description: "Get personalized travel recommendations based on your preferences",
      content: <TravelQuestionnaire />,
    },
    {
      id: "search",
      title: "Manual Search",
      icon: <Search className="h-4 w-4" />,
      description: "Search for specific travel destinations by location or name",
      content: <TravelSearch />,
    },
  ];

  const goToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TravelNexa</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={goToAdmin} className="flex items-center gap-1.5 shadow-sm">
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            )}
            
            <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-1.5 shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Welcome, {user.firstName}!</h2>
              <p className="text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> 
                {user.location.address || "Location not available"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <TabView tabs={tabs} />
        </div>
      </main>
    </div>
  );
}
