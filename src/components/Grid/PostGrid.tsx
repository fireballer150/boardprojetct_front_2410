import React, { useState, useMemo, useEffect } from "react";
import DataGrid, { SortColumn, Column } from "react-data-grid";
import { Post } from "../../types";
import { useNavigate } from "react-router-dom";
import "./Grid.css";

interface PostGridProps {
  posts: Post[];
  onSort: (columnKey: string, direction: "ASC" | "DESC") => void;
}

interface Filters {
  [key: string]: string;
}

function rowKeyGetter(row: Post) {
  return row.id;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, onSort }) => {
  const navigate = useNavigate();
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);
  const [rows, setRows] = useState<Post[]>(posts);
  const [filters, setFilters] = useState<Filters>({});
  const [showFilters, setShowFilters] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    setRows(posts);
  }, [posts]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      return Object.keys(filters).every((key) => {
        const filter = filters[key]?.toLowerCase();
        if (!filter) return true;
        const value = String(row[key as keyof Post]).toLowerCase();
        return value.includes(filter);
      });
    });
  }, [rows, filters]);

  const columns = useMemo(
    (): readonly Column<Post>[] => [
      {
        key: "id",
        name: "ID",
        width: "10%",
        frozen: true,
        headerCellClass: "header-cell",
        renderHeaderCell: (props) => (
          <div
            onClick={() =>
              setShowFilters((prev) => ({ ...prev, id: !prev.id }))
            }
            className="header-content"
          >
            {props.column.name}
            {showFilters.id && (
              <input
                className="filter-input"
                value={filters.id || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, id: e.target.value }))
                }
                onClick={(e) => e.stopPropagation()}
                placeholder="Filter..."
              />
            )}
          </div>
        ),
      },
      {
        key: "title",
        name: "제목",
        width: "30%",
        headerCellClass: "header-cell",
        renderHeaderCell: (props) => (
          <div
            onClick={() =>
              setShowFilters((prev) => ({ ...prev, title: !prev.title }))
            }
            className="header-content"
          >
            {props.column.name}
            {showFilters.title && (
              <input
                className="filter-input"
                value={filters.title || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, title: e.target.value }))
                }
                onClick={(e) => e.stopPropagation()}
                placeholder="Filter..."
              />
            )}
          </div>
        ),
      },
      {
        key: "author",
        name: "작성자",
        width: "20%",
        headerCellClass: "header-cell",
        renderHeaderCell: (props) => (
          <div
            onClick={() =>
              setShowFilters((prev) => ({ ...prev, author: !prev.author }))
            }
            className="header-content"
          >
            {props.column.name}
            {showFilters.author && (
              <input
                className="filter-input"
                value={filters.author || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, author: e.target.value }))
                }
                onClick={(e) => e.stopPropagation()}
                placeholder="Filter..."
              />
            )}
          </div>
        ),
      },
      {
        key: "date",
        name: "작성일",
        width: "20%",
        headerCellClass: "header-cell",
        renderHeaderCell: (props) => (
          <div
            onClick={() =>
              setShowFilters((prev) => ({ ...prev, date: !prev.date }))
            }
            className="header-content"
          >
            {props.column.name}
            {showFilters.date && (
              <input
                className="filter-input"
                value={filters.date || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, date: e.target.value }))
                }
                onClick={(e) => e.stopPropagation()}
                placeholder="Filter..."
              />
            )}
          </div>
        ),
      },
      {
        key: "category",
        name: "카테고리",
        width: "20%",
        headerCellClass: "header-cell",
        renderHeaderCell: (props) => (
          <div
            onClick={() =>
              setShowFilters((prev) => ({ ...prev, category: !prev.category }))
            }
            className="header-content"
          >
            {props.column.name}
            {showFilters.category && (
              <input
                className="filter-input"
                value={filters.category || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
                onClick={(e) => e.stopPropagation()}
                placeholder="Filter..."
              />
            )}
          </div>
        ),
      },
    ],
    [filters, showFilters]
  );

  function handleSort(sortColumns: SortColumn[]) {
    setSortColumns(sortColumns);
    if (sortColumns.length > 0) {
      const columnKey = sortColumns[0].columnKey;
      const direction = sortColumns[0].direction.toUpperCase() as
        | "ASC"
        | "DESC";
      onSort(columnKey, direction);
    }
  }

  return (
    <div style={{ height: "calc(100vh - 200px)", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={filteredRows}
        rowKeyGetter={rowKeyGetter}
        sortColumns={sortColumns}
        onSortColumnsChange={handleSort}
        onRowClick={(row) => navigate(`/grid/${row.id}`)}
        className="rdg-light"
      />
    </div>
  );
};

export default PostGrid;
