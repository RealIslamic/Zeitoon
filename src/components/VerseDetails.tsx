import { Text, Title, rem, useMantineTheme } from "@mantine/core";
import { IconDotsCircleHorizontal } from "@tabler/icons-react";

export const VerseDetails = ({
  originalText,
  transliteration,
  activeBookFromParams,
  verse,
  showOriginalText = false,
  showMoreInformationIcon = false,
}: {
  originalText: string;
  transliteration: string;
  activeBookFromParams: string | undefined;
  verse: string;
  showOriginalText: boolean;
  showMoreInformationIcon: boolean;
}) => {
  const theme = useMantineTheme();
  const originalKeys = originalText.split(" ");
  const transliterationKeys = transliteration.split(" ");

  return (
    <>
      {showOriginalText &&
        (activeBookFromParams === "قرآن" ? (
          <Title order={3} fz={rem(18)} fw={500} mb={rem(10)} ff={"Uthmani"}>
            {originalText}
          </Title>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: rem(10),
              width: "100%",
            }}
          >
            {originalKeys.map((item, i) => (
              <div
                key={i}
                style={{
                  marginLeft: rem(3),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: rem(18),
                    height: rem(20),
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: rem(13),
                    height: rem(13),
                    color:
                      theme.colorScheme === "dark" ? theme.colors.gray[6] : theme.colors.gray[7],
                  }}
                >
                  {transliterationKeys[i]}
                </span>
              </div>
            ))}
          </div>
        ))}
      <Text fz="md" fw="normal" ml={3}>
        {verse}
        {showMoreInformationIcon && <IconDotsCircleHorizontal height={"1em"} width={"1em"} />}
      </Text>
    </>
  );
};
