// Angenommen: isAuthenticated kommt aus deinem Auth-Context/State
//import { useAuth } from "../auth/AuthContext";
import {
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  //const { isAuthenticated } = useAuth(); // oder prop / Zustand
  const sidebarWidth = "w-72 md:w-80";
  const isAuthenticated = false;

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed inset-x-0 top-0 z-40 bg-amber-100/90 backdrop-blur border-b border-amber-200">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Navigation öffnen"
            aria-expanded={open}
            className="rounded-md p-2 hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>

          <h2 className="text-slate-700 font-serif font-bold italic underline text-lg">
            Jenseits vom Tellerrand
          </h2>

          {/* Quick-Action rechts: nur wenn nicht eingeloggt */}
          {!isAuthenticated ? (
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Zur Registrierung"
            >
              <UserPlusIcon className="h-4 w-4" />
              <span>Registrieren</span>
            </Link>
          ) : (
            <span className="w-6" />
          )}
        </div>
      </header>

      {open && (
        <button
          className="md:hidden fixed inset-0 z-30 bg-black/40"
          aria-label="Navigation schließen"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        className={`${sidebarWidth} h-screen fixed left-0 top-0 z-40 bg-amber-100 border-r border-amber-200 p-6 md:p-8 flex flex-col transition-transform duration-200 ease-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        aria-label="Hauptnavigation"
      >
        <div className="md:hidden flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-2 hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Navigation schließen"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <h1 className="font-semibold text-slate-800 text-2xl md:text-3xl italic font-serif underline mb-8">
          Jenseits vom Tellerrand
        </h1>

        <ul className="flex flex-col gap-2 text-amber-900">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
              onClick={() => setOpen(false)}
            >
              <BookOpenIcon className="h-5 w-5" />
              <span>Alle Rezepte</span>
            </Link>
          </li>
          <li>
            <Link
              to="/new-recipe"
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
              onClick={() => setOpen(false)}
            >
              <PlusCircleIcon className="h-5 w-5" />
              <span>Rezept erstellen</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
              onClick={() => setOpen(false)}
            >
              <UserCircleIcon className="h-5 w-5" />
              <span>Profil</span>
            </Link>
          </li>
        </ul>

        {/* CTA-Bereich unten: nur wenn nicht eingeloggt */}
        {!isAuthenticated && (
          <div className="mt-6">
            <Link
              to="/register"
              className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-amber-500 text-white font-medium hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              onClick={() => setOpen(false)}
            >
              <UserPlusIcon className="h-5 w-5" />
              <span>Jetzt registrieren</span>
            </Link>

            <div className="mt-2 text-sm text-amber-900/80 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-amber-700"
                onClick={() => setOpen(false)}
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                <span>Schon ein Konto? Anmelden</span>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-auto pt-6 text-sm text-amber-800/70">
          <p>© {new Date().getFullYear()} Mika Mielinski, Telse Jensen</p>
        </div>
      </nav>
    </>
  );
}
