import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GamePage from "./pages/GamePage";
import NotFound from "./pages/NotFound";
// import {useEffect} from "react";
// import {signInAnon} from "@/lib/firebase.ts";
// import {uploadWords} from "@/lib/uploadWords.ts";

const queryClient = new QueryClient();

const App = () => (

    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //     async function init() {
    //         await signInAnon(); // make sure you're authenticated
    //         await uploadWords();
    //     }
    //
    //     init();
    // }, []),

  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game/:roomCode" element={<GamePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
