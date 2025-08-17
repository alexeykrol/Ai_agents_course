import { RouterProvider } from "react-router";
import { ThemeModeScript, ThemeProvider } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme';
import router from "./routes/Router";


function App() {

  return (
    <>
      <ThemeModeScript />
      <ThemeProvider theme={customTheme}>
      <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
