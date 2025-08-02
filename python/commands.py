#   Author: Ralfidogg (GAM)
#   Email: ermiyalea@mozmail.com
#   GitHub: https://github.com/GhaithA-M/CS2_CFG/
#   Steam: https://steamcommunity.com/id/Ralfidogg/

import sys

def auto_categorize_command(cvar_name):
    """Auto-categorize commands based on their names"""
    cvar_lower = cvar_name.lower()
    
    if cvar_lower in ['hostname', 'sv_password', 'rcon_password']:
        return 'gen'
    elif any(word in cvar_lower for word in ['bunny', 'bhop', 'stamina', 'air', 'surf']):
        return 'bhop'
    elif any(word in cvar_lower for word in ['time', 'round', 'freeze', 'warmup']):
        return 'time'
    elif cvar_lower.startswith('bot_') or 'bot' in cvar_lower:
        return 'bot'
    elif any(word in cvar_lower for word in ['cash_', 'money', 'startmoney', 'maxmoney']):
        return 'cash'
    elif any(word in cvar_lower for word in ['ff_', 'friendlyfire', 'friendly_fire']):
        return 'ff'
    elif any(word in cvar_lower for word in ['mp_', 'maxplayers', 'maxrounds', 'halftime']):
        return 'mp'
    elif any(word in cvar_lower for word in ['talk', 'vote', 'alltalk', 'deadtalk']):
        return 'talk'
    elif any(word in cvar_lower for word in ['ammo_', 'grenade', 'infinite_ammo']):
        return 'ammo'
    elif any(word in cvar_lower for word in ['spawn', 'default_']):
        return 'ds'
    elif any(word in cvar_lower for word in ['sv_', 'tv_', 'spec_']):
        return 'misc'
    else:
        return 'custom'

def format_command(cvar_name, default_value, comment):
    normal_name = cvar_name.replace('_', ' ').title()
    category = auto_categorize_command(cvar_name)
    return {
        "normalName": normal_name,
        "cvarName": cvar_name,
        "defaultValue": default_value,
        "comment": comment,
        "category": category,
        "enableTooltip": "false",
        "description": ""
    }

def format_command_string(command):
    lines = [
        "    {",
        f"        normalName: '{command['normalName']}',",
        f"        cvarName: '{command['cvarName']}',",
        f"        defaultValue: '{command['defaultValue']}',",
        f"        comment: '{command['comment']}',",
        f"        category: '{command['category']}',",
        "        enableTooltip: false,",
        "        description: ''",
        "    },"
    ]
    return "\n".join(lines)

def process_line(line):
    if "//" in line:
        parts = line.split('//')
        command_parts = parts[0].strip().split()

        if len(command_parts) < 2:
            return None

        cvar_name = command_parts[0]
        default_value = command_parts[1]
        comment = parts[1].strip()
    else:
        command_parts = line.strip().split()

        if len(command_parts) < 2:
            return None

        cvar_name = command_parts[0]
        default_value = command_parts[1]
        comment = ""

    return format_command(cvar_name, default_value, comment)

def process_file(input_file, output_file):
    commands = []
    with open(input_file, 'r') as file:
        for line in file:
            if line.strip() and not line.strip().startswith('//'):
                command = process_line(line.strip())
                if command:
                    commands.append(command)

    with open(output_file, 'w') as file:
        file.write("var cvarsData = [\n")
        for command in commands:
            file.write(format_command_string(command) + "\n")
        file.write("];\n")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python commands.py <input_file> <output_file>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    process_file(input_file, output_file)
