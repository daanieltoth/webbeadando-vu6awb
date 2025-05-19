document.addEventListener('DOMContentLoaded', function() {

    const contrastToggle = document.getElementById('contrast-toggle');
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');

    const savedContrast = localStorage.getItem('highContrast');
    const savedFontSize = localStorage.getItem('fontSize');
    
    if (savedContrast === 'enabled') {
        enableHighContrast();
        contrastToggle.textContent = 'Normal Contrast';
    }
    
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize;
    }
   
    contrastToggle.addEventListener('click', function() {
        if (document.body.classList.contains('high-contrast')) {
            disableHighContrast();
            this.textContent = 'High Contrast Mode';
            localStorage.setItem('highContrast', 'disabled');
        } else {
            enableHighContrast();
            this.textContent = 'Normal Contrast';
            localStorage.setItem('highContrast', 'enabled');
        }
    });
    
    fontIncrease.addEventListener('click', function() {
        adjustFontSize(1);
    });
  
    fontDecrease.addEventListener('click', function() {
        adjustFontSize(-1);
    });

    function enableHighContrast() {
        document.body.classList.add('high-contrast');
  
        const styleId = 'high-contrast-style';
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        styleElement.textContent = `
            .high-contrast {
                --primary-color: #000000;
                --secondary-color: #333333;
                --accent-color: #ffffff;
                --dark-color: #000000;
                --light-color: #ffffff;
                --text-color: #000000;
                --text-light: #333333;
                background-color: white !important;
                color: black !important;
            }

            footer .high-contrast a {
                color:rgb(255, 255, 255) !important;
                text-decoration: underline !important;
            }
            
            .high-contrast a {
                color:rgb(0, 0, 0) !important;
                text-decoration: underline !important;
            }

            
            .high-contrast .button {
                border: 2px solid black !important;
                color: black !important;
                background-color: white !important;
            }
            
            .high-contrast header {
                border-bottom: 3px solid black !important;
            }
            
            .high-contrast input,
            .high-contrast textarea,
            .high-contrast select {
                border: 2px solid black !important;
                background-color: white !important;
                color: black !important;
            }
            
            /* Fix for active menu item */
            .high-contrast nav a.active {
                background-color: white !important;
                color: black !important;
                border: 2px solid black !important;
                text-decoration: underline !important;
            }
        `;
    }
    
    function disableHighContrast() {
        document.body.classList.remove('high-contrast');
        const styleElement = document.getElementById('high-contrast-style');
        if (styleElement) {
            styleElement.remove();
        }
    }
    
    function adjustFontSize(change) {
        const html = document.documentElement;
        const currentSize = parseFloat(window.getComputedStyle(html, null).getPropertyValue('font-size'));
        let newSize;
        
        if (change > 0) {
            newSize = Math.min(currentSize * 1.1, 22);
        } else {
            newSize = Math.max(currentSize * 0.9, 14);
        }
        
        html.style.fontSize = newSize + 'px';
        localStorage.setItem('fontSize', newSize + 'px');
    }
});