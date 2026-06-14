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
import axios from "axios";
import {
  UNSAFE_shouldHydrateRouteLoader,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Field, Input, Label, Message } from "../styles/AuthForm.styles";
import { Select } from "../styles/AuthForm.styles";

const BoardForm = () => {
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState(0);
  const [password, setPassword] = useState("");
  const [hint, setHint] = useState("");
  const [category, setCategoty] = useState("자동차");

  const onSubmit = () => {
    //console.log(question);
    //console.log(password);
    //console.log(hint);
    const fd = new FormData();
    fd.append("boardTitle", title);
    fd.append("boardContent", content);
    if (file) fd.append("file", file);
    fd.append("boardQuestion", question);
    fd.append("boardPwd", password);
    if (hint) fd.append("boardHint", hint);
    fd.append("boardCategory", category);
    axios
      .post("http://localhost/api/boards", fd)
      .then((result) => {
        console.log(result);
        navi("/boards");
      })
      .catch((e) => console.log(e.reponse));
  };

  return (
    <Page>
      <TopBar>
        <PageTitle>글쓰기</PageTitle>
      </TopBar>

      <Field>
        <Label>제목</Label>
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>
      <Field>
        <Label>카테고리</Label>
        <Select onChange={(e) => setCategoty(e.target.value)}>
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
          placeholder="내용을 입력하세요"
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
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </FileLabel>
        </div>
      </Field>
      <Field>
        <Label>질문</Label>
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
        <Input
          onChange={(e) => setHint(e.target.value)}
          type="text"
          placeholder="질문에 대한 힌트를 적으세요"
        />
      </Field>

      <Field>
        <Button onClick={onSubmit}>등록하기</Button>
      </Field>
    </Page>
  );
};
export default BoardForm;
