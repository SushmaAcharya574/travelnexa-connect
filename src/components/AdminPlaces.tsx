
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock places data (would be fetched from backend in a real app)
const PLACES_STORAGE_KEY = 'travelnexa_places';

interface PlaceLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface Place {
  id: string;
  name: string;
  description: string;
  country: string;
  city: string;
  type: string;
  imageUrl: string;
  location: PlaceLocation;
}

const AdminPlaces = () => {
  const { toast } = useToast();
  const [places, setPlaces] = useState<Place[]>(() => {
    const storedPlaces = localStorage.getItem(PLACES_STORAGE_KEY);
    return storedPlaces ? JSON.parse(storedPlaces) : [];
  });
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Place, 'id'>>({
    name: '',
    description: '',
    country: '',
    city: '',
    type: '',
    imageUrl: '',
    location: {
      latitude: 0,
      longitude: 0,
      address: ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: locationField === 'latitude' || locationField === 'longitude' 
            ? parseFloat(value) || 0 
            : value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddPlace = () => {
    setIsAdding(true);
    setFormData({
      name: '',
      description: '',
      country: '',
      city: '',
      type: '',
      imageUrl: '',
      location: {
        latitude: 0,
        longitude: 0,
        address: ''
      }
    });
  };

  const handleEditPlace = (place: Place) => {
    setEditingId(place.id);
    setFormData({
      name: place.name,
      description: place.description,
      country: place.country,
      city: place.city,
      type: place.type,
      imageUrl: place.imageUrl,
      location: { ...place.location }
    });
  };

  const handleDeletePlace = (id: string) => {
    const updatedPlaces = places.filter(place => place.id !== id);
    setPlaces(updatedPlaces);
    localStorage.setItem(PLACES_STORAGE_KEY, JSON.stringify(updatedPlaces));
    
    toast({
      title: "Place deleted",
      description: "The place has been deleted successfully",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description || !formData.country) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    if (editingId) {
      // Update existing place
      const updatedPlaces = places.map(place => 
        place.id === editingId ? { ...formData, id: editingId } : place
      );
      setPlaces(updatedPlaces);
      localStorage.setItem(PLACES_STORAGE_KEY, JSON.stringify(updatedPlaces));
      
      toast({
        title: "Place updated",
        description: "The place has been updated successfully",
      });
      
      setEditingId(null);
    } else {
      // Add new place
      const newPlace: Place = {
        ...formData,
        id: Date.now().toString(),
      };
      
      const updatedPlaces = [...places, newPlace];
      setPlaces(updatedPlaces);
      localStorage.setItem(PLACES_STORAGE_KEY, JSON.stringify(updatedPlaces));
      
      toast({
        title: "Place added",
        description: "The new place has been added successfully",
      });
      
      setIsAdding(false);
    }
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      country: '',
      city: '',
      type: '',
      imageUrl: '',
      location: {
        latitude: 0,
        longitude: 0,
        address: ''
      }
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      country: '',
      city: '',
      type: '',
      imageUrl: '',
      location: {
        latitude: 0,
        longitude: 0,
        address: ''
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Travel Places</h3>
        {!isAdding && !editingId && (
          <Button onClick={handleAddPlace}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Place
          </Button>
        )}
      </div>
      
      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Place' : 'Add New Place'}</CardTitle>
            <CardDescription>
              Enter details about the tourist location
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Place Name*</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="e.g. Eiffel Tower" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type of Place</Label>
                  <Input 
                    id="type" 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange} 
                    placeholder="e.g. Monument, Beach, Museum" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country*</Label>
                  <Input 
                    id="country" 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange} 
                    placeholder="e.g. France" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                    placeholder="e.g. Paris" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input 
                    id="imageUrl" 
                    name="imageUrl" 
                    value={formData.imageUrl} 
                    onChange={handleChange} 
                    placeholder="https://example.com/image.jpg" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location.address">Address</Label>
                  <Input 
                    id="location.address" 
                    name="location.address" 
                    value={formData.location.address} 
                    onChange={handleChange} 
                    placeholder="Full address of the location" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location.latitude">Latitude</Label>
                  <Input 
                    id="location.latitude" 
                    name="location.latitude" 
                    type="number" 
                    value={formData.location.latitude} 
                    onChange={handleChange} 
                    placeholder="e.g. 48.8584" 
                    step="0.0001" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location.longitude">Longitude</Label>
                  <Input 
                    id="location.longitude" 
                    name="location.longitude" 
                    type="number" 
                    value={formData.location.longitude} 
                    onChange={handleChange} 
                    placeholder="e.g. 2.2945" 
                    step="0.0001" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Provide a detailed description of the place" 
                  rows={4} 
                  required 
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {editingId ? 'Update Place' : 'Save Place'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
      
      {!isAdding && !editingId && (
        <div className="border rounded-lg">
          {places.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {places.map((place) => (
                  <TableRow key={place.id}>
                    <TableCell className="font-medium">{place.name}</TableCell>
                    <TableCell>{place.type}</TableCell>
                    <TableCell>{place.city}, {place.country}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditPlace(place)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeletePlace(place.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No places added yet. Click "Add New Place" to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPlaces;
