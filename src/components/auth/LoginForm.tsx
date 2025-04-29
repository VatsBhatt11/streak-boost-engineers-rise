
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a placeholder for actual authentication
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, just show success and simulate login
      toast({
        title: "Logged in successfully",
        description: "Welcome to Track100xEngineers!"
      });
      
      // In a real app, you would set an auth state
      localStorage.setItem('user', JSON.stringify({
        id: 'user-1',
        name: 'Demo User',
        email: email,
      }));
      
      // Redirect or update state
      window.location.href = '/';
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login to Track100x</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="bg-secondary"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-secondary"
            />
          </div>
          <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-border pt-4">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/register" className="text-brand-orange hover:underline">
            Register
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
