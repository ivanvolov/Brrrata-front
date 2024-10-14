import { useEffect, useState } from 'react';

export default function CheeseClickEffect({ children }) {
  const [cheeses, setCheeses] = useState([]);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.closest('.disable-cheese-click')) {
        // Prevent cheese effect on specific elements with this class
        return;
      }

      const { clientX, clientY } = event;

      // Create multiple cheese objects for funny explosion effect
      const newCheeses = Array.from({ length: 20 }).map(() => ({
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        rotation: Math.random() * 1080 - 540, // Extreme random rotation for hilarity
        scale: Math.random() * 0.8 + 0.3, // Random scaling to make sizes funnier
        directionX: Math.random() * 400 - 200,
        directionY: Math.random() * 400 - 200,
      }));

      // Add new cheeses to the state
      setCheeses((prevCheeses) => [...prevCheeses, ...newCheeses]);

      // Remove the cheeses after 3 seconds
      setTimeout(() => {
        setCheeses((prevCheeses) =>
          prevCheeses.filter((cheese) => !newCheeses.includes(cheese))
        );
      }, 3000);
    };

    // Add click event listener to the entire container instead of document
    const clickArea = document.getElementById('cheese-click-area');
    if (clickArea) {
      clickArea.addEventListener('click', handleClick);
    }

    // Clean up the event listener
    return () => {
      if (clickArea) {
        clickArea.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <div id="cheese-click-area" className="relative w-full h-full">
      {children}
      {cheeses.map((cheese) => (
        <img
          key={cheese.id}
          src="/src/component/files/burrata.jpg"
          alt="Cheese"
          className="absolute w-16 h-16 pointer-events-none"
          style={{
            left: `${cheese.x}px`,
            top: `${cheese.y}px`,
            transform: `rotate(${cheese.rotation}deg) scale(${cheese.scale})`,
            transition: 'transform 1s ease-out, opacity 1s ease-out',
            opacity: 1,
          }}
          onLoad={(e) => {
            const img = e.target;
            setTimeout(() => {
              img.style.transform += ` translate(${cheese.directionX}px, ${cheese.directionY}px)`;
              img.style.opacity = '0';
            }, 10);
          }}
        />
      ))}
    </div>
  );
}
