import { useState } from "react";
import { Inner, Brand, Dot, Nav, NavLink, Login, Bar } from "./Header.styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Hint } from "../../../features/styles/AuthForm.styles";

const Header = () => {
  const { isLogin, user, logout } = useAuth();
  const navi = useNavigate();
  const [admin, isAdmin] = useState(false);
  return (
    <Bar>
      <Inner>
        <Brand onClick={() => navi("/")}>
          <Dot />
          제목정하기
        </Brand>
        <Nav>
          <>
            {isLogin ? (
              <>
                <Hint>{user.adminName}님</Hint>
                <Login onClick={logout}>로그아웃</Login>
                <NavLink onClick={() => navi("/boards")}>게시판</NavLink>
              </>
            ) : (
              <>
                <NavLink onClick={() => navi("/admin")}>관리자 로그인</NavLink>
                <NavLink onClick={() => navi("/boards")}>게시판</NavLink>
              </>
            )}
          </>
        </Nav>
      </Inner>
    </Bar>
  );
};
export default Header;
