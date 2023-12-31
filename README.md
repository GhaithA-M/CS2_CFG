# CS2_CFG
A web app for CS2 server operators, it generates organized and commented **server.cfg** cvars.


The cvars are derived from the default **gamemode_casual.cfg** configuration file that runs on fresh official CS2 casual servers.
Included in the **python** folder is a simple script which automates the process of adapting the **gamemode_casual.cfg** file to the syntax format accepted by **cvars.js**.


Input your cvar variable and copy / paste the output into your **server.cfg** file.

----------------------------------------------------------------------------------
Custom **cvars.js**:

For creating your own **cvars.js**, I've provided this python script. Inside there's an example output, based on the provided **gamemode_casual.cfg** file.


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
```
The default category is 'custom'.