import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className="flex justify-center m-12">
      <footer>
        <ul className='flex text-2xl space-x-1'>
          <a className='hover:text-3xl' href="https://github.com/coleyrockin" target="blank">

            <FaGithub />

          </a>
          <a className='hover:text-3xl' href="https://www.linkedin.com/in/boydcroberts" target="blank">

            <FaLinkedin />

          </a>
          <a className='hover:text-3xl' href="https://www.instagram.com/coleyrockin/" target="blank">

            <FaInstagram />

          </a>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;