import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Phone, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  User
} from "lucide-react";

const CallHistory = () => {
  const navigate = useNavigate();

  // Mock call history data
  const callHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      doctorName: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      type: "Emergency",
      location: "Mumbai, Maharashtra",
      status: "Completed",
      duration: "12:45"
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "09:15",
      doctorName: "Dr. Rajesh Kumar",
      specialization: "General Physician",
      type: "Regular",
      location: "Delhi, Delhi",
      status: "Completed",
      duration: "08:30"
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "16:45",
      doctorName: "Dr. Priya Sharma",
      specialization: "Neurologist",
      type: "Emergency",
      location: "Bangalore, Karnataka",
      status: "Completed",
      duration: "08:30"
    },
    {
      id: 4,
      date: "2024-01-12",
      time: "11:20",
      doctorName: "Dr. Amit Patel",
      specialization: "Dermatologist",
      type: "Regular",
      location: "Ahmedabad, Gujarat",
      status: "Completed",
      duration: "15:20"
    },
    {
      id: 5,
      date: "2024-01-11",
      time: "13:10",
      doctorName: "Dr. Neha Singh",
      specialization: "Pediatrician",
      type: "Regular",
      location: "Pune, Maharashtra",
      status: "Completed",
      duration: "10:15"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "Emergency" ? 
      <AlertTriangle className="w-4 h-4 text-red-500" /> : 
      <Phone className="w-4 h-4 text-blue-500" />;
  };

  const handleCallAgain = (callId: number) => {
    // Simulate calling again
    console.log(`Calling again for call ID: ${callId}`);
    // In a real app, this would initiate a new call
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => navigate('/home')} 
              variant="outline" 
              size="icon"
              className="bg-white border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Call History</h1>
              <p className="text-sm text-gray-600">Your past consultations and calls</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{callHistory.length}</div>
              <div className="text-sm text-gray-600">Total Calls</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {callHistory.filter(call => call.status === "Completed").length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">
                {callHistory.filter(call => call.type === "Emergency").length}
              </div>
              <div className="text-sm text-gray-600">Emergency</div>
            </CardContent>
          </Card>
        </div>

        {/* Call History List */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Calls</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {callHistory.map((call, index) => (
                <div 
                  key={call.id}
                  className={`p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors ${
                    index === callHistory.length - 1 ? 'rounded-b-lg' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-orange-500" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{call.doctorName}</h3>
                          {getTypeIcon(call.type)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{call.specialization}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{call.date} at {call.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{call.location}</span>
                          </div>
                          {call.duration !== "00:00" && (
                            <span>Duration: {call.duration}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(call.status)}
                        <span className={`text-sm font-medium ${
                          call.status === "Completed" ? "text-green-600" : "text-yellow-500"
                        }`}>
                          {call.status}
                        </span>
                      </div>
                      
                      {call.status === "Completed" && (
                        <Button
                          onClick={() => handleCallAgain(call.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call Again
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Empty State (if no calls) */}
        {callHistory.length === 0 && (
          <Card className="bg-white border-gray-200">
            <CardContent className="p-12 text-center">
              <Phone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Call History</h3>
              <p className="text-gray-600 mb-6">You haven't made any calls yet.</p>
              <Button 
                onClick={() => navigate('/doctors')}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl"
              >
                Find a Doctor
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default CallHistory;
