import { GraphQLClient, gql } from "graphql-request";
import { RepositoriesData } from "../features/repositories/types.ts"; // Импорт интерфейсов типов данных для репозиториев

// URL для GitHub GraphQL API
const GITHUB_API_URL = "https://api.github.com/graphql";
// Токен авторизации для доступа к GitHub API
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Используйте переменную окружения для безопасности

// Создание клиента GraphQL с заданным URL и заголовками
const client = new GraphQLClient(GITHUB_API_URL, {
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`, // Добавляем токен в заголовки для авторизации
  },
});

// GraphQL-запрос для получения репозиториев с пагинацией
const REPOSITORIES_QUERY = gql`
  query ($after: String) {
    viewer {
      repositories(
        first: 100
        after: $after
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          id
          name
          primaryLanguage {
            name
          }
          languages(first: 100) {
            nodes {
              name
            }
          }
          forks {
            totalCount
          }
          stargazers {
            totalCount
          }
          updatedAt
          licenseInfo {
            name
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

// Функция для получения всех репозиториев с использованием пагинации
export const fetchRepositories = async (): Promise<RepositoriesData> => {
  let allRepositories: RepositoriesData["viewer"]["repositories"]["nodes"] = []; // Массив для хранения всех репозиториев
  let hasNextPage = true; // Флаг для проверки наличия следующих страниц
  let endCursor: string | null = null; // Курсор для получения следующей страницы

  // Цикл для получения данных всех страниц
  while (hasNextPage) {
    // Выполнение запроса к GraphQL API
    const data: RepositoriesData = await client.request<RepositoriesData>(
      REPOSITORIES_QUERY,
      { after: endCursor },
    );

    // Добавление полученных репозиториев к общему списку
    allRepositories = [...allRepositories, ...data.viewer.repositories.nodes];

    // Обновление флага наличия следующих страниц и курсора
    hasNextPage = data.viewer.repositories.pageInfo.hasNextPage;
    endCursor = data.viewer.repositories.pageInfo.endCursor;
  }

  // Возврат всех репозиториев и информации о пагинации
  return {
    viewer: {
      repositories: {
        nodes: allRepositories, // Все собранные репозитории
        pageInfo: {
          hasNextPage, // Флаг наличия следующих страниц
          endCursor, // Курсор для следующей страницы
        },
      },
    },
  };
};
