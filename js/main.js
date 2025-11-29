// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenuBtn && navLinks && 
            !mobileMenuBtn.contains(event.target) && 
            !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Form Validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 3000);
        } else {
            input.style.borderColor = '';
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    showAlert('Please enter a valid email address', 'error');
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 3000);
                }
            }
            
            // Password validation
            if (input.type === 'password' && input.value) {
                if (input.value.length < 6) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    showAlert('Password must be at least 6 characters long', 'error');
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 3000);
                }
            }
        }
    });
    
    return isValid;
}

// Show Alert Message
function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.top = '80px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.minWidth = '300px';
    alert.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.opacity = '0';
        alert.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 3000);
}

// Login Form Handler
function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    // Here you would typically make an API call to authenticate
    console.log('Login attempt:', { email, password });
    
    // Simulate login (replace with actual API call)
    showAlert('Login successful! Redirecting...', 'success');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Signup Form Handler
function handleSignup(event) {
    event.preventDefault();
    const form = event.target;
    const formData = {
        fullName: form.querySelector('input[name="fullName"]').value,
        email: form.querySelector('input[type="email"]').value,
        password: form.querySelector('input[type="password"]').value,
        role: form.querySelector('select[name="role"]').value
    };
    
    // Here you would typically make an API call to register
    console.log('Signup attempt:', formData);
    
    // Simulate signup (replace with actual API call)
    showAlert('Account created successfully! Redirecting to login...', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Contact Form Handler
function handleContact(event) {
    event.preventDefault();
    const form = event.target;
    const formData = {
        name: form.querySelector('input[name="name"]').value,
        email: form.querySelector('input[type="email"]').value,
        subject: form.querySelector('input[name="subject"]').value,
        message: form.querySelector('textarea[name="message"]').value
    };
    
    // Here you would typically make an API call to send the message
    console.log('Contact form submission:', formData);
    
    // Simulate form submission
    showAlert('Thank you for your message! We will get back to you soon.', 'success');
    form.reset();
}

// Initialize dashboard data
function initDashboard() {
    // This would typically fetch data from an API
    const stats = {
        totalItems: 1250,
        lowStock: 45,
        totalOrders: 320,
        pendingOrders: 12
    };
    
    updateDashboardStats(stats);
    loadInventoryTable();
}

function updateDashboardStats(stats) {
    const statCards = document.querySelectorAll('.stat-card-value');
    if (statCards.length >= 4) {
        statCards[0].textContent = stats.totalItems.toLocaleString();
        statCards[1].textContent = stats.lowStock;
        statCards[2].textContent = stats.totalOrders.toLocaleString();
        statCards[3].textContent = stats.pendingOrders;
    }
}

function loadInventoryTable() {
    // Sample inventory data (replace with API call)
    const inventory = [
        { id: 'INV001', name: 'Product A', quantity: 150, location: 'Warehouse 1', status: 'In Stock' },
        { id: 'INV002', name: 'Product B', quantity: 25, location: 'Warehouse 2', status: 'Low Stock' },
        { id: 'INV003', name: 'Product C', quantity: 300, location: 'Warehouse 1', status: 'In Stock' },
        { id: 'INV004', name: 'Product D', quantity: 5, location: 'Warehouse 3', status: 'Critical' },
    ];
    
    const tbody = document.querySelector('#inventoryTable tbody');
    if (tbody) {
        tbody.innerHTML = inventory.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.location}</td>
                <td><span class="badge badge-${item.status === 'In Stock' ? 'success' : item.status === 'Low Stock' ? 'warning' : 'error'}">${item.status}</span></td>
                <td>
                    <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">View</button>
                </td>
            </tr>
        `).join('');
    }
}

// Dashboard Modal Functions
function openAddItemModal() {
    const modal = document.getElementById('addItemModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeAddItemModal() {
    const modal = document.getElementById('addItemModal');
    if (modal) {
        modal.style.display = 'none';
        const form = document.getElementById('addItemForm');
        if (form) form.reset();
    }
}

function openViewItemModal(itemData) {
    const modal = document.getElementById('viewItemModal');
    if (modal && itemData) {
        document.getElementById('viewProductId').textContent = itemData.id || 'N/A';
        document.getElementById('viewProductName').textContent = itemData.name || 'N/A';
        document.getElementById('viewQuantity').textContent = itemData.quantity || 'N/A';
        document.getElementById('viewLocation').textContent = itemData.location || 'N/A';
        document.getElementById('viewStatus').textContent = itemData.status || 'N/A';
        document.getElementById('viewStatus').className = `badge badge-${itemData.status === 'In Stock' ? 'success' : itemData.status === 'Low Stock' ? 'warning' : 'error'}`;
        modal.style.display = 'flex';
    }
}

function closeViewItemModal() {
    const modal = document.getElementById('viewItemModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleAddItem(event) {
    event.preventDefault();
    const form = event.target;
    const formData = {
        name: form.querySelector('input[name="productName"]').value,
        quantity: parseInt(form.querySelector('input[name="quantity"]').value),
        location: form.querySelector('select[name="location"]').value,
        description: form.querySelector('textarea[name="description"]').value
    };
    
    // Generate new ID
    const newId = 'INV' + String(Date.now()).slice(-6);
    
    // Determine status based on quantity
    let status = 'In Stock';
    if (formData.quantity < 10) {
        status = 'Critical';
    } else if (formData.quantity < 50) {
        status = 'Low Stock';
    }
    
    // Add to inventory table
    const tbody = document.querySelector('#inventoryTable tbody');
    if (tbody) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${newId}</td>
            <td>${formData.name}</td>
            <td>${formData.quantity}</td>
            <td>${formData.location}</td>
            <td><span class="badge badge-${status === 'In Stock' ? 'success' : status === 'Low Stock' ? 'warning' : 'error'}">${status}</span></td>
            <td>
                <button class="btn btn-primary view-item-btn" style="padding: 0.5rem 1rem; font-size: 0.875rem;" 
                        data-id="${newId}" 
                        data-name="${formData.name}" 
                        data-quantity="${formData.quantity}" 
                        data-location="${formData.location}" 
                        data-status="${status}">View</button>
            </td>
        `;
        tbody.appendChild(newRow);
        
        // Update stats
        updateStatsAfterAdd();
        
        showAlert('Item added successfully!', 'success');
        closeAddItemModal();
    }
}

function updateStatsAfterAdd() {
    const totalItemsElement = document.querySelectorAll('.stat-card-value')[0];
    if (totalItemsElement) {
        const currentTotal = parseInt(totalItemsElement.textContent.replace(/,/g, '')) || 0;
        totalItemsElement.textContent = (currentTotal + 1).toLocaleString();
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('input[placeholder="Search..."]');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#inventoryTable tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
}

// Filter functionality
function setupFilter() {
    const filterSelect = document.querySelector('select');
    if (filterSelect && filterSelect.previousElementSibling && filterSelect.previousElementSibling.placeholder === 'Search...') {
        // This is the location filter
        filterSelect.addEventListener('change', function(e) {
            const selectedLocation = e.target.value;
            const rows = document.querySelectorAll('#inventoryTable tbody tr');
            
            rows.forEach(row => {
                if (selectedLocation === 'All Locations') {
                    row.style.display = '';
                } else {
                    const locationCell = row.cells[3];
                    if (locationCell) {
                        row.style.display = locationCell.textContent === selectedLocation ? '' : 'none';
                    }
                }
            });
        });
    }
}

// Setup view buttons
function setupViewButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-item-btn')) {
            const btn = e.target;
            const itemData = {
                id: btn.getAttribute('data-id'),
                name: btn.getAttribute('data-name'),
                quantity: btn.getAttribute('data-quantity'),
                location: btn.getAttribute('data-location'),
                status: btn.getAttribute('data-status')
            };
            openViewItemModal(itemData);
        }
    });
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Enhanced dashboard initialization
function initDashboard() {
    // This would typically fetch data from an API
    const stats = {
        totalItems: 1250,
        lowStock: 45,
        totalOrders: 320,
        pendingOrders: 12
    };
    
    updateDashboardStats(stats);
    loadInventoryTable();
    setupSearch();
    setupFilter();
    setupViewButtons();
    
    // Setup Add Item button
    const addItemBtn = document.querySelector('.dashboard-header .btn-primary');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openAddItemModal();
        });
    }
}

// Export functions for use in other scripts
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleContact = handleContact;
window.initDashboard = initDashboard;
window.openAddItemModal = openAddItemModal;
window.closeAddItemModal = closeAddItemModal;
window.openViewItemModal = openViewItemModal;
window.closeViewItemModal = closeViewItemModal;
window.handleAddItem = handleAddItem;

