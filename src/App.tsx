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
import Brothers from "./pages/Brothers";
import Friends from "./pages/Friends";
import FriendBrother from "./pages/FriendBrother";
import MultiplicationTable from "./pages/MultiplicationTable";
import Multiplication from "./pages/Multiplication";
import Multiplication20 from "./pages/Multiplication20";
import BaseMultiplication from "./pages/BaseMultiplication";
import Tricks from "./pages/Tricks";
import Squares from "./pages/Squares";
import Flashcards from "./pages/Flashcards";
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
          <Route path="/trainers/mental-arithmetic/brothers" element={<Brothers />} />
          <Route path="/trainers/mental-arithmetic/friends" element={<Friends />} />
          <Route path="/trainers/mental-arithmetic/friend-brother" element={<FriendBrother />} />
          <Route path="/trainers/mental-arithmetic/multiplication-table" element={<MultiplicationTable />} />
          <Route path="/trainers/mental-arithmetic/multiplication" element={<Multiplication />} />
          <Route path="/trainers/mental-arithmetic/multiplication-20" element={<Multiplication20 />} />
          <Route path="/trainers/mental-arithmetic/base-multiplication" element={<BaseMultiplication />} />
          <Route path="/trainers/mental-arithmetic/tricks" element={<Tricks />} />
          <Route path="/trainers/mental-arithmetic/squares" element={<Squares />} />
          <Route path="/trainers/mental-arithmetic/flashcards" element={<Flashcards />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
