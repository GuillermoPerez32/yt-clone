import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { Home, Login, Search, Video } from "./pages";
import { BaseLayout } from "./layouts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="video/:id" element={<Video />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
