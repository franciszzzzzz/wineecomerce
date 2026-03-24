"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./header.css";
import { IoIosSearch, IoMdArrowDropdown, IoMdMenu } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Header() {
  const [toggle, setToggle] = useState(false); // mobile menu
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false); // desktop dropdown
  const [mobileDropdown, setMobileDropdown] = useState(false); // mobile dropdown
  const [mounted, setMounted] = useState(false); // hydration guard

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // close menus when route changes
  useEffect(() => {
    setToggle(false);
    setMobileDropdown(false);
    setOpen(false);
  }, [pathname]);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      e.preventDefault();
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <header className="header-holder">
        <div className="header-wrapper">
          {/* Logo */}
          <div className="logo-container">
            <Link href="/">
              <img src="/logo.png" alt="Logo" className="header-logo" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="link-holders">
            <Link href="/" className="Link-nav">
              Home
            </Link>
            <Link href="/about" className="Link-nav">
              About Us
            </Link>

            {/* Categories Dropdown */}
            <div
              className={`dropdown ${open ? "open" : ""}`}
              onMouseLeave={() => setOpen(false)}
            >
              <button
                className="dropdown-toggle"
                onClick={() => setOpen((prev) => !prev)}
              >
                Categories{" "}
                <IoMdArrowDropdown className={open ? "rotate" : ""} size={22} />
              </button>

              <ul className="dropdown-menu">
                <li>
                  <Link href="/categories/68ce83d56457d49882ce1efe">
                    Whiskey
                  </Link>
                </li>
                <li>
                  <Link href="/categories/68ce840b6457d49882ce1f00">Wine</Link>
                </li>
                <li>
                  <Link href="/">Champagne</Link>
                </li>
                <li>
                  <Link href="/categories/68ce84036457d49882ce1eff">
                    Spirit
                  </Link>
                </li>
                <li>
                  <Link href="/categories/68ce84136457d49882ce1f01">Vodka</Link>
                </li>
                <li>
                  <Link href="/">Brandy</Link>
                </li>
                <li>
                  <Link href="/categories/68ce84266457d49882ce1f04">Gin</Link>
                </li>
                <li>
                  <Link href="/categories/68ce84496457d49882ce1f06">Cream</Link>
                </li>
                <li>
                  <Link href="/">Tequila</Link>
                </li>
                <li>
                  <Link href="/">Cognac</Link>
                </li>
                <li>
                  <Link href="/categories/68ce841d6457d49882ce1f02">Rum</Link>
                </li>
              </ul>
            </div>

            <Link href="/contact" className="Link-nav">
              Contact Us
            </Link>
          </nav>

          {/* Search Box */}
          <div className="search-container">
            <IoIosSearch
              style={{
                opacity: "0.5",
                fontSize: "25px",
                marginRight: "-5px",
                zIndex: "100",
              }}
            />
            <input
              className="input-capture"
              placeholder="Search for drinks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Mobile menu toggle */}
          <div className="mobile-header-cart-menu-hold">
            <div className="mobile-header-cart">
              <Link
                href="/cart"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <MdOutlineShoppingCart className="cart-icons" />
                <span className="cart-count">{totalItems}</span>
              </Link>
            </div>

            <div className="mobile-menue" onClick={handleToggle}>
              {!toggle && <IoMdMenu size={40} />}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      <div className={`side-menu ${toggle ? "open" : ""}`}>
        <div className="mobile-show" onClick={handleToggle}>
          <LiaTimesSolid size={35} color="white" />
        </div>

        <div className="top-item-holder" onClick={handleToggle}>
          <Link href="/cart" className="cart-mobile-icon">
            <div className="mobile-header-cart">
              <MdOutlineShoppingCart
                color="white"
                size={28}
                className="cart-icons"
              />
              <span
                className="cart-count"
                style={{ border: "1px solid whitesmoke" }}
              >
                {totalItems}
              </span>
            </div>
          </Link>
        </div>

        <nav className="mobile-link-holder">
          <div className="search-contained">
            <IoIosSearch
              style={{ opacity: "0.6", fontSize: "25px", marginLeft: "10px" }}
            />
            <input
              className="input-capture"
              placeholder="Search for drinks, brand"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
            />
          </div>

          <Link href="/" onClick={handleToggle} className="mobile-link-nav">
            Home
          </Link>
          <Link
            href="/about"
            onClick={handleToggle}
            className="mobile-link-nav"
          >
            About
          </Link>

          {/* Mobile Dropdown */}
          <div className="mobile-dropdown">
            <button
              className="mobile-dropdown-toggle"
              onClick={() => setMobileDropdown((prev) => !prev)}
            >
              Categories{" "}
              <IoMdArrowDropdown
                className={mobileDropdown ? "rotate" : ""}
                size={22}
              />
            </button>
            {mobileDropdown && (
              <>
                <Link
                  href="/categories/68ce83d56457d49882ce1efe"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Whiskey
                </Link>
                <Link
                  href="/categories/68ce840b6457d49882ce1f00"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Wine
                </Link>
                <Link
                  href="/"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Champagne
                </Link>
                <Link
                  href="/categories/68ce84036457d49882ce1eff"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Spirit
                </Link>
                <Link
                  href="/categories/68ce84136457d49882ce1f01"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Vodka
                </Link>
                <Link
                  href="/"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Brandy
                </Link>
                <Link
                  href="/categories/68ce84266457d49882ce1f04"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Gin
                </Link>
                <Link
                  href="/categories/68ce84496457d49882ce1f06"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Cream
                </Link>
                <Link
                  href="/"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Tequila
                </Link>
                <Link
                  href="/"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Cognac
                </Link>
                <Link
                  href="/categories/68ce841d6457d49882ce1f02"
                  onClick={handleToggle}
                  className="mobile-link-nav"
                >
                  Rum
                </Link>
              </>
            )}
          </div>

          <Link
            href="/contact"
            onClick={handleToggle}
            className="mobile-link-nav"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
}
