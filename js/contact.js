
// ===================================================
// BLUSH SCHOLAR - CONTACT FORM VALIDATION
// COS 106 TERM PROJECT
//
// Project Requirements:
// 1. No field can be empty.
// 2. Email must be in a valid format.
// 3. Phone number must contain only digits.
// ===================================================


// ---------- GET FORM ELEMENTS ----------

const form = document.getElementById('contactForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

const successMsg = document.getElementById('formSuccess');


// ---------- CHECK REQUIRED ELEMENTS ----------

if (
    !form ||
    !nameInput ||
    !emailInput ||
    !phoneInput ||
    !messageInput ||
    !successMsg
) {
    console.error(
        'Contact form error: One or more required HTML elements are missing.'
    );

} else {

    // ---------- SHOW ERROR MESSAGE ----------

    function showError(inputId, message) {

        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');

        if (input && errorElement) {
            errorElement.textContent = message;
            input.classList.add('input-error');
            input.setAttribute('aria-invalid', 'true');
        }
    }


    // ---------- CLEAR ERROR MESSAGE ----------

    function clearError(inputId) {

        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');

        if (input && errorElement) {
            errorElement.textContent = '';
            input.classList.remove('input-error');
            input.removeAttribute('aria-invalid');
        }
    }


    // ---------- EMAIL VALIDATION ----------

    function isValidEmail(email) {

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(email);
    }


    // ---------- PHONE NUMBER VALIDATION ----------

    function isDigitsOnly(value) {

        return /^\d+$/.test(value);
    }


    // ---------- FORM SUBMISSION ----------

    form.addEventListener('submit', function(e) {

        // Prevent the page from reloading
        e.preventDefault();

        let isValid = true;

        // Clear previous error messages
        ['name', 'email', 'phone', 'message'].forEach(clearError);

        successMsg.textContent = '';


        // ---------- VALIDATE NAME ----------

        if (nameInput.value.trim() === '') {

            showError('name', 'Name is required');

            isValid = false;
        }


        // ---------- VALIDATE EMAIL ----------

        const email = emailInput.value.trim();

        if (email === '') {

            showError('email', 'Email is required');

            isValid = false;

        } else if (!isValidEmail(email)) {

            showError('email', 'Please enter a valid email address');

            isValid = false;
        }


        // ---------- VALIDATE PHONE NUMBER ----------

        const phone = phoneInput.value.trim();

        if (phone === '') {

            showError('phone', 'Phone number is required');

            isValid = false;

        } else if (!isDigitsOnly(phone)) {

            showError('phone', 'Phone number must contain only digits');

            isValid = false;
        }


        // ---------- VALIDATE MESSAGE ----------

        if (messageInput.value.trim() === '') {

            showError('message', 'Message is required');

            isValid = false;
        }


        // ---------- SUCCESSFUL VALIDATION ----------

        if (isValid) {

            successMsg.textContent =
                'Thank you! Your message has been validated successfully.';

            // Clear the form after successful validation
            form.reset();

            // Remove any remaining validation styling
            ['name', 'email', 'phone', 'message'].forEach(clearError);
        }

    });


    // ---------- CLEAR ERRORS WHILE TYPING ----------

    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {

        input.addEventListener('input', function() {

            clearError(input.id);
            successMsg.textContent = '';

        });

    });

}
