import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import AdminPanel from "./pages/admin-panel";
import HomeInvitations from "./pages/invitations/home";
import InfoInvitations from "./pages/invitations/info";
import TestInvitation from "./pages/invitations/test";
import Thanks from "./pages/invitations/thanks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="invitations/:token" element={<HomeInvitations />}></Route>
        <Route path="*" element={<Link to={"admin-panel/73e647e1-cfa3-4ade-9985-c44e4527a0d4"}>Link</Link>}></Route>
        <Route path="thanks" element={<Thanks />}></Route>
        <Route path="admin-panel/:tests_id" element={<AdminPanel />}></Route>
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
