import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Trainers from "./pages/Trainers";
import TrainerProgram from "./pages/TrainerProgram";
import FadingText from "./pages/FadingText";
import SchulteTable from "./pages/SchulteTable";
import StroopTest from "./pages/StroopTest";
import FlashWords from "./pages/FlashWords";
import DistributeWords from "./pages/DistributeWords";
import BrainButtons from "./pages/BrainButtons";
import Prosto from "./pages/Prosto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:program" element={<TrainerProgram />} />
          <Route path="/trainers/speed-reading/fading-text" element={<FadingText />} />
          <Route path="/trainers/speed-reading/schulte-table" element={<SchulteTable />} />
          <Route path="/trainers/speed-reading/stroop-test" element={<StroopTest />} />
          <Route path="/trainers/speed-reading/flash-words" element={<FlashWords />} />
          <Route path="/trainers/speed-reading/distribute-words" element={<DistributeWords />} />
          <Route path="/trainers/speed-reading/brain-buttons" element={<BrainButtons />} />
          <Route path="/trainers/mental-arithmetic/prosto" element={<Prosto />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
