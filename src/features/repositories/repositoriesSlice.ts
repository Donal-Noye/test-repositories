import { createSlice } from '@reduxjs/toolkit';
import { RepositoriesState } from "./types.ts";
import {fetchRepositoriesThunk} from "./repositoryThunks.ts";

// Начальное состояние
const initialState: RepositoriesState = {
	repositories: [],
	loading: false,
	error: null,
	selectedRepository: null,
};

// Слайс репозиториев
const repositoriesSlice = createSlice({
	name: 'repositories',
	initialState,
	reducers: {
		selectRepository(state, action) {
			const selectedId = action.payload;
			state.selectedRepository = state.repositories.find(repo => repo.id === selectedId) || null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRepositoriesThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchRepositoriesThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.repositories = action.payload;
			})
			.addCase(fetchRepositoriesThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch repositories';
			});
	},
});

export const { selectRepository } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;