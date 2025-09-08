/**
 * Bitrix24 Integration for ONIX Website
 * Converts PHP cURL functionality to JavaScript
 */

class Bitrix24Integration {
    constructor() {
        // Configuration - Replace these with your actual Bitrix24 credentials
        this.siteName = 'onixboats'; // Replace with your Bitrix24 site name
        this.token = 'cvybczay9wksrsvy'; // Replace with your webhook token
        this.baseURL = `https://${this.siteName}.bitrix24.ru/rest/1/${this.token}/crm.lead.add.json`;
        
        // Initialize the integration
        this.init();
    }

    /**
     * Initialize the Bitrix24 integration
     */
    init() {
        this.bindFormEvents();
        console.log('Bitrix24 Integration initialized');
    }

    /**
     * Bind form submission events
     */
    bindFormEvents() {
        // Main contact form
        const mainForm = document.getElementById('form-static');
        if (mainForm) {
            mainForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e.target, 'main');
            });
        }

        // Popup callback form
        const popupForm = document.querySelector('#callBackPopup form');
        if (popupForm) {
            popupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e.target, 'popup');
            });
        }
    }

    /**
     * Handle form submission
     * @param {HTMLFormElement} form - The form element
     * @param {string} formType - Type of form ('main' or 'popup')
     */
    async handleFormSubmission(form, formType) {
        try {
            // Show loading state
            this.showLoading(form);

            // Collect form data
            const formData = this.collectFormData(form, formType);
            
            // Validate form data
            if (!this.validateFormData(formData)) {
                this.hideLoading(form);
                return;
            }

            // Send to Bitrix24
            const result = await this.sendToBitrix24(formData);
            
            // Handle response
            this.handleResponse(result, form, formType);

        } catch (error) {
            console.error('Form submission error:', error);
            this.showError(form, 'Произошла ошибка при отправке формы. Попробуйте еще раз.');
            this.hideLoading(form);
        }
    }

    /**
     * Collect form data
     * @param {HTMLFormElement} form - The form element
     * @param {string} formType - Type of form
     * @returns {Object} Form data object
     */
    collectFormData(form, formType) {
        const formData = {
            NAME: '',
            LAST_NAME: '',
            PHONE: '',
            EMAIL: '',
            MESSAGE: '',
            SOURCE: formType === 'main' ? 'Contact Form' : 'Callback Request'
        };

        // Get form inputs
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            const name = input.name || input.id;
            const value = input.value.trim();

            switch (name) {
                case 'NAME':
                    formData.NAME = value;
                    break;
                case 'PHONE':
                case 'phone-input':
                case 'popup-phone-input':
                    formData.PHONE = value;
                    break;
                case 'EMAIL':
                    formData.EMAIL = value;
                    break;
                case 'MESSAGE':
                    formData.MESSAGE = value;
                    break;
            }
        });

        return formData;
    }

    /**
     * Validate form data
     * @param {Object} formData - Form data to validate
     * @returns {boolean} Validation result
     */
    validateFormData(formData) {
        // Check required fields
        if (!formData.NAME) {
            this.showError(null, 'Пожалуйста, введите ваше имя.');
            return false;
        }

        if (!formData.PHONE) {
            this.showError(null, 'Пожалуйста, введите номер телефона.');
            return false;
        }

        // Validate phone number format (basic validation)
        const phoneRegex = /^\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
        if (!phoneRegex.test(formData.PHONE)) {
            this.showError(null, 'Пожалуйста, введите корректный номер телефона.');
            return false;
        }

        // Validate email if provided
        if (formData.EMAIL) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.EMAIL)) {
                this.showError(null, 'Пожалуйста, введите корректный email адрес.');
                return false;
            }
        }

        return true;
    }

    /**
     * Send data to Bitrix24
     * @param {Object} formData - Form data to send
     * @returns {Promise<Object>} API response
     */
    async sendToBitrix24(formData) {
        // Prepare phone data for Bitrix24
        const phoneArray = formData.PHONE ? [{
            VALUE: formData.PHONE,
            VALUE_TYPE: 'MOBILE'
        }] : [];

        // Prepare the request payload
        const payload = {
            fields: {
                NAME: formData.NAME,
                LAST_NAME: formData.LAST_NAME || '',
                PHONE: phoneArray,
                EMAIL: formData.EMAIL ? [{ VALUE: formData.EMAIL, VALUE_TYPE: 'WORK' }] : [],
                COMMENTS: formData.MESSAGE || `Источник: ${formData.SOURCE}`,
                SOURCE_DESCRIPTION: formData.SOURCE
            },
            params: {
                REGISTER_SONET_EVENT: "Y"
            }
        };

        // Convert to URL-encoded format (similar to PHP's http_build_query)
        const queryData = this.buildQueryString(payload);

        // Send request using fetch API
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: queryData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    }

    /**
     * Build query string from object (similar to PHP's http_build_query)
     * @param {Object} obj - Object to convert
     * @returns {string} URL-encoded query string
     */
    buildQueryString(obj) {
        const params = new URLSearchParams();
        
        const addToParams = (key, value) => {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === 'object') {
                        Object.keys(item).forEach(subKey => {
                            params.append(`${key}[${index}][${subKey}]`, item[subKey]);
                        });
                    } else {
                        params.append(`${key}[${index}]`, item);
                    }
                });
            } else if (typeof value === 'object' && value !== null) {
                Object.keys(value).forEach(subKey => {
                    params.append(`${key}[${subKey}]`, value[subKey]);
                });
            } else {
                params.append(key, value);
            }
        };

        Object.keys(obj).forEach(key => {
            addToParams(key, obj[key]);
        });

        return params.toString();
    }

    /**
     * Handle API response
     * @param {Object} result - API response
     * @param {HTMLFormElement} form - Form element
     * @param {string} formType - Type of form
     */
    handleResponse(result, form, formType) {
        this.hideLoading(form);

        if (result.error) {
            console.error('Bitrix24 API Error:', result.error_description);
            this.showError(form, `Ошибка при сохранении заявки: ${result.error_description}`);
        } else if (result.result) {
            // Success
            this.showSuccess(form, formType);
            this.resetForm(form);
            
            // Close popup if it's a popup form
            if (formType === 'popup') {
                this.closePopup();
            }
        } else {
            this.showError(form, 'Неизвестная ошибка при отправке формы.');
        }
    }

    /**
     * Show loading state
     * @param {HTMLFormElement} form - Form element
     */
    showLoading(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'ОТПРАВКА...';
            submitButton.style.opacity = '0.7';
        }
    }

    /**
     * Hide loading state
     * @param {HTMLFormElement} form - Form element
     */
    hideLoading(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.textContent.includes('ЗАКАЗАТЬ') ? 'ЗАКАЗАТЬ ЗВОНОК' : 'ОТПРАВИТЬ';
            submitButton.style.opacity = '1';
        }
    }

    /**
     * Show success message
     * @param {HTMLFormElement} form - Form element
     * @param {string} formType - Type of form
     */
    showSuccess(form, formType) {
        const message = formType === 'popup' 
            ? 'Спасибо! Мы свяжемся с вами в ближайшее время.' 
            : 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';

        this.showMessage(form, message, 'success');
    }

    /**
     * Show error message
     * @param {HTMLFormElement} form - Form element or null
     * @param {string} message - Error message
     */
    showError(form, message) {
        this.showMessage(form, message, 'error');
    }

    /**
     * Show message to user
     * @param {HTMLFormElement} form - Form element or null
     * @param {string} message - Message to show
     * @param {string} type - Message type ('success' or 'error')
     */
    showMessage(form, message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message--${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            ${type === 'success' 
                ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
                : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;

        // Insert message
        if (form) {
            form.insertBefore(messageElement, form.firstChild);
        } else {
            // Show in a general location if no form specified
            const targetElement = document.querySelector('.form-container') || document.body;
            targetElement.insertBefore(messageElement, targetElement.firstChild);
        }

        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 5000);
        }
    }

    /**
     * Reset form
     * @param {HTMLFormElement} form - Form element
     */
    resetForm(form) {
        form.reset();
        
        // Clear any custom formatting
        const phoneInputs = form.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.value = '';
        });
    }

    /**
     * Close popup
     */
    closePopup() {
        const popup = document.getElementById('callBackPopup');
        if (popup) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Update configuration
     * @param {string} siteName - Bitrix24 site name
     * @param {string} token - Webhook token
     */
    updateConfig(siteName, token) {
        this.siteName = siteName;
        this.token = token;
        this.baseURL = `https://${this.siteName}.bitrix24.ru/rest/1/${this.token}/crm.lead.add.json`;
        console.log('Bitrix24 configuration updated');
    }
}

// Initialize Bitrix24 integration when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create global instance
    window.bitrix24Integration = new Bitrix24Integration();
    
    // You can update the configuration here with your actual credentials
    // window.bitrix24Integration.updateConfig('your-actual-site-name', 'your-actual-webhook-token');
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Bitrix24Integration;
}
