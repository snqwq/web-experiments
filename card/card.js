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
  });

  cardHolder.addEventListener("mouseleave", () => {
    cardHolder.removeEventListener("mousemove", (e) =>
      handleMouseMove(e, cardHolder, card)
    );
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
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

  element.style.transform = `rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;
}
