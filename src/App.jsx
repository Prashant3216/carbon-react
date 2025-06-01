import TutorialHeader from "./components/TutorialHeader/TutorialHeader";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import routes from "./routes/index";
import { Content, Theme } from "@carbon/react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Theme theme="g100">
          <TutorialHeader />
        </Theme>
        <Content>{routes()}</Content>
      </BrowserRouter>
    </>
  );
}

export default App;
