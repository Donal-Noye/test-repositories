import React from "react";
import { Chip } from "@mui/material";
import star from "../../assets/icon/star.svg";
import styles from "./RepositoryDetails.module.scss";

interface RepositoryDetailsProps {
  name: string | undefined;
  language: string | undefined;
  languages: string[] | undefined;
  starsCount: number | undefined;
  license: string | undefined;
}

const RepositoryDetails: React.FC<RepositoryDetailsProps> = ({
  name,
  language,
  languages,
  starsCount,
  license,
}) => {
  // Если имя репозитория не задано, показываем сообщение
  if (!name) {
    return (
      <div className={`${styles.detailsContainer} ${styles.detailsText}`}>
        <p>Выберите репозиторий</p>
      </div>
    );
  }

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.detailsName}>{name}</h2>
      {languages && languages.length > 0 && (
        <div className={styles.content}>
          <div className={styles.languages}>
            <Chip
              label={language}
              color="primary"
              sx={{ backgroundColor: "#2196F3" }}
            />
            <div className={styles.tags}>
              {languages.map((language) => (
                <Chip key={language} label={language} />
              ))}
            </div>
          </div>
          <div className={styles.starsCount}>
            <img src={star} alt="" />
            <p>{starsCount}</p>
          </div>
        </div>
      )}
      <p>{license}</p>
    </div>
  );
};

export default RepositoryDetails;
