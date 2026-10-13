import { lazy } from "react";
import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/Toast";
import Layout from "./components/Layout";
import { useStore } from "./lib/store";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

const Home = lazy(() => import("./pages/Home"));
const ProfessorPage = lazy(() => import("./pages/Professor"));
const ReviewPage = lazy(() => import("./pages/Review"));
const Faculties = lazy(() => import("./pages/Faculties"));
const Courses = lazy(() => import("./pages/Courses"));
const Compare = lazy(() => import("./pages/Compare"));
const Profile = lazy(() => import("./pages/Profile"));

function Protected() {
  const user = useStore((s) => s.user);
  return user ? <Outlet /> : <Navigate to="/" replace />;
}

function GuestOnly() {
  const user = useStore((s) => s.user);
  return user ? <Navigate to="/docentes" replace /> : <Outlet />;
}

// HashRouter: el sitio sigue funcionando en cualquier hosting estático (GitHub Pages, abrir dist/ local).
export default function App() {
  return (
    <HashRouter>
      <Toaster />
      <Routes>
        <Route element={<GuestOnly />}>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Register />} />
        </Route>
        <Route element={<Protected />}>
          <Route element={<Layout />}>
            <Route path="/docentes" element={<Home />} />
            <Route path="/docentes/:id" element={<ProfessorPage />} />
            <Route path="/docentes/:id/resena" element={<ReviewPage />} />
            <Route path="/facultades" element={<Faculties />} />
            <Route path="/cursos" element={<Courses />} />
            <Route path="/comparar" element={<Compare />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
