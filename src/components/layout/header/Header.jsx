import { useState } from "react";
import { Inner, Brand, Dot, Nav, NavLink, Login, Bar } from "./Header.styles";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navi = useNavigate();

  return (
    <Bar>
      <Inner>
        <Brand onClick={() => navi("/")}>
          <Dot />
          제목정하기
        </Brand>
        <Nav>
          <>
            <NavLink onClick={() => navi("/boards")}>게시판</NavLink>
          </>
        </Nav>
      </Inner>
    </Bar>
  );
};
export default Header;
