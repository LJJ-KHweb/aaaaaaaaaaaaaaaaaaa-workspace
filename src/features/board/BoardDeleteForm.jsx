import { useEffect, useState } from "react";
import {
  Page,
  TopBar,
  PageTitle,
  Button,
  List,
  Item,
  ItemTitle,
  ItemMeta,
  Empty,
  Pager,
  PagerButton,
  Loading,
  FileLabel,
  Actions,
  Textarea,
  DangerButton,
} from "./styles/Board.styles";
import { Field, Input, Label, Message } from "../styles/AuthForm.styles";
import { Select } from "../styles/AuthForm.styles";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BoardDeleteForm = () => {
  const { boardNo } = useParams();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState(1);
  const [password, setPassword] = useState("");
  const [hint, setHint] = useState("");
  const [board, setBoard] = useState([]);

  const navi = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost/api/boards/${boardNo}`).then((result) => {
      setBoard(result.data);
      console.log("들어옴");
    });
  }, [boardNo]);
  useEffect(() => {
    if (!board) return;

    setTitle(board.boardTitle ?? "");
    setHint(board.boardHint ?? "");
  }, [board]);
  const onSubmit = () => {
    axios
      .delete(`http://localhost/api/boards/${boardNo}`, {
        data: {
          boardQuestion: question,
          boardPwd: password,
        },
      })
      .then((result) => navi("/boards"))
      .catch((e) => {
        alert("이상해 암호가");
      });
  };
  return (
    <Page>
      <TopBar>
        <PageTitle>삭제하기</PageTitle>
      </TopBar>
      <Field>
        <Label>제목</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field>
        <Select onChange={(e) => setQuestion(e.target.value)}>
          <option value="1">자신의 출생 중학교 이름은?</option>
          <option value="2">제일 좋아하는 음식은?</option>
          <option value="3">좋아하는 색깔은?</option>
          <option value="4">몰라</option>
          <option value="5">모르겠다</option>
        </Select>
      </Field>
      <Field>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="질문에 대한 답을 적으세요"
        />

        <ItemMeta>힌트 : {hint}</ItemMeta>
      </Field>

      <Field>
        <DangerButton onClick={onSubmit}>삭제하기</DangerButton>
      </Field>
    </Page>
  );
};
export default BoardDeleteForm;
