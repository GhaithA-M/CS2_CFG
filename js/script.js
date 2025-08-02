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
            div.className = 'form-group flex items-center space-x-3 p-3 bg-cs-gray rounded-md hover:bg-cs-gray/80 transition-colors';

            /* 3.3.2 Create and set up the label for the input field */
            var label = document.createElement('label');
            label.htmlFor = cvar.cvarName;
            label.textContent = cvar.cvarName + ':';
            label.className = 'text-sm font-mono text-white min-w-0 flex-1';
            div.appendChild(label);

            /* 3.3.3 Create and set up the input field */
            var input = document.createElement('input');
            input.type = 'text';
            input.id = cvar.cvarName;
            input.name = cvar.cvarName;
            input.className = 'bg-cs-light-gray border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cs-green focus:ring-1 focus:ring-cs-green/20 transition-colors w-32';
            
            // Get the current config filename for localStorage key
            const currentConfig = configSelector.value;
            const storageKey = `${currentConfig}_${cvar.cvarName}`;
            
            // Use stored value if it exists and is different from default, otherwise use default
            const storedValue = localStorage.getItem(storageKey);
            input.value = (storedValue && storedValue !== cvar.defaultValue) ? storedValue : cvar.defaultValue;
            
            /* 3.3.4 Attach an event listener to update the output when the input changes */
            input.addEventListener('input', function() {
                localStorage.setItem(storageKey, input.value);
                updateOutput();
            });
            div.appendChild(input);

            /* 3.3.5 Create a tooltip with command description */
            var tooltip = document.createElement('button');
            tooltip.className = 'tooltip p-1.5 rounded-md hover:bg-cs-light-gray transition-colors text-gray-400 hover:text-cs-green flex-shrink-0';
            tooltip.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            tooltip.setAttribute('title', getCommandDescription(cvar.cvarName));
            div.appendChild(tooltip);

            /* 3.3.6 Append the entire cvar input container to the form */
            form.appendChild(div);
        });
    }

    /* 6.5 Function to get command descriptions from Valve wiki */
    function getCommandDescription(commandName) {
        const descriptions = {
            // General Commands
            'hostname': 'Sets the server hostname that appears in the server browser',
            'sv_password': 'Sets a password required to join the server',
            'sv_region': 'Sets the server region (0=US East, 1=US West, 2=South America, 3=Europe, 4=Asia, 5=Australia, 6=Middle East, 7=Africa)',
            'sv_lan': 'Enables LAN mode (0=Internet, 1=LAN only)',
            'sv_cheats': 'Enables cheats on the server (0=disabled, 1=enabled)',
            'sv_pure': 'Enables pure server mode (0=disabled, 1=enabled)',
            'sv_pure_kick_clients': 'Kicks clients that don\'t match pure server requirements',
            
            // Bot Commands
            'bot_quota': 'Sets the number of bots to maintain on the server',
            'bot_quota_mode': 'Sets bot quota mode (fill=fill empty slots, match=maintain ratio)',
            'bot_difficulty': 'Sets bot difficulty (0=easy, 1=normal, 2=hard, 3=expert)',
            'bot_join_team': 'Sets which team bots join (any, t, ct)',
            'bot_join_after_player': 'Bots join after a player joins (0=disabled, 1=enabled)',
            'bot_defer_to_human_goals': 'Bots defer to human goals (0=disabled, 1=enabled)',
            'bot_defer_to_human_items': 'Bots defer to human items (0=disabled, 1=enabled)',
            'bot_autodifficulty_threshold_high': 'Threshold above which bots lower difficulty',
            'bot_autodifficulty_threshold_low': 'Threshold below which bots raise difficulty',
            'bot_chatter': 'Sets bot chatter mode (off, minimal, radio, normal)',
            
            // Cash/Economy Commands
            'cash_player_bomb_defused': 'Cash reward for defusing the bomb',
            'cash_player_bomb_planted': 'Cash reward for planting the bomb',
            'cash_player_killed_enemy_default': 'Default cash reward for killing an enemy',
            'cash_player_killed_enemy_factor': 'Multiplier for cash rewards',
            'cash_player_killed_teammate': 'Cash penalty for killing a teammate',
            'cash_player_rescued_hostage': 'Cash reward for rescuing a hostage',
            'cash_team_elimination_bomb_map': 'Team cash reward for elimination on bomb maps',
            'cash_team_elimination_hostage_map_t': 'T team cash reward for elimination on hostage maps',
            'cash_team_elimination_hostage_map_ct': 'CT team cash reward for elimination on hostage maps',
            'cash_team_loser_bonus': 'Cash bonus for losing team',
            'cash_team_loser_bonus_consecutive_rounds': 'Additional cash for consecutive losses',
            'cash_team_planted_bomb_but_defused': 'Cash reward for planting bomb but it gets defused',
            'cash_team_rescued_hostage': 'Team cash reward for hostage rescue',
            'cash_team_terrorist_win_bomb': 'T team cash reward for bomb explosion',
            'cash_team_win_by_defusing_bomb': 'CT team cash reward for defusing bomb',
            'cash_team_win_by_hostage_rescue': 'CT team cash reward for hostage rescue',
            'cash_team_win_by_time_running_out_hostage': 'CT team cash reward for time running out on hostage maps',
            'cash_team_win_by_time_running_out_bomb': 'CT team cash reward for time running out on bomb maps',
            'mp_starting_losses': 'Number of consecutive losses to start with',
            'mp_afterroundmoney': 'Money given after each round',
            'mp_startmoney': 'Starting money for each player',
            'mp_maxmoney': 'Maximum money a player can have',
            
            // Friendly Fire Commands
            'ff_damage_reduction_bullets': 'Damage reduction for friendly fire bullets',
            'ff_damage_reduction_grenade': 'Damage reduction for friendly fire grenades',
            'ff_damage_reduction_grenade_self': 'Damage reduction for self-inflicted grenade damage',
            'ff_damage_reduction_other': 'Damage reduction for other friendly fire sources',
            'mp_friendlyfire': 'Enables friendly fire (0=disabled, 1=enabled)',
            
            // Match Play Commands
            'mp_roundtime': 'Round time in minutes',
            'mp_roundtime_defuse': 'Round time for defuse maps',
            'mp_roundtime_hostage': 'Round time for hostage maps',
            'mp_freezetime': 'Freeze time at round start in seconds',
            'mp_buytime': 'Buy time at round start in seconds',
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
            'tv_delay': 'TV delay in seconds',
            'spec_freeze_time': 'Spectator freeze time in seconds',
            'spec_freeze_panel_extended_time': 'Extended freeze panel time',
            'cl_drawhud_force_radar': 'Force radar display (-1=auto, 0=disabled, 1=enabled)',
            'exec': 'Execute a config file',
            'hostname': 'Set server hostname'
        };
        
        return descriptions[commandName] || `Console command: ${commandName}`;
    }

    /* 7. Function to handle the accordion functionality (show/hide sections) */
    function setupAccordion() {
        /* 4.1 Select all accordion headers and set up click event listeners */
        document.querySelectorAll('.accordion-header').forEach(button => {
            button.addEventListener('click', () => {
                /* 4.2 Get the content section related to the clicked header */
                const accordionContent = button.nextElementSibling;
                const arrow = button.querySelector('svg:last-child');
                
                /* 4.3 Toggle the active class to show/hide the content */
                button.classList.toggle('active');
                if (button.classList.contains('active')) {
                    accordionContent.classList.remove('hidden');
                    accordionContent.classList.add('block');
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                } else {
                    accordionContent.classList.remove('block');
                    accordionContent.classList.add('hidden');
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
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
        switchToConfig(selectedFile);
    });

    /* 14. Initialize by loading all configs */
    loadAllConfigs();

    /* 15. Setup interactive features */
    setupInteractiveFeatures();
});

/* 16. Function to setup all interactive features */
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

    // Expand/Collapse All functionality
    const expandAllBtn = document.getElementById('expandAllBtn');
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', () => {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            const isAllExpanded = Array.from(accordionHeaders).every(header => header.classList.contains('active'));
            
            accordionHeaders.forEach(header => {
                const accordionContent = header.nextElementSibling;
                const arrow = header.querySelector('svg:last-child');
                
                if (isAllExpanded) {
                    // Collapse all
                    header.classList.remove('active');
                    accordionContent.classList.remove('block');
                    accordionContent.classList.add('hidden');
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                } else {
                    // Expand all
                    header.classList.add('active');
                    accordionContent.classList.remove('hidden');
                    accordionContent.classList.add('block');
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                }
            });
            
            // Update button text
            expandAllBtn.innerHTML = isAllExpanded ? 
                '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg><span>Expand All</span>' :
                '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg><span>Collapse All</span>';
        });
    }



    // Update status bar
    updateStatusBar();
}

/* 17. Function to show toast notifications */
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

/* 18. Function to update status bar */
function updateStatusBar() {
    // Status bar removed, but keeping function for future use if needed
    console.log(`Current config loaded with ${cvarsData.length} commands`);
}
