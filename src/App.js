import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobSearch from "./pages/JobSearch";
import Layout from "./partials/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/jobs" element={<JobSearch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
