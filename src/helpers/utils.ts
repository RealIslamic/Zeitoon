import { getOneQuranSurahNames } from "../api";

export const createVerseKey = (
  originalText: string,
  text: string,
  bookName: string,
  chapter: number,
  verse: number,
): string => {
  return `${originalText}
${text}
(${bookName} ${bookName === "قرآن" ? getOneQuranSurahNames(chapter) + " " : ""}${chapter}: ${verse})
`;
};
