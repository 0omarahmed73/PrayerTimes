import { useContext, useEffect } from "react";
import { PrayersContext } from "./context/PrayersContext";
import Ar from "./Pages/Ar";
import En from "./Pages/En";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/ar" />} />
        <Route path="/ar" element={<Ar />} />
        <Route path="/en" element={<En />} />
      </Routes>
    </div>
  );
}

export default App;
