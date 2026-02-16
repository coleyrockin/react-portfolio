import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <div className="flex justify-center m-12">
      <footer>
        <ul className='flex text-2xl space-x-1'>
          <a className='hover:text-3xl' href="https://github.com/coleyrockin" target="_blank" rel="noreferrer">

            <FaGithub />

          </a>
          <a className='hover:text-3xl' href="https://www.linkedin.com/in/boydcroberts" target="_blank" rel="noreferrer">

            <FaLinkedin />

          </a>
          <a className='hover:text-3xl' href="mailto:boydcroberts@gmail.com" target="_blank" rel="noreferrer">

            <FaEnvelope />

          </a>

        </ul>
      </footer>
    </div>
  );
};

export default Footer;