import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import CourseDetail from "./pages/CourseDetail";
import CourseUniversities from "./pages/CourseUniversities";
import AllNigerianUniversities from "./pages/AllNigerianUniversities";
import AllAfricanUniversities from "./pages/AllAfricanUniversities";
import AllGlobalUniversities from "./pages/AllGlobalUniversities";
import Courses from "./pages/Courses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/:shareId" element={<Results />} />
          <Route path="/results" element={<Results />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/course/:courseId/universities" element={<CourseUniversities />} />
          <Route path="/universities/nigerian/:courseId" element={<AllNigerianUniversities />} />
          <Route path="/universities/african/:courseId" element={<AllAfricanUniversities />} />
          <Route path="/universities/global/:courseId" element={<AllGlobalUniversities />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
