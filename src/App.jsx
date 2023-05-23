import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import AdminPanel from "./pages/admin-panel";
import HomeInvitations from "./pages/invitations/home";
import InfoInvitations from "./pages/invitations/info";
import TestInvitation from "./pages/invitations/test";
import Thanks from "./pages/invitations/thanks";
import Home from "./pages/home";
import AdvanceReport from "./pages/admin-panel/advance_reporte";
import React, { useContext } from "react";
import InfoProvider from "./context/infoContext";
import FigmaHome from "./pages/user-figma/home";
import FigmaInfo from "./pages/user-figma/info";
import FigmaTest from "./pages/user-figma/test";
import FigmaFinish from "./pages/user-figma/finish";



function App() {

  return (
    
      <Router>
        <InfoProvider  >
          <Routes>
            
            <Route path="*" element={<Home />}></Route>
            <Route path="admin-panel/:tests_id" element={<AdminPanel />}></Route>
            <Route path="advance-report/:tests_id" element={<AdvanceReport />}></Route>

            <Route path="invitations/:token" element={<FigmaHome   />}></Route>
            <Route path="invitations/:token/info" element={<FigmaInfo />}></Route>
            <Route path="invitations/:token/info/test" element={<FigmaTest />}></Route>
            <Route path="finish/:token" element={<FigmaFinish />}></Route>


            
          </Routes>
        </InfoProvider>
      </Router>
    
  );
}

export default App;
