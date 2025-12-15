#!/usr/bin/env python3
"""
Extract hex color codes from a project recursively.
Speichert Ergebnisse in hexcodes.json und hexcodes.csv
Usage: python3 scripts/extract_hex.py [path]
"""
import os
import re
import sys
import json
import csv

pattern = re.compile(r"#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})\b")
root = sys.argv[1] if len(sys.argv) > 1 else "."

results = {}  # hex -> list of occurrences {file, line_no, line}
text_extensions = (
    ".css", ".scss", ".less", ".sass", ".html", ".htm", ".js", ".jsx",
    ".ts", ".tsx", ".json", ".md", ".svg", ".xml", ".yml", ".yaml"
)

skip_dirs = {"node_modules", ".git"}

def is_text_file(path):
    ext = os.path.splitext(path)[1].lower()
    return ext in text_extensions

for dirpath, dirnames, filenames in os.walk(root):
    # skip node_modules and .git
    dirnames[:] = [d for d in dirnames if d not in skip_dirs]
    for fn in filenames:
        path = os.path.join(dirpath, fn)
        if not is_text_file(path):
            continue
        try:
            with open(path, "r", encoding="utf-8") as f:
                for i, line in enumerate(f, start=1):
                    for m in pattern.findall(line):
                        key = m.lower()
                        results.setdefault(key, []).append({
                            "file": path,
                            "line_no": i,
                            "line": line.rstrip("\n")
                        })
        except (UnicodeDecodeError, PermissionError):
            # skip binary or unreadable files
            continue

# ensure output dir exists
out_dir = os.path.join(os.getcwd(), "hex-output")
try:
    os.makedirs(out_dir, exist_ok=True)
except Exception:
    out_dir = os.getcwd()

json_path = os.path.join(out_dir, "hexcodes.json")
csv_path = os.path.join(out_dir, "hexcodes.csv")

with open(json_path, "w", encoding="utf-8") as jf:
    json.dump(results, jf, indent=2, ensure_ascii=False)

with open(csv_path, "w", newline='', encoding="utf-8") as cf:
    w = csv.writer(cf)
    w.writerow(["hex", "count", "example_file", "example_line_no"])
    for hexcode, occ in sorted(results.items(), key=lambda kv: -len(kv[1])):
        w.writerow([hexcode, len(occ), occ[0]["file"], occ[0]["line_no"]])

print(f"Found {len(results)} unique hex codes. Results: {json_path}, {csv_path}")
