import { useState } from "react";
import {
  Message,
  Hint,
  Page,
  Card,
  Title,
  Sub,
  Field,
  Label,
  Input,
  Button,
} from "../styles/AuthForm.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const { login } = useAuth();
  const [adminId, setAdminId] = useState("");
  const [adminPwd, setAdminPwd] = useState("");
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);
  const navi = useNavigate();

  const onChangeId = (e) => {
    setAdminId(e.target.value);
  };
  const onChangePwd = (e) => {
    setAdminPwd(e.target.value);
  };
  const onSubmit = (e) => {
    if (!adminId || !adminPwd) {
      setStatus("아이디와 비밀번호를 꼭 입력해주세요.");
      return;
    }

    isLoading(true);
    setStatus("");

    axios
      .post("http://localhost/api/auth/login", {
        adminId,
        adminPwd,
      })
      .then((result) => {
        console.log(result);
        alert("로그인 성공");
        setStatus("로그인 성공!");

        login(result.data);
        navi("/");
      })
      .catch((error) => {
        if (error.response.data.code === 400) {
          setStatus(error.response.data.message);
        } else {
          setStatus("로그인에 실패했습니다.");
        }
        isLoading(false);
      });
  };

  const onKeyDown = (e) => {
    if (e.key == "Enter") onSubmit();
  };

  return (
    <Page>
      <Card>
        <Title>로그인</Title>
        <Sub>로그인을 하세요.</Sub>

        <Field>
          <Label>아이디</Label>
          <Input
            onKeyDown={onKeyDown}
            onChange={onChangeId}
            placeholder="아이디를 입력하세요."
          />
        </Field>
        <Field>
          <Label>비밀번호</Label>
          <Input
            onKeyDown={onKeyDown}
            onChange={onChangePwd}
            type="password"
            placeholder="비밀번호를 입력하세요."
          />
        </Field>
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "로그인 하는중 ..." : "로그인"}
        </Button>
        {status.length > 0 && <Message>{status}</Message>}
      </Card>
    </Page>
  );
};

export default AdminLogin;
