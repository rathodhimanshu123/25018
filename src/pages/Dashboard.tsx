import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  AlertTriangle, 
  Users, 
  Bot, 
  UserCircle2, 
  LogOut,
  History,
  MapPin,
  HeartPulse
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const dashboardCards = [
    {
      title: "List of Doctors",
      description: "Find and connect with available doctors",
      icon: Users,
      path: "/doctors",
      color: "bg-orange-500",
      iconColor: "text-white"
    },
    {
      title: "Call History",
      description: "View your past calls and consultations",
      icon: History,
      path: "/call-history",
      color: "bg-green-600",
      iconColor: "text-white"
    },
    {
      title: "Emergency (SOS)",
      description: "Send SOS alert in case of emergency",
      icon: AlertTriangle,
      path: "/emergency",
      color: "bg-red-500",
      iconColor: "text-white"
    },
    {
      title: "AI Assistant",
      description: "Get help from our AI chatbot",
      icon: Bot,
      path: "/ai-assistant",
      color: "bg-orange-500",
      iconColor: "text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">NabhaCare</h1>
              <p className="text-sm text-gray-600">Your Health Assistant Dashboard</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Choose a service to get started</p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={index}
                className="bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onClick={() => navigate(card.path)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    <IconComponent className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>


        {/* Status Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Location Status</h4>
                  <p className="text-sm text-gray-600">GPS Enabled</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Emergency Contacts</h4>
                  <p className="text-sm text-gray-600">3 Available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">AI Assistant</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
