import { useEffect } from 'react';

const useFlyingAnimation = () => {
  const animateFlyToCart = (button: HTMLButtonElement) => {
    const buttonRect = button.getBoundingClientRect();

    // Clone the button to create the flying effect
    const flyingItem = button.cloneNode(true) as HTMLButtonElement;
    flyingItem.style.position = "fixed";
    flyingItem.style.left = `${buttonRect.left}px`;
    flyingItem.style.top = `${buttonRect.top}px`;
    flyingItem.style.width = `${buttonRect.width}px`;
    flyingItem.style.height = `${buttonRect.height}px`;
    flyingItem.style.zIndex = "1000";
    flyingItem.style.transition = "all 1.5s cubic-bezier(0.5, 0, 0, 0)";

    document.body.appendChild(flyingItem);
    
    // Start the animation using requestAnimationFrame
    requestAnimationFrame(() => {
      // Set the target position at the top right of the screen
      const targetLeft = window.innerWidth - buttonRect.width; // Right side
      const targetTop = 0; 

      flyingItem.style.left = `calc(${targetLeft}px - 250px)`;
      flyingItem.style.top = `${targetTop}px`; 
      flyingItem.style.transform = "scale(0.3)";
      flyingItem.style.opacity = "0"; 
    });

    // Remove the cloned button after animation is complete
    setTimeout(() => flyingItem.remove(), 1500);
  };

  return { animateFlyToCart };
};

export default useFlyingAnimation;
