import React from "react";


function Navigation({ sections, currentSection, setCurrentSection }) {
  return (

    <nav>
      <h3 className="ml9">
        <span className="m-4 	">
          <span className="letters">B O Y D</span>
        </span>
      </h3>

      <nav className="text-xl font-bold flex align-center justify-evenly">
        {
          sections.map(({ name, comp }) => (
            <div
              className={`p-1 ${name === currentSection.name && "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400"}`}
              key={name}
              onClick={() => setCurrentSection({ name, comp })}
            >
              {name}
            </div>
          ))
        }

      </nav >
    </nav>

  );
}

export default Navigation;