import React, { useState, useMemo, useEffect } from "react";
import DataGrid, { SortColumn, RowsChangeData, Column } from "react-data-grid";
import { Post } from "../../types";
import { useNavigate } from "react-router-dom";
// import "react-data-grid/lib/styles.css"; // 이 줄을 추가합니다.
import "./Grid.css";
import { useAppState } from "../../hooks/useAppState";

interface PostGridProps {
  posts: Post[];
  onSort: (columnKey: string, direction: "ASC" | "DESC") => void;
}

function rowKeyGetter(row: Post) {
  return row.id;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, onSort }) => {
  const navigate = useNavigate();
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);
  const [rows, setRows] = useState<Post[]>(posts);
  console.log("Posts in PostGrid:", posts);
  const appState = useAppState();

  useEffect(() => {
    setRows(posts);
  }, [posts]);

  const columns = useMemo(
    (): readonly Column<Post>[] => [
      {
        key: "id",
        name: "ID",
        width: "20%",
        frozen: true,
        resizable: true,
        sortable: true,
        headerCellClass: "customHeaderCell",
        renderCell: ({ row }) => <div className="customCell">{row.id}</div>,
      },
      {
        key: "title",
        name: "제목",
        width: "20%",
        resizable: true,
        sortable: true,
        headerCellClass: "customHeaderCell",
        renderCell: ({ row }) => <div className="customCell">{row.title}</div>,
      },
      {
        key: "author",
        name: "작성자",
        width: "20%",
        resizable: true,
        sortable: true,
        headerCellClass: "customHeaderCell",
        renderCell: ({ row }) => <div className="customCell">{row.author}</div>,
      },
      {
        key: "date",
        name: "작성일",
        width: "20%",
        resizable: true,
        sortable: true,
        headerCellClass: "customHeaderCell",
        renderCell: ({ row }) => <div className="customCell">{row.date}</div>,
      },
      {
        key: "category",
        name: "카테고리",
        width: "20%",
        resizable: true,
        sortable: true,
        headerCellClass: "customHeaderCell",
        renderCell: ({ row }) => (
          <div className="customCell">{row.category}</div>
        ),
      },
    ],
    []
  );

  function handleSort(sortColumns: SortColumn[]) {
    setSortColumns(sortColumns);
    const columnKey = sortColumns[0].columnKey;
    const direction = sortColumns[0].direction.toUpperCase() as "ASC" | "DESC";
    onSort(columnKey, direction);
  }

  function handleRowsChange(
    rows: Post[],
    { indexes, column }: RowsChangeData<Post>
  ) {
    setRows(rows);
    // 여기에 행 변경에 대한 추가 로직을 구현할 수 있습니다.
  }

  return (
    <div className="test1">
      {/* <div className={styles.test}>"hi"</div> */}
      {/* <div className="test">"hi"</div> */}
      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        onRowsChange={handleRowsChange}
        sortColumns={sortColumns}
        onSortColumnsChange={handleSort}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        onRowClick={(row) => navigate(`/grid/${row.id}`)}
        className="test"
      />
    </div>
  );
};

export default PostGrid;
