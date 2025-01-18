import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container text-center">
        <p className="mb-1">
          © {new Date().getFullYear()} YouTube Trending Prediction Tool. All
          Rights Reserved.
        </p>
        <p className="mb-0">
          Built with ❤️ by{" "}
          <a
            href="https://www.mohamedgad.com"
            className="text-info"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mohamed Gad
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
