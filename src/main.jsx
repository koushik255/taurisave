import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter,Routes,Route} from "react-router-dom"; 
import App from "./App";
import About from "./about.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
 
