var cvarsData = [
    {
        normalName: 'Bot Autodifficulty Threshold High',
        cvarName: 'bot_autodifficulty_threshold_high',
        defaultValue: '0.0',
        comment: 'Value between -20.0 and 20.0 (Amount above avg human contribution score, above which a bot should lower its difficulty)',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Bot Autodifficulty Threshold Low',
        cvarName: 'bot_autodifficulty_threshold_low',
        defaultValue: '-2.0',
        comment: 'Value between -20.0 and 20.0 (Amount below avg human contribution score, below which a bot should raise its difficulty)',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Bot Chatter',
        cvarName: 'bot_chatter',
        defaultValue: 'normal',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Bot Defer To Human Goals',
        cvarName: 'bot_defer_to_human_goals',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Bot Defer To Human Items',
        cvarName: 'bot_defer_to_human_items',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Bot Difficulty',
        cvarName: 'bot_difficulty',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Bot Quota',
        cvarName: 'bot_quota',
        defaultValue: '10',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Bot Quota Mode',
        cvarName: 'bot_quota_mode',
        defaultValue: 'fill',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Player Bomb Defused',
        cvarName: 'cash_player_bomb_defused',
        defaultValue: '200',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Player Bomb Planted',
        cvarName: 'cash_player_bomb_planted',
        defaultValue: '200',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Player Damage Hostage',
        cvarName: 'cash_player_damage_hostage',
        defaultValue: '-30',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Player Interact With Hostage',
        cvarName: 'cash_player_interact_with_hostage',
        defaultValue: '300',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Player Killed Enemy Default',
        cvarName: 'cash_player_killed_enemy_default',
        defaultValue: '200',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Player Killed Enemy Factor',
        cvarName: 'cash_player_killed_enemy_factor',
        defaultValue: '0.5',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Player Killed Hostage',
        cvarName: 'cash_player_killed_hostage',
        defaultValue: '-1000',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Player Killed Teammate',
        cvarName: 'cash_player_killed_teammate',
        defaultValue: '-300',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Player Rescued Hostage',
        cvarName: 'cash_player_rescued_hostage',
        defaultValue: '1000',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Elimination Bomb Map',
        cvarName: 'cash_team_elimination_bomb_map',
        defaultValue: '2700',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Elimination Hostage Map T',
        cvarName: 'cash_team_elimination_hostage_map_t',
        defaultValue: '2000',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Elimination Hostage Map Ct',
        cvarName: 'cash_team_elimination_hostage_map_ct',
        defaultValue: '2300',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Hostage Alive',
        cvarName: 'cash_team_hostage_alive',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Hostage Interaction',
        cvarName: 'cash_team_hostage_interaction',
        defaultValue: '500',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Loser Bonus',
        cvarName: 'cash_team_loser_bonus',
        defaultValue: '2400',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Bonus Shorthanded',
        cvarName: 'cash_team_bonus_shorthanded',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Loser Bonus Consecutive Rounds',
        cvarName: 'cash_team_loser_bonus_consecutive_rounds',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Planted Bomb But Defused',
        cvarName: 'cash_team_planted_bomb_but_defused',
        defaultValue: '200',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Rescued Hostage',
        cvarName: 'cash_team_rescued_hostage',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Terrorist Win Bomb',
        cvarName: 'cash_team_terrorist_win_bomb',
        defaultValue: '2700',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Win By Defusing Bomb',
        cvarName: 'cash_team_win_by_defusing_bomb',
        defaultValue: '2700',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Win By Hostage Rescue',
        cvarName: 'cash_team_win_by_hostage_rescue',
        defaultValue: '3000',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Win By Time Running Out Hostage',
        cvarName: 'cash_team_win_by_time_running_out_hostage',
        defaultValue: '2000',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Cash Team Win By Time Running Out Bomb',
        cvarName: 'cash_team_win_by_time_running_out_bomb',
        defaultValue: '2700',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Ff Damage Reduction Bullets',
        cvarName: 'ff_damage_reduction_bullets',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Ff Damage Reduction Grenade',
        cvarName: 'ff_damage_reduction_grenade',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Ff Damage Reduction Grenade Self',
        cvarName: 'ff_damage_reduction_grenade_self',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Ff Damage Reduction Other',
        cvarName: 'ff_damage_reduction_other',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Afterroundmoney',
        cvarName: 'mp_afterroundmoney',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Buytime',
        cvarName: 'mp_buytime',
        defaultValue: '45',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Buy Anywhere',
        cvarName: 'mp_buy_anywhere',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Buy During Immunity',
        cvarName: 'mp_buy_during_immunity',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Death Drop Defuser',
        cvarName: 'mp_death_drop_defuser',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Death Drop Grenade',
        cvarName: 'mp_death_drop_grenade',
        defaultValue: '2',
        comment: '0=none, 1=best, 2=current or best',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Death Drop Gun',
        cvarName: 'mp_death_drop_gun',
        defaultValue: '1',
        comment: '0=none, 1=best, 2=current or best',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Fists Replace Melee',
        cvarName: 'mp_fists_replace_melee',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Defuser Allocation',
        cvarName: 'mp_defuser_allocation',
        defaultValue: '2',
        comment: '0=none, 1=random, 2=everyone',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Force Pick Time',
        cvarName: 'mp_force_pick_time',
        defaultValue: '15',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Forcecamera',
        cvarName: 'mp_forcecamera',
        defaultValue: '0',
        comment: 'Set to 1 for team only spectating.',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Free Armor',
        cvarName: 'mp_free_armor',
        defaultValue: '2',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Freezetime',
        cvarName: 'mp_freezetime',
        defaultValue: '5',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Friendlyfire',
        cvarName: 'mp_friendlyfire',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Win Panel Display Time',
        cvarName: 'mp_win_panel_display_time',
        defaultValue: '3',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Respawn Immunitytime',
        cvarName: 'mp_respawn_immunitytime',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Halftime',
        cvarName: 'mp_halftime',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Match Can Clinch',
        cvarName: 'mp_match_can_clinch',
        defaultValue: '1',
        comment: '0=No mercy rule, 1=team can clinch match win early if they win > 1/2 total rounds',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Maxmoney',
        cvarName: 'mp_maxmoney',
        defaultValue: '10000',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Maxrounds',
        cvarName: 'mp_maxrounds',
        defaultValue: '15',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Molotovusedelay',
        cvarName: 'mp_molotovusedelay',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Playercashawards',
        cvarName: 'mp_playercashawards',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Roundtime',
        cvarName: 'mp_roundtime',
        defaultValue: '3',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Roundtime Hostage',
        cvarName: 'mp_roundtime_hostage',
        defaultValue: '2',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Roundtime Defuse',
        cvarName: 'mp_roundtime_defuse',
        defaultValue: '2.25',
        comment: 'Typical ValveOfficial Casual defuse rounds are 90-100 seconds.',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Solid Teammates',
        cvarName: 'mp_solid_teammates',
        defaultValue: '2',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Startmoney',
        cvarName: 'mp_startmoney',
        defaultValue: '1000',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Teamcashawards',
        cvarName: 'mp_teamcashawards',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Timelimit',
        cvarName: 'mp_timelimit',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Warmuptime',
        cvarName: 'mp_warmuptime',
        defaultValue: '90',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Weapons Allow Zeus',
        cvarName: 'mp_weapons_allow_zeus',
        defaultValue: '2',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Weapons Allow Typecount',
        cvarName: 'mp_weapons_allow_typecount',
        defaultValue: '2',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Spec Freeze Panel Extended Time',
        cvarName: 'spec_freeze_panel_extended_time',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Spec Freeze Time',
        cvarName: 'spec_freeze_time',
        defaultValue: '3.0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Sv Allow Votes',
        cvarName: 'sv_allow_votes',
        defaultValue: '1',
        comment: 'Voting allowed in this mode',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Sv Talk Enemy Living',
        cvarName: 'sv_talk_enemy_living',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Sv Talk Enemy Dead',
        cvarName: 'sv_talk_enemy_dead',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Sv Vote To Changelevel Before Match Point',
        cvarName: 'sv_vote_to_changelevel_before_match_point',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Sv Deadtalk',
        cvarName: 'sv_deadtalk',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Sv Ignoregrenaderadio',
        cvarName: 'sv_ignoregrenaderadio',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Tv Delay',
        cvarName: 'tv_delay',
        defaultValue: '30',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Warmup Pausetimer',
        cvarName: 'mp_warmup_pausetimer',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Halftime Pausetimer',
        cvarName: 'mp_halftime_pausetimer',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Randomspawn',
        cvarName: 'mp_randomspawn',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Randomspawn Los',
        cvarName: 'mp_randomspawn_los',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Sv Infinite Ammo',
        cvarName: 'sv_infinite_ammo',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Ammo Grenade Limit Flashbang',
        cvarName: 'ammo_grenade_limit_flashbang',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Ammo Grenade Limit Total',
        cvarName: 'ammo_grenade_limit_total',
        defaultValue: '3',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Weapons Allow Map Placed',
        cvarName: 'mp_weapons_allow_map_placed',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Weapons Glow On Ground',
        cvarName: 'mp_weapons_glow_on_ground',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Display Kill Assists',
        cvarName: 'mp_display_kill_assists',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Respawn On Death T',
        cvarName: 'mp_respawn_on_death_t',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Respawn On Death Ct',
        cvarName: 'mp_respawn_on_death_ct',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Ct Default Melee',
        cvarName: 'mp_ct_default_melee',
        defaultValue: 'weapon_knife',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Ct Default Secondary',
        cvarName: 'mp_ct_default_secondary',
        defaultValue: 'weapon_hkp2000',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Ct Default Primary',
        cvarName: 'mp_ct_default_primary',
        defaultValue: '""',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp T Default Melee',
        cvarName: 'mp_t_default_melee',
        defaultValue: 'weapon_knife',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp T Default Secondary',
        cvarName: 'mp_t_default_secondary',
        defaultValue: 'weapon_glock',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp T Default Primary',
        cvarName: 'mp_t_default_primary',
        defaultValue: '""',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Default Team Winner No Objective',
        cvarName: 'mp_default_team_winner_no_objective',
        defaultValue: '-1',
        comment: '2 == CTs, 3 == Ts',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Sv Occlude Players',
        cvarName: 'sv_occlude_players',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Occlusion Test Async',
        cvarName: 'occlusion_test_async',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Spec Replay Enable',
        cvarName: 'spec_replay_enable',
        defaultValue: '1',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Round Restart Delay',
        cvarName: 'mp_round_restart_delay',
        defaultValue: '10',
        comment: 'need more time for replay',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Sv Gameinstructor Enable',
        cvarName: 'sv_gameinstructor_enable',
        defaultValue: '0',
        comment: '',
        category: 'misc',
        enableTooltip: false,
        description: ''
    },
];
