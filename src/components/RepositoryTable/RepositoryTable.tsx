import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import styles from "./RepositoryTable.module.scss";
import { Repository } from "../../features/repositories/types.ts";

interface RepositoryTableProps {
  repositories: Repository[]; // Массив репозиториев для отображения
  onRowClick: (id: string) => void; // Функция для обработки клика по строке таблицы
  loading: boolean; // Флаг загрузки данных
}

const RepositoryTable: React.FC<RepositoryTableProps> = ({
  repositories,
  onRowClick,
  loading,
}) => {
  const [page, setPage] = React.useState(0); // Текущая страница для пагинации
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // Количество строк на странице
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc",
  ); // Направление сортировки
  const [sortBy, setSortBy] = React.useState<keyof Repository>("name"); // Поле, по которому происходит сортировка

  // Обработчик изменения страницы
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  // Обработчик изменения количества строк на странице
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value); // Устанавливаем количество строк на странице
    setPage(0); // Возвращаемся на первую страницу
  };

  // Обработчик сортировки
  const handleSort = (property: keyof Repository) => {
    const isAsc = sortBy === property && sortDirection === "asc"; // Определяем направление сортировки
    setSortDirection(isAsc ? "desc" : "asc"); // Меняем направление сортировки
    setSortBy(property); // Устанавливаем поле сортировки
  };

  // Сортировка данных
  const sortedRepositories = [...repositories].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    // Если одно из значений undefined, считаем его меньшим
    if (aValue === undefined) return sortDirection === "asc" ? -1 : 1;
    if (bValue === undefined) return sortDirection === "asc" ? 1 : -1;

    // Сравниваем числовые значения
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    // Сравниваем строковые значения
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return (
    <div className={styles.tableContainer}>
      {/* Показываем индикатор загрузки, пока данные загружаются */}
      {loading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <h1 className={styles.heading}>Результаты поиска</h1>
          <TableContainer className={styles.tableContent}>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  {/* Заголовки таблицы, по клику на которые происходит сортировка */}
                  <TableCell onClick={() => handleSort("name")}>
                    Название
                  </TableCell>
                  <TableCell onClick={() => handleSort("language")}>
                    Язык
                  </TableCell>
                  <TableCell onClick={() => handleSort("forksCount")}>
                    Число форков
                  </TableCell>
                  <TableCell onClick={() => handleSort("starsCount")}>
                    Число звёзд
                  </TableCell>
                  <TableCell onClick={() => handleSort("updatedAt")}>
                    Дата обновления
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Отображение строк таблицы с репозиториями */}
                {sortedRepositories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((repo) => (
                    <TableRow
                      key={repo.id}
                      hover
                      onClick={() => onRowClick(repo.id)}
                      className={styles.tableRow}
                    >
                      <TableCell>{repo.name}</TableCell>
                      <TableCell>{repo.language}</TableCell>
                      <TableCell>{repo.forksCount}</TableCell>
                      <TableCell>{repo.starsCount}</TableCell>
                      <TableCell>
                        {new Date(repo.updatedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={styles.paginationContainer}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={repositories.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RepositoryTable;
