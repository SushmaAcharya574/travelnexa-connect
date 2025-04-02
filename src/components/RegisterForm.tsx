
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";
import LocationDetector from "./LocationDetector";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm({ onToggleForm }: { onToggleForm: () => void }) {
  const { register, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState({
    latitude: null as number | null,
    longitude: null as number | null,
    address: "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const { confirmPassword, ...userData } = values;
      
      // Ensure all required properties are passed with non-optional types
      await register({
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        location: location,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 bg-white p-8 rounded-xl shadow-md">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-palette-prussian">Join TravelNexa</h1>
        <p className="text-palette-cerulean">Create your account to start exploring</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-palette-prussian">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} className="text-palette-prussian" />
                  </FormControl>
                  <FormMessage className="text-palette-crimson" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-palette-prussian">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} className="text-palette-prussian" />
                  </FormControl>
                  <FormMessage className="text-palette-crimson" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-palette-prussian">Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} className="text-palette-prussian" />
                </FormControl>
                <FormMessage className="text-palette-crimson" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-palette-prussian">Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} className="text-palette-prussian" />
                </FormControl>
                <FormMessage className="text-palette-crimson" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-palette-prussian">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} className="text-palette-prussian" />
                </FormControl>
                <FormMessage className="text-palette-crimson" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-palette-prussian">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} className="text-palette-prussian" />
                </FormControl>
                <FormMessage className="text-palette-crimson" />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel className="text-palette-prussian">Current Location</FormLabel>
            <LocationDetector onLocationChange={setLocation} />
          </FormItem>

          <Button 
            type="submit" 
            className="w-full bg-palette-teal hover:bg-palette-teal/90 text-white" 
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <span className="text-palette-cerulean">Already have an account? </span>
        <Button variant="link" className="p-0 text-palette-amber" onClick={onToggleForm}>
          Login here
        </Button>
      </div>
    </div>
  );
}
