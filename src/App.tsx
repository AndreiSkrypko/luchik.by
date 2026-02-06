import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Trainers from "./pages/Trainers";
import Enrollment from "./pages/Enrollment";
import ThankYou from "./pages/ThankYou";
import TrainerProgram from "./pages/TrainerProgram";
import FadingText from "./pages/FadingText";
import SchulteTable from "./pages/SchulteTable";
import StroopTest from "./pages/StroopTest";
import FlashWords from "./pages/FlashWords";
import EnglishFlashcards from "./pages/EnglishFlashcards";
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
import Age1_5 from "./pages/Age1-5";
import Age5_10 from "./pages/Age5-10";
import Age10_17 from "./pages/Age10-17";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Компонент для автоматического скролла наверх при переходе между страницами
const ScrollToTopOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    // Скроллим наверх при изменении пути (но не при изменении hash)
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  return null;
};

// Обертка для роутера с автоматическим скроллом
const AppRouter = () => (
  <BrowserRouter>
    <ScrollToTopOnRouteChange />
    <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/thank-you" element={<ThankYou />} />
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
          <Route path="/trainers/languages/english-flashcards" element={<EnglishFlashcards />} />
          <Route path="/age/1-5" element={<Age1_5 />} />
          <Route path="/age/5-10" element={<Age5_10 />} />
          <Route path="/age/10-17" element={<Age10_17 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppRouter />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
