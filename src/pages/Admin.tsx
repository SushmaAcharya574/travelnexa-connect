
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Plus, Lock } from "lucide-react";
import AdminPlaces from "@/components/AdminPlaces";
import AdminQuestionnaire from "@/components/AdminQuestionnaire";

export default function Admin() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    
    // Check if user is admin - for demo purposes we're checking if username contains 'admin'
    // In a real app, you would check a proper admin flag or role
    if (user && user.username.toLowerCase().includes('admin')) {
      setIsAdmin(true);
    } else {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, user]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
          <p className="text-muted-foreground mb-4">You need admin privileges to access this page.</p>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">TravelNexa Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
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
          <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Manage places and questionnaires for the TravelNexa platform
          </p>
        </div>

        <Tabs defaultValue="places" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="places">Manage Places</TabsTrigger>
            <TabsTrigger value="questionnaire">Manage Questionnaire</TabsTrigger>
          </TabsList>
          
          <TabsContent value="places" className="space-y-4">
            <AdminPlaces />
          </TabsContent>
          
          <TabsContent value="questionnaire" className="space-y-4">
            <AdminQuestionnaire />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
