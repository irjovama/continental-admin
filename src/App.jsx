import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import AdminPanel from "./pages/admin-panel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="admin-panel/:tests_id" element={<AdminPanel />}></Route>
        <Route
          path="/tests"
          element={
            <Home
              title={"Encuestas creadas"}
              file={"tests"}
              childrens={["user_types", "results"]}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
