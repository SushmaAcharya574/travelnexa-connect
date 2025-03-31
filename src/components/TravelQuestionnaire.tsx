
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ArrowRight } from "lucide-react";

// Define the question and answer types
interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    value: string;
  }[];
}

interface TravelResult {
  id: string;
  name: string;
  description: string;
  image: string;
  location: {
    state: string;
    city: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

// Sample questions for the India-focused questionnaire
const questionnaire: Question[] = [
  {
    id: "q1",
    text: "What type of Indian travel experience are you looking for?",
    options: [
      { id: "q1-1", text: "Historical monuments and heritage", value: "heritage" },
      { id: "q1-2", text: "Spiritual and religious sites", value: "spiritual" },
      { id: "q1-3", text: "Nature and wildlife", value: "nature" },
      { id: "q1-4", text: "Food and cultural experiences", value: "culture" },
    ],
  },
  {
    id: "q2",
    text: "Which region of India interests you most?",
    options: [
      { id: "q2-1", text: "North India (Delhi, Agra, Rajasthan)", value: "north" },
      { id: "q2-2", text: "South India (Kerala, Tamil Nadu, Karnataka)", value: "south" },
      { id: "q2-3", text: "East India (West Bengal, Odisha, North East)", value: "east" },
      { id: "q2-4", text: "West India (Gujarat, Maharashtra, Goa)", value: "west" },
    ],
  },
  {
    id: "q3",
    text: "How long do you plan to travel in India?",
    options: [
      { id: "q3-1", text: "Short trip (1-5 days)", value: "short" },
      { id: "q3-2", text: "Medium length (6-10 days)", value: "medium" },
      { id: "q3-3", text: "Extended vacation (11-15 days)", value: "extended" },
      { id: "q3-4", text: "Long-term travel (more than 15 days)", value: "long" },
    ],
  },
  {
    id: "q4",
    text: "What is your preferred travel season for India?",
    options: [
      { id: "q4-1", text: "Winter (October-February)", value: "winter" },
      { id: "q4-2", text: "Spring (March-April)", value: "spring" },
      { id: "q4-3", text: "Summer (May-June)", value: "summer" },
      { id: "q4-4", text: "Monsoon (July-September)", value: "monsoon" },
    ],
  },
];

// Sample travel results for Indian destinations
const sampleResults: TravelResult[] = [
  {
    id: "place1",
    name: "Varanasi",
    description: "One of the world's oldest continuously inhabited cities and a major spiritual center for Hinduism. Experience ancient temples, sacred Ganges River rituals, and vibrant cultural traditions.",
    image: "https://images.unsplash.com/photo-1626015279986-c1aebd3d0fc7?auto=format&fit=crop&w=800&h=500",
    location: {
      state: "Uttar Pradesh",
      city: "Varanasi",
      coordinates: {
        latitude: 25.3176,
        longitude: 82.9739,
      },
    },
  },
  {
    id: "place2",
    name: "Kerala Backwaters",
    description: "A network of interconnected canals, rivers, lakes, and inlets formed by more than 900 km of waterways. Take a traditional houseboat cruise through palm-fringed waterways and experience rural Kerala's beauty.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&h=500",
    location: {
      state: "Kerala",
      city: "Alleppey",
      coordinates: {
        latitude: 9.4981,
        longitude: 76.3388,
      },
    },
  },
  {
    id: "place3",
    name: "Rann of Kutch",
    description: "One of the largest salt deserts in the world, offering breathtaking landscapes especially during the Rann Utsav festival when the white desert is illuminated under moonlight with cultural performances.",
    image: "https://images.unsplash.com/photo-1593096127838-3b7c7272c675?auto=format&fit=crop&w=800&h=500",
    location: {
      state: "Gujarat",
      city: "Kutch",
      coordinates: {
        latitude: 23.7337,
        longitude: 69.8597,
      },
    },
  },
];

const TravelQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<TravelResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<TravelResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questionnaire.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Process answers and get recommendations
      generateRecommendations();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const generateRecommendations = () => {
    // This would ideally have a more complex algorithm
    // For now, we're just returning sample results
    console.log("User answers:", answers);
    setResults(sampleResults);
    setShowResults(true);
  };

  const viewResultDetails = (result: TravelResult) => {
    setSelectedResult(result);
  };

  const viewOnMap = () => {
    if (selectedResult) {
      setShowMap(true);
      // This would open a map view with the coordinates
      const { latitude, longitude } = selectedResult.location.coordinates;
      const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(mapsUrl, "_blank");
    }
  };

  const resetQuestionnaire = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults([]);
    setSelectedResult(null);
    setShowResults(false);
    setShowMap(false);
  };

  // Render the current question
  if (!showResults) {
    const question = questionnaire[currentQuestion];
    return (
      <div className="space-y-6">
        <div className="flex justify-between mb-6">
          {Array.from({ length: questionnaire.length }).map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 mx-1 rounded-full ${
                index <= currentQuestion ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">{question.text}</h2>

        <RadioGroup 
          value={answers[question.id] || ""}
          onValueChange={(value) => handleAnswerSelect(question.id, value)}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.id} />
              <label
                htmlFor={option.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.text}
              </label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[question.id]}
          >
            {currentQuestion === questionnaire.length - 1 ? "Get Recommendations" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Render the results
  if (showResults && !selectedResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <h2 className="text-2xl font-semibold">Your Recommended Indian Destinations</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {results.map((result) => (
            <Card 
              key={result.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => viewResultDetails(result)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-1">{result.name}</h3>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{result.location.city}, {result.location.state}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button variant="outline" onClick={resetQuestionnaire} className="mt-4">
          Start Over
        </Button>
      </div>
    );
  }

  // Render a detailed view of the selected result
  if (selectedResult) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => setSelectedResult(null)} className="mb-4">
          Back to Results
        </Button>

        <div className="bg-card rounded-lg overflow-hidden shadow-md">
          <div className="h-64 md:h-96 overflow-hidden">
            <img
              src={selectedResult.image}
              alt={selectedResult.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedResult.name}</h2>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{selectedResult.location.city}, {selectedResult.location.state}</span>
              </div>
            </div>
            
            <p className="text-lg mb-6">{selectedResult.description}</p>
            
            <Button onClick={viewOnMap} className="w-full md:w-auto">
              <MapPin className="mr-2 h-4 w-4" />
              View on Google Maps
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TravelQuestionnaire;
