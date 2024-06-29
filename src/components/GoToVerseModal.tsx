import { ActionIcon, Box, Input, Modal, ScrollArea, Title, createStyles, rem } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { IconFocus2, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { getListOfAddresses } from "../api";
import { useBibleStore } from "../store";

const useStyles = createStyles(theme => ({
  input: {
    direction: "rtl",
    textAlign: "right",
  },
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

const GoToVerseModal = () => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [listOfAddresses, setListOfAddresses] = useState<
    {
      label: string;
      route: string;
      book_name: string;
      chapter: number;
      verse: number;
    }[]
  >(getListOfAddresses());
  const [searchKey, setSearchKey] = useState<string>("");
  const [debouncedSearchKey] = useDebouncedValue(searchKey, 200);
  const [opened, { open, close }] = useDisclosure(false);
  const setActiveBook = useBibleStore(state => state.setActiveBook);
  const setActiveChapter = useBibleStore(state => state.setActiveChapter);
  const setActiveVerse = useBibleStore(state => state.setActiveVerse);

  useEffect(() => {
    if (debouncedSearchKey && debouncedSearchKey.length > 1) {
      const arrayOfQueries = debouncedSearchKey.split(" ");
      const newData = getListOfAddresses()
        .filter(address => arrayOfQueries.every(item => address.label.includes(item)))
        .map(address => {
          let label = address.label;
          arrayOfQueries.forEach(query => {
            if (query && query !== "") {
              label = label.replace(query, "{" + query + "}");
            }
          });
          return { ...address, label };
        });
      setListOfAddresses(newData);
    }
  }, [debouncedSearchKey]);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} ta={"center"}>
        <div>
          <Input
            classNames={{ input: classes.input }}
            w={"100%"}
            rightSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            onChange={e => {
              setSearchKey(e.target.value);
            }}
            placeholder="مثال:‌ پیدایش 1 1"
          />
          {listOfAddresses?.length ? (
            <ScrollArea mt={"1vh"} h="40vh" w={"100%"} dir="rtl">
              {listOfAddresses.slice(0, 20).map((item, i) => (
                <Box
                  component="div"
                  dir="rtl"
                  ta={"right"}
                  className={cx(classes.link)}
                  py={7}
                  px={10}
                  key={i}
                  onClick={() => {
                    navigate(item.route, { replace: true });
                    setActiveBook(item.book_name);
                    setActiveChapter(item.chapter);
                    setActiveVerse(item.verse);
                  }}
                >
                  <Title order={5} weight={400}>
                    {reactStringReplace(item.label, /\{(.*?)\}/, (match, i) => (
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
                  </Title>
                </Box>
              ))}
            </ScrollArea>
          ) : (
            <></>
          )}
        </div>
      </Modal>

      <ActionIcon variant="default" onClick={open}>
        <IconFocus2 size={rem(20)} />
      </ActionIcon>
    </>
  );
};

export default GoToVerseModal;
