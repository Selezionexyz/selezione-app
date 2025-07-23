#!/usr/bin/env python3
"""
Serveur web simple pour BBLUXURY # SELEZIONE
Usage: python3 server.py
Accès: http://localhost:8080
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 8080
WEBSITE_DIR = "/app/bbluxury-website"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEBSITE_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    # Vérifier que le répertoire existe
    if not os.path.exists(WEBSITE_DIR):
        print(f"❌ Erreur: Le répertoire {WEBSITE_DIR} n'existe pas")
        return

    # Changer le répertoire de travail
    os.chdir(WEBSITE_DIR)
    
    # Créer le serveur
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print("🌟 BBLUXURY # SELEZIONE - Serveur Web Démarré")
        print("=" * 50)
        print(f"📍 URL: http://localhost:{PORT}")
        print(f"📁 Répertoire: {WEBSITE_DIR}")
        print(f"🚀 Serveur démarré sur le port {PORT}")
        print("=" * 50)
        print("📖 Appuyez sur Ctrl+C pour arrêter le serveur")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Serveur arrêté par l'utilisateur")
            httpd.shutdown()

if __name__ == "__main__":
    main()