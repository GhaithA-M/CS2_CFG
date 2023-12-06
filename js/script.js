// script.js
document.addEventListener('DOMContentLoaded', function() {
    var configForm = document.getElementById('configForm');
    var output = document.getElementById('output');

    // Function to create the form inputs and tooltips
    function createFormInputs() {
        cvarsData.forEach(function(cvar) {
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
            div.appendChild(input);

            // Create a tooltip if showTooltip is true and description is provided
            if (cvar.showTooltip && cvar.description) {
                var tooltip = document.createElement('span');
                tooltip.className = 'tooltip';
                tooltip.textContent = '?';
                tooltip.setAttribute('title', cvar.description);
                div.appendChild(tooltip);
            }

            configForm.appendChild(div);
        });
    }

    // Function to update the output textarea
    function updateOutput() {
        // Clear and regenerate the output based on form inputs
        output.value = '';
        cvarsData.forEach(function(cvar) {
            var value = document.getElementById(cvar.cvarName).value.trim();
            if (value !== '') {
                output.value += cvar.cvarName + ' "' + value + '"';
                if (cvar.comment) {
                    output.value += '  // ' + cvar.comment;
                }
                output.value += '\n';
            }
        });
    }

    // Initialize form and set event listeners
    function initialize() {
        createFormInputs();
        cvarsData.forEach(function(cvar) {
            var input = document.getElementById(cvar.cvarName);
            input.addEventListener('input', updateOutput);
        });
        updateOutput();
    }

    initialize();
});
