import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Activity, ArrowRight, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Advanced security features with role-based access control and audit logging"
    },
    {
      icon: Users,
      title: "User Management", 
      description: "Comprehensive user administration with detailed profile management"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Live system monitoring with security alerts and performance metrics"
    }
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(user?.role === 'admin' ? '/admin' : '/user-dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">IDGuard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
                  <Button onClick={handleGetStarted}>
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Decentralized Identity & 
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Identity Management</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Robust admin dashboard with seamless identity management, real-time access control, 
              and blockchain-powered security for decentralized systems.
            </p>
            <Button size="lg" onClick={handleGetStarted} className="shadow-elegant">
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Today'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to manage your platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for modern tech companies that need reliable, secure, and scalable user management solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow duration-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-primary text-primary-foreground shadow-elegant">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-primary-foreground/80 mb-6">
                Join thousands of companies using IDGuard for their user management needs.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <CheckCircle className="w-5 h-5" />
                <span>Free trial available</span>
                <CheckCircle className="w-5 h-5" />
                <span>Enterprise ready</span>
                <CheckCircle className="w-5 h-5" />
                <span>24/7 support</span>
              </div>
              <Button 
                variant="secondary" 
                size="lg" 
                className="mt-6"
                onClick={handleGetStarted}
              >
                {isAuthenticated ? 'Access Dashboard' : 'Start Free Trial'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
