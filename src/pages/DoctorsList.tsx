import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Phone, 
  MessageCircle, 
  Star, 
  MapPin, 
  Clock,
  Search,
  Filter,
  User,
  Stethoscope
} from "lucide-react";

const DoctorsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");

  // Mock doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      rating: 4.8,
      experience: "12 years",
      location: "Mumbai, Maharashtra",
      availability: "Available Now",
      phone: "+91 98765 43210",
      image: null,
      consultationFee: "₹500"
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialization: "General Physician",
      rating: 4.6,
      experience: "8 years",
      location: "Delhi, Delhi",
      availability: "Available in 2 hours",
      phone: "+91 98765 43211",
      image: null,
      consultationFee: "₹300"
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialization: "Neurologist",
      rating: 4.9,
      experience: "15 years",
      location: "Bangalore, Karnataka",
      availability: "Available Now",
      phone: "+91 98765 43212",
      image: null,
      consultationFee: "₹800"
    },
    {
      id: 4,
      name: "Dr. Amit Patel",
      specialization: "Dermatologist",
      rating: 4.7,
      experience: "10 years",
      location: "Ahmedabad, Gujarat",
      availability: "Available in 1 hour",
      phone: "+91 98765 43213",
      image: null,
      consultationFee: "₹400"
    },
    {
      id: 5,
      name: "Dr. Neha Singh",
      specialization: "Pediatrician",
      rating: 4.8,
      experience: "9 years",
      location: "Pune, Maharashtra",
      availability: "Available Now",
      phone: "+91 98765 43214",
      image: null,
      consultationFee: "₹350"
    },
    {
      id: 6,
      name: "Dr. Vikram Mehta",
      specialization: "Orthopedist",
      rating: 4.5,
      experience: "11 years",
      location: "Chennai, Tamil Nadu",
      availability: "Available in 3 hours",
      phone: "+91 98765 43215",
      image: null,
      consultationFee: "₹600"
    }
  ];

  const specializations = [
    "all", "Cardiologist", "General Physician", "Neurologist", 
    "Dermatologist", "Pediatrician", "Orthopedist"
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === "all" || 
                                 doctor.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const handleCallDoctor = (doctor: any) => {
    // In a real app, this would initiate a call
    console.log(`Calling ${doctor.name} at ${doctor.phone}`);
    // Simulate call initiation
    alert(`Calling ${doctor.name}...`);
  };

  const handleMessageDoctor = (doctor: any) => {
    // In a real app, this would open a chat interface
    console.log(`Messaging ${doctor.name}`);
    alert(`Opening chat with ${doctor.name}...`);
  };

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes("Available Now")) return "text-green-500";
    if (availability.includes("Available in")) return "text-yellow-500";
    return "text-red-500";
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
              <h1 className="text-xl font-bold text-gray-900">Available Doctors</h1>
              <p className="text-sm text-gray-600">Find and connect with healthcare professionals</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search doctors by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 rounded-xl"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>
                    {spec === "all" ? "All Specializations" : spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
            {selectedSpecialization !== "all" && ` in ${selectedSpecialization}`}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    {doctor.image ? (
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900">{doctor.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Stethoscope className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">{doctor.specialization}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rating and Experience */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">{doctor.experience}</span>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{doctor.location}</span>
                </div>

                {/* Availability */}
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm font-medium ${getAvailabilityColor(doctor.availability)}`}>
                    {doctor.availability}
                  </span>
                </div>


                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleCallDoctor(doctor)}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2 rounded-xl"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleMessageDoctor(doctor)}
                    variant="outline"
                    className="border-orange-500 bg-white hover:bg-orange-50 text-orange-500 flex items-center justify-center space-x-2 rounded-xl"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 && (
          <Card className="bg-white border-gray-200">
            <CardContent className="p-12 text-center">
              <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Doctors Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or check back later.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialization("all");
                }}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Emergency Section */}
        <Card className="bg-red-50 border-red-200 mt-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Emergency?</h3>
                <p className="text-sm text-gray-600">Need immediate medical attention?</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/emergency')}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Send Emergency Alert
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DoctorsList;
