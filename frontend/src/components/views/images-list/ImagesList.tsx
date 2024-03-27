"use client";

import { TextField } from "@/components/elements/textfield/TextField";
import styles from "./ImagesList.module.scss";
import { useState } from "react";
import { IconButton } from "@/components/elements/button/Button";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Image = {
  name: string;
  author: string;
  lastModified: string;
};

export const ImagesList = () => {
  const [filterText, setFilterText] = useState<string>("");

  const filteredImages = IMAGES.filter(
    (i) => i.name.includes(filterText) || i.author.includes(filterText)
  );

  return (
    <div className={`card ${styles.imageListCard}`}>
      <h3>Images</h3>
      <TextField
        maxLength={100}
        placeholder="Search images"
        className={`${styles.searchField} margin-top`}
        inputClassName={styles.searchField}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div>
        {filteredImages.map((image) => (
          <ImageRow image={image} key={image.name} />
        ))}
      </div>
    </div>
  );
};

const ImageRow = ({ image }: { image: Image }) => {
  const diffString = getDiffString(image.lastModified);

  return (
    <div className={styles.imageRow}>
      <div className={styles.col}>
        <div className={styles.row}>
          <p>
            <b>{image.name}</b>
          </p>
          <p>{diffString}</p>
        </div>
        <div className={styles.row}>
          <p />
          <p>{image.author}</p>
        </div>
      </div>
      <Link href={`/images/${image.name}`}>
        <IconButton className={"margin-left margin-right"}>
          <FontAwesomeIcon icon={faAngleRight} />
        </IconButton>
      </Link>
    </div>
  );
};

function getDiffString(dateTime: string) {
  const now = new Date();
  const lastModified = new Date(dateTime);

  const diff = now.getTime() - lastModified.getTime();
  const diffSeconds = Math.round(diff / 1000);

  const getScale = () => {
    if (diffSeconds < 60) {
      return { number: diffSeconds, unit: "second" };
    }

    const diffMinutes = (diffSeconds - (diffSeconds % 60)) / 60;
    if (diffMinutes < 60) {
      return { number: diffMinutes, unit: "minute" };
    }

    const diffHours = (diffMinutes - (diffMinutes % 60)) / 60;
    if (diffHours < 24) {
      return { number: diffHours, unit: "hour" };
    }

    const diffDays = (diffHours - (diffHours % 24)) / 24;
    if (diffDays < 30) {
      return { number: diffDays, unit: "day" };
    }

    if (diffDays < 365) {
      const diffMonths = (diffDays - (diffDays % 30)) / 30;
      return { number: diffMonths, unit: "month" };
    }

    const diffYears = (diffDays - (diffDays % 365)) / 365;
    return { number: diffYears, unit: "year" };
  };

  const diffObj = getScale();
  return `${diffObj.number} ${diffObj.unit}${
    diffObj.number > 1 ? "s" : ""
  } ago`;
}

const IMAGES: Image[] = [
  {
    name: "PelleSvans",
    author: "Vidde",
    lastModified: "2024-02-23T14:22:53",
  },
  {
    name: "Dallepoo",
    author: "Vidde",
    lastModified: "2023-01-21T09:19:12",
  },
  {
    name: "Grott",
    author: "Lea",
    lastModified: "2023-11-21T09:19:12",
  },
  {
    name: "Leffeeeepo",
    author: "Vidde",
    lastModified: "2024-02-25T20:22:53",
  },
  {
    name: "Fuffuj",
    author: "Pan",
    lastModified: "1998-09-24T15:21:53",
  },
  {
    name: "Droopy",
    author: "Sanch",
    lastModified: "2024-02-26T23:00:53",
  },
  {
    name: "Puff",
    author: "Piff",
    lastModified: "2024-02-26T22:22:53",
  },
];
