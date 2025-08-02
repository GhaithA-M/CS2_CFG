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
    var configSelector = document.getElementById('configSelector');
    var loadConfigButton = document.getElementById('loadConfigButton');

    // Global variable to store current cvars data
    let cvarsData = [];
    let allConfigs = {}; // Store all config files in memory

    /* 3. Function to load all config files at once */
    async function loadAllConfigs() {
        // custom.json is already loaded via script tag, so add it to allConfigs
        if (typeof cvarsData !== 'undefined' && cvarsData.length > 0) {
            allConfigs['custom.json'] = [...cvarsData];
            console.log(`Loaded custom.json with ${cvarsData.length} commands`);
        }

        // Get the list of available config files from the dropdown
        const availableConfigs = [];
        for (let i = 0; i < configSelector.options.length; i++) {
            const option = configSelector.options[i];
            if (option.value !== 'custom.json') {
                availableConfigs.push(option.value);
            }
        }

        // Try to load each available config file
        for (const filename of availableConfigs) {
            try {
                const filePath = `js/cfg/${filename}`;
                const response = await fetch(filePath);
                if (response.ok) {
                    const text = await response.text();
                    
                    // Extract the unique variable name and data from the JavaScript file
                    const varName = filename.replace('gamemode_', '').replace('.json', '');
                    const pattern = new RegExp(`var cvarsData_${varName} = (\\[[\\s\\S]*?\\]);`);
                    const match = text.match(pattern);
                    if (match) {
                        const jsonStr = match[1];
                        const configData = JSON.parse(jsonStr);
                        allConfigs[filename] = configData;
                        console.log(`Loaded ${filename} with ${configData.length} commands`);
                    }
                }
            } catch (error) {
                console.log(`Could not load ${filename} - file may not exist yet`);
            }
        }
        
        // Start with custom.json if available, otherwise use the first available config
        if (allConfigs['custom.json']) {
            switchToConfig('custom.json');
        } else if (Object.keys(allConfigs).length > 0) {
            const firstConfig = Object.keys(allConfigs)[0];
            switchToConfig(firstConfig);
        }
    }

    /* 4. Function to switch between loaded configs */
    function switchToConfig(filename) {
        if (allConfigs[filename]) {
            cvarsData = [...allConfigs[filename]]; // Copy the config data
            
            // Clear existing form inputs
            clearAllForms();
            
            // Recreate form inputs with new data
            createAllFormInputs();
            
            // Update output
            updateOutput();
            
            console.log(`Switched to ${filename} with ${cvarsData.length} commands`);
        } else {
            console.error(`Config ${filename} not found in loaded configs`);
            // If the requested config isn't loaded, try to load it on demand
            loadConfigOnDemand(filename);
        }
    }

    /* 4.5 Function to load a config file on demand */
    async function loadConfigOnDemand(filename) {
        try {
            const filePath = `js/cfg/${filename}`;
            const response = await fetch(filePath);
            if (response.ok) {
                const text = await response.text();
                
                // Extract the unique variable name and data from the JavaScript file
                const varName = filename.replace('gamemode_', '').replace('.json', '');
                const pattern = new RegExp(`var cvarsData_${varName} = (\\[[\\s\\S]*?\\]);`);
                const match = text.match(pattern);
                if (match) {
                    const jsonStr = match[1];
                    const configData = JSON.parse(jsonStr);
                    allConfigs[filename] = configData;
                    
                    // Now switch to the newly loaded config
                    switchToConfig(filename);
                    console.log(`Loaded ${filename} on demand with ${configData.length} commands`);
                }
            } else {
                console.error(`Failed to load ${filename} - file not found`);
                alert(`Config ${filename} could not be loaded. Please make sure the file exists.`);
            }
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            alert(`Error loading ${filename}. Please check the browser console for details.`);
        }
    }

    /* 4. Function to clear all form inputs */
    function clearAllForms() {
        const categories = ['gen', 'bhop', 'time', 'bot', 'cash', 'ff', 'mp', 'talk', 'ammo', 'ds', 'misc', 'custom'];
        categories.forEach(category => {
            const form = document.getElementById(`configForm${category}`);
            if (form) {
                form.innerHTML = '';
            }
        });
    }

    /* 5. Function to create all form inputs */
    function createAllFormInputs() {
        // Group the cvars by their category
        const cvarsByCategory = cvarsData.reduce((acc, cvar) => {
            acc[cvar.category] = acc[cvar.category] || [];
            acc[cvar.category].push(cvar);
            return acc;
        }, {});

        // Create form inputs for each category
        Object.keys(cvarsByCategory).forEach(category => {
            createFormInputs(category, cvarsByCategory[category]);
        });
    }

    /* 6. Function to create form inputs and tooltips for each category */
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

    /* 7. Function to handle the accordion functionality (show/hide sections) */
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

    /* 8. Function to update the output text area with the current configuration */
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

    /* 11. Set up accordion functionality */
    setupAccordion();

    /* 12. Add event listeners to the reset button */
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

    /* 13. Add event listeners for config selector */
    loadConfigButton.addEventListener('click', function() {
        const selectedFile = configSelector.value;
        switchToConfig(selectedFile);
    });

    /* 14. Initialize by loading all configs */
    loadAllConfigs();
});
