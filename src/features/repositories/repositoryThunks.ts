import { createAsyncThunk } from '@reduxjs/toolkit';
import { RepositoriesData } from './types.ts';
import {fetchRepositories} from "../../services/githubService.ts";

// Асинхронный thunk для получения всех репозиториев
export const fetchRepositoriesThunk = createAsyncThunk(
	'repositories/fetchAllRepositories',
	async () => {
		const data: RepositoriesData = await fetchRepositories();
		return data.viewer.repositories.nodes.map((repo) => ({
			id: repo.id,
			name: repo.name,
			language: repo.primaryLanguage?.name,
			languages: repo.languages.nodes.map(lang => lang.name),
			forksCount: repo.forks.totalCount,
			starsCount: repo.stargazers.totalCount,
			updatedAt: repo.updatedAt,
			description: repo.description || '',
			licenseName: repo.licenseInfo?.name || 'No License',
		}));
	}
);
