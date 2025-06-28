
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Preferences from "./pages/Preferences";
import AIAssistant from "./pages/AIAssistant";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ChatbotFullscreen from "./pages/ChatbotFullscreen";
import ChatbotRent from "./pages/ChatbotRent";
import BuyProperties from "./pages/BuyProperties";
import SellProperties from "./pages/SellProperties";
import Invest from "./pages/Invest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chatbot" element={<ChatbotFullscreen />} />
            <Route path="/chatbot-rent" element={<ChatbotRent />} />
            <Route path="/buy-properties" element={<BuyProperties />} />
            <Route path="/sell-properties" element={<SellProperties />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
