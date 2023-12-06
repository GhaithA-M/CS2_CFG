// cvars.js
/* Example

    {
        normalName: 'Example',
        cvarName: 'sv_cvar',
        defaultValue: '69',
        comment: 'CVAR COMMENT',
        description: 'TOOLTIP TEXT',
        enableTooltip: false
    },

*/

var cvarsData = [
    {
        normalName: 'Server Name',
        cvarName: 'hostname',
        defaultValue: 'Counter-Strike 2 Dedicated Server',
        comment: 'Name of server, 45 characters max',
        description: 'TOOLTIP TEXT',
        enableTooltip: false
    },

    {
        normalName: 'Round Time',
        cvarName: 'mp_roundtime',
        defaultValue: '60',
        comment: 'Round duration in minutes',
        description: 'The duration of each round in minutes',
        enableTooltip: true
    },
    {
        normalName: 'Start Money',
        cvarName: 'mp_startmoney',
        defaultValue: '800',
        comment: 'Initial money amount',
        description: 'Sets the amount of money players start with',
        enableTooltip: false
    },

// BHop CVars
    {
        normalName: 'BHopping',
        cvarName: 'sv_enablebunnyhopping',
        defaultValue: '0',
        comment: 'Enables better bunnyhopping',
        description: 'TOOLTIP TEXT',
        enableTooltip: false
    },
    {
        normalName: 'Auto-Jumping',
        cvarName: 'sv_autobunnyhopping',
        defaultValue: 'false',
        comment: 'Enables auto jumping when holding space',
        description: 'Enables auto jumping when holding space',
        enableTooltip: true
    },
    {
        normalName: 'Stamina Recovery Rate',
        cvarName: 'sv_staminarecoveryrate',
        defaultValue: '60',
        comment: 'The rate at which the player recovers stamina',
        description: 'TOOLTIP TEXT',
        enableTooltip: false
    },
    {
        normalName: 'Max Velocity',
        cvarName: 'sv_maxvelocity',
        defaultValue: '350',
        comment: 'The max rate at which the player can move',
        description: 'This cvar also changes maximum grenade velocity, can break grenade throwing.',
        enableTooltip: true
    },
    {
        normalName: 'Maximum Stamina',
        cvarName: 'sv_staminamax',
        defaultValue: '80',
        comment: 'The maximum amount of player stamina',
        description: 'TOOLTIP TEXT',
        enableTooltip: false
    },
    {
        normalName: 'Landing Stamina Cost',
        cvarName: 'sv_staminalandcost',
        defaultValue: '0',
        comment: 'The stamina cost for landing',
        description: 'TOOLTIP TEXT',
        enableTooltip: false
    },
    {
        normalName: 'Jumping Stamina Cost',
        cvarName: 'sv_staminajumpcost',
        defaultValue: '0',
        comment: 'The stamina cost for jumping',
        description: 'TOOLTIP TEXT',
        enableTooltip: false
    },
    {
        normalName: 'Air Acceleration',
        cvarName: 'sv_airaccelerate',
        defaultValue: '12',
        comment: 'Sets mobility when in the air',
        description: 'TOOLTIP TEXT',
        enableTooltip: false
    },
    // ... add more cvars here ...
];
