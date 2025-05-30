import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobSearch from "./pages/JobSearch";
import Layout from "./partials/Layout";
import Companies from "./pages/Companies";
import CompaniesAss from "./pages/companies/CompaniesAss";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompaniesAss />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
