import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CallHistory from "./pages/CallHistory";
import EmergencyAlert from "./pages/EmergencyAlert";
import DoctorsList from "./pages/DoctorsList";
import AIAssistant from "./pages/AIAssistant";
import Home from "./pages/Home";
import SymptomChecker from "./pages/SymptomChecker";
import DoctorConsult from "./pages/DoctorConsult";
import VideoConsult from "./pages/VideoConsult";
import Pharmacy from "./pages/Pharmacy";
import HealthWorker from "./pages/HealthWorker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/call-history" element={<CallHistory />} />
          <Route path="/emergency" element={<EmergencyAlert />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/old-home" element={<Home />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/doctor-consult" element={<DoctorConsult />} />
          <Route path="/video-consult" element={<VideoConsult />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/health-worker" element={<HealthWorker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
