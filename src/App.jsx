import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Header from "./components/layout/header/Header";
import { Route, Routes } from "react-router-dom";
import BoardList from "./features/board/BoardList";
import BoardDetail from "./features/board/BoardDetail";
import BoardForm from "./features/board/BoardForm";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/boards" element={<BoardList />} />
        <Route path="/boards/:boardNo" element={<BoardDetail />} />
        <Route path="/boards/write" element={<BoardForm />} />
      </Routes>
    </>
  );
}

export default App;
