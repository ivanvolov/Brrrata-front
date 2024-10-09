export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-center text-white">
      <nav className="mt-4">
      <ul className="flex justify-center space-x-6">
        <li>
          <a href="#about" className="text-white hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="#roadmap" className="text-white hover:underline">
            Roadmap
          </a>
        </li>
        <li>
          <a href="#team" className="text-white hover:underline">
            Team
          </a>
        </li>
        <li>
          <a href="#contact" className="text-white hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </nav>
    <p>&copy; 2023 MemCoin. All rights reserved.</p>
  </footer>
  );
}