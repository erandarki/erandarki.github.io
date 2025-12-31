function animateCountUp() {
  const counters = document.querySelectorAll('.count-up');
  const speed = 50; // Animation speed in milliseconds

  const animateCounter = (entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const value = +target.innerHTML; // Value to count up to
      let currentCount = 0;

      const updateCount = () => {
        const increment = value / speed; // Calculate increment based on speed
        if (currentCount < value) {
          currentCount += increment;
          target.textContent = Math.ceil(currentCount); // Round up for display
          requestAnimationFrame(updateCount); // Continue animation
        } else {
          target.textContent = value; // Ensure final value is accurate
        }
      };
      updateCount();
      observer.unobserve(target); // Stop observing after animation
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(animateCounter);
  }, {
    threshold: 1 // Trigger when 100% of the element is visible
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
}