
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, List } from "lucide-react";

interface SearchFormValues {
  state: string;
  city: string;
  name: string;
}

interface TravelLocation {
  id: string;
  name: string;
  state: string;
  city: string;
  description: string;
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Sample data for Indian tourist locations
const sampleSearchResults: TravelLocation[] = [
  {
    id: "loc1",
    name: "Taj Mahal",
    state: "Uttar Pradesh",
    city: "Agra",
    description: "The iconic white marble mausoleum built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal. It's one of the Seven Wonders of the World and a UNESCO World Heritage site.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&h=500",
    coordinates: {
      latitude: 27.1751,
      longitude: 78.0421,
    },
  },
  {
    id: "loc2",
    name: "Jaipur City Palace",
    state: "Rajasthan",
    city: "Jaipur",
    description: "A magnificent blend of Rajasthani and Mughal architecture, the City Palace complex includes beautiful courtyards, gardens, and museums showcasing royal artifacts.",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&h=500",
    coordinates: {
      latitude: 26.9255,
      longitude: 75.8236,
    },
  },
  {
    id: "loc3",
    name: "Golden Temple",
    state: "Punjab",
    city: "Amritsar",
    description: "Harmandir Sahib, also known as the Golden Temple, is the most sacred shrine in Sikhism. The stunning gold-plated building surrounded by a sacred pool attracts visitors from all faiths.",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&h=500",
    coordinates: {
      latitude: 31.6200,
      longitude: 74.8765,
    },
  },
  {
    id: "loc4",
    name: "Hawa Mahal",
    state: "Rajasthan",
    city: "Jaipur",
    description: "The 'Palace of Winds' is a five-story palace built in 1799 with a unique honeycomb facade with 953 small windows that allowed royal ladies to observe street festivities without being seen.",
    image: "https://images.unsplash.com/photo-1599661046548-c8a9aca2d0a4?auto=format&fit=crop&w=800&h=500",
    coordinates: {
      latitude: 26.9239,
      longitude: 75.8267,
    },
  },
  {
    id: "loc5",
    name: "Gateway of India",
    state: "Maharashtra",
    city: "Mumbai",
    description: "An iconic arch monument built during the 20th century to commemorate the landing of King George V and Queen Mary in 1911. It overlooks the Arabian Sea and is a symbol of Mumbai.",
    image: "https://images.unsplash.com/photo-1567003794281-e9a6a8474b58?auto=format&fit=crop&w=800&h=500",
    coordinates: {
      latitude: 18.9220,
      longitude: 72.8347,
    },
  },
  {
    id: "loc6",
    name: "Mysore Palace",
    state: "Karnataka",
    city: "Mysore",
    description: "The official residence of the Wadiyar dynasty that ruled Mysore from 1399 to 1950. The current palace was built in 1912 after the old wooden structure was destroyed by fire.",
    image: "https://images.unsplash.com/photo-1628944682084-831f35256aea?auto=format&fit=crop&w=800&h=500",
    coordinates: {
      latitude: 12.3052,
      longitude: 76.6552,
    },
  },
];

const TravelSearch = () => {
  const [searchValues, setSearchValues] = useState<SearchFormValues>({
    state: "",
    city: "",
    name: "",
  });
  const [searchResults, setSearchResults] = useState<TravelLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching with:", searchValues);
    
    // Filter the sample data based on search criteria
    // In a real application, this would be an API call
    const results = sampleSearchResults.filter((location) => {
      const matchState = location.state.toLowerCase().includes(searchValues.state.toLowerCase()) || !searchValues.state;
      const matchCity = location.city.toLowerCase().includes(searchValues.city.toLowerCase()) || !searchValues.city;
      const matchName = location.name.toLowerCase().includes(searchValues.name.toLowerCase()) || !searchValues.name;
      
      return matchState && matchCity && matchName;
    });
    
    setSearchResults(results);
    setHasSearched(true);
    setSelectedLocation(null);
  };

  const viewLocationDetails = (location: TravelLocation) => {
    setSelectedLocation(location);
  };

  const viewOnMap = () => {
    if (selectedLocation) {
      const { latitude, longitude } = selectedLocation.coordinates;
      const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(mapsUrl, "_blank");
    }
  };

  const backToResults = () => {
    setSelectedLocation(null);
  };

  // Render location details if one is selected
  if (selectedLocation) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={backToResults} className="mb-4">
          Back to Search Results
        </Button>

        <div className="bg-card rounded-lg overflow-hidden shadow-md">
          <div className="h-64 md:h-96 overflow-hidden">
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedLocation.name}</h2>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{selectedLocation.city}, {selectedLocation.state}</span>
              </div>
            </div>
            
            <p className="text-lg mb-6">{selectedLocation.description}</p>
            
            <Button onClick={viewOnMap} className="w-full md:w-auto">
              <MapPin className="mr-2 h-4 w-4" />
              View on Google Maps
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-card shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Find Indian Tourist Destinations</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-1">
                State
              </label>
              <Input
                id="state"
                name="state"
                placeholder="Enter state"
                value={searchValues.state}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                City
              </label>
              <Input
                id="city"
                name="city"
                placeholder="Enter city"
                value={searchValues.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Place Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Enter place name"
                value={searchValues.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </div>

      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Search Results ({searchResults.length})
            </h3>
            <div className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                {searchResults.length} locations found
              </span>
            </div>
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-8 bg-muted rounded-lg">
              <p className="text-muted-foreground">No locations found matching your search criteria.</p>
              <p className="text-sm mt-2">Try adjusting your search terms or remove some filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((location) => (
                <Card 
                  key={location.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => viewLocationDetails(location)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{location.name}</h3>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{location.city}, {location.state}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TravelSearch;
