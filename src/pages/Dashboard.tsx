
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import TabView from "@/components/TabView";
import { Button } from "@/components/ui/button";
import { LogOut, MapPin, User } from "lucide-react";

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
      id: "tab1",
      title: "Tab 1",
      icon: <User className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Welcome to Tab 1</h2>
          <p>This is the content of the first tab. You can modify this as needed based on your requirements.</p>
        </div>
      ),
    },
    {
      id: "tab2",
      title: "Tab 2",
      icon: <MapPin className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Welcome to Tab 2</h2>
          <p>This is the content of the second tab. You can modify this as needed based on your requirements.</p>
        </div>
      ),
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
