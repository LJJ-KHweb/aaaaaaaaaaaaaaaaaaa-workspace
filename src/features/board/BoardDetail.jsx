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
  DetailTitle,
  MetaRow,
  Content,
  FileBox,
  Actions,
  GhostButton,
  DangerButton,
} from "./styles/Board.styles";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BoardDetail = () => {
  const navi = useNavigate();
  const [board, setBoard] = useState(null);
  const [loading, isLoading] = useState(true);
  const { boardNo } = useParams();

  useEffect(() => {
    //console.log("여기 들어옴");
    axios.get(`http://localhost/api/boards/${boardNo}`).then((result) => {
      console.log(result.data);
      setBoard(result.data);
    });
  }, []);

  if (!board) {
    return (
      <Page>
        <Empty>존재하지 않는 게시글 입니다!</Empty>
      </Page>
    );
  }
  return (
    <Page>
      <DetailTitle>
        {board.boardNo}번 게시글 제목 : {board.boardTitle}
      </DetailTitle>
      <MetaRow>
        <span>{board.createDate}</span>
      </MetaRow>
      <Content>{board.boardContent}</Content>
      {board.fileUrl && (
        <FileBox>
          {board.fileUrl ? (
            <img src={board.fileUrl} alt="첨부이미지" />
          ) : (
            <a href={board.fileUrl} target="_blank">
              첨부파일
            </a>
          )}
        </FileBox>
      )}
      <Button onClick={() => navi(`/boards/${boardNo}/edit`)}>수정하기</Button>
      <DangerButton onClick={() => navi(`/boards/${boardNo}/delete`)}>
        삭제하기
      </DangerButton>
    </Page>
  );
};
export default BoardDetail;
