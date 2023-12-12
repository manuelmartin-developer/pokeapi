import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import DetailView from "./pages/detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<DetailView />} />
    </Routes>
  );
}

export default App;
