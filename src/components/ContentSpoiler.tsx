import { Spoiler } from "@mantine/core";

export const ContentSpoiler = ({ text }: { text: string }) => {
  return (
    <Spoiler
      maxHeight={90}
      showLabel={"بیشتر نشان بده"}
      hideLabel="کمتر نشان بده"
      transitionDuration={100}
    >
      <p style={{ whiteSpace: "pre-line" }}>{text}</p>
    </Spoiler>
  );
};
