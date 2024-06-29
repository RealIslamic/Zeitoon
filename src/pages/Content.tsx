import React, { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { rem, Box, createStyles, Input, ScrollArea, Divider } from "@mantine/core";
import { dataContent } from "../api";
import { useDebouncedValue } from "@mantine/hooks";
import reactStringReplace from "react-string-replace";

const useStyles = createStyles(() => ({
  input: {
    direction: "rtl",
    textAlign: "right",
  },
}));

export function SearchContent() {
  const { classes } = useStyles();
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [debouncedSearchKey] = useDebouncedValue(searchKey, 200);

  useEffect(() => {
    if (debouncedSearchKey && debouncedSearchKey.length > 1) {
      setSearchResults(
        dataContent
          // @ts-ignore
          .filter(item => item && item?.includes(debouncedSearchKey))
          .map(item => {
            // @ts-ignore
            item = item.replaceAll(debouncedSearchKey, "{" + debouncedSearchKey + "}");
            return item;
          }),
      );
    } else setSearchResults([]);
  }, [debouncedSearchKey]);

  return (
    <Box dir="rtl">
      <Input
        classNames={{ input: classes.input }}
        rightSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
        defaultValue={searchKey}
        onChange={e => {
          setSearchKey(e.target.value);
        }}
        placeholder="در سوالات پر تکرار جست و جو کنید"
      />
      {searchResults?.length ? (
        <ScrollArea dir="rtl" w={"100%"} h={"85vh"}>
          {searchResults.slice(0, 50).map((item, i) => {
            return (
              <React.Fragment key={i}>
                <p style={{ whiteSpace: "pre-line", direction: "rtl" }}>
                  {reactStringReplace(item, /\{(.*?)\}/, (match, i) => (
                    <span
                      key={i}
                      style={{
                        textDecoration: "underline ",
                        textUnderlinePosition: "under",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {match}
                    </span>
                  ))}
                </p>
                <Divider size="sm" labelPosition="center" />
              </React.Fragment>
            );
          })}
        </ScrollArea>
      ) : (
        <></>
      )}
    </Box>
  );
}
