import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SetPage } from "./pages/Set/SetPage";

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cards" element={<Cards />}></Route>
          <Route path="/library" element={<Library />}></Route>
        </Routes>
      </Router> */}
      <SetPage />
    </div>
  );
}

export default App;
