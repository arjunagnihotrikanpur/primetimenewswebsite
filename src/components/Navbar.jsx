// src/components/Navbar.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Contact", href: "/contact" },
];

const MenuIcon = ({ open }) =>
  open ? (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      stroke="#c40000"
      strokeWidth="2.5"
      fill="none"
    >
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7"
      stroke="#c40000"
      strokeWidth="2.5"
      fill="none"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-slate-300 shadow-md"
      style={{
        background: "linear-gradient(180deg, #dfe6ee 0%, #cfd8e2 100%)",
      }}
    >
      {/* TOP RED LINE */}
      <div className="h-[4px] w-full bg-red-700" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="group flex shrink-0 items-center">
            <img
              src={logo}
              alt="Prime Times News"
              className="
                h-16
                w-auto
                object-contain
                drop-shadow-md
                transition-transform
                duration-200
                group-hover:scale-105
                sm:h-20
                md:h-24
              "
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                className="
                  group
                  relative
                  px-4
                  py-2
                  text-[15px]
                  font-semibold
                  tracking-wide
                  text-red-700
                  transition
                  hover:text-red-900
                "
              >
                {label}

                <span
                  className="
                    absolute
                    bottom-0
                    left-4
                    right-4
                    h-[2px]
                    origin-left
                    scale-x-0
                    bg-red-700
                    transition-transform
                    duration-200
                    group-hover:scale-x-100
                  "
                />
              </Link>
            ))}

            {/* DOWNLOAD BUTTON */}
            <Link
              to="/download-app"
              className="
                ml-2
                rounded-md
                bg-red-700
                px-5
                py-2.5
                text-sm
                font-semibold
                tracking-wide
                text-white
                shadow-md
                transition
                hover:bg-red-800
              "
            >
              Download App
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="
              rounded-md
              p-2
              transition
              hover:bg-white/30
              md:hidden
            "
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          md:hidden
          ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col gap-2 border-t border-slate-300 bg-[#cfd8e2] px-4 pb-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              onClick={() => setMenuOpen(false)}
              className="
                rounded-md
                px-3
                py-3
                font-semibold
                text-red-700
                transition
                hover:bg-white/30
              "
            >
              {label}
            </Link>
          ))}

          <Link
            to="/download-app"
            onClick={() => setMenuOpen(false)}
            className="
              mt-2
              rounded-md
              bg-red-700
              py-3
              text-center
              font-semibold
              tracking-wide
              text-white
              transition
              hover:bg-red-800
            "
          >
            Download App
          </Link>
        </div>
      </div>
    </nav>
  );
}
