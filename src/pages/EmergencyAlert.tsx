import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Clock,
  CheckCircle,
  Loader2,
  Navigation,
  Users
} from "lucide-react";

const EmergencyAlert = () => {
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number, address: string} | null>(null);
  const [alertTime, setAlertTime] = useState<string>("");

  // Mock location data
  const mockLocation = {
    lat: 19.0760,
    lng: 72.8777,
    address: "Mumbai, Maharashtra, India"
  };

  useEffect(() => {
    // Simulate getting user location
    setLocation(mockLocation);
  }, []);

  const handleSendSOS = async () => {
    setIsSending(true);
    
    // Simulate sending emergency alert
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setAlertSent(true);
    setAlertTime(new Date().toLocaleTimeString());
    setIsSending(false);
  };

  const handleCallEmergency = () => {
    // In a real app, this would initiate a call to emergency services
    window.open('tel:108', '_self');
  };

  const mockDoctorResponse = {
    name: "Dr. Sarah Johnson",
    specialization: "Emergency Medicine",
    eta: "8 minutes",
    phone: "+91 98765 43210"
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
              <h1 className="text-xl font-bold text-gray-900">Emergency Alert</h1>
              <p className="text-sm text-gray-600">Send SOS alert in case of emergency</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        {!alertSent ? (
          <>
            {/* Emergency SOS Button */}
            <Card className="bg-white border-gray-200 mb-8 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <AlertTriangle className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency SOS Alert</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Click the button below to send an emergency alert to nearby doctors and emergency services.
                </p>
                
                <Button
                  onClick={handleSendSOS}
                  disabled={isSending}
                  className="w-full max-w-sm h-16 text-lg font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                      Sending Alert...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-6 h-6 mr-2" />
                      Send Emergency SOS
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card className="bg-white border-gray-200 mb-6 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Your Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {location ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Navigation className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{location.address}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    <span className="text-gray-600">Getting your location...</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleCallEmergency}
                className="h-16 bg-orange-600 hover:bg-orange-700 text-white rounded-xl flex items-center justify-center space-x-3"
              >
                <Phone className="w-6 h-6" />
                <span className="font-semibold">Call Emergency (108)</span>
              </Button>
              
              <Button
                onClick={() => navigate('/doctors')}
                variant="outline"
                className="h-16 border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center justify-center space-x-3"
              >
                <Users className="w-6 h-6" />
                <span className="font-semibold">Find Nearby Doctors</span>
              </Button>
            </div>
          </>
        ) : (
          /* Alert Sent Confirmation */
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Alert Sent Successfully!</h2>
              <p className="text-slate-400 mb-6">
                Your emergency alert has been sent to nearby doctors and emergency services.
              </p>
              
              <div className="bg-slate-800 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-slate-300">Alert Details</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time Sent:</span>
                    <span className="text-slate-200">{alertTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-200">{location?.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-green-500">Active</span>
                  </div>
                </div>
              </div>

              {/* Doctor Response */}
              <Card className="bg-slate-800 border-slate-700 mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-100 mb-3">Doctor Response</h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-100">{mockDoctorResponse.name}</div>
                      <div className="text-sm text-slate-400">{mockDoctorResponse.specialization}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-300">
                    <div className="mb-1">ETA: {mockDoctorResponse.eta}</div>
                    <div>Phone: {mockDoctorResponse.phone}</div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button
                  onClick={handleCallEmergency}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency Services
                </Button>
                
                <Button
                  onClick={() => {
                    setAlertSent(false);
                    setIsSending(false);
                  }}
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Send Another Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emergency Contacts */}
        <Card className="bg-slate-900 border-slate-800 mt-6">
          <CardHeader>
            <CardTitle className="text-slate-100">Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-800 rounded-lg">
                <div className="text-lg font-bold text-red-500 mb-1">108</div>
                <div className="text-sm text-slate-400">Emergency Services</div>
              </div>
              <div className="text-center p-4 bg-slate-800 rounded-lg">
                <div className="text-lg font-bold text-orange-500 mb-1">102</div>
                <div className="text-sm text-slate-400">Ambulance</div>
              </div>
              <div className="text-center p-4 bg-slate-800 rounded-lg">
                <div className="text-lg font-bold text-blue-500 mb-1">100</div>
                <div className="text-sm text-slate-400">Police</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmergencyAlert;
