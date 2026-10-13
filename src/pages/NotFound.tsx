import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card mx-auto max-w-lg px-6 py-16 text-center">
      <div className="num display text-[clamp(5rem,14vw,10rem)] text-accent-ink">404</div>
      <p className="mt-3 text-sub">No encontramos esa página.</p>
      <Link to="/docentes" className="btn-primary mt-6">
        Volver a docentes
      </Link>
    </div>
  );
}
