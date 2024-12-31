import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-700 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center h-16 w-full">
        {/* Logo */}
        <div className="text-2xl font-bold">MiApp</div>

        {/* Menú */}
        <div className="hidden md:flex space-x-4">
          <a href="#inicio" className="text-white">
            Inicio
          </a>
          <a href="#contacto" className="text-white">
            Contacto
          </a>
        </div>

        {/* Botón para móviles */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 w-full">
          <a
            href="#inicio"
            className="block px-4 py-2 hover:bg-blue-700"
            onClick={toggleMenu}
          >
            Inicio
          </a>
          <a
            href="#nosotros"
            className="block px-4 py-2 hover:bg-blue-700"
            onClick={toggleMenu}
          >
            Nosotros
          </a>
          <a
            href="#servicios"
            className="block px-4 py-2 hover:bg-blue-700"
            onClick={toggleMenu}
          >
            Servicios
          </a>
          <a
            href="#contacto"
            className="block px-4 py-2 hover:bg-blue-700"
            onClick={toggleMenu}
          >
            Contacto
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
