import { useEffect, lazy, Suspense } from "react";
import { useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import SeoHead from "@/components/SeoHead";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Index = lazy(() => import("./pages/Index"));
const Gallery = lazy(() => import("./pages/Gallery"));
const GalleryMasterclass = lazy(() => import("./pages/GalleryMasterclass"));
const GalleryDeveloping = lazy(() => import("./pages/gallery/GalleryDeveloping"));
const GalleryRobotics = lazy(() => import("./pages/gallery/GalleryRobotics"));
const GalleryPrepSchool = lazy(() => import("./pages/gallery/GalleryPrepSchool"));
const GalleryProgramming = lazy(() => import("./pages/gallery/GalleryProgramming"));
const GalleryEnglish = lazy(() => import("./pages/gallery/GalleryEnglish"));
const GalleryElectronics = lazy(() => import("./pages/gallery/GalleryElectronics"));
const GalleryLego = lazy(() => import("./pages/gallery/GalleryLego"));
const GalleryLegoRazvivayka = lazy(() => import("./pages/gallery/GalleryLegoRazvivayka"));
const GalleryChess = lazy(() => import("./pages/gallery/GalleryChess"));
const GalleryLegoMatematika = lazy(() => import("./pages/gallery/GalleryLegoMatematika"));
const Gallery3dModeling = lazy(() => import("./pages/gallery/Gallery3dModeling"));
const GalleryVr = lazy(() => import("./pages/gallery/GalleryVr"));
const GalleryArtStudio = lazy(() => import("./pages/gallery/GalleryArtStudio"));
const About = lazy(() => import("./pages/About"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Enrollment = lazy(() => import("./pages/Enrollment"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Age1_5 = lazy(() => import("./pages/Age1-5"));
const Age5_10 = lazy(() => import("./pages/Age5-10"));
const Age10_17 = lazy(() => import("./pages/Age10-17"));
const MamaMalysh = lazy(() => import("./pages/MamaMalysh"));
const LegoRazvivayka = lazy(() => import("./pages/LegoRazvivayka"));
const Complex = lazy(() => import("./pages/course/Complex"));
const Logoped = lazy(() => import("./pages/course/Logoped"));
const ArtStudio = lazy(() => import("./pages/course/ArtStudio"));
const LegoLogoped = lazy(() => import("./pages/course/LegoLogoped"));
const Prep2year = lazy(() => import("./pages/course/Prep2year"));
const PrepSchool = lazy(() => import("./pages/course/PrepSchool"));
const PrepExpress = lazy(() => import("./pages/course/PrepExpress"));
const LegoMath = lazy(() => import("./pages/course/LegoMath"));
const LogicSpeedReading = lazy(() => import("./pages/course/LogicSpeedReading"));
const English = lazy(() => import("./pages/course/English"));
const Chess = lazy(() => import("./pages/course/Chess"));
const ProgrammingScratch = lazy(() => import("./pages/course/ProgrammingScratch"));
const ProgrammingMinecraft = lazy(() => import("./pages/course/ProgrammingMinecraft"));
const ProgrammingRoblox = lazy(() => import("./pages/course/ProgrammingRoblox"));
const ProgrammingVr = lazy(() => import("./pages/course/ProgrammingVr"));
const Robotics = lazy(() => import("./pages/course/Robotics"));
const MentalArithmetic = lazy(() => import("./pages/course/MentalArithmetic"));
const Tutor = lazy(() => import("./pages/course/Tutor"));
const Modeling3d = lazy(() => import("./pages/course/Modeling3d"));
const Robotics10_17 = lazy(() => import("./pages/course/Robotics10_17"));
const ArduinoElectronics = lazy(() => import("./pages/course/ArduinoElectronics"));
const ProgrammingPython = lazy(() => import("./pages/course/ProgrammingPython"));
const ProgrammingJavascript = lazy(() => import("./pages/course/ProgrammingJavascript"));
const WebDevelopment = lazy(() => import("./pages/course/WebDevelopment"));
const Blender3d = lazy(() => import("./pages/course/Blender3d"));
const ProgrammingVr10_17 = lazy(() => import("./pages/course/ProgrammingVr10_17"));
const ProgrammingRoblox10_17 = lazy(() => import("./pages/course/ProgrammingRoblox10_17"));
const CircuitDesign = lazy(() => import("./pages/course/CircuitDesign"));
const ArtificialIntelligence = lazy(() => import("./pages/course/ArtificialIntelligence"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div
    style={{
      minHeight: "40vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#4665a1",
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
    }}
    aria-busy="true"
  >
    Загрузка…
  </div>
);

const ScrollToTopOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname]);

  return null;
};

const AppRouter = () => (
  <BrowserRouter>
    <SeoHead />
    <ScrollToTopOnRouteChange />
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/masterclass" element={<GalleryMasterclass />} />
        <Route path="/gallery/developing" element={<GalleryDeveloping />} />
        <Route path="/gallery/robotics" element={<GalleryRobotics />} />
        <Route path="/gallery/english" element={<GalleryEnglish />} />
        <Route path="/gallery/prep-school" element={<GalleryPrepSchool />} />
        <Route path="/gallery/programming" element={<GalleryProgramming />} />
        <Route path="/gallery/electronics" element={<GalleryElectronics />} />
        <Route path="/gallery/lego" element={<GalleryLego />} />
        <Route path="/gallery/lego-razvivayka" element={<GalleryLegoRazvivayka />} />
        <Route path="/gallery/chess" element={<GalleryChess />} />
        <Route path="/gallery/lego-matematika" element={<GalleryLegoMatematika />} />
        <Route path="/gallery/3d-modeling" element={<Gallery3dModeling />} />
        <Route path="/gallery/programming-vr" element={<GalleryVr />} />
        <Route path="/gallery/art-studio" element={<GalleryArtStudio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/enrollment" element={<Enrollment />} />
        <Route path="/thank-you" element={<ThankYou />} />
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
        <Route path="/course/prep-express" element={<PrepExpress />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
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
