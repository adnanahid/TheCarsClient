import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/logoTesla.png";

const Footer = () => {
  return (
    <div className="bg-neutral">
      <footer className="footer text-neutral-content p-10 flex justify-around items-center">
        <aside>
          <img src={logo} alt="" className="w-12" />
          <p className="text-lg font-bold">
            The Cars Ltd.
            <br />
            Providing reliable cars since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.facebook.com/" target="_blank">
              <FaFacebookF className="w-6 h-6"></FaFacebookF>
            </a>
            <a href="https://www.facebook.com/" target="_blank">
              <FaLinkedinIn className="w-6 h-6"></FaLinkedinIn>
            </a>
            <a href="https://www.facebook.com/" target="_blank">
              <FaInstagram className="w-6 h-6"></FaInstagram>
            </a>
            <a href="https://www.facebook.com/" target="_blank">
              <FaTwitter className="w-6 h-6"></FaTwitter>
            </a>
          </div>
        </nav>
      </footer>
      <p className="text-center text-white pb-12">
        Copyright © 2024 - All right reserved by The Cars Ltd
      </p>
    </div>
  );
};

export default Footer;
