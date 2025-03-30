
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TabItem {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabViewProps {
  tabs: TabItem[];
  defaultTab?: string;
}

export default function TabView({ tabs, defaultTab = tabs[0]?.id }: TabViewProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="flex items-center justify-center gap-2">
            {tab.icon}
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-4">
          <Card>
            {(tab.title || tab.description) && (
              <CardHeader>
                <CardTitle>{tab.title}</CardTitle>
                {tab.description && <CardDescription>{tab.description}</CardDescription>}
              </CardHeader>
            )}
            <CardContent>{tab.content}</CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
