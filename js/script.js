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
    let allCommands = []; // Store ALL commands from ALL configs (no duplicates)

    /* 3. Function to load all config files at once */
    async function loadAllConfigs() {
        // Load custom.json data (available globally from script tag)
        if (typeof cvarsData_custom !== 'undefined' && cvarsData_custom.length > 0) {
            allConfigs['custom.json'] = [...cvarsData_custom];
            console.log(`Loaded custom.json with ${cvarsData_custom.length} commands`);
        }

        // Load all gamemode configs from globally available variables
        const gamemodeConfigs = [
            { filename: 'custom.json', varName: 'cvarsData_custom' },
            { filename: 'gamemode_casual.json', varName: 'cvarsData_casual' },
            { filename: 'gamemode_competitive.json', varName: 'cvarsData_competitive' },
            { filename: 'gamemode_deathmatch.json', varName: 'cvarsData_deathmatch' },
            { filename: 'gamemode_armsrace.json', varName: 'cvarsData_armsrace' },
            { filename: 'gamemode_demolition.json', varName: 'cvarsData_demolition' },
            { filename: 'gamemode_workshop.json', varName: 'cvarsData_workshop' },
            { filename: 'gamemode_teamdeathmatch.json', varName: 'cvarsData_teamdeathmatch' },
            { filename: 'gamemode_retakecasual.json', varName: 'cvarsData_retakecasual' },
            { filename: 'gamemode_competitive2v2.json', varName: 'cvarsData_competitive2v2' },
            { filename: 'gamemode_dm_freeforall.json', varName: 'cvarsData_dm_freeforall' },
            { filename: 'gamemode_new_user_training.json', varName: 'cvarsData_new_user_training' },
            { filename: 'gamemode_deathmatch_tmm.json', varName: 'cvarsData_deathmatch_tmm' },
            { filename: 'gamemode_deathmatch_short.json', varName: 'cvarsData_deathmatch_short' },
            { filename: 'gamemode_competitive_tmm.json', varName: 'cvarsData_competitive_tmm' },
            { filename: 'gamemode_competitive_short.json', varName: 'cvarsData_competitive_short' },
            { filename: 'gamemode_competitive_offline.json', varName: 'cvarsData_competitive_offline' },
            { filename: 'gamemode_competitive2v2_offline.json', varName: 'cvarsData_competitive2v2_offline' }
        ];

        // Debug: Check what variables are available
        console.log('Available global variables:');
        gamemodeConfigs.forEach(config => {
            console.log(`${config.varName}: ${typeof window[config.varName]} (length: ${window[config.varName]?.length || 'undefined'})`);
        });


        // Load each gamemode config from global variables
        const loadedConfigs = [];
        const missingConfigs = [];
        const emptyConfigs = [];
        
        for (const config of gamemodeConfigs) {
            if (typeof window[config.varName] !== 'undefined' && window[config.varName].length > 0) {
                allConfigs[config.filename] = [...window[config.varName]];
                console.log(`Loaded ${config.filename} with ${window[config.varName].length} commands`);
                loadedConfigs.push(config.filename);
            } else if (typeof window[config.varName] !== 'undefined' && window[config.varName].length === 0) {
                allConfigs[config.filename] = [...window[config.varName]];
                console.log(`Loaded ${config.filename} but it's empty (0 commands)`);
                emptyConfigs.push(config.filename);
            } else {
                console.log(`Could not load ${config.filename} - variable ${config.varName} not found`);
                missingConfigs.push(config.filename);
            }
        }
        
        // Show summary of what loaded and what's missing
        console.log('');
        console.log('=====================================');
        console.log('📊 CONFIG LOAD SUMMARY');
        console.log('=====================================');
        console.log(`✅ Successfully loaded: ${loadedConfigs.length} configs`);
        console.log(`⚠️  Empty configs: ${emptyConfigs.length} configs`);
        console.log(`❌ Missing/Failed to load: ${missingConfigs.length} configs`);
        
        if (missingConfigs.length > 0) {
            console.log('');
            console.log('❌ MISSING CONFIGS (you can delete these files):');
            missingConfigs.forEach(filename => {
                console.log(`  - js/json/${filename}`);
            });
        }
        
        if (emptyConfigs.length > 0) {
            console.log('');
            console.log('⚠️  EMPTY CONFIGS (loaded but no commands):');
            emptyConfigs.forEach(filename => {
                console.log(`  - js/json/${filename}`);
            });
        }
        console.log('=====================================');
        console.log('');
        
        // Build the allCommands array with all unique commands from all configs
        buildAllCommands();
    }
    
    /* 3.1 Function to build allCommands array with unique commands from all configs */
    function buildAllCommands() {
        const commandMap = new Map(); // Use Map to track unique commands by cvarName
        
        // Iterate through all loaded configs
        for (const [configName, configCommands] of Object.entries(allConfigs)) {
            if (Array.isArray(configCommands)) {
                configCommands.forEach(command => {
                    // Use cvarName as the unique key
                    if (!commandMap.has(command.cvarName)) {
                        commandMap.set(command.cvarName, command);
                    } else {
                        // If command already exists, merge comments and keep the most complete version
                        const existing = commandMap.get(command.cvarName);
                        const merged = {
                            ...existing,
                            comment: existing.comment || command.comment,
                            defaultValue: existing.defaultValue || command.defaultValue,
                            normalName: existing.normalName || command.normalName
                        };
                        commandMap.set(command.cvarName, merged);
                    }
                });
            }
        }
        
        // Convert Map back to array
        allCommands = Array.from(commandMap.values());
        
        console.log(`📋 Built allCommands array with ${allCommands.length} unique commands from all configs`);
        
        // Set cvarsData to allCommands so all commands are always shown
        cvarsData = [...allCommands];
        
        // Create form inputs for all commands
        createAllFormInputs();
        
        // Update output
        updateOutput();
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
            // Map filename to variable name
            const varName = filename.replace('gamemode_', 'cvarsData_').replace('.json', '');
            
            // Check if the variable exists globally
            if (typeof window[varName] !== 'undefined' && window[varName].length > 0) {
                allConfigs[filename] = [...window[varName]];
                
                // Now switch to the newly loaded config
                switchToConfig(filename);
                console.log(`Loaded ${filename} on demand with ${window[varName].length} commands`);
            } else {
                console.error(`Failed to load ${filename} - variable ${varName} not found`);
                alert(`Config ${filename} could not be loaded. Please make sure the file exists.`);
            }
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            alert(`Error loading ${filename}. Please check the browser console for details.`);
        }
    }

    /* 4.6 Function to load config values into existing form inputs without changing displayed commands */
    function loadConfigValues(filename) {
        if (!allConfigs[filename]) {
            console.error(`Config ${filename} not found in loaded configs`);
            return;
        }

        const configCommands = allConfigs[filename];
        console.log(`Loading values from ${filename} with ${configCommands.length} commands`);

        // Create a map of command names to their values for quick lookup
        const commandValueMap = new Map();
        configCommands.forEach(command => {
            commandValueMap.set(command.cvarName, command.defaultValue);
        });

        // Update all form inputs with values from the selected config
        const allInputs = document.querySelectorAll('input[type="text"]');
        allInputs.forEach(input => {
            const commandName = input.name;
            if (commandValueMap.has(commandName)) {
                const newValue = commandValueMap.get(commandName);
                input.value = newValue;
                
                // Update localStorage with the new value
                const storageKey = `${filename}_${commandName}`;
                localStorage.setItem(storageKey, newValue);
            }
        });

        // Update the output to reflect the new values
        updateOutput();
        
        console.log(`Loaded values from ${filename} into all form inputs`);
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
        label.textContent = cvar.cvarName + ':';
        label.setAttribute('data-full-command', cvar.cvarName);
        label.className = 'command-label';
        div.appendChild(label);

        /* 3.3.3 Create and set up the input field */
        var input = document.createElement('input');
        input.type = 'text';
        input.id = cvar.cvarName;
        input.name = cvar.cvarName;
        
        // Get the current config filename for localStorage key
        const currentConfig = configSelector.value;
        const storageKey = `${currentConfig}_${cvar.cvarName}`;
        
        // Use stored value if it exists and is different from default, otherwise use default
        const storedValue = localStorage.getItem(storageKey);
        input.value = (storedValue && storedValue !== cvar.defaultValue) ? storedValue : cvar.defaultValue;
        input.placeholder = cvar.defaultValue || '';
        
        /* 3.3.4 Attach an event listener to update the output when the input changes */
        input.addEventListener('input', function() {
            localStorage.setItem(storageKey, input.value);
            updateOutput();
        });
        div.appendChild(input);

        /* 3.3.5 Create a tooltip with command description */
        var tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        tooltip.setAttribute('data-tooltip', getCommandDescription(cvar.cvarName, cvar.defaultValue));
        
        // Add tooltip positioning and behavior
        tooltip.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const rect = this.getBoundingClientRect();
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'dynamic-tooltip';
            tooltipElement.textContent = tooltipText;
            tooltipElement.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top - 10}px;
                transform: translateX(-50%) translateY(-100%);
                background-color: #222;
                color: #fff;
                text-align: left;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.75rem;
                white-space: pre-line;
                max-width: 300px;
                z-index: 99999;
                border: 1px solid #4CAF50;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
                line-height: 1.4;
                font-family: 'JetBrains Mono', monospace;
                pointer-events: none;
            `;
            document.body.appendChild(tooltipElement);
            this.tooltipElement = tooltipElement;
        });
        
        tooltip.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
        
        div.appendChild(tooltip);

            /* 3.3.6 Append the entire cvar input container to the form */
            form.appendChild(div);
        });
    }

    /* 6.5 Function to get command descriptions with min/max values, command names, and default values */
    function getCommandDescription(commandName, defaultValue = '') {
        const commandInfo = {
            // General Commands
            'hostname': {
                description: 'Sets the server hostname that appears in the server browser',
                min: '1',
                max: '64',
                type: 'string'
            },
            'sv_password': {
                description: 'Sets a password required to join the server',
                min: '0',
                max: '32',
                type: 'string'
            },
            'sv_region': {
                description: 'Sets the server region',
                min: '0',
                max: '7',
                type: 'integer',
                values: '0=US East, 1=US West, 2=South America, 3=Europe, 4=Asia, 5=Australia, 6=Middle East, 7=Africa'
            },
            'sv_lan': {
                description: 'Enables LAN mode',
                min: '0',
                max: '1',
                type: 'boolean',
                values: '0=Internet, 1=LAN only'
            },
            'sv_cheats': {
                description: 'Enables cheats on the server',
                min: '0',
                max: '1',
                type: 'boolean',
                values: '0=disabled, 1=enabled'
            },
            'sv_pure': {
                description: 'Enables pure server mode',
                min: '0',
                max: '1',
                type: 'boolean',
                values: '0=disabled, 1=enabled'
            },
            'sv_pure_kick_clients': {
                description: 'Kicks clients that don\'t match pure server requirements',
                min: '0',
                max: '1',
                type: 'boolean',
                values: '0=disabled, 1=enabled'
            },
            
            // Bot Commands
            'bot_quota': {
                description: 'Sets the number of bots to maintain on the server',
                min: '0',
                max: '32',
                type: 'integer'
            },
            'bot_quota_mode': {
                description: 'Sets bot quota mode',
                min: '0',
                max: '0',
                type: 'string',
                values: 'fill=fill empty slots, match=maintain ratio, competitive'
            },
            'bot_difficulty': {
                description: 'Sets bot difficulty',
                min: '0',
                max: '3',
                type: 'integer',
                values: '0=easy, 1=normal, 2=hard, 3=expert'
            },
            'bot_join_team': {
                description: 'Sets which team bots join',
                min: '0',
                max: '0',
                type: 'string',
                values: 'any, t, ct'
            },
            'bot_join_after_player': {
                description: 'Bots join after a player joins',
                min: '0',
                max: '1',
                type: 'boolean',
                values: '0=disabled, 1=enabled'
            },
            'bot_defer_to_human_goals': {
                description: 'Bots defer to human goals',
                min: '0',
                max: '1',
                type: 'boolean',
                values: '0=disabled, 1=enabled'
            },
            'bot_defer_to_human_items': {
                description: 'Bots defer to human items',
                min: '0',
                max: '1',
                type: 'boolean',
                values: '0=disabled, 1=enabled'
            },
            'bot_autodifficulty_threshold_high': {
                description: 'Threshold above which bots lower difficulty',
                min: '-20.0',
                max: '20.0',
                type: 'float'
            },
            'bot_autodifficulty_threshold_low': {
                description: 'Threshold below which bots raise difficulty',
                min: '-20.0',
                max: '20.0',
                type: 'float'
            },
            'bot_chatter': {
                description: 'Sets bot chatter mode',
                min: '0',
                max: '0',
                type: 'string',
                values: 'off, minimal, radio, normal'
            },
            
            // Cash/Economy Commands
            'cash_player_bomb_defused': {
                description: 'Cash reward for defusing the bomb',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_player_bomb_planted': {
                description: 'Cash reward for planting the bomb',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_player_killed_enemy_default': {
                description: 'Default cash reward for killing an enemy',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_player_killed_enemy_factor': {
                description: 'Multiplier for cash rewards',
                min: '0',
                max: '10',
                type: 'float'
            },
            'cash_player_killed_teammate': {
                description: 'Cash penalty for killing a teammate',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_player_rescued_hostage': {
                description: 'Cash reward for rescuing a hostage',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_elimination_bomb_map': {
                description: 'Team cash reward for elimination on bomb maps',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_elimination_hostage_map_t': {
                description: 'T team cash reward for elimination on hostage maps',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_elimination_hostage_map_ct': {
                description: 'CT team cash reward for elimination on hostage maps',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_loser_bonus': {
                description: 'Cash bonus for losing team',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_loser_bonus_consecutive_rounds': {
                description: 'Additional cash for consecutive losses',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_planted_bomb_but_defused': {
                description: 'Cash reward for planting bomb but it gets defused',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_rescued_hostage': {
                description: 'Team cash reward for hostage rescue',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_terrorist_win_bomb': {
                description: 'T team cash reward for bomb explosion',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_win_by_defusing_bomb': {
                description: 'CT team cash reward for defusing bomb',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_win_by_hostage_rescue': {
                description: 'CT team cash reward for hostage rescue',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_win_by_time_running_out_hostage': {
                description: 'CT team cash reward for time running out on hostage maps',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'cash_team_win_by_time_running_out_bomb': {
                description: 'CT team cash reward for time running out on bomb maps',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'mp_starting_losses': {
                description: 'Number of consecutive losses to start with',
                min: '0',
                max: '10',
                type: 'integer'
            },
            'mp_afterroundmoney': {
                description: 'Money given after each round',
                min: '-16000',
                max: '16000',
                type: 'integer'
            },
            'mp_startmoney': {
                description: 'Starting money for each player',
                min: '0',
                max: '16000',
                type: 'integer',
                default: '800'
            },
            'mp_maxmoney': {
                description: 'Maximum money a player can have',
                min: '0',
                max: '16000',
                type: 'integer',
                default: '16000'
            },
            
            // Friendly Fire Commands
            'ff_damage_reduction_bullets': {
                description: 'Damage reduction for friendly fire bullets',
                min: '0.0',
                max: '1.0',
                type: 'float'
            },
            'ff_damage_reduction_grenade': {
                description: 'Damage reduction for friendly fire grenades',
                min: '0.0',
                max: '1.0',
                type: 'float'
            },
            'ff_damage_reduction_grenade_self': {
                description: 'Damage reduction for self-inflicted grenade damage',
                min: '0.0',
                max: '1.0',
                type: 'float'
            },
            'ff_damage_reduction_other': {
                description: 'Damage reduction for other friendly fire sources',
                min: '0.0',
                max: '1.0',
                type: 'float'
            },
            'mp_friendlyfire': {
                description: 'Enables friendly fire',
                min: '0',
                max: '1',
                type: 'boolean',
                values: '0=disabled, 1=enabled',
                default: '1'
            },
            
            // Surfing & Bunnyhopping Commands
            'sv_airaccelerate': {
                description: 'Air acceleration multiplier (higher = faster air movement)',
                min: '0',
                max: '10000',
                type: 'float'
            },
            'sv_air_max_wishspeed': {
                description: 'Maximum air speed players can achieve',
                min: '0',
                max: '1000',
                type: 'float'
            },
            'sv_staminajumpcost': {
                description: 'Stamina cost for jumping (0 = no cost)',
                min: '0.0',
                max: '1.0',
                type: 'float'
            },
            'sv_staminalandcost': {
                description: 'Stamina cost for landing (0 = no cost)',
                min: '0.0',
                max: '1.0',
                type: 'float'
            },
            'sv_staminamax': {
                description: 'Maximum stamina value',
                min: '0.0',
                max: '1000.0',
                type: 'float'
            },
            'sv_staminarecoveryrate': {
                description: 'How fast stamina recovers per second',
                min: '0.0',
                max: '1000.0',
                type: 'float'
            },
            'sv_wateraccelerate': {
                description: 'Water acceleration multiplier',
                min: '0',
                max: '1000',
                type: 'float'
            },
            'sv_waterdist': {
                description: 'Distance from water surface for water effects',
                min: '0',
                max: '100',
                type: 'float'
            },
            'sv_waterjump': {
                description: 'Enable/disable water jumping',
                min: '0',
                max: '1',
                type: 'boolean',
                values: '0=disabled, 1=enabled'
            },
            'sv_waterwishspeed': {
                description: 'Maximum speed in water',
                min: '0',
                max: '1000',
                type: 'float'
            },
            'sv_gravity': {
                description: 'World gravity (lower = higher jumps)',
                min: '0',
                max: '1000',
                type: 'float'
            },
            'sv_maxspeed': {
                description: 'Maximum player movement speed',
                min: '0',
                max: '1000',
                type: 'float'
            },
            'sv_friction': {
                description: 'Ground friction (higher = more friction)',
                min: '0',
                max: '100',
                type: 'float'
            },
            'sv_accelerate': {
                description: 'Ground acceleration multiplier',
                min: '0',
                max: '100',
                type: 'float'
            },
            'sv_stopspeed': {
                description: 'Speed threshold for stopping',
                min: '0',
                max: '1000',
                type: 'float'
            },
            
            // Match Play Commands
            'mp_roundtime': {
                description: 'Round time in minutes',
                min: '0',
                max: '10',
                type: 'float',
                default: '1.92'
            },
            'mp_roundtime_defuse': {
                description: 'Round time for defuse maps',
                min: '0',
                max: '10',
                type: 'float',
                default: '1.92'
            },
            'mp_roundtime_hostage': {
                description: 'Round time for hostage maps',
                min: '0',
                max: '10',
                type: 'float',
                default: '1.92'
            },
            'mp_freezetime': {
                description: 'Freeze time at round start in seconds',
                min: '0',
                max: '60',
                type: 'integer',
                default: '15'
            },
            'mp_buytime': {
                description: 'Buy time at round start in seconds',
                min: '0',
                max: '60',
                type: 'integer',
                default: '20'
            },
            'mp_buy_anywhere': 'Allow buying anywhere (0=disabled, 1=enabled)',
            'mp_buy_during_immunity': 'Allow buying during immunity period',
            'mp_death_drop_defuser': 'Drop defuser on death (0=none, 1=best, 2=current or best)',
            'mp_death_drop_grenade': 'Drop grenades on death (0=none, 1=best, 2=current or best)',
            'mp_death_drop_gun': 'Drop guns on death (0=none, 1=best, 2=current or best)',
            'mp_defuser_allocation': 'Defuser allocation mode (0=manual, 1=auto)',
            'mp_force_pick_time': 'Time to force weapon pick in seconds',
            'mp_forcecamera': 'Force camera mode (0=disabled, 1=team only, 2=spectator only)',
            'mp_free_armor': 'Free armor at round start (0=disabled, 1=enabled)',
            'mp_halftime': 'Enable halftime (0=disabled, 1=enabled)',
            'mp_match_can_clinch': 'Enable mercy rule (0=disabled, 1=enabled)',
            'mp_maxrounds': 'Maximum number of rounds',
            'mp_playercashawards': 'Enable player cash awards (0=disabled, 1=enabled)',
            'mp_respawn_immunitytime': 'Respawn immunity time in seconds',
            'mp_solid_teammates': 'Solid teammates (0=disabled, 1=enabled)',
            'mp_teamcashawards': 'Enable team cash awards (0=disabled, 1=enabled)',
            'mp_timelimit': 'Time limit in minutes (0=no limit)',
            'mp_technical_timeout_per_team': 'Technical timeout per team',
            'mp_technical_timeout_duration_s': 'Technical timeout duration in seconds',
            'mp_warmuptime': 'Warmup time in seconds',
            'mp_warmuptime_all_players_connected': 'Warmup time when all players connected',
            'mp_weapons_allow_zeus': 'Allow Zeus x27 (0=disabled, 1=enabled, 5=always)',
            'mp_weapons_allow_map_placed': 'Allow map-placed weapons (0=disabled, 1=enabled)',
            'mp_weapons_glow_on_ground': 'Weapon glow on ground (0=disabled, 1=enabled)',
            'mp_display_kill_assists': 'Display kill assists (0=disabled, 1=enabled)',
            'mp_respawn_on_death_t': 'T team respawn on death (0=disabled, 1=enabled)',
            'mp_respawn_on_death_ct': 'CT team respawn on death (0=disabled, 1=enabled)',
            'mp_ct_default_melee': 'CT default melee weapon',
            'mp_ct_default_secondary': 'CT default secondary weapon',
            'mp_ct_default_primary': 'CT default primary weapon',
            'mp_t_default_melee': 'T default melee weapon',
            'mp_t_default_secondary': 'T default secondary weapon',
            'mp_t_default_primary': 'T default primary weapon',
            'mp_default_team_winner_no_objective': 'Default team winner when no objective (-1=draw, 2=CT, 3=T)',
            'mp_teammates_are_enemies': 'Teammates are enemies (0=disabled, 1=enabled)',
            'mp_match_end_restart': 'Restart after match end (0=disabled, 1=enabled)',
            'mp_match_end_changelevel': 'Change level after match end (0=disabled, 1=enabled)',
            'mp_match_restart_delay': 'Delay before match restart in seconds',
            'mp_round_restart_delay': 'Delay before round restart in seconds',
            
            // Talking & Voting Commands
            'sv_allow_votes': 'Allow voting (0=disabled, 1=enabled)',
            'sv_talk_enemy_living': 'Allow talking to enemy while alive (0=disabled, 1=enabled)',
            'sv_talk_enemy_dead': 'Allow talking to enemy while dead (0=disabled, 1=enabled)',
            'sv_auto_full_alltalk_during_warmup_half_end': 'Auto full alltalk during warmup/half/end (0=disabled, 1=enabled)',
            'sv_deadtalk': 'Allow dead players to talk (0=disabled, 1=enabled)',
            'sv_ignoregrenaderadio': 'Ignore grenade radio messages (0=disabled, 1=enabled)',
            'sv_grenade_trajectory_time_spectator': 'Grenade trajectory time for spectators',
            
            // Ammo Commands
            'ammo_grenade_limit_flashbang': 'Flashbang grenade limit',
            'ammo_grenade_limit_total': 'Total grenade limit',
            'sv_infinite_ammo': 'Infinite ammo (0=disabled, 1=enabled)',
            
            // Death Spawn Commands
            'mp_randomspawn': 'Random spawn (0=disabled, 1=enabled)',
            'mp_randomspawn_los': 'Random spawn line of sight check (0=disabled, 1=enabled)',
            
            // Miscellaneous Commands
            'tv_delay': {
                description: 'TV delay in seconds',
                min: '0',
                max: '300',
                type: 'integer'
            },
            'spec_freeze_time': {
                description: 'Spectator freeze time in seconds',
                min: '0',
                max: '10',
                type: 'float'
            },
            'spec_freeze_panel_extended_time': {
                description: 'Extended freeze panel time',
                min: '0',
                max: '10',
                type: 'float'
            },
            'cl_drawhud_force_radar': {
                description: 'Force radar display',
                min: '-1',
                max: '1',
                type: 'integer',
                values: '-1=auto, 0=disabled, 1=enabled'
            },
            'exec': {
                description: 'Execute a config file',
                min: '0',
                max: '0',
                type: 'string'
            },
            
            // Additional common commands with default values
            'sv_airaccelerate': {
                description: 'Air acceleration multiplier (higher = faster air movement)',
                min: '0',
                max: '10000',
                type: 'float',
                default: '1000'
            },
            'sv_air_max_wishspeed': {
                description: 'Maximum air speed players can achieve',
                min: '0',
                max: '1000',
                type: 'float',
                default: '30'
            },
            'sv_staminajumpcost': {
                description: 'Stamina cost for jumping (0 = no cost)',
                min: '0.0',
                max: '1.0',
                type: 'float',
                default: '0.080'
            },
            'sv_staminalandcost': {
                description: 'Stamina cost for landing (0 = no cost)',
                min: '0.0',
                max: '1.0',
                type: 'float',
                default: '0.050'
            },
            'sv_staminamax': {
                description: 'Maximum stamina value',
                min: '0.0',
                max: '1000.0',
                type: 'float',
                default: '80.0'
            },
            'sv_staminarecoveryrate': {
                description: 'How fast stamina recovers per second',
                min: '0.0',
                max: '1000.0',
                type: 'float',
                default: '60.0'
            },
            'sv_wateraccelerate': {
                description: 'Water acceleration multiplier',
                min: '0',
                max: '1000',
                type: 'float',
                default: '10'
            },
            'sv_waterdist': {
                description: 'Distance from water surface for water effects',
                min: '0',
                max: '100',
                type: 'float',
                default: '12'
            },
            'sv_waterjump': {
                description: 'Enable/disable water jumping',
                min: '0',
                max: '1',
                type: 'boolean',
                values: '0=disabled, 1=enabled',
                default: '1'
            },
            'sv_waterwishspeed': {
                description: 'Maximum speed in water',
                min: '0',
                max: '1000',
                type: 'float',
                default: '15'
            },
            'sv_gravity': {
                description: 'World gravity (lower = higher jumps)',
                min: '0',
                max: '1000',
                type: 'float',
                default: '800'
            },
            'sv_maxspeed': {
                description: 'Maximum player movement speed',
                min: '0',
                max: '1000',
                type: 'float',
                default: '320'
            },
            'sv_friction': {
                description: 'Ground friction (higher = more friction)',
                min: '0',
                max: '100',
                type: 'float',
                default: '4'
            },
            'sv_accelerate': {
                description: 'Ground acceleration multiplier',
                min: '0',
                max: '100',
                type: 'float',
                default: '5.5'
            },
            'sv_stopspeed': {
                description: 'Speed threshold for stopping',
                min: '0',
                max: '1000',
                type: 'float',
                default: '80'
            }
        };
        
        // Get command info
        const info = commandInfo[commandName];
        if (!info) {
            return `Console command: ${commandName}`;
        }
        
        // Build tooltip content
        let tooltipText = `${commandName}\n\n${info.description}`;
        
        // Add default value if provided
        if (defaultValue !== '') {
            tooltipText += `\n\nDefault: ${defaultValue}`;
        } else if (info.default) {
            tooltipText += `\n\nDefault: ${info.default}`;
        }
        
        // Add min/max values if they exist
        if (info.min !== '0' || info.max !== '0') {
            if (info.type === 'boolean') {
                tooltipText += `\n\nValues: ${info.values || '0=disabled, 1=enabled'}`;
            } else if (info.values) {
                tooltipText += `\n\nValues: ${info.values}`;
            } else {
                tooltipText += `\n\nRange: ${info.min} to ${info.max}`;
            }
        }
        
        return tooltipText;
    }

    /* 7. Function to handle the accordion functionality (show/hide sections) */
    function setupAccordion() {
        /* 4.1 Select all accordion headers and set up click event listeners */
        document.querySelectorAll('.accordion-header').forEach(button => {
            button.addEventListener('click', () => {
                /* 4.2 Get the content section related to the clicked header */
                const accordionContent = button.nextElementSibling;
                const arrow = button.querySelector('.accordion-arrow');
                
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
            const currentConfig = configSelector.value;
            cvarsData.forEach(cvar => {
                var inputElement = document.getElementById(cvar.cvarName);
                if (inputElement) {
                    inputElement.value = cvar.defaultValue;
                    const storageKey = `${currentConfig}_${cvar.cvarName}`;
                    localStorage.setItem(storageKey, cvar.defaultValue);
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
        loadConfigValues(selectedFile);
    });

    /* 14. Initialize by loading all configs */
    loadAllConfigs();

    /* 15. Setup interactive features */
    setupInteractiveFeatures();
});

/* 16. Function to filter commands based on search term */
function filterCommands(searchTerm) {
    const formGroups = document.querySelectorAll('.form-group');
    let visibleCount = 0;
    let categoryVisibility = {};
    
    formGroups.forEach(group => {
        const label = group.querySelector('label');
        const input = group.querySelector('input');
        
        if (label && input) {
            const commandName = label.textContent.toLowerCase();
            const commandValue = input.value.toLowerCase();
            const cvarName = input.name.toLowerCase();
            
            // Check if search term matches command name, value, or cvar name
            const matches = searchTerm === '' || 
                           commandName.includes(searchTerm) || 
                           commandValue.includes(searchTerm) || 
                           cvarName.includes(searchTerm);
            
            if (matches) {
                group.style.display = 'block';
                visibleCount++;
                
                // Track which categories have visible commands
                const category = group.closest('.accordion-content');
                if (category) {
                    const categoryId = category.querySelector('form').id;
                    categoryVisibility[categoryId] = true;
                }
            } else {
                group.style.display = 'none';
            }
        }
    });
    
    // Show/hide accordion sections based on whether they have visible commands
    const accordionSections = document.querySelectorAll('.accordion-section');
    accordionSections.forEach(section => {
        const content = section.querySelector('.accordion-content');
        const form = content.querySelector('form');
        const hasVisibleCommands = categoryVisibility[form.id] || searchTerm === '';
        
        if (hasVisibleCommands) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Update status
    if (searchTerm) {
        showToast(`Found ${visibleCount} matching commands`, 'info');
    }
}

/* 17. Function to setup all interactive features */
function setupInteractiveFeatures() {
    // Copy to clipboard functionality
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const output = document.getElementById('output');
            if (output.value) {
                navigator.clipboard.writeText(output.value).then(() => {
                    showToast('Config copied to clipboard!', 'success');
                }).catch(() => {
                    showToast('Failed to copy to clipboard', 'error');
                });
            }
        });
    }

    // Download functionality
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const output = document.getElementById('output');
            if (output.value) {
                const blob = new Blob([output.value], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'server.cfg';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                showToast('Config downloaded!', 'success');
            }
        });
    }

    // Search functionality
    const searchInput = document.getElementById('commandSearch');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const clearBtn = document.getElementById('clearSearchBtn');
            
            // Show/hide clear button
            if (searchTerm.length > 0) {
                clearBtn.style.display = 'block';
            } else {
                clearBtn.style.display = 'none';
            }
            
            // Filter commands
            filterCommands(searchTerm);
        });
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            const searchInput = document.getElementById('commandSearch');
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            filterCommands('');
        });
    }

    // Expand/Collapse All functionality
    const expandAllBtn = document.getElementById('expandAllBtn');
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', () => {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            const isAllExpanded = Array.from(accordionHeaders).every(header => header.classList.contains('active'));
            
            accordionHeaders.forEach(header => {
                const accordionContent = header.nextElementSibling;
                
                if (isAllExpanded) {
                    // Collapse all
                    header.classList.remove('active');
                    accordionContent.style.display = 'none';
                } else {
                    // Expand all
                    header.classList.add('active');
                    accordionContent.style.display = 'block';
                }
            });
            
            // Update button text
            expandAllBtn.innerHTML = isAllExpanded ? 
                '<svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg><span>Expand All</span>' :
                '<svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg><span>Collapse All</span>';
        });
    }



    // Update status bar
    updateStatusBar();
}

/* 18. Function to show toast notifications */
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast fixed top-4 right-4 z-50 px-4 py-2 rounded-md text-white text-sm font-medium transition-all duration-300 transform translate-x-full`;
    
    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600'
    };
    
    toast.classList.add(colors[type] || colors.info);
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

/* 19. Function to update status bar */
function updateStatusBar() {
    // Status bar removed, but keeping function for future use if needed
    console.log(`Current config loaded with ${cvarsData.length} commands`);
}
