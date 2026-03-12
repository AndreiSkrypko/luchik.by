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
import MamaMalysh from "./pages/MamaMalysh";
import LegoRazvivayka from "./pages/LegoRazvivayka";
import Complex from "./pages/course/Complex";
import Logoped from "./pages/course/Logoped";
import ArtStudio from "./pages/course/ArtStudio";
import LegoLogoped from "./pages/course/LegoLogoped";
import Prep2year from "./pages/course/Prep2year";
import PrepSchool from "./pages/course/PrepSchool";
import LegoMath from "./pages/course/LegoMath";
import LogicSpeedReading from "./pages/course/LogicSpeedReading";
import English from "./pages/course/English";
import Chess from "./pages/course/Chess";
import ProgrammingScratch from "./pages/course/ProgrammingScratch";
import ProgrammingMinecraft from "./pages/course/ProgrammingMinecraft";
import ProgrammingRoblox from "./pages/course/ProgrammingRoblox";
import ProgrammingVr from "./pages/course/ProgrammingVr";
import Robotics from "./pages/course/Robotics";
import MentalArithmetic from "./pages/course/MentalArithmetic";
import Tutor from "./pages/course/Tutor";
import Modeling3d from "./pages/course/Modeling3d";
import Robotics10_17 from "./pages/course/Robotics10_17";
import ArduinoElectronics from "./pages/course/ArduinoElectronics";
import ProgrammingPython from "./pages/course/ProgrammingPython";
import ProgrammingJavascript from "./pages/course/ProgrammingJavascript";
import WebDevelopment from "./pages/course/WebDevelopment";
import Blender3d from "./pages/course/Blender3d";
import ProgrammingVr10_17 from "./pages/course/ProgrammingVr10_17";
import ProgrammingRoblox10_17 from "./pages/course/ProgrammingRoblox10_17";
import CircuitDesign from "./pages/course/CircuitDesign";
import ArtificialIntelligence from "./pages/course/ArtificialIntelligence";
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
          <Route path="/trainers/english/class/:classNumber" element={<TrainerProgram />} />
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
          <Route path="/age/1-5" element={<Age1_5 />} />
          <Route path="/age/5-10" element={<Age5_10 />} />
          <Route path="/age/10-17" element={<Age10_17 />} />
          <Route path="/course/mama-malysh" element={<MamaMalysh />} />
          <Route path="/course/lego-razvivayka" element={<LegoRazvivayka />} />
          <Route path="/course/complex" element={<Complex />} />
          <Route path="/course/logoped" element={<Logoped />} />
          <Route path="/course/art-studio" element={<ArtStudio />} />
          <Route path="/course/lego-logoped" element={<LegoLogoped />} />
          <Route path="/course/prep-2year" element={<Prep2year />} />
          <Route path="/course/prep-school" element={<PrepSchool />} />
          <Route path="/course/lego-math" element={<LegoMath />} />
          <Route path="/course/logic-speed-reading" element={<LogicSpeedReading />} />
          <Route path="/course/english" element={<English />} />
          <Route path="/course/chess" element={<Chess />} />
          <Route path="/course/programming-scratch" element={<ProgrammingScratch />} />
          <Route path="/course/programming-minecraft" element={<ProgrammingMinecraft />} />
          <Route path="/course/programming-roblox" element={<ProgrammingRoblox />} />
          <Route path="/course/programming-vr" element={<ProgrammingVr />} />
          <Route path="/course/robotics" element={<Robotics />} />
          <Route path="/course/mental-arithmetic" element={<MentalArithmetic />} />
          <Route path="/course/tutor" element={<Tutor />} />
          <Route path="/course/3d-modeling" element={<Modeling3d />} />
          <Route path="/course/robotics-10-17" element={<Robotics10_17 />} />
          <Route path="/course/arduino-electronics" element={<ArduinoElectronics />} />
          <Route path="/course/programming-python" element={<ProgrammingPython />} />
          <Route path="/course/programming-javascript" element={<ProgrammingJavascript />} />
          <Route path="/course/web-development" element={<WebDevelopment />} />
          <Route path="/course/3d-blender" element={<Blender3d />} />
          <Route path="/course/programming-vr-10-17" element={<ProgrammingVr10_17 />} />
          <Route path="/course/programming-roblox-10-17" element={<ProgrammingRoblox10_17 />} />
          <Route path="/course/circuit-design" element={<CircuitDesign />} />
          <Route path="/course/artificial-intelligence" element={<ArtificialIntelligence />} />
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
