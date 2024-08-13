import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { selectRepository } from "./features/repositories/repositoriesSlice.ts";
import RepositoryDetails from "./components/RepositoryDetails";
import RepositoryTable from "./components/RepositoryTable";
import SearchBar from "./components/SearchBar";
import { fetchRepositoriesThunk } from "./features/repositories/repositoryThunks.ts";
import { useAppSelector } from "./hooks/useAppSelector.ts";
import { useAppDispatch } from "./hooks/useAppDispatch.ts";

const App = () => {
	// Состояние для хранения поискового запроса
	const [searchQuery, setSearchQuery] = useState("");

	// Выбор данных из Redux store
	const repositories = useAppSelector(
		(state) => state.repositories.repositories,
	);
	const dispatch = useAppDispatch();
	const selectedRepository = useAppSelector(
		(state) => state.repositories.selectedRepository,
	);
	const loading = useAppSelector((state) => state.repositories.loading);

	// Загрузка репозиториев при монтировании компонента
	useEffect(() => {
		dispatch(fetchRepositoriesThunk());
	}, [dispatch]);

	// Обработка изменения поискового запроса
	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	// Обработка клика по строке таблицы для выбора репозитория
	const handleRowClick = (id: string) => {
		dispatch(selectRepository(id));
	};

	// Фильтрация репозиториев по поисковому запросу
	const filteredRepositories = repositories.filter((repo) =>
		repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<>
			<SearchBar onSearch={handleSearch} />

			<div className={styles.content}>
				<RepositoryTable
					loading={loading}
					repositories={filteredRepositories}
					onRowClick={handleRowClick}
				/>

				<RepositoryDetails
					name={selectedRepository?.name}
					language={selectedRepository?.language}
					languages={selectedRepository?.languages}
					starsCount={selectedRepository?.starsCount}
					license={selectedRepository?.licenseName}
				/>

				<footer className={styles.bottom}></footer>
			</div>
		</>
	);
};

export default App;
