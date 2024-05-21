import React from "react";
import { useMediaQuery } from "react-responsive";
import {color} from "../components/color"

export default function NavBar() {
  const isMobile = useMediaQuery({
    query: "(max-width: 770px)",
  });
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <div
        style={{
          width: "87%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? 30 : 50,
            color: "white",
            fontWeight: "bold",
            alignSelf: "center",
            marginRight: isMobile ? -70 : -150,
          }}
        >
          <a
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontFamily: "serif",
            }}
          >
            Otolith Enrichment
          </a>
        </h1>
      </div>
      <div
        style={{
          width: "13%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a
          href="/eco2/qr_scanner"
          style={{ textDecoration: "none", fontSize: isMobile ? 10 : 16, color: color.white }}
        >
          Scan In/Out
        </a>
      </div>

      {/* <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div> */}
    </nav>
  );
}
