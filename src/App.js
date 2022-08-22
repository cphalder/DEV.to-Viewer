import Home from "./pages/Home";
import useLocalStorage from "use-local-storage";
import About from "./pages/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./Header";

export default function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <div className="App" data-theme={theme}>
      <Router>
        <Header theme={theme} handleThemeChange={switchTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}
