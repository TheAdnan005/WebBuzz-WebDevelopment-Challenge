// index.html
  const modalTrigger = document.getElementById('modal-trigger');
  modalTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('modal-content.html')
      .then(response => response.text())
      .then((html) => {
        // Create a new div element to hold the modal content
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = html;
        // Add the modal container to the page
        document.body.appendChild(modalContainer);
        // Add a CSS class to blur the background
        document.body.classList.add('blurred');
      });
  });
