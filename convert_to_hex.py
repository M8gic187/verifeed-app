#!/usr/bin/env python3
"""
Konvertiert alle Projektdateien in Hexadezimaldarstellung
"""

import os
import sys
from pathlib import Path

# Verzeichnisse die ignoriert werden sollen
IGNORE_DIRS = {'node_modules', '.git', 'dist', 'build', '__pycache__', '.vscode'}
# Dateierweiterungen die konvertiert werden sollen
INCLUDE_EXTENSIONS = {'.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.json'}

def bytes_to_hex(data: bytes) -> str:
    """Konvertiert Bytes zu Hexadezimal-String"""
    return data.hex()

def file_to_hex(filepath: Path) -> dict:
    """Liest eine Datei und konvertiert sie zu Hex"""
    try:
        with open(filepath, 'rb') as f:
            content = f.read()
        
        hex_data = bytes_to_hex(content)
        
        return {
            'path': str(filepath),
            'size': len(content),
            'hex': hex_data,
            'hex_length': len(hex_data)
        }
    except Exception as e:
        return {
            'path': str(filepath),
            'error': str(e)
        }

def convert_project_to_hex(root_dir: str, output_file: str):
    """Konvertiert alle relevanten Projektdateien zu Hex"""
    root_path = Path(root_dir)
    results = []
    
    print(f"Durchsuche Verzeichnis: {root_dir}")
    print(f"Ausgabe wird gespeichert in: {output_file}\n")
    
    file_count = 0
    total_bytes = 0
    
    # Durchsuche alle Dateien
    for filepath in root_path.rglob('*'):
        # Überspringe Verzeichnisse
        if filepath.is_dir():
            continue
        
        # Überspringe ignorierte Verzeichnisse
        if any(ignore in filepath.parts for ignore in IGNORE_DIRS):
            continue
        
        # Nur bestimmte Dateitypen verarbeiten
        if filepath.suffix not in INCLUDE_EXTENSIONS:
            continue
        
        relative_path = filepath.relative_to(root_path)
        print(f"Verarbeite: {relative_path}")
        
        result = file_to_hex(filepath)
        if 'error' not in result:
            file_count += 1
            total_bytes += result['size']
        
        results.append(result)
    
    # Schreibe Ausgabe
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("HEXADEZIMALE DARSTELLUNG DES VERIFEED-APP PROJEKTS\n")
        f.write("=" * 80 + "\n\n")
        f.write(f"Gesamtanzahl Dateien: {file_count}\n")
        f.write(f"Gesamtgröße: {total_bytes:,} Bytes\n")
        f.write(f"Hex-Länge: {total_bytes * 2:,} Zeichen\n")
        f.write("\n" + "=" * 80 + "\n\n")
        
        for result in results:
            if 'error' in result:
                f.write(f"\n### FEHLER: {result['path']}\n")
                f.write(f"Error: {result['error']}\n")
                f.write("-" * 80 + "\n")
                continue
            
            f.write(f"\n### DATEI: {result['path']}\n")
            f.write(f"Größe: {result['size']:,} Bytes\n")
            f.write(f"Hex-Länge: {result['hex_length']:,} Zeichen\n")
            f.write("-" * 80 + "\n")
            f.write("HEXADEZIMAL:\n")
            
            # Formatiere Hex-Output in 64-Zeichen breite Zeilen (32 Bytes)
            hex_data = result['hex']
            for i in range(0, len(hex_data), 64):
                f.write(hex_data[i:i+64] + "\n")
            
            f.write("-" * 80 + "\n")
    
    print(f"\n✓ Fertig! {file_count} Dateien konvertiert")
    print(f"✓ Gesamtgröße: {total_bytes:,} Bytes")
    print(f"✓ Ausgabe in: {output_file}")

def create_binary_output(root_dir: str, output_file: str):
    """Erstellt eine einzelne binäre Datei mit allen Quelldateien"""
    root_path = Path(root_dir)
    
    print(f"\nErstelle binäre Ausgabe: {output_file}")
    
    with open(output_file, 'wb') as out:
        for filepath in sorted(root_path.rglob('*')):
            if filepath.is_dir():
                continue
            
            if any(ignore in filepath.parts for ignore in IGNORE_DIRS):
                continue
            
            if filepath.suffix not in INCLUDE_EXTENSIONS:
                continue
            
            relative_path = filepath.relative_to(root_path)
            
            # Schreibe Header
            header = f"\n--- {relative_path} ---\n".encode('utf-8')
            out.write(header)
            
            # Schreibe Dateiinhalt
            try:
                with open(filepath, 'rb') as f:
                    out.write(f.read())
            except Exception as e:
                out.write(f"ERROR: {e}".encode('utf-8'))
            
            out.write(b"\n")
    
    # Konvertiere zu Hex
    with open(output_file, 'rb') as f:
        content = f.read()
    
    hex_file = output_file.replace('.bin', '_hex.txt')
    with open(hex_file, 'w') as f:
        f.write("KOMPLETTE HEXADEZIMALE DARSTELLUNG\n")
        f.write("=" * 80 + "\n")
        f.write(f"Größe: {len(content):,} Bytes\n")
        f.write(f"Hex-Länge: {len(content) * 2:,} Zeichen\n")
        f.write("=" * 80 + "\n\n")
        
        hex_data = content.hex()
        for i in range(0, len(hex_data), 64):
            f.write(hex_data[i:i+64] + "\n")
    
    print(f"✓ Binäre Datei: {output_file}")
    print(f"✓ Hex-Datei: {hex_file}")

if __name__ == "__main__":
    project_root = "/Users/m8gic/verifeed-app"
    
    # Einzelne Dateien mit Hex
    output_detailed = os.path.join(project_root, "hexdump_detailed.txt")
    convert_project_to_hex(project_root, output_detailed)
    
    # Alle Dateien zusammen als Binär + Hex
    output_binary = os.path.join(project_root, "project_combined.bin")
    create_binary_output(project_root, output_binary)
    
    print("\n" + "=" * 80)
    print("KONVERTIERUNG ABGESCHLOSSEN")
    print("=" * 80)
