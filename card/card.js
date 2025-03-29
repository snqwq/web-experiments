const cardHolders = document.querySelectorAll(".card-holder");

// Angle limits
const angleLimitX = 5;
const angleLimitY = 5;

// Loop through each card-holder and add event listeners
cardHolders.forEach((cardHolder) => {
  const card = cardHolder.querySelector(".card");

  cardHolder.addEventListener("mouseenter", () => {
    cardHolder.addEventListener("mousemove", (e) =>
      handleMouseMove(e, cardHolder, card)
    );
    card.style.boxShadow = "0 0 20px 5px rgba(255, 255, 255, 0.5)";
    const cardContent = card.querySelector(".card-content");
    cardContent.style.transform = "translate(-50%, -50%) translateZ(100px)"; // Pop out
  });

  cardHolder.addEventListener("mouseleave", () => {
    cardHolder.removeEventListener("mousemove", (e) =>
      handleMouseMove(e, cardHolder, card)
    );
    card.style.boxShadow = "0 0";
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
    const cardContent = card.querySelector(".card-content");
    cardContent.style.transform = "translate(-50%, -50%) translateZ(50px)"; // Reset
  });
});

function handleMouseMove(event, container, element) {
  rotateElement(event, container, element);
}

function rotateElement(event, container, element) {
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const middleX = rect.width / 2;
  const middleY = rect.height / 2;

  const offsetX = ((x - middleX) / middleX) * angleLimitX;
  const offsetY = ((y - middleY) / middleY) * angleLimitY;

  // Rotate the card
  element.style.transform = `rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;

  // Add parallax effect to .card-content
  const cardContent = element.querySelector(".card-content");
  const parallaxDepth = 5; // Adjust this value for stronger parallax
  const parallaxX = ((x - middleX) / middleX) * parallaxDepth;
  const parallaxY = ((y - middleY) / middleY) * parallaxDepth;

  cardContent.style.transform = `translate(-50%, -50%) translateZ(100px) translateX(${parallaxX}px) translateY(${parallaxY}px)`;
}
