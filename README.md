# CS2_CFG
A web app for CS2 server operators, it generates a pretty, commented **server.cfg** file.


The CVars come from the default **gamemode_casual.cfg** configuration file that runs on fresh CS2 servers.
Included in the **python** folder is a simple script which automates the process of adapting the **gamemode_casual.cfg** file to the format accepted by **cvars.js**.


Input your cvar values and copy / paste the output into your **server.cfg** file.


A cvar will look like this when formatted by the commands.py script:
```c
mp_death_drop_grenade								2			// 0=none, 1=best, 2=current or best
mp_death_drop_gun									1			// 0=none, 1=best, 2=current or best
```

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

The default category is 'misc'.