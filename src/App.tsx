import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, /*HashRouter,*/ Route, Routes } from "react-router-dom";
import ChooseContentNavbar from "./components/ChooseContentNavbar";
import MyHeader from "./components/MyHeader";
import { About } from "./pages/About";
import Passage from "./pages/Passage";
import { Search } from "./pages/Search";
import { useBibleStore } from "./store";
// import { SearchContent } from "./pages/Content";
import { SavedVerses } from "./pages/SavedVerses";

export default function App() {
  const activeBook = useBibleStore(state => state.activeBook);
  const activeChapter = useBibleStore(state => state.activeChapter);
  const activeVerse = useBibleStore(state => state.activeVerse);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
  });
  const toggleColorScheme = () =>
    setColorScheme(current => (current === "dark" ? "light" : "dark"));
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    document.getElementById("loading-fallback")?.remove();
  }, []);
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ colorScheme, fontFamily: "Vazir" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter>
          <AppShell
            pl="0"
            navbar={<ChooseContentNavbar opened={opened} setOpened={setOpened} />}
            header={
              <MyHeader
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
                opened={opened}
                setOpened={setOpened}
              />
            }
            styles={theme => ({
              main: {
                paddingLeft: "calc(var(--mantine-aside-width, 0px) + 1rem)",
                paddingRight: "calc(var(--mantine-navbar-width, 0px) + 1rem)",
                paddingTop: "var(--mantine-header-height, 0px)",
                paddingBottom: "var(--mantine-footer-height, 0px)",
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : "#ffffff",
              },
            })}
          >
            {/* <HashRouter> */}
            <Routes>
              <Route
                path="*"
                element={<Navigate to={`/${activeBook}/${activeChapter}/${activeVerse}`} replace />}
              />
              <Route
                index
                element={<Navigate to={`/${activeBook}/${activeChapter}/${activeVerse}`} replace />}
              />
              <Route
                key={0}
                path="/:activeBook/:activeChapter/:activeVerse"
                element={<Passage />}
              />
              <Route key={0} path="/search" element={<Search />} />
              <Route key={0} path="/about" element={<About />} />
              {/* <Route
                key={0}
                path="/content"
                element={
                  <SearchContent />
                }
              /> */}
              <Route key={0} path="/saved" element={<SavedVerses />} />
            </Routes>
            {/* </HashRouter> */}
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
