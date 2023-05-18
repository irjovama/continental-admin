import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import AdminPanel from "./pages/admin-panel";
import HomeInvitations from "./pages/invitations/home";
import InfoInvitations from "./pages/invitations/info";
import TestInvitation from "./pages/invitations/test";
import Thanks from "./pages/invitations/thanks";
import Home from "./pages/home";
import AdvanceReport from "./pages/admin-panel/advance_reporte";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="invitations/:token" element={<HomeInvitations />}></Route>
        <Route path="*" element={<Home />}></Route>
        <Route path="thanks" element={<Thanks />}></Route>
        <Route path="admin-panel/:tests_id" element={<AdminPanel />}></Route>
        <Route path="advance-report/:tests_id" element={<AdvanceReport />}></Route>
        <Route
          path="invitations/:token/info"
          element={<InfoInvitations />}
        ></Route>
        <Route
          path="invitations/:token/info/test"
          element={<TestInvitation />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
