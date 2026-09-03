export default function FloatingDecorations() {
  const floatingItems = [
    { emoji: '🍽️', delay: '0s', duration: '6s', left: '10%', top: '20%' },
    { emoji: '🥘', delay: '1s', duration: '7s', left: '80%', top: '30%' },
    { emoji: '🍳', delay: '2s', duration: '8s', left: '15%', top: '70%' },
    { emoji: '🧂', delay: '0.5s', duration: '9s', left: '85%', top: '60%' },
    { emoji: '🌿', delay: '1.5s', duration: '6.5s', left: '50%', top: '10%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      {floatingItems.map((item, idx) => (
        <div
          key={idx}
          className="absolute text-3xl animate-float"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
            animationDuration: item.duration,
            opacity: 0.3,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
