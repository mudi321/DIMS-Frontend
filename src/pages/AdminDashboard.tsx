import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Activity, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  TrendingUp,
  Database,
  Server
} from 'lucide-react';

export const AdminDashboard = () => {
  // Mock data for admin dashboard
  const systemStats = [
    {
      title: "Active Users",
      value: "1,247",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Users,
      description: "Currently online: 156"
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "Uptime this month",
      changeType: "positive" as const,
      icon: Activity,
      description: "All systems operational"
    },
    {
      title: "Security Alerts",
      value: "3",
      change: "2 resolved today",
      changeType: "neutral" as const,
      icon: Shield,
      description: "1 requires attention"
    },
    {
      title: "New Registrations",
      value: "89",
      change: "+5% from yesterday",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "This week"
    }
  ];

  const recentSecurityAlerts = [
    {
      id: 1,
      type: "warning",
      title: "Failed Login Attempts",
      description: "Multiple failed login attempts detected from IP 192.168.1.100",
      time: "2 minutes ago",
      severity: "medium"
    },
    {
      id: 2,
      type: "success",
      title: "Security Patch Applied",
      description: "Critical security update successfully deployed to all servers",
      time: "1 hour ago",
      severity: "low"
    },
    {
      id: 3,
      type: "error",
      title: "Suspicious Activity",
      description: "Unusual data access pattern detected in user account ID: 1247",
      time: "3 hours ago",
      severity: "high"
    }
  ];

  const systemLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:22",
      level: "INFO",
      service: "API Gateway",
      message: "User authentication successful - admin@techcorp.com"
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:28:15",
      level: "WARNING",
      service: "Database",
      message: "Connection pool reaching capacity (85%)"
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:25:01",
      level: "ERROR",
      service: "Email Service",
      message: "Failed to send notification to user@example.com - timeout"
    },
    {
      id: 4,
      timestamp: "2024-01-15 14:22:45",
      level: "INFO",
      service: "File Storage",
      message: "Backup process completed successfully"
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: "destructive",
      medium: "secondary",
      low: "outline"
    } as const;
    
    return (
      <Badge variant={variants[severity as keyof typeof variants]}>
        {severity}
      </Badge>
    );
  };

  const getLogLevelBadge = (level: string) => {
    const colors = {
      INFO: "bg-primary text-primary-foreground",
      WARNING: "bg-warning text-warning-foreground", 
      ERROR: "bg-destructive text-destructive-foreground"
    } as const;

    return (
      <span className={`text-xs px-2 py-1 rounded ${colors[level as keyof typeof colors] || 'bg-muted text-muted-foreground'}`}>
        {level}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            System overview and management console
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Reports */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Security Reports</span>
              </CardTitle>
              <CardDescription>
                Recent security alerts and system notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSecurityAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-primary" />
                <span>System Status</span>
              </CardTitle>
              <CardDescription>
                Current system health and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-sm font-medium">API Gateway</span>
                  </div>
                  <span className="text-sm text-success">Operational</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-sm font-medium">Database</span>
                  </div>
                  <span className="text-sm text-success">Operational</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span className="text-sm font-medium">Email Service</span>
                  </div>
                  <span className="text-sm text-warning">Degraded</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-sm font-medium">Storage</span>
                  </div>
                  <span className="text-sm text-success">Operational</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Logs */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-primary" />
              <span>System Logs</span>
            </CardTitle>
            <CardDescription>
              Recent system events and application logs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="text-xs text-muted-foreground font-mono w-32">
                    {log.timestamp}
                  </span>
                  {getLogLevelBadge(log.level)}
                  <span className="text-sm font-medium text-primary w-24">
                    {log.service}
                  </span>
                  <span className="text-sm text-foreground flex-1">
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};