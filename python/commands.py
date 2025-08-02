# Author: Ghaith Al-Maliki
# Email: ermiyalea@mozmail.com
# GitHub: https://github.com/GhaithA-M/CS2_CFG/
# Steam: https://steamcommunity.com/id/Ralfidogg/

import sys

def format_command(cvar_name, default_value, comment):
    normal_name = cvar_name.replace('_', ' ').title()
    return {
        "normalName": normal_name,
        "cvarName": cvar_name,
        "defaultValue": default_value,
        "comment": comment,
        "category": "custom",
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
