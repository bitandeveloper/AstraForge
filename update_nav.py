import os
import re

files = ["index.html", "devlok.html", "projects.html", "services.html", "about.html", "contact.html"]
base_dir = r"c:\Users\berab\OneDrive\Desktop\astra-forge"

for f in files:
    filepath = os.path.join(base_dir, f)
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()

    # Find the block starting with <div class="hamburger" and ending with </nav>
    pattern = re.compile(r'<div class="hamburger" id="hamburger">.*?</nav>', re.DOTALL)
    match = pattern.search(content)
    if match:
        block = match.group(0)
        
        contact_pattern = re.compile(r'\s*<a href="contact\.html" class="[^"]*">.*?</a>')
        contact_match = contact_pattern.search(block)
        
        if contact_match:
            contact_html = contact_match.group(0)
            new_nav = block.replace(contact_html, '')
            hamburger = re.search(r'<div class="hamburger"[^>]*>.*?</div>', block, re.DOTALL).group(0)
            new_nav = new_nav.replace(hamburger, '')
            
            # Clean up empty lines inside nav
            new_nav = re.sub(r'^\s*$', '', new_nav, flags=re.MULTILINE)
            
            new_block = f"""{new_nav.strip()}
            <div class="nav-right">
                {contact_html.strip()}
                {hamburger.strip()}
            </div>"""
            
            content = content.replace(block, new_block)
            
            with open(filepath, 'w', encoding='utf-8') as outfile:
                outfile.write(content)
            print(f"Updated {f}")
        else:
            print(f"Contact pattern not found in {f}")
    else:
        print(f"Block pattern not found in {f}")
