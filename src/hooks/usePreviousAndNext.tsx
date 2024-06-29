import { useEffect, useState } from "react";
import { useBibleStore } from "../store";
import { getPassage } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const usePreviousAndNextHandlers = () => {
  const navigate = useNavigate();
  const [passage, setPassage] = useState<{ book_name: string; chapter: number; book_id: string }[]>(
    [],
  );
  const activeChapter = Number(useParams().activeChapter);
  const activeBook = useParams().activeBook;

  useEffect(() => {
    async function handlePassage() {
      const data = await getPassage();
      setPassage(data);
    }
    handlePassage();
  }, [activeBook, activeChapter]);

  const setActiveBookOnly = useBibleStore(state => state.setActiveBookOnly);
  const setActiveBookShort = useBibleStore(state => state.setActiveBookShort);
  const setActiveChapter = useBibleStore(state => state.setActiveChapter);
  const setActiveVerse = useBibleStore(state => state.setActiveVerse);
  const checkNext = (): number | null => {
    const index = passage.findIndex(
      book => book.book_name === activeBook && book.chapter === activeChapter,
    );
    return index === -1 || index === passage.length - 1 ? null : index;
  };
  const checkPrev = (): number | null => {
    const index = passage.findIndex(
      book => book.book_name === activeBook && book.chapter === activeChapter,
    );
    return index === -1 || index === 0 ? null : index;
  };
  const nextHandler = () => {
    const index = checkNext();
    if (index === null) return null;
    if (passage) {
      const next = passage[index + 1];
      if (next !== null) {
        navigate(`/${next.book_name}/${next.chapter}/1`, { replace: true });
        setActiveBookOnly(next.book_name);
        setActiveBookShort(next.book_id);
        setActiveChapter(next.chapter);
        setActiveVerse(1);
      }
    }
  };
  const prevHandler = () => {
    const index = checkPrev();
    if (index === null) return null;
    if (passage) {
      const prev = passage[index - 1];
      if (prev !== null) {
        navigate(`/${prev.book_name}/${prev.chapter}/1`, { replace: true });
        setActiveBookOnly(prev.book_name);
        setActiveBookShort(prev.book_id);
        setActiveChapter(prev.chapter);
        setActiveVerse(1);
      }
    }
  };
  return {
    prevHandler,
    nextHandler,
    checkNext,
    checkPrev,
    activeBook,
    activeChapter,
  };
};

export default usePreviousAndNextHandlers;
