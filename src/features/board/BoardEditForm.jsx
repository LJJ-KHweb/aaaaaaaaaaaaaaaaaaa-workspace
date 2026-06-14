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
} from "./styles/Board.styles";
import { Field, Input, Label, Message } from "../styles/AuthForm.styles";
import { Select } from "../styles/AuthForm.styles";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BoardEditForm = () => {
  const { boardNo } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState(1);
  const [password, setPassword] = useState("");
  const [board, setBoard] = useState([]);
  const [hint, setHint] = useState("");
  const [category, setCategory] = useState("자동차");
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
    setContent(board.boardContent ?? "");
    setHint(board.boardHint ?? "");
  }, [board]);

  const onSubmit = () => {
    const fd = new FormData();
    fd.append("boardTitle", title);
    fd.append("boardContent", content);
    if (file) fd.append("file", file);
    fd.append("boardQuestion", question);
    fd.append("boardPwd", password);
    fd.append("boardCategory", category);
    //for (let key of fd.keys()) {
    //  console.log(key);
    //}
    //for (let value of fd.values()) {
    //  console.log(value);
    //}
    axios
      .patch(`http://localhost/api/boards/${boardNo}`, fd)
      .then((result) => navi("/boards"))
      .catch((e) => {
        alert("이상해 암호가");
      });
  };
  return (
    <Page>
      <TopBar>
        <PageTitle>수정하기</PageTitle>
      </TopBar>
      <Field>
        <Label>제목</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field>
        <Label>카테고리</Label>
        <Select onChange={(e) => console.log(e.target.value)}>
          <option value="자동차">자동차</option>
          <option value="게임">게임</option>
          <option value="음식">음식</option>
          <option value="여행">여행</option>
          <option value="재미">재미</option>
        </Select>
      </Field>

      <Field>
        <Label>내용</Label>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Field>
      <Field>
        <Label>첨부파일</Label>
        <div>
          <FileLabel>
            파일선택
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
                board.fileUrl = null;
              }}
            />
          </FileLabel>
          {board.fileUrl && (
            <FileLabel>선택된 파일 : {board.fileUrl}</FileLabel>
          )}
          {file && <FileLabel>선택된 파일 : {file.name}</FileLabel>}
        </div>
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
        <Button onClick={onSubmit}>수정하기</Button>
      </Field>
    </Page>
  );
};
export default BoardEditForm;
