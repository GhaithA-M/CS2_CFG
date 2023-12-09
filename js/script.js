/*
    Author: Ghaith Al-Maliki (Ralfidogg)
    GitHub: https://github.com/GhaithA-M/CS2_CFG/
*/

document.addEventListener('DOMContentLoaded', function() {
    var output = document.getElementById('output');

    // Function to create form inputs and tooltips for each category
    function createFormInputs(category, cvars) {
        const form = document.getElementById(`configForm${category}`);
        if (!form) return; // Skip if form does not exist

        cvars.forEach(cvar => {
            var div = document.createElement('div');
            div.className = 'form-group';

            var label = document.createElement('label');
            label.htmlFor = cvar.cvarName;
            label.textContent = cvar.normalName + ':';
            div.appendChild(label);

            var input = document.createElement('input');
            input.type = 'text';
            input.id = cvar.cvarName;
            input.name = cvar.cvarName;
            input.value = cvar.defaultValue;
            input.addEventListener('input', updateOutput); // Attach event listener
            div.appendChild(input);

            if (cvar.showTooltip && cvar.description) {
                var tooltip = document.createElement('span');
                tooltip.className = 'tooltip';
                tooltip.textContent = '?';
                tooltip.setAttribute('title', cvar.description);
                div.appendChild(tooltip);
            }

            form.appendChild(div);
        });
    }

    // Function to handle accordion functionality
    function setupAccordion() {
        document.querySelectorAll('.accordion-header').forEach(button => {
            button.addEventListener('click', () => {
                const accordionContent = button.nextElementSibling;
                button.classList.toggle('active');
                if (button.classList.contains('active')) {
                    accordionContent.style.display = 'block';
                } else {
                    accordionContent.style.display = 'none';
                }
            });
        });
    }

    function updateOutput() {
        output.value = '';
        const maxCvarLength = Math.max(...cvarsData.map(cvar => cvar.cvarName.length));
        const maxValueLength = Math.max(...cvarsData.map(cvar => document.getElementById(cvar.cvarName)?.value.trim().length || 0));
        const totalPadding = maxCvarLength + maxValueLength + 2;

        cvarsData.forEach(function(cvar) {
            var inputElement = document.getElementById(cvar.cvarName);
            if (inputElement) {
                var value = inputElement.value.trim();
                if (value !== '' && value !== cvar.defaultValue) {
                    const paddedCvar = cvar.cvarName.padEnd(maxCvarLength + 4, ' ');
                    const paddedValue = ('"' + value + '"').padEnd(maxValueLength + 4, ' ');
                    output.value += paddedCvar + paddedValue;
                    if (cvar.comment) {
                        output.value += ' // ' + cvar.comment;
                    }
                    output.value += '\n';
                }
            }
        });
    }

    // Group cvars by category
    const cvarsByCategory = cvarsData.reduce((acc, cvar) => {
        acc[cvar.category] = acc[cvar.category] || [];
        acc[cvar.category].push(cvar);
        return acc;
    }, {});

    // Create form inputs for each category
    Object.keys(cvarsByCategory).forEach(category => {
        createFormInputs(category, cvarsByCategory[category]);
    });

    setupAccordion();
    updateOutput();
});
