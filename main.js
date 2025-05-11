// Login Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if(localStorage.getItem('isLoggedIn') === 'true' && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'home.html';
    }

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation (in a real app, this would be server-side)
            if(username && password) {
                // Store login state
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                
                // Redirect to home page
                window.location.href = 'home.html';
            } else {
                alert('Please enter both username and password');
            }
        });
    }

    // Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }

    // Staff Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    if(filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const department = this.getAttribute('data-department');
                const staffCards = document.querySelectorAll('.staff-card');
                
                staffCards.forEach(card => {
                    if(department === 'all' || card.getAttribute('data-department') === department) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Blood Donation Form
    const bloodDonationForm = document.getElementById('bloodDonationForm');
    if(bloodDonationForm) {
        bloodDonationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value,
                bloodType: document.getElementById('bloodType').value,
                donationDate: document.getElementById('donationDate').value,
                donationTime: document.getElementById('donationTime').value
            };
            
            // Save to localStorage (in a real app, this would be sent to a server)
            let donations = JSON.parse(localStorage.getItem('bloodDonations')) || [];
            donations.push(formData);
            localStorage.setItem('bloodDonations', JSON.stringify(donations));
            
            // Show success message
            alert('Thank you for registering to donate blood! We will contact you soon to confirm your appointment.');
            
            // Reset form
            bloodDonationForm.reset();
        });
    }

    // Insurance Form
    const insuranceForm = document.getElementById('insuranceForm');
    if(insuranceForm) {
        insuranceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                insuranceType: document.getElementById('insuranceType').value,
                providerName: document.getElementById('providerName').value,
                planName: document.getElementById('planName').value,
                memberId: document.getElementById('memberId').value,
                groupNumber: document.getElementById('groupNumber').value,
                effectiveDate: document.getElementById('effectiveDate').value,
                expirationDate: document.getElementById('expirationDate').value,
                policyHolder: document.getElementById('policyHolder').value,
                policyHolderDob: document.getElementById('policyHolderDob').value,
                relationship: document.getElementById('relationship').value
            };
            
            // Save to localStorage (in a real app, this would be sent to a server)
            localStorage.setItem('insuranceInfo', JSON.stringify(formData));
            
            // Show success message
            alert('Insurance information saved successfully!');
            
            // Reload to show updated info
            window.location.reload();
        });
    }

    // Populate insurance form if data exists
    const savedInsurance = localStorage.getItem('insuranceInfo');
    if(savedInsurance && document.getElementById('insuranceType')) {
        const insuranceData = JSON.parse(savedInsurance);
        document.getElementById('insuranceType').value = insuranceData.insuranceType;
        document.getElementById('providerName').value = insuranceData.providerName;
        document.getElementById('planName').value = insuranceData.planName;
        document.getElementById('memberId').value = insuranceData.memberId;
        document.getElementById('groupNumber').value = insuranceData.groupNumber;
        document.getElementById('effectiveDate').value = insuranceData.effectiveDate;
        document.getElementById('expirationDate').value = insuranceData.expirationDate;
        document.getElementById('policyHolder').value = insuranceData.policyHolder;
        document.getElementById('policyHolderDob').value = insuranceData.policyHolderDob;
        document.getElementById('relationship').value = insuranceData.relationship;
    }

    // Add current date as min for donation date
    const donationDateInput = document.getElementById('donationDate');
    if(donationDateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        donationDateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    // Update available times based on selected date
    if(donationDateInput) {
        donationDateInput.addEventListener('change', function() {
            const date = new Date(this.value);
            const day = date.getDay(); // 0 is Sunday, 6 is Saturday
            const timeSelect = document.getElementById('donationTime');
            
            // Clear existing options
            timeSelect.innerHTML = '<option value="">Select Time Slot</option>';
            
            // Add time slots based on day
            if(day === 0 || day === 6) { // Weekend
                addTimeOption(timeSelect, '9:00 AM');
                addTimeOption(timeSelect, '10:00 AM');
                addTimeOption(timeSelect, '11:00 AM');
                addTimeOption(timeSelect, '12:00 PM');
                addTimeOption(timeSelect, '1:00 PM');
                addTimeOption(timeSelect, '2:00 PM');
                addTimeOption(timeSelect, '3:00 PM');
                addTimeOption(timeSelect, '4:00 PM');
            } else { // Weekday
                addTimeOption(timeSelect, '10:00 AM');
                addTimeOption(timeSelect, '11:00 AM');
                addTimeOption(timeSelect, '3:00 PM');
                addTimeOption(timeSelect, '4:00 PM');
                addTimeOption(timeSelect, '5:00 PM');
            }
        });
    }
});

function addTimeOption(selectElement, time) {
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;
    selectElement.appendChild(option);
}

// Check authentication for protected pages
document.addEventListener('DOMContentLoaded', function() {
    const protectedPages = ['home.html', 'tours.html', 'staff.html', 'blood-donation.html', 'my-insurance.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if(protectedPages.includes(currentPage)){
        if(localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = 'index.html';
        } else {
            // Update username display if element exists
            const usernameElements = document.querySelectorAll('.username-display');
            if(usernameElements.length > 0) {
                const username = localStorage.getItem('username');
                usernameElements.forEach(el => {
                    el.textContent = username || 'User';
                });
            }
        }
    }
});
