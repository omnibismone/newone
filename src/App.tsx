import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import SciFi from "./pages/SciFi";
import Assignment from "./pages/Assignment";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="assignment" element={<Assignment />} />
        </Route>
        <Route path="/scifi" element={<SciFi />} />
      </Routes>
    </BrowserRouter>
  );
}
