
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
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash, Save, X, MoveUp, MoveDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock questions data (would be fetched from backend in a real app)
const QUESTIONS_STORAGE_KEY = 'travelnexa_questions';

interface QuestionOption {
  id: string;
  text: string;
  value: string;
}

interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  order: number;
}

const AdminQuestionnaire = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>(() => {
    const storedQuestions = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  });
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<QuestionOption[]>([]);
  const [newOption, setNewOption] = useState({ text: '', value: '' });

  const handleAddQuestion = () => {
    setIsAdding(true);
    setQuestionText('');
    setOptions([]);
    setNewOption({ text: '', value: '' });
  };

  const handleEditQuestion = (question: Question) => {
    setEditingId(question.id);
    setQuestionText(question.text);
    setOptions([...question.options]);
    setNewOption({ text: '', value: '' });
  };

  const handleDeleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter(question => question.id !== id);
    
    // Reorder remaining questions
    const reorderedQuestions = updatedQuestions.map((q, idx) => ({
      ...q,
      order: idx + 1
    }));
    
    setQuestions(reorderedQuestions);
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(reorderedQuestions));
    
    toast({
      title: "Question deleted",
      description: "The question has been deleted successfully",
    });
  };

  const handleAddOption = () => {
    if (newOption.text.trim() === '' || newOption.value.trim() === '') {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Option text and value cannot be empty",
      });
      return;
    }
    
    const newOptionWithId = {
      ...newOption,
      id: Date.now().toString()
    };
    
    setOptions([...options, newOptionWithId]);
    setNewOption({ text: '', value: '' });
  };

  const handleRemoveOption = (id: string) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (questionText.trim() === '') {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Question text cannot be empty",
      });
      return;
    }
    
    if (options.length < 2) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "At least two options are required",
      });
      return;
    }
    
    if (editingId) {
      // Update existing question
      const updatedQuestions = questions.map(question => 
        question.id === editingId ? 
        { ...question, text: questionText, options: [...options] } : 
        question
      );
      
      setQuestions(updatedQuestions);
      localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(updatedQuestions));
      
      toast({
        title: "Question updated",
        description: "The question has been updated successfully",
      });
      
      setEditingId(null);
    } else {
      // Add new question
      const maxOrder = questions.length > 0 
        ? Math.max(...questions.map(q => q.order))
        : 0;
        
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: questionText,
        options: [...options],
        order: maxOrder + 1
      };
      
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(updatedQuestions));
      
      toast({
        title: "Question added",
        description: "The new question has been added successfully",
      });
      
      setIsAdding(false);
    }
    
    // Reset form
    setQuestionText('');
    setOptions([]);
    setNewOption({ text: '', value: '' });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setQuestionText('');
    setOptions([]);
    setNewOption({ text: '', value: '' });
  };

  const handleMoveQuestion = (id: string, direction: 'up' | 'down') => {
    const sortedQuestions = [...questions].sort((a, b) => a.order - b.order);
    const index = sortedQuestions.findIndex(q => q.id === id);
    
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === sortedQuestions.length - 1)) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap order values
    const temp = sortedQuestions[index].order;
    sortedQuestions[index].order = sortedQuestions[newIndex].order;
    sortedQuestions[newIndex].order = temp;
    
    setQuestions([...sortedQuestions]);
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(sortedQuestions));
  };

  // Sort questions by order
  const sortedQuestions = [...questions].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Travel Questionnaire</h3>
        {!isAdding && !editingId && (
          <Button onClick={handleAddQuestion}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Question
          </Button>
        )}
      </div>
      
      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Question' : 'Add New Question'}</CardTitle>
            <CardDescription>
              Create a question with multiple choice options
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="questionText">Question Text*</Label>
                <Input 
                  id="questionText" 
                  value={questionText} 
                  onChange={(e) => setQuestionText(e.target.value)} 
                  placeholder="e.g. What type of vacation do you prefer?" 
                  required 
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Options</Label>
                  <p className="text-xs text-muted-foreground">
                    At least 2 options required
                  </p>
                </div>
                
                {options.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Option Text</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="w-24">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {options.map((option) => (
                        <TableRow key={option.id}>
                          <TableCell>{option.text}</TableCell>
                          <TableCell>{option.value}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleRemoveOption(option.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="optionText">Option Text</Label>
                    <Input 
                      id="optionText" 
                      value={newOption.text} 
                      onChange={(e) => setNewOption({...newOption, text: e.target.value})} 
                      placeholder="e.g. Beach vacation" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="optionValue">Option Value</Label>
                    <Input 
                      id="optionValue" 
                      value={newOption.value} 
                      onChange={(e) => setNewOption({...newOption, value: e.target.value})} 
                      placeholder="e.g. beach" 
                    />
                  </div>
                  <div className="flex items-end md:col-span-1">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleAddOption}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {editingId ? 'Update Question' : 'Save Question'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
      
      {!isAdding && !editingId && (
        <div className="border rounded-lg">
          {sortedQuestions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Order</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Options</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedQuestions.map((question, index) => (
                  <TableRow key={question.id}>
                    <TableCell className="font-medium">{question.order}</TableCell>
                    <TableCell>{question.text}</TableCell>
                    <TableCell>{question.options.length} options</TableCell>
                    <TableCell className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleMoveQuestion(question.id, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleMoveQuestion(question.id, 'down')}
                        disabled={index === sortedQuestions.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditQuestion(question)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No questions added yet. Click "Add New Question" to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminQuestionnaire;
