import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminPanel from "./pages/admin-panel";
import HomeInvitations from "./pages/invitations/home";
import InfoInvitations from "./pages/invitations/info";

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
      </Routes>
    </Router>
  );
}

export default App;
