import { Box, Text, Title, createStyles } from "@mantine/core";
import { IconDotsCircleHorizontal } from "@tabler/icons-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBibleStore } from "../store";
import reactStringReplace from "react-string-replace";

const useStyles = createStyles(theme => ({
  link: {
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

const SavedVerseItem = ({
  verse,
  text,
  originalText,
  hasContent,
  book_name,
  chapter,
  savedKey,
}: {
  verse: number;
  text: string;
  originalText: string;
  hasContent: boolean;
  book_name: string;
  chapter: string;
  savedKey: string;
}) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { classes, cx } = useStyles();
  const searchedVerse = useBibleStore(state => state.searchedVerse);
  const setSearchedVerse = useBibleStore(state => state.setSearchedVerse);

  if (!!searchedVerse)
    setTimeout(() => {
      ref.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 0);

  return (
    <Box
      component="div"
      dir="rtl"
      ta={"right"}
      className={cx(classes.link, {
        [classes.linkActive]: searchedVerse === `/${book_name}/${chapter}/${verse}`,
      })}
      py={7}
      px={10}
      onClick={() => {
        navigate(`/${book_name}/${chapter}/${verse}`);
        setSearchedVerse(`/${book_name}/${chapter}/${verse}`);
      }}
      ref={searchedVerse === `/${book_name}/${chapter}/${verse}` ? ref : null}
    >
      <Title order={5} weight={400}>
        {originalText}
      </Title>
      <Title order={4} weight={400}>
        {text}
        {hasContent && <IconDotsCircleHorizontal height={"1em"} width={"1em"} />}
      </Title>
      <Text ta={"right"} size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
        ({book_name + ", " + chapter + ", " + verse}), توضیحات:‌{" "}
        {reactStringReplace(savedKey, /\{(.*?)\}/, (match, i) => (
          <span
            key={i}
            style={{
              textDecoration: "underline ",
              textUnderlinePosition: "under",
              fontWeight: "bold",
            }}
          >
            {match}
          </span>
        ))}
      </Text>
    </Box>
  );
};

export default SavedVerseItem;
