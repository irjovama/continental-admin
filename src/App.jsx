import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminPanel from "./pages/admin-panel";
import HomeInvitations from "./pages/invitations/home";
import InfoInvitations from "./pages/invitations/info";
import TestInvitation from "./pages/invitations/test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="admin-panel/:tests_id" element={<AdminPanel />}></Route>
        <Route path="invitations/:token" element={<HomeInvitations />}></Route>
        <Route
          path="invitations/:token/info"
          element={<InfoInvitations />}
        ></Route>
        <Route
          path="invitations/:token/test"
          element={<TestInvitation />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
