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

  useEffect(() => {
    axios
      .get(`http://localhost/api/boards?page=${page + 1}&size=${size}`)
      .then((result) => {
        console.log(result.data);
        setBoards(result.data);
        console.log(boards);
      });
  }, [page]);

  return (
    <Page>
      <TopBar>
        <PageTitle>게시판</PageTitle>
        <Button onClick={() => navi("/boards/write")}>글쓰기</Button>
      </TopBar>
      <TopBar>
        <Button>#자동차</Button>
        <Button>#ㅁㅁㅁ</Button>
        <Button>#ㄴㄴㄴ</Button>
        <Button>#ㄷㄷㄷ</Button>
        <Button>#ㄹㄹㄹ</Button>
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
