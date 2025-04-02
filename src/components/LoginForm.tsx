
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
import { Loader2, LogIn } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm({ onToggleForm }: { onToggleForm: () => void }) {
  const { login, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 bg-white p-8 rounded-xl shadow-md">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-palette-prussian">Welcome to TravelNexa</h1>
        <p className="text-palette-cerulean">Sign in to continue your journey</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <Button 
            type="submit" 
            className="w-full bg-palette-teal hover:bg-palette-teal/90 text-white" 
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <span className="text-palette-cerulean">Don't have an account? </span>
        <Button variant="link" className="p-0 text-palette-amber" onClick={onToggleForm}>
          Register now
        </Button>
      </div>
    </div>
  );
}
