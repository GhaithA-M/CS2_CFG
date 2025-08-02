/*
    Author: Ghaith Al-Maliki
    Email: ermiyalea@mozmail.com
    GitHub: https://github.com/GhaithA-M/CS2_CFG/
    Steam: https://steamcommunity.com/id/Ralfidogg/
*/

/* 1. Wait for the entire HTML document to be parsed and loaded */
document.addEventListener('DOMContentLoaded', function() {
    /* 2. Get the element that will display the generated configuration output */
    var output = document.getElementById('output');
    var showAllCheckbox = document.getElementById('showAllCheckbox');

    /* 3. Function to create form inputs and tooltips for each category */
    function createFormInputs(category, cvars) {
        /* 3.1 Get the form element for the given category */
        const form = document.getElementById(`configForm${category}`);
        /* 3.2 If the form doesn't exist, exit the function early */
        if (!form) return;

        /* 3.3 Loop through each cvar in the category */
        cvars.forEach(cvar => {
            /* 3.3.1 Create a container for each cvar input */
            var div = document.createElement('div');
            div.className = 'form-group';

            /* 3.3.2 Create and set up the label for the input field */
            var label = document.createElement('label');
            label.htmlFor = cvar.cvarName;
            label.textContent = cvar.normalName + ':';
            div.appendChild(label);

            /* 3.3.3 Create and set up the input field */
            var input = document.createElement('input');
            input.type = 'text';
            input.id = cvar.cvarName;
            input.name = cvar.cvarName;
            input.value = localStorage.getItem(cvar.cvarName) || cvar.defaultValue;
            /* 3.3.4 Attach an event listener to update the output when the input changes */
            input.addEventListener('input', function() {
                localStorage.setItem(cvar.cvarName, input.value);
                updateOutput();
            });
            div.appendChild(input);

            /* 3.3.5 Create a tooltip if needed */
            if (cvar.showTooltip && cvar.description) {
                var tooltip = document.createElement('span');
                tooltip.className = 'tooltip';
                tooltip.textContent = '?';
                tooltip.setAttribute('title', cvar.description);
                div.appendChild(tooltip);
            }

            /* 3.3.6 Append the entire cvar input container to the form */
            form.appendChild(div);
        });
    }

    /* 4. Function to handle the accordion functionality (show/hide sections) */
    function setupAccordion() {
        /* 4.1 Select all accordion headers and set up click event listeners */
        document.querySelectorAll('.accordion-header').forEach(button => {
            button.addEventListener('click', () => {
                /* 4.2 Get the content section related to the clicked header */
                const accordionContent = button.nextElementSibling;
                /* 4.3 Toggle the active class to show/hide the content */
                button.classList.toggle('active');
                if (button.classList.contains('active')) {
                    accordionContent.style.display = 'block';
                } else {
                    accordionContent.style.display = 'none';
                }
            });
        });
    }

    /* 5. Function to update the output text area with the current configuration */
    function updateOutput() {
        /* 5.1 Start with an empty string */
        output.value = '';
        /* 5.2 Calculate padding for alignment in the output */
        const maxCvarLength = Math.max(...cvarsData.map(cvar => cvar.cvarName.length));
        const maxValueLength = Math.max(...cvarsData.map(cvar => document.getElementById(cvar.cvarName)?.value.trim().length || 0));
        /* 5.3 Loop through each cvar to generate the configuration lines */
        cvarsData.forEach(function(cvar) {
            /* 5.3.1 Get the input element for the cvar */
            var inputElement = document.getElementById(cvar.cvarName);
            /* 5.3.2 Get the trimmed value of the input */
            if (inputElement) {
                var value = inputElement.value.trim();
                /* 5.3.3 If the value is different from the default, include it in the output */
                if (value !== '' && (value !== cvar.defaultValue || showAllCheckbox.checked)) {
                    const paddedCvar = cvar.cvarName.padEnd(maxCvarLength + 4, ' ');
                    const paddedValue = ('"' + value + '"').padEnd(maxValueLength + 4, ' ');
                    output.value += paddedCvar + paddedValue + '// ' + cvar.comment + '\n';
                }
            }
        });
    }

    /* 6. Group the cvars by their category */
    const cvarsByCategory = cvarsData.reduce((acc, cvar) => {
        acc[cvar.category] = acc[cvar.category] || [];
        acc[cvar.category].push(cvar);
        return acc;
    }, {});

    /* 7. Create form inputs for each category */
    Object.keys(cvarsByCategory).forEach(category => {
        createFormInputs(category, cvarsByCategory[category]);
    });

    /* 8. Set up accordion functionality and update the output initially */
    setupAccordion();
    updateOutput();

    /* 9. Add event listeners to the reset button */
    document.getElementById('resetButton').addEventListener('click', function() {
        // Add a confirmation dialog
        if (confirm("Are you sure you want to reset all settings to their default values?")) {
            cvarsData.forEach(cvar => {
                var inputElement = document.getElementById(cvar.cvarName);
                if (inputElement) {
                    inputElement.value = cvar.defaultValue;
                    localStorage.setItem(cvar.cvarName, cvar.defaultValue);
                }
            });
            updateOutput();
        }
    });

    showAllCheckbox.addEventListener('change', function() {
        updateOutput();
    });
});
