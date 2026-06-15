import { useState, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return {
      adminNo: localStorage.getItem("adminNo"),
      adminId: localStorage.getItem("adminId"),
      adminName: localStorage.getItem("adminName"),
      role: localStorage.getItem("role"),
    };
  });

  const login = (data) => {
    localStorage.setItem("adminNo", data.adminNo);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("adminId", data.adminId);
    localStorage.setItem("adminName", data.adminName);
    localStorage.setItem("role", data.role);

    setUser({
      adminNo: data.adminNo,
      adminId: data.adminId,
      adminName: data.adminName,
      role: data.role,
    });
  };

  const logout = () => {
    //원래는 RefreshToken을 보내서 refreshToken값을 DB에서 DELETE해야함

    axios
      .get(
        `http://localhost/api/admin?adminNo=${localStorage.getItem("adminNo")}`,
      )
      .then((result) => {
        console.log(result);
      });
    //localStorage.removeItem("token");
    //localStorage.removeItem("refreshToken");
    //localStorage.removeItem("memberId");
    //localStorage.removeItem("memberName");
    //localStorage.removeItem("role");
    [
      "adminNo",
      "token",
      "refreshToken",
      "adminId",
      "adminName",
      "role",
    ].forEach((k) => localStorage.removeItem(k));
    setUser(null);
    location.href = "http://localhost:5173";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogin: !!user }}>
      {children}
    </AuthContext.Provider>
  );
  //!! -> Java Script는 모든것을 boolean으로 바꿀수 있음
}

export function useAuth() {
  return useContext(AuthContext);
}
