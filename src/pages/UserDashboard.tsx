import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Activity,
  Clock,
  Edit,
  Save,
  AlertCircle,
  CheckCircle,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  // Mock audit logs data
  const auditLogs = [
    {
      id: 1,
      action: "Profile Updated",
      timestamp: "2024-01-15 14:30:22",
      details: "Changed email address",
      status: "success",
      ipAddress: "192.168.1.100"
    },
    {
      id: 2,
      action: "Login",
      timestamp: "2024-01-15 09:15:10",
      details: "Successful login from Chrome browser",
      status: "success",
      ipAddress: "192.168.1.100"
    },
    {
      id: 3,
      action: "Password Change",
      timestamp: "2024-01-14 16:45:33",
      details: "Password successfully updated",
      status: "success",
      ipAddress: "192.168.1.100"
    },
    {
      id: 4,
      action: "Failed Login",
      timestamp: "2024-01-14 10:22:15",
      details: "Failed login attempt - incorrect password",
      status: "warning",
      ipAddress: "203.0.113.5"
    },
    {
      id: 5,
      action: "Profile View",
      timestamp: "2024-01-13 11:30:45",
      details: "Accessed profile settings",
      status: "info",
      ipAddress: "192.168.1.100"
    }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: "info",
      title: "New Device Login",
      message: "Login detected from a new device in New York, US",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "success",
      title: "Security Update",
      message: "Your account security settings have been updated successfully",
      timestamp: "1 day ago"
    }
  ];

  const handleSaveProfile = () => {
    // Mock profile update
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'info':
        return <Eye className="w-4 h-4 text-primary" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "default",
      warning: "secondary", 
      info: "outline"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status}
      </Badge>
    );
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'info':
        return <AlertCircle className="w-4 h-4 text-primary" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile and view your account activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Management */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-primary" />
                      <span>Profile Information</span>
                    </CardTitle>
                    <CardDescription>
                      Manage your personal information and account settings
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveProfile}
                        className="flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium bg-muted p-3 rounded-md">{user?.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium bg-muted p-3 rounded-md">{user?.email}</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <Badge variant="outline">{user?.role}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audit Logs */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>Activity Logs</span>
                </CardTitle>
                <CardDescription>
                  View your recent account activities and actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      {getStatusIcon(log.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-foreground">{log.action}</h4>
                          {getStatusBadge(log.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">IP: {log.ipAddress}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Alerts Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Security Alerts</span>
                </CardTitle>
                <CardDescription>
                  Recent security notifications for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border border-border rounded-lg">
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                          <span className="text-xs text-muted-foreground mt-2 block">{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-sm">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Login</span>
                  <span className="text-sm font-medium">
                    {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Logins</span>
                  <span className="text-sm font-medium">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Profile Updates</span>
                  <span className="text-sm font-medium">3</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};