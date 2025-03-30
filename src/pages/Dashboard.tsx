
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { LogOut, Radio, Search, User } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">TravelNexa</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user.firstName}!</h2>
          <p className="text-muted-foreground">
            Current location: {user.location.address || "Location not available"}
          </p>
        </div>

        <TabView tabs={tabs} />
      </main>
    </div>
  );
}
