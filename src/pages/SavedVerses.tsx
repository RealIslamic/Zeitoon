import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { rem, Box, createStyles, Input, ScrollArea } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useBibleStore } from "../store";
import SavedVerseItem from "../components/SavedVerseItem";

const useStyles = createStyles(() => ({
  input: {
    direction: "rtl",
    textAlign: "right",
  },
}));

export function SavedVerses() {
  const { classes } = useStyles();
  const [searchKey, setSearchKey] = useState("");
  const savedVerses = useBibleStore(state => state.savedVerses);
  const dataHelper = JSON.parse(JSON.stringify(savedVerses));
  const [searchResults, setSearchResults] = useState<any[]>(savedVerses);
  const [debouncedSearchKey] = useDebouncedValue(searchKey, 200);

  useEffect(() => {
    if (debouncedSearchKey && debouncedSearchKey.length > 1) {
      setSearchResults(
        dataHelper
          .filter((item: any) => item.key.includes(debouncedSearchKey))
          .map((item: any) => {
            item.key = item.key.replaceAll(debouncedSearchKey, "{" + debouncedSearchKey + "}");
            return item;
          }),
      );
    } else {
      setSearchResults(savedVerses);
    }
  }, [debouncedSearchKey]);

  return (
    <Box dir="ltr">
      <Input
        classNames={{ input: classes.input }}
        rightSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
        defaultValue={searchKey}
        onChange={e => {
          setSearchKey(e.target.value);
        }}
        placeholder="در توضیحات جست و جو کنید"
      />
      {searchResults?.length ? (
        <ScrollArea dir="rtl" w={"100%"} h={"85vh"}>
          {searchResults.map(({ verse, text, key, originalText, content, book, chapter }, i) => (
            <SavedVerseItem
              verse={verse}
              key={i}
              savedKey={key}
              text={text}
              originalText={originalText}
              hasContent={!!content?.length}
              book_name={book}
              chapter={chapter}
            />
          ))}
        </ScrollArea>
      ) : (
        <></>
      )}
    </Box>
  );
}
