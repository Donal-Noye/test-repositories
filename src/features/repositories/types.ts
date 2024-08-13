/**
 * Интерфейс для описания владельца репозитория
 */
export interface Owner {
  login: string;
}

/**
 * Интерфейс для описания количества звёзд у репозитория
 */
export interface Stargazers {
  totalCount: number;
}

/**
 * Интерфейс для описания данных о репозитории
 */
export interface Repository {
  id: string;
  name: string;
  language?: string;
  languages: string[];
  forksCount: number;
  starsCount: number;
  updatedAt: string;
  licenseName?: string;
}

/**
 * Интерфейс для описания состояния списка репозиториев
 */
export interface RepositoriesState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  selectedRepository: Repository | null;
}

/**
 * Интерфейс для описания информации о языке программирования репозитория
 */
export interface PrimaryLanguage {
  name: string;
}

/**
 * Интерфейс для описания количества форков репозитория
 */
export interface Forks {
  totalCount: number;
}

/**
 * Интерфейс для описания информации о лицензии репозитория
 */
export interface LicenseInfo {
  name: string;
}

/**
 * Интерфейс для описания данных о репозитории, полученных из GraphQL
 */
export interface RepositoryNode {
  id: string;
  name: string;
  primaryLanguage: PrimaryLanguage | null;
  forks: Forks;
  stargazers: Stargazers;
  updatedAt: string;
  description: string | null;
  licenseInfo: LicenseInfo | null;
  languages: {
    nodes: {
      name: string;
    }[];
  };
}

/**
 * Интерфейс для описания информации о пагинации в списке репозиториев
 */
export interface RepositoriesPageInfo {
  hasNextPage: boolean; // Указывает, есть ли следующие страницы
  endCursor: string | null; // Курсор для следующей страницы (может быть null, если это последняя страница)
}

/**
 * Интерфейс для описания структуры данных о репозиториях, полученных из GraphQL
 */
export interface RepositoriesData {
  viewer: {
    repositories: {
      nodes: RepositoryNode[]; // Массив узлов (репозиториев)
      pageInfo: RepositoriesPageInfo; // Информация о пагинации
    };
  };
}
