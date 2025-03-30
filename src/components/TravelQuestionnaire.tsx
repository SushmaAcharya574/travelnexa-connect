
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
    country: string;
    city: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

// Sample questions for the questionnaire
const questionnaire: Question[] = [
  {
    id: "q1",
    text: "What type of travel experience are you looking for?",
    options: [
      { id: "q1-1", text: "Beach and relaxation", value: "beach" },
      { id: "q1-2", text: "Cultural and historical", value: "cultural" },
      { id: "q1-3", text: "Adventure and outdoor activities", value: "adventure" },
      { id: "q1-4", text: "Food and culinary experiences", value: "food" },
    ],
  },
  {
    id: "q2",
    text: "What is your preferred climate?",
    options: [
      { id: "q2-1", text: "Warm and tropical", value: "tropical" },
      { id: "q2-2", text: "Mild and temperate", value: "temperate" },
      { id: "q2-3", text: "Cool and mountainous", value: "mountainous" },
      { id: "q2-4", text: "I don't have a preference", value: "any" },
    ],
  },
  {
    id: "q3",
    text: "How long do you plan to travel?",
    options: [
      { id: "q3-1", text: "Short weekend trip (1-3 days)", value: "short" },
      { id: "q3-2", text: "Medium length (4-7 days)", value: "medium" },
      { id: "q3-3", text: "Extended vacation (1-2 weeks)", value: "extended" },
      { id: "q3-4", text: "Long-term travel (more than 2 weeks)", value: "long" },
    ],
  },
  {
    id: "q4",
    text: "What is your budget range?",
    options: [
      { id: "q4-1", text: "Budget-friendly", value: "budget" },
      { id: "q4-2", text: "Moderate", value: "moderate" },
      { id: "q4-3", text: "Luxury", value: "luxury" },
      { id: "q4-4", text: "No specific budget", value: "any" },
    ],
  },
];

// Sample travel results for recommendation
const sampleResults: TravelResult[] = [
  {
    id: "place1",
    name: "Bali, Indonesia",
    description: "Known for its tropical beaches, vibrant rice paddies, unique culture, and spiritual temples. Bali offers both relaxation and adventure across its diverse landscape.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&h=500",
    location: {
      country: "Indonesia",
      city: "Bali",
      coordinates: {
        latitude: -8.3405,
        longitude: 115.0920,
      },
    },
  },
  {
    id: "place2",
    name: "Barcelona, Spain",
    description: "A vibrant city known for its architectural marvels designed by Antoni Gaudí, delicious Mediterranean cuisine, and beautiful beaches along the coast.",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&h=500",
    location: {
      country: "Spain",
      city: "Barcelona",
      coordinates: {
        latitude: 41.3851,
        longitude: 2.1734,
      },
    },
  },
  {
    id: "place3",
    name: "Kyoto, Japan",
    description: "A city of cultural heritage featuring ancient temples, traditional tea houses, stunning gardens, and seasonal beauty, especially during cherry blossom season.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&h=500",
    location: {
      country: "Japan",
      city: "Kyoto",
      coordinates: {
        latitude: 35.0116,
        longitude: 135.7681,
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
          <h2 className="text-2xl font-semibold">Your Recommended Destinations</h2>
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
                  <span className="text-sm">{result.location.city}, {result.location.country}</span>
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
                <span>{selectedResult.location.city}, {selectedResult.location.country}</span>
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
