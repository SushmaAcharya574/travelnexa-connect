
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, List } from "lucide-react";

interface SearchFormValues {
  country: string;
  city: string;
  name: string;
}

interface TravelLocation {
  id: string;
  name: string;
  country: string;
  city: string;
  description: string;
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Sample data for search results
const sampleSearchResults: TravelLocation[] = [
  {
    id: "loc1",
    name: "Eiffel Tower",
    country: "France",
    city: "Paris",
    description: "The iconic iron tower built in 1889 that has become the most recognized symbol of Paris and one of the world's most famous landmarks.",
    image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&h=500",
    coordinates: {
      latitude: 48.8584,
      longitude: 2.2945,
    },
  },
  {
    id: "loc2",
    name: "Colosseum",
    country: "Italy",
    city: "Rome",
    description: "An ancient Roman amphitheater built in 70-80 AD, it is the largest amphitheater ever built and a symbol of Imperial Rome.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&h=500",
    coordinates: {
      latitude: 41.8902,
      longitude: 12.4922,
    },
  },
  {
    id: "loc3",
    name: "Statue of Liberty",
    country: "USA",
    city: "New York",
    description: "A colossal neoclassical sculpture on Liberty Island in New York Harbor, gifted to the United States by France in 1886.",
    image: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=800&h=500",
    coordinates: {
      latitude: 40.6892,
      longitude: -74.0445,
    },
  },
  {
    id: "loc4",
    name: "Sydney Opera House",
    country: "Australia",
    city: "Sydney",
    description: "A multi-venue performing arts centre featuring a distinctive sail-shaped design, it is one of the most famous buildings of the 20th century.",
    image: "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=800&h=500",
    coordinates: {
      latitude: -33.8568,
      longitude: 151.2153,
    },
  },
];

const TravelSearch = () => {
  const [searchValues, setSearchValues] = useState<SearchFormValues>({
    country: "",
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
      const matchCountry = location.country.toLowerCase().includes(searchValues.country.toLowerCase()) || !searchValues.country;
      const matchCity = location.city.toLowerCase().includes(searchValues.city.toLowerCase()) || !searchValues.city;
      const matchName = location.name.toLowerCase().includes(searchValues.name.toLowerCase()) || !searchValues.name;
      
      return matchCountry && matchCity && matchName;
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
                <span>{selectedLocation.city}, {selectedLocation.country}</span>
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
        <h2 className="text-xl font-semibold mb-4">Find Tourist Locations</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-1">
                Country
              </label>
              <Input
                id="country"
                name="country"
                placeholder="Enter country"
                value={searchValues.country}
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
                      <span className="text-sm">{location.city}, {location.country}</span>
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
