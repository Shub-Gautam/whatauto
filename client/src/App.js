import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/home";
import Confirmation from "./Components/confirmation";
import SendPage from "./Components/sendpage";
import ErrPage from "./Components/errpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/send" element={<SendPage />} />
        <Route exact path="/confirmation" element={<Confirmation />} />
        <Route exact path="/errpage" element={<ErrPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
