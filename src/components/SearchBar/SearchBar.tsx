import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import { Button, styled, TextField } from "@mui/material";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const CustomButton = styled(Button)({
    backgroundColor: "#2196F3",
    padding: "8px 22px",
  });

  return (
    <div className={styles.searchBar}>
      <TextField
        inputProps={{
          style: {
            width: "912px",
          },
          placeholder: "Поисковый запрос",
        }}
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="small"
        InputProps={{ className: styles.input }}
      />

      <CustomButton
        variant="contained"
        color="primary"
        onClick={handleSearch}
        size="medium"
      >
        Искать
      </CustomButton>
    </div>
  );
};

export default SearchBar;
