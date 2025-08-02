# CS2_CFG
A web app for CS2 server operators, used to create / customize configuration files with a GUI.

Has the ability to reformat your existing .cfg and retain it's comments and values into a custom **server.cfg**.

For creating your own **custom.json**, I've provided a python script.
The cvars are derived from the default **gamemode_competitive.cfg** configuration file that runs on fresh official CS2 casual servers.
Included in the **python** folder is a simple script which automates the process of adapting any **gamemode_#.cfg** file to .json.

----------------------------------------------------------------------------------

When formatted by the commands.py script a cvar will go from looking like this:
```c
mp_death_drop_grenade       2			// 0=none, 1=best, 2=current or best
mp_death_drop_gun           1			// 0=none, 1=best, 2=current or best
```
to looking like this:
```js
    {
        normalName: 'Mp Death Drop Grenade',
        cvarName: 'mp_death_drop_grenade',
        defaultValue: '2',
        comment: '0=none, 1=best, 2=current or best',
        category: 'custom',
        enableTooltip: false,
        description: ''
    },
    {
        normalName: 'Mp Death Drop Gun',
        cvarName: 'mp_death_drop_gun',
        defaultValue: '1',
        comment: '0=none, 1=best, 2=current or best',
        category: 'custom',
        enableTooltip: false,
        description: ''
    },
```

## Category Rules

The `commands.py` script automatically categorizes CS2 server commands based on their names. Here are the rules for each category:

### **Category Mapping:**

| Category | Description | Command Patterns |
|----------|-------------|------------------|
| `gen` | **General** - Server basics | `hostname`, `sv_password`, `rcon_password` |
| `bhop` | **Surfing & Bunnyhopping** - Movement settings | Contains: `bunny`, `bhop`, `stamina`, `air`, `surf` |
| `time` | **Time** - Round timing | Contains: `time`, `round`, `freeze`, `warmup` |
| `bot` | **Bot** - AI player settings | Starts with `bot_` or contains `bot` |
| `cash` | **Cash** - Economy settings | Contains: `cash_`, `money`, `startmoney`, `maxmoney` |
| `ff` | **Friendly Fire** - Team damage | Contains: `ff_`, `friendlyfire`, `friendly_fire` |
| `mp` | **Multiplayer** - Game mode settings | Contains: `mp_`, `maxplayers`, `maxrounds`, `halftime` |
| `talk` | **Talking & Voting** - Communication | Contains: `talk`, `vote`, `alltalk`, `deadtalk` |
| `ammo` | **Ammo** - Weapon/ammo settings | Contains: `ammo_`, `grenade`, `infinite_ammo` |
| `ds` | **Default Spawn** - Spawn settings | Contains: `spawn`, `default_` |
| `misc` | **Miscellaneous** - Other server settings | Contains: `sv_`, `tv_`, `spec_` |
| `custom` | **Custom** - Everything else | Commands that don't match any other pattern |

### **How It Works:**

The `auto_categorize_command()` function in `commands.py` uses these rules:

1. **Exact matches** for specific commands (like `hostname` → `gen`)
2. **Pattern matching** for command prefixes and keywords
3. **Fallback to `custom`** for any unmatched commands

### **Adding New Categories:**

To add a new category, modify the `auto_categorize_command()` function in `commands.py`:

```python
def auto_categorize_command(cvar_name):
    cvar_lower = cvar_name.lower()
    
    # Add your new category rule here
    elif any(word in cvar_lower for word in ['your_keyword']):
        return 'your_category'
    
    # ... existing rules ...
```

### **Category Display:**

These categories correspond to the accordion sections in the GUI:
- **General** - Server hostname, passwords, basic settings
- **Surfing & Bunnyhopping** - Movement and physics settings  
- **Time** - Round timing, freeze time, warmup
- **Bot** - AI player behavior and settings
- **Cash** - Economy, money rewards, starting cash
- **Friendly Fire** - Team damage settings
- **Multiplayer** - Game mode, player limits, round settings
- **Talking & Voting** - Communication and voting systems
- **Ammo** - Weapon ammunition and grenade settings
- **Default Spawn** - Player spawn settings
- **Miscellaneous** - Other server variables
- **Custom** - Uncategorized commands
