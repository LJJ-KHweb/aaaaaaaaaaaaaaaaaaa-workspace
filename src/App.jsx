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
import Footer from "./components/layout/footer/Footer";
import BoardEditForm from "./features/board/BoardEditForm";
import BoardDeleteForm from "./features/board/BoardDeleteForm";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/boards" element={<BoardList />} />
        <Route path="/boards/:boardNo" element={<BoardDetail />} />
        <Route path="/boards/write" element={<BoardForm />} />
        <Route path="/boards/:boardNo/edit" element={<BoardEditForm />} />
        <Route path="/boards/:boardNo/delete" element={<BoardDeleteForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
