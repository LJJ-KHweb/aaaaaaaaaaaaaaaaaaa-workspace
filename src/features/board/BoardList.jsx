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
} from "./styles/Board.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const navi = useNavigate();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [category, setCategory] = useState("자동차");

  useEffect(() => {
    axios
      .get(
        `http://localhost/api/boards?page=${page + 1}&size=${size}&category=${category}`,
      )
      .then((result) => {
        //console.log(result.data);
        setBoards(result.data);
        //console.log(boards);
      });
  }, [page, category]);

  return (
    <Page>
      <TopBar>
        <PageTitle>게시판</PageTitle>
        <Button onClick={() => navi("/boards/write")}>글쓰기</Button>
      </TopBar>
      <TopBar>
        <ItemTitle>카테고리</ItemTitle>
        <Button onClick={(e) => setCategory(e.target.textContent)}>
          자동차
        </Button>
        <Button onClick={(e) => setCategory(e.target.textContent)}>게임</Button>
        <Button onClick={(e) => setCategory(e.target.textContent)}>음식</Button>
        <Button onClick={(e) => setCategory(e.target.textContent)}>여행</Button>
        <Button onClick={(e) => setCategory(e.target.textContent)}>재미</Button>
      </TopBar>
      <List>
        {boards.map((b) => {
          return (
            <Item key={b.boardNo} onClick={() => navi(`/boards/${b.boardNo}`)}>
              {b.boardNo}
              <ItemTitle>{b.boardTitle}</ItemTitle>
              <ItemMeta>{b.createDate}</ItemMeta>
            </Item>
          );
        })}
      </List>
      <Pager>
        <PagerButton
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          이전
        </PagerButton>
        <span>{page + 1}페이지</span>
        <PagerButton
          onClick={() => setPage((p) => p + 1)}
          disabled={boards.length < 3}
        >
          다음
        </PagerButton>
      </Pager>
    </Page>
  );
};
export default BoardList;
