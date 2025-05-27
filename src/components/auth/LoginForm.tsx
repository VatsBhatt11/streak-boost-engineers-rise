
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import "./LoginForm.css";

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
    <Card className="login-form-card">
      <CardHeader>
        <CardTitle className="login-form-title">Login to Track100x</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-field">
            <label htmlFor="email" className="login-form-label">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="login-form-input"
            />
          </div>
          <div className="login-form-field">
            <label htmlFor="password" className="login-form-label">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="login-form-input"
            />
          </div>
          <Button type="submit" className="login-form-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="login-form-footer">
        <p className="login-form-footer-text">
          Don't have an account?{" "}
          <a href="/register" className="login-form-link">
            Register
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
