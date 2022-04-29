import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeController from "./Controllers/HomeController";
import LayoutView from "./Views/LayoutView";
import RegistryController from "./Controllers/RegistryController";
import PageNotFound from "./Components/PageNotFound";
import ComingSoon from "./Components/ComingSoon";
import { CookiesProvider } from "react-cookie";
import WeddingPartyView from "./Views/WeddingPartyView";
import RSVPController from "./Controllers/RSVPController";
import { Slide, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**
 * Turns URL path into router basename by removing everything after the last slash
 * @param {string} path URL path, probably window.location.pathname
 * @returns {string} final basename
 */
const getBasename = (path: string): string =>
  path.substr(0, path.lastIndexOf("/"));

function App() {
  return (
    <>
      <CookiesProvider>
        <BrowserRouter basename={getBasename(window.location.pathname)}>
          <Routes>
            <Route path="/" element={<LayoutView />}>
              <Route index element={<HomeController />} />
              <Route path="registry" element={<RegistryController />} />
              <Route path="rsvp" element={<RSVPController />} />
              <Route path="wedding-party" element={<WeddingPartyView />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
      <ToastContainer
        position="top-right"
        transition={Slide}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
