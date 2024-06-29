import { useState, useEffect } from "react";
import { Howl } from "howler";
import { getBooks } from "../api";
import { ActionIcon, rem } from "@mantine/core";
import { IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";
import { useParams } from "react-router-dom";

const Audio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<Howl | null>(null);
  const activeBook = useParams().activeBook;
  const activeChapter = Number(useParams().activeChapter);

  useEffect(() => {
    async function handleOnPlay() {
      if (isPlaying) {
        if (audio !== null) audio.stop();
        const books = await getBooks();
        const index = books.findIndex(book => book === activeBook);
        const audioHowl = new Howl({
          src: [
            // `https://wordpocket.org/bibles/app/audio/1/${
            //   index + 1
            // }/${activeChapter}.mp3`,
            `https://www.wordproaudio.net/bibles/app/audio/20/${index + 1}/${activeChapter}.mp3`,
          ],
          html5: true,
          pool: 1,
          onplay: () => setIsPlaying(activeBook !== "QUR"),
          onpause: () => setIsPlaying(false),
          onend: () => setIsPlaying(false),
        });
        setAudio(audioHowl);
        audioHowl.play();
      } else audio?.stop();

      return () => {
        audio?.unload();
      };
    }
    handleOnPlay();
  }, [activeBook, activeChapter, isPlaying]);

  return (
    <ActionIcon
      variant="default"
      onClick={() => setIsPlaying(value => !value)}
      disabled={activeBook === "قرآن"}
    >
      {isPlaying ? <IconPlayerStop size={rem(20)} /> : <IconPlayerPlay size={rem(20)} />}
    </ActionIcon>
  );
};

export default Audio;
