// Set the price of one pair after the discount.
const unitPrice = 125;
// Start the selected quantity at one pair.
let quantity = 1;
// Start with zero pairs in the cart.
let cartQuantity = 0;
// This variable stores the timer for the status message.
let toastTimer;

// Find page elements so the code can change them later.
const quantityValue = document.getElementById("quantityValue");
const cartPopover = document.getElementById("cartPopover");
const cartContent = document.getElementById("cartContent");
const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const avatarButton = document.getElementById("avatarButton");
const toast = document.getElementById("toast");
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

// Change the selected quantity by adding a number to it.
function updateQuantity(change) {
  // Add the change amount to the selected quantity.
  quantity = quantity + change;

  if (quantity < 1) {
    quantity = 1;
  }
  quantityValue.textContent = quantity;
}

// Show the current cart contents on the page.
function renderCart() {
  // Put the cart quantity beside the cart icon.
  cartCount.textContent = cartQuantity;

  // If there are no items, show the empty cart message and stop here.
  if (cartQuantity === 0) {
    cartCount.hidden = true;
    cartContent.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  // Show the number badge because the cart has an item.
  cartCount.hidden = false;

  // Calculate the total price and keep two numbers after the decimal point.
  const totalPrice = (unitPrice * cartQuantity).toFixed(2);

  // Put the product details and buttons inside the cart.
  cartContent.innerHTML =
    '<div class="cart-item">' +
      '<img class="cart-item-image" src="images/image-product-1-thumbnail.jpg" alt="">' +
      '<div>' +
        '<p class="cart-item-name">Fall Limited Edition Sneakers</p>' +
        '<p class="cart-item-total">$' + unitPrice.toFixed(2) +
          ' x ' + cartQuantity + ' <strong>$' + totalPrice + '</strong></p>' +
      '</div>' +
      '<button class="remove-button" id="removeButton" type="button" aria-label="Remove item from cart">' +
        '<img src="images/icon-delete.svg" alt="">' +
      '</button>' +
      '<button class="checkout-button" id="checkoutButton" type="button">Checkout</button>' +
    '</div>';

  // Find the remove button and set what happens when it is clicked.
  document.getElementById("removeButton").onclick = function () {
    cartQuantity = 0;
    renderCart();
  };

  // Find the checkout button and set what happens when it is clicked.
  document.getElementById("checkoutButton").onclick = function () {
    showMessage("Checkout is ready for your order");
    closeCart();
  };
}

// Show the cart panel.
function openCart() {
  cartPopover.hidden = false;
  // Tell screen readers that the cart button is open.
  cartButton.setAttribute("aria-expanded", "true");
  // Keep the avatar button's state in sync with the cart button.
  avatarButton.setAttribute("aria-expanded", "true");
}

// Hide the cart panel.
function closeCart() {
  cartPopover.hidden = true;
  // Tell screen readers that the cart button is closed.
  cartButton.setAttribute("aria-expanded", "false");
  // Keep the avatar button's state in sync with the cart button.
  avatarButton.setAttribute("aria-expanded", "false");
}


// Show a short message on the screen.
function showMessage(messageText) {
  // Set the words shown in the message.
  toast.textContent = messageText;
  // Make the message visible.
  toast.hidden = false;
  
  // Cancel an earlier timer if another message was just shown.
  window.clearTimeout(toastTimer);
  
  // Hide the message after 2.2 seconds.
  toastTimer = window.setTimeout(function () {
    toast.hidden = true;
  }, 2200);
}

// Decrease the quantity by one when the minus button is clicked.
document.getElementById("decreaseButton").onclick = function () {
  updateQuantity(-1);
};

// Increase the quantity by one when the plus button is clicked.
document.getElementById("increaseButton").onclick = function () {
  updateQuantity(1);
};

// Get all the thumbnail buttons from the page.
const thumbnailButtons = document.querySelectorAll(".thumbnail-button");

// Visit each thumbnail button and give it a click action.
for (let i = 0; i < thumbnailButtons.length; i++) {
  thumbnailButtons[i].onclick = function () {
    // Find the large product photo.
    const heroImage = document.getElementById("heroImage");

    // Change the large photo to the file named on this thumbnail button.
    heroImage.src = this.getAttribute("data-image");
    // Change the photo description for screen readers.
    heroImage.alt = this.getAttribute("data-alt");

    // Remove the photo class so its animation can start again.
    heroImage.classList.remove("hero-image");
    // Read the image width to make the browser restart the animation.
    heroImage.offsetWidth;
    // Add the class back to start the animation.
    heroImage.classList.add("hero-image");
    
    // First mark every thumbnail as not selected.
    for (let j = 0; j < thumbnailButtons.length; j++) {
      thumbnailButtons[j].setAttribute("aria-pressed", "false");
    }
    
    // Mark this clicked thumbnail as selected.
    this.setAttribute("aria-pressed", "true");
  };
}

// Open or close the cart when its icon is clicked.
cartButton.onclick = toggleCart;
// Open or close the cart when the avatar image is clicked.
avatarButton.onclick = toggleCart;

// Open a closed cart or close an open cart.
function toggleCart() {
  // Check whether the cart is hidden.
  if (cartPopover.hidden === true) {
    openCart();
  } else {
    // Hide the cart if it is already visible.
    closeCart();
  }
}
// Add the selected quantity to the cart when Add to cart is clicked.
document.getElementById("addButton").onclick = function () {
  // Add the selected quantity to the current cart quantity.
  cartQuantity = cartQuantity + quantity;
  // Update the cart panel and the cart number badge.
  renderCart();
  // Confirm that the item was added.
  showMessage("Added to cart");
};

// Open or close the mobile navigation when its button is clicked.
menuButton.onclick = function () {
  // Check if the menu is currently open.
    const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";

  // If the menu is open, close it and change the button label.
  if (menuIsOpen === true) {
    mainNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  } else {
    // If the menu is closed, open it and change the button label.
    mainNav.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation");
  }
};

// Get all the navigation links so the mobile menu can close after a click.
const navigationLinks = mainNav.querySelectorAll("a");

// Give each navigation link a click action.
for (let linkNumber = 0; linkNumber < navigationLinks.length; linkNumber++) {
  // Close the menu when the current link is clicked.
  navigationLinks[linkNumber].onclick = function () {
    // Hide the mobile menu.
    mainNav.classList.remove("is-open");
    // Tell screen readers that the menu is closed.
    menuButton.setAttribute("aria-expanded", "false");
    // Change the button label to say it can open the menu.
    menuButton.setAttribute("aria-label", "Open navigation");
  };
}

// Close the cart when the customer clicks outside it.
document.addEventListener("click", function (event) {
  // Check that the cart is open and the click was outside the cart buttons.
  if (cartPopover.hidden === false &&
      cartPopover.contains(event.target) === false &&
      cartButton.contains(event.target) === false &&
      avatarButton.contains(event.target) === false) {
    // Hide the cart panel.
    closeCart();
  }
});

// Close the cart and mobile menu when the Escape key is pressed.
document.addEventListener("keydown", function (event) {
  // Check that the pressed key was Escape.
  if (event.key === "Escape") {
    // Hide the cart panel.
    closeCart();
    // Hide the mobile navigation menu.
    mainNav.classList.remove("is-open");
    // Tell screen readers that the menu is closed.
    menuButton.setAttribute("aria-expanded", "false");
    // Change the button label to say it can open the menu.
    menuButton.setAttribute("aria-label", "Open navigation");
  }
});
