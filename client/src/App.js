import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/home";
import Confirmation from "./Components/confirmation";
import SendPage from "./Components/sendpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="send" element={<SendPage />} />
        <Route exact path="confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
