import React from 'react';
import PropTypes from 'prop-types';

/**
 * Ripple Component
 *
 * @param {number} mainCircleSize - Size of the main circle.
 * @param {number} mainCircleOpacity - Opacity of the main circle.
 * @param {number} numCircles - Number of circles in the ripple effect.
 * @param {string} className - Additional classes for styling.
 */
const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className = '',
}) {
  return (
    <div
      className={`pointer-events-none select-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)] ${className}`}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 245;
        const opacity = mainCircleOpacity - i * 0.001;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';
        const borderOpacity = 5 + i * 500;

        // Alternate light red and white for borders and background
        const isEven = i % 2 === 0;
        const borderColor = isEven
          ? `rgba(255, 99, 71, ${borderOpacity/100})` // Light red
          : `rgba(255, 255, 255, ${borderOpacity/100 })`; // White
        const backgroundColor = isEven ? 'rgba(177, 0, 61, 0.05)' : 'rgba(255, 0, 0, 0.84)';

        return (
          <div
            key={i}
            className="absolute animate-ripple rounded-full shadow-xl"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              animationDelay: animationDelay,
              borderStyle: borderStyle,
              borderWidth: '1px',
              borderColor: borderColor,
              backgroundColor: backgroundColor,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(1)',
            }}
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = 'Ripple';

// PropTypes for validation (optional)
Ripple.propTypes = {
  mainCircleSize: PropTypes.number,
  mainCircleOpacity: PropTypes.number,
  numCircles: PropTypes.number,
  className: PropTypes.string,
};

export default Ripple;
