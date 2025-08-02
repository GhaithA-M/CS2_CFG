#   Author: Ralfidogg (GAM)
#   Email: ermiyalea@mozmail.com
#   GitHub: https://github.com/GhaithA-M/CS2_CFG/
#   Steam: https://steamcommunity.com/id/Ralfidogg/

import sys
import json

def auto_categorize_command(cvar_name):
    """
    Auto-categorize CS2 server commands based on their names.
    This function looks at the command name and assigns it to the appropriate category
    that matches the HTML form sections in the web app.
    """
    cvar_lower = cvar_name.lower()
    
    # General server settings (hostname, passwords, etc.)
    if cvar_lower in ['hostname', 'sv_password', 'rcon_password']:
        return 'gen'
    
    # Surfing & Bunnyhopping settings
    elif any(word in cvar_lower for word in ['bunny', 'bhop', 'stamina', 'air', 'surf']):
        return 'bhop'
    
    # Time-related settings (round time, freeze time, etc.)
    elif any(word in cvar_lower for word in ['time', 'round', 'freeze', 'warmup']):
        return 'time'
    
    # Bot settings
    elif cvar_lower.startswith('bot_') or 'bot' in cvar_lower:
        return 'bot'
    
    # Cash/Money settings
    elif any(word in cvar_lower for word in ['cash_', 'money', 'startmoney', 'maxmoney']):
        return 'cash'
    
    # Friendly Fire settings
    elif any(word in cvar_lower for word in ['ff_', 'friendlyfire', 'friendly_fire']):
        return 'ff'
    
    # Multiplayer settings
    elif any(word in cvar_lower for word in ['mp_', 'maxplayers', 'maxrounds', 'halftime']):
        return 'mp'
    
    # Talking & Voting settings
    elif any(word in cvar_lower for word in ['talk', 'vote', 'alltalk', 'deadtalk']):
        return 'talk'
    
    # Ammo settings
    elif any(word in cvar_lower for word in ['ammo_', 'grenade', 'infinite_ammo']):
        return 'ammo'
    
    # Default Spawn settings
    elif any(word in cvar_lower for word in ['spawn', 'default_']):
        return 'ds'
    
    # Miscellaneous server settings
    elif any(word in cvar_lower for word in ['sv_', 'tv_', 'spec_']):
        return 'misc'
    
    # If no pattern matches, put it in the Custom category
    else:
        return 'custom'

def format_command(cvar_name, default_value, comment):
    """
    Convert a raw CS2 command into a formatted object for the web app.
    This creates the structure that the JavaScript expects.
    """
    # Convert command name to a human-readable label (e.g., "sv_hostname" -> "Sv Hostname")
    normal_name = cvar_name.replace('_', ' ').title()
    
    # Auto-categorize the command based on its name
    category = auto_categorize_command(cvar_name)
    
    # Return the formatted command object
    return {
        "normalName": normal_name,      # Human-readable name for the web form
        "cvarName": cvar_name,          # The actual CS2 command name
        "defaultValue": default_value,  # Default value from the .cfg file
        "comment": comment,             # Comment from the .cfg file
        "category": category,           # Which section it goes in (gen, bhop, time, etc.)
        "enableTooltip": "false",       # Whether to show a tooltip (not used)
        "description": ""               # Tooltip description (not used)
    }

def format_command_string(command):
    """
    Convert a command object into a JavaScript string that can be written to a file.
    This creates the exact format that the web app expects to load.
    """
    # Use JSON encoding to properly escape all string values
    # This handles quotes, backslashes, and all special characters correctly
    normal_name = json.dumps(command['normalName'])
    cvar_name = json.dumps(command['cvarName'])
    comment = json.dumps(command['comment'])
    category = json.dumps(command['category'])
    
    # Hardcoded fix for hostname - just skip the defaultValue
    if command['cvarName'] == 'hostname':
        lines = [
            "    {",
            f"        normalName: {normal_name},",
            f"        cvarName: {cvar_name},",
            f"        comment: {comment},",
            f"        category: {category},",
            "        enableTooltip: false,",
            "        description: ''",
            "    },"
        ]
    else:
        default_value = json.dumps(command['defaultValue'])
        lines = [
            "    {",
            f"        normalName: {normal_name},",
            f"        cvarName: {cvar_name},",
            f"        defaultValue: {default_value},",
            f"        comment: {comment},",
            f"        category: {category},",
            "        enableTooltip: false,",
            "        description: ''",
            "    },"
        ]
    return "\n".join(lines)

def process_line(line):
    """
    Parse a single line from a .cfg file and extract the command information.
    Handles both commented and non-commented lines.
    """
    # Check if the line has a comment (contains "//")
    if "//" in line:
        # Split the line at "//" to separate command from comment
        parts = line.split('//')
        command_parts = parts[0].strip().split()  # Get the command part and split by spaces

        # Need at least 2 parts: command name and value
        if len(command_parts) < 2:
            return None

        cvar_name = command_parts[0]      # First part is the command name
        default_value = command_parts[1]  # Second part is the default value
        comment = parts[1].strip()        # Everything after "//" is the comment
    else:
        # No comment, just split the line by spaces
        command_parts = line.strip().split()

        # Need at least 2 parts: command name and value
        if len(command_parts) < 2:
            return None

        cvar_name = command_parts[0]      # First part is the command name
        default_value = command_parts[1]  # Second part is the default value
        comment = ""                      # No comment

    # Convert the raw command into a formatted object
    return format_command(cvar_name, default_value, comment)

def process_file(input_file, output_file):
    """
    Main function that processes an entire .cfg file and converts it to a JavaScript file.
    This is what gets called when you run the script.
    """
    commands = []
    
    # Read the input .cfg file line by line
    with open(input_file, 'r') as file:
        for line in file:
            # Skip empty lines and comment-only lines
            if line.strip() and not line.strip().startswith('//'):
                command = process_line(line.strip())
                if command:
                    commands.append(command)

    # Create a unique variable name for this config file to avoid conflicts
    # Example: "gamemode_casual.json" becomes "cvarsData_casual"
    import os
    filename = os.path.splitext(os.path.basename(output_file))[0]  # Remove .json extension
    var_name = f"cvarsData_{filename.replace('gamemode_', '').replace('.json', '')}"

    # Write the JavaScript file that the web app can load
    with open(output_file, 'w') as file:
        # Start the JavaScript variable declaration
        file.write(f"var {var_name} = [\n")
        
        # Add each command as a JavaScript object
        for command in commands:
            file.write(format_command_string(command) + "\n")
        
        # Close the array
        file.write("];\n")

# This is the entry point when you run the script
if __name__ == "__main__":
    # Check if we got the right number of command line arguments
    if len(sys.argv) == 1:
        # No arguments - process all files
        process_all_files()
    elif len(sys.argv) == 3:
        # Single file processing
        input_file = sys.argv[1]   # The .cfg file to read
        output_file = sys.argv[2]  # The .json file to create
        process_file(input_file, output_file)
    else:
        print("Usage:")
        print("  python commands.py                                    # Process all CFG files")
        print("  python commands.py <input_file> <output_file>        # Process single file")
        print("Example: python commands.py cfg/gamemode_casual.cfg js/json/gamemode_casual.json")
        sys.exit(1)

def process_all_files():
    """
    Process all CFG files in the cfg directory and generate corresponding JSON files.
    """
    import os
    import glob
    
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    cfg_dir = os.path.join(script_dir, 'cfg')
    js_dir = os.path.join(script_dir, '..', 'js', 'json')
    
    # Ensure the output directory exists
    os.makedirs(js_dir, exist_ok=True)
    
    # Find all CFG files
    cfg_files = glob.glob(os.path.join(cfg_dir, '*.cfg'))
    
    if not cfg_files:
        print(f"No CFG files found in {cfg_dir}")
        return
    
    print(f"Found {len(cfg_files)} CFG files to process...")
    print(f"Output directory: {js_dir}")
    print()
    
    success_count = 0
    error_count = 0
    
    for cfg_file in cfg_files:
        try:
            # Get the filename without path and extension
            filename = os.path.basename(cfg_file)
            name_without_ext = os.path.splitext(filename)[0]
            
            # Create output path
            output_file = os.path.join(js_dir, f"{name_without_ext}.json")
            
            print(f"Processing {filename}...")
            process_file(cfg_file, output_file)
            print(f"  ✅ Generated {name_without_ext}.json")
            success_count += 1
            
        except Exception as e:
            print(f"  ❌ Error processing {filename}: {e}")
            error_count += 1
    
    print()
    print(f"Summary:")
    print(f"  ✅ Successfully processed: {success_count} files")
    print(f"  ❌ Errors: {error_count} files")
    
    if error_count == 0:
        print("🎉 All JSON files generated successfully!")
    else:
        print("⚠️  Some files had errors. Check the output above.")
