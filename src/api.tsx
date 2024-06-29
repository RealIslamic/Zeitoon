import books from "./assets/books.json";
import bibleJson from "./assets/data.json";
import listOfAddresses from "./assets/list-of-addresses.json";
import surahNames from "./assets/surah-names.json";

export const data = bibleJson as Book[];

// export const dataContent = [...new Set([].concat.apply<any, any[], string[]>([], data.map(item => item.content)))];
export const dataContent = [];
export interface Book {
  chapter: number;
  verse: number;
  text: string;
  book_index: number;
  translation_id: number;
  book_id: string;
  book_name: string;
  originalText: string;
  transliteration: string;
  content: string[];
}

export const getBooks = (): Promise<string[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(books.map(item => item.book_name));
    }, 1);
  });
};

export const getChapters = (thebook: string): Promise<number[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        books.find(item => item.book_name === thebook)?.chapters.map(item => item.chapter) || [],
      );
    }, 1);
  });
};

export const getQuranSurahNames = (): string[] => {
  return surahNames;
};

export const getListOfAddresses = (): {
  label: string;
  route: string;
  book_name: string;
  chapter: number;
  verse: number;
}[] => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return listOfAddresses;
};

export const getOneQuranSurahNames = (index: number): string => {
  return surahNames[index - 1];
};

export const getVerses = (thebook: string, thechapter: number): Promise<number[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        books
          .find(item => item.book_name === thebook)
          ?.chapters.find(item => item.chapter === thechapter)?.verses || [],
      );
    }, 1);
  });
};

export const getVersesInChapter = (
  thebook: string,
  thechapter: number,
): Promise<
  {
    verse: number;
    text: string;
    transliteration: string;
    originalText: string;
    content: string[];
  }[]
> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        data
          .filter((book: Book) => book.book_name === thebook && book.chapter === thechapter)
          .map((book: Book) => ({
            verse: book.verse,
            text: book.text,
            transliteration: book.transliteration,
            originalText: book.originalText,
            content: book.content,
          })),
      );
    }, 40);
  });
};

export const getPassage = (): Promise<
  {
    book_name: string;
    book_id: string;
    chapter: number;
  }[]
> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const set = new Set<string>();
      data.map((book: Book) => {
        const obj = {
          book_name: book.book_name,
          book_id: book.book_id,
          chapter: book.chapter,
        };
        set.add(JSON.stringify(obj, Object.keys(obj).sort()));
      });
      resolve(
        [...set].map(item => {
          if (typeof item === "string") return JSON.parse(item);
          else if (typeof item === "object") return item;
        }),
      );
    }, 60);
  });
};
