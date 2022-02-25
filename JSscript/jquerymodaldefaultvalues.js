$.modal.defaults = {
    closeExisting: true,    // Close existing modals. Set this to false if you need to stack multiple modal instances.
    escapeClose: true,      // Allows the user to close the modal by pressing `ESC`
    clickClose: true,       // Allows the user to close the modal by clicking the overlay
    showClose: false,        // Shows a (X) icon/link in the top-right corner
    showSpinner: true,      // Enable/disable the default spinner during AJAX requests.
    fadeDelay: 1.0          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
  };