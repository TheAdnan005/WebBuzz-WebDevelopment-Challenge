const nextButton = document.querySelector('.btn-next');
const prevButton = document.querySelector('.btn-prev');
const steps = document.querySelectorAll('.step');
const form_steps = document.querySelectorAll('.form-step');
const submitBtn = document.querySelector('.btn-submit');
const loginPrompt = document.querySelector('.login-prompt'); // Select the login prompt
let active = 1;

nextButton.addEventListener('click', async () => {
    if (validateCurrentStep()) {
        active++;
        if (active > steps.length) {
            await submitForm();
            return;
        }
        updateProgress();
    }
});

prevButton.addEventListener('click', () => {
    active--;
    if (active < 1) {
        active = 1;
    }

    updateProgress();
});

submitBtn.addEventListener('click', async () => {
    if (validateCurrentStep()) {
        await submitForm();
    }
});

const updateProgress = () => {
    steps.forEach((step, i) => {
        if (i === (active - 1)) {
            step.classList.add('active');
            form_steps[i].classList.add('active');
        } else {
            step.classList.remove('active');
            form_steps[i].classList.remove('active');
        }
    });

    prevButton.disabled = active === 1;
    nextButton.disabled = active === steps.length;

    // Hide or show the login prompt based on the current step
    if (active > 1) {
        loginPrompt.style.display = 'none'; // Hide login prompt
    } else {
        loginPrompt.style.display = 'block'; // Show login prompt
    }
};

// Validate current form step
const validateCurrentStep = () => {
    const inputs = form_steps[active - 1].querySelectorAll('input, select');
    for (let input of inputs) {
        if (!validateInput(input)) {
            input.focus();
            return false;
        }
    }
    return true;
};

// Validate individual input fields
const validateInput = (input) => {
    const value = input.value.trim();
    const name = input.name || input.placeholder;

    if (input.type === 'text' || input.type === 'email' || input.type === 'tel' || input.type === 'password') {
        if (!value) {
            alert(`${name} is required.`);
            return false;
        }
    }

    if (input.type === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (input.type === 'tel' && !/^\+?\d{7,15}$/.test(value)) {
        alert('Please enter a valid phone number (7-15 digits).');
        return false;
    }

    if (name === 'Postal/Zip code' && (isNaN(value) || value.length < 4 || value.length > 10)) {
        alert('Please enter a valid postal/zip code (4-10 digits).');
        return false;
    }

    if (input.name === 'day' && (isNaN(value) || value < 1 || value > 31)) {
        alert('Please enter a valid day (1-31).');
        return false;
    }

    if (input.name === 'month' && (isNaN(value) || value < 1 || value > 12)) {
        alert('Please enter a valid month (1-12).');
        return false;
    }

    if (input.name === 'year' && (isNaN(value) || value < 1900 || value > 2050)) {
        alert('Please enter a valid year (1900-2050).');
        return false;
    }

    if (name === 'Password') {
        const confirmPassword = document.querySelector('input[placeholder="Confirm Password"]')?.value;
        if (value.length < 6) {
            alert('Password must be at least 6 characters long.');
            return false;
        }
        if (confirmPassword && confirmPassword !== value) {
            alert('Passwords do not match.');
            return false;
        }
    }

    if (name === 'Confirm Password' && value !== document.querySelector('input[placeholder="Password"]')?.value) {
        alert('Passwords do not match.');
        return false;
    }

    return true;
};

const submitForm = async () => {
    // Gather user data from form inputs
    const userData = {
        firstName: document.querySelector('input[placeholder="e.g. Adnan"]')?.value || "",
        lastName: document.querySelector('input[placeholder="e.g. Abrar"]')?.value || "",
        dateOfBirth: `${document.querySelector('input[name="day"]')?.value || ""}/${document.querySelector('input[name="month"]')?.value || ""}/${document.querySelector('input[name="year"]')?.value || ""}`,
        phone: document.querySelector('input[placeholder="+91xxXXXX"]')?.value || "",
        address: document.querySelector('input[placeholder="Street Address"]')?.value || "",
        city: document.querySelector('input[placeholder="City"]')?.value || "",
        state: document.querySelector('input[placeholder="State/Province"]')?.value || "",
        zipCode: document.querySelector('input[placeholder="Postal/Zip code"]')?.value || "",
        country: document.querySelector('select[name="country"]')?.value || "",
        email: document.querySelector('input[placeholder="Your email address"]')?.value || "",
        username: document.querySelector('input[placeholder="Username"]')?.value || "",
        password: document.querySelector('input[placeholder="Password"]')?.value || "",
        // Remove confirmPassword from the object as it's not needed for the backend
        newsletter: document.querySelector('input[type="checkbox"]')?.checked || false,
    };

    try {
        // Update the fetch URL to point to the correct server port
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            alert('Registration successful!');
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
};

// Initialize button states on page load
updateProgress();
