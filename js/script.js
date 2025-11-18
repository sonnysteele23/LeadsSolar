// ===================================
// Form State Management
// ===================================

let currentStep = 1;
const totalSteps = 6;
const formData = {};

// ===================================
// Initialize
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupEventListeners();
});

// ===================================
// Event Listeners
// ===================================

function setupEventListeners() {
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }

    // ZIP code validation
    const zipInput = document.getElementById('zipCode');
    if (zipInput) {
        zipInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/\D/g, '').substring(0, 5);
        });
    }

    // Prevent form submission on Enter key (except on last step)
    document.getElementById('solarForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && currentStep < totalSteps) {
            e.preventDefault();
            changeStep(1);
        }
    });
}

// ===================================
// Step Navigation
// ===================================

function changeStep(direction) {
    // Validate current step before proceeding
    if (direction === 1 && !validateCurrentStep()) {
        return;
    }

    // Hide current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    currentStepElement.classList.remove('active');

    // Update step number
    currentStep += direction;

    // Show new step
    const newStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    newStepElement.classList.add('active');

    // Update UI
    updateProgress();
    updateButtons();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If last step, change button text
    if (currentStep === totalSteps) {
        document.getElementById('nextBtn').innerHTML = `
            Get My Free Quote
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        document.getElementById('nextBtn').onclick = submitForm;
    } else {
        document.getElementById('nextBtn').innerHTML = `
            Continue
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        document.getElementById('nextBtn').onclick = function() { changeStep(1); };
    }
}

function updateProgress() {
    // Update progress bar
    const progressPercentage = (currentStep / totalSteps) * 100;
    document.getElementById('progressFill').style.width = progressPercentage + '%';

    // Update step counter
    document.getElementById('currentStep').textContent = currentStep;
    document.getElementById('totalSteps').textContent = totalSteps;
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Show/hide back button
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
    }
}

// ===================================
// Validation
// ===================================

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);

    // Get all required inputs in current step
    const requiredInputs = currentStepElement.querySelectorAll('input[required]');

    for (let input of requiredInputs) {
        if (!input.value || !input.checkValidity()) {
            // Show error
            input.focus();
            input.style.borderColor = '#ef4444';

            // Create error message if it doesn't exist
            let errorMsg = input.parentElement.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#ef4444';
                errorMsg.style.fontSize = '13px';
                errorMsg.style.marginTop = '8px';
                input.parentElement.appendChild(errorMsg);
            }

            if (!input.value) {
                errorMsg.textContent = 'This field is required';
            } else if (input.type === 'email') {
                errorMsg.textContent = 'Please enter a valid email address';
            } else if (input.type === 'tel') {
                errorMsg.textContent = 'Please enter a valid phone number';
            } else if (input.id === 'zipCode') {
                errorMsg.textContent = 'Please enter a valid 5-digit ZIP code';
            }

            // Reset border color on input
            input.addEventListener('input', function() {
                this.style.borderColor = '';
                const error = this.parentElement.querySelector('.error-message');
                if (error) error.remove();
            }, { once: true });

            return false;
        }
    }

    // Save data from current step
    saveStepData();

    return true;
}

function saveStepData() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = currentStepElement.querySelectorAll('input');

    inputs.forEach(input => {
        if (input.value) {
            formData[input.name] = input.value;
        }
    });

    console.log('Form data saved:', formData);
}

// ===================================
// Option Selection
// ===================================

function selectOption(element, fieldName) {
    // Remove selected class from all options in this group
    const siblings = element.parentElement.querySelectorAll('.option-card');
    siblings.forEach(sibling => sibling.classList.remove('selected'));

    // Add selected class to clicked option
    element.classList.add('selected');

    // Set the hidden input value
    const hiddenInput = document.getElementById(fieldName);
    hiddenInput.value = element.getAttribute('data-value');

    // Auto-advance after a short delay
    setTimeout(() => {
        changeStep(1);
    }, 300);
}

// ===================================
// Input Formatting
// ===================================

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 0) {
        if (value.length <= 3) {
            value = '(' + value;
        } else if (value.length <= 6) {
            value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
        } else {
            value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 10);
        }
    }

    e.target.value = value;
}

// ===================================
// Form Submission
// ===================================

function submitForm(e) {
    if (e) e.preventDefault();

    // Validate final step
    if (!validateCurrentStep()) {
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('nextBtn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="60" stroke-dashoffset="40"/>
        </svg>
        Processing...
    `;

    // Add spinning animation
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);

    // Simulate API call
    setTimeout(() => {
        // In production, send formData to your backend
        console.log('Submitting form data:', formData);

        // Here you would typically:
        // fetch('/api/submit-lead', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showSuccessModal();
        // });

        // For demo, just show success modal
        showSuccessModal();

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }, 2000);
}

// ===================================
// Success Modal
// ===================================

function showSuccessModal() {
    const modal = document.getElementById('successModal');

    // Populate confirmation details
    document.getElementById('confirmEmail').textContent = formData.email || 'Not provided';
    document.getElementById('confirmPhone').textContent = formData.phone || 'Not provided';

    // Show modal
    modal.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Optional: Send confirmation email or track conversion
    trackConversion();
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Reset form
    resetForm();
}

function resetForm() {
    // Reset to first step
    currentStep = 1;
    const steps = document.querySelectorAll('.form-step');
    steps.forEach((step, index) => {
        if (index === 0) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Clear form data
    Object.keys(formData).forEach(key => delete formData[key]);

    // Reset form inputs
    document.getElementById('solarForm').reset();

    // Remove all selected classes
    document.querySelectorAll('.option-card.selected').forEach(card => {
        card.classList.remove('selected');
    });

    // Update UI
    updateProgress();
    updateButtons();

    // Reset button text
    document.getElementById('nextBtn').innerHTML = `
        Continue
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    document.getElementById('nextBtn').onclick = function() { changeStep(1); };
}

// ===================================
// Analytics & Tracking
// ===================================

function trackConversion() {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-XXXXXXXXX/XXXXXXXXX',
            'value': 1.0,
            'currency': 'USD'
        });
    }

    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Solar Lead Form',
            value: formData.electricBill,
            currency: 'USD'
        });
    }

    // Custom analytics
    console.log('Conversion tracked:', {
        timestamp: new Date().toISOString(),
        formData: formData
    });
}

// ===================================
// Utility Functions
// ===================================

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Prevent accidental page unload when form is partially filled
window.addEventListener('beforeunload', function(e) {
    if (Object.keys(formData).length > 0 && currentStep < totalSteps) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});
