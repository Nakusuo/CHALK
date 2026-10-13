import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <div className="font-mono text-5xl font-bold text-brand">404</div>
      <p className="mt-3 text-sub">No encontramos esa página.</p>
      <Link to="/docentes" className="btn-primary mt-6">
        Volver a docentes
      </Link>
    </div>
  );
}
