import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Welcome from "./component/welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/welcome" element={<Welcome></Welcome>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
