# CS2_CFG
A web app for CS2 server operators, it reformats your .cfg and retains comments into a custom **server.cfg**.


The cvars are derived from the default **gamemode_casual.cfg** configuration file that runs on fresh official CS2 casual servers.
Included in the **python** folder is a simple script which automates the process of adapting any **gamemode_#.cfg** file to json.


Input your cvar variable and copy / paste the output into your **server.cfg** file.

----------------------------------------------------------------------------------

Custom **cvars.json**:

For creating your own **cvars.json**, I've provided a python script.

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
The default category is 'custom'.
