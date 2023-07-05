import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SetPage } from "pages/Set/SetPage";
import { Library } from "pages/Library/Library";
import { Home } from "pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cards" element={<SetPage />}></Route>
          <Route path="/library" element={<Library />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
