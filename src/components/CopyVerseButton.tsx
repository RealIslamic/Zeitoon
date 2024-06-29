import { ActionIcon, Box, Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function CopyVerseButton({
  handleOnMultipleCopy,
  clearVerseSelection,
}: {
  handleOnMultipleCopy: () => void;
  clearVerseSelection: () => void;
}) {
  return (
    <Box
      pos={"absolute"}
      bottom={10}
      display={"flex"}
      w={"100%"}
      dir="rtl"
      style={{
        justifyContent: "center",
      }}
    >
      <Button radius="xl" onClick={handleOnMultipleCopy}>
        کپی کردن
      </Button>
      <ActionIcon
        mr={10}
        variant="filled"
        color="blue"
        size="lg"
        w={3}
        radius="xl"
        onClick={clearVerseSelection}
      >
        <IconX size="2.125rem" />
      </ActionIcon>
    </Box>
  );
}
