#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Serveur simple pour télécharger les PDF
"""

import os
import http.server
import socketserver
from urllib.parse import unquote
import base64

class SimpleDownloadHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_download_page()
        elif self.path == '/ebook':
            self.send_pdf('/app/ebook-selezione.pdf', 'L_Art_du_Pret_a_Porter_de_Luxe_SELEZIONE.pdf')
        elif self.path == '/template':
            self.send_pdf('/app/email-template-ebook.pdf', 'Template_Email_Ebook_SELEZIONE.pdf')
        else:
            self.send_error(404, "Page non trouvée")
    
    def send_download_page(self):
        html = """
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Télécharger vos fichiers SELEZIONE</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
            color: #f5f5f5;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: #2d2d2d;
            padding: 40px;
            border-radius: 20px;
            border-left: 5px solid #D4AF37;
            text-align: center;
            max-width: 600px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 {
            color: #D4AF37;
            font-size: 2.5rem;
            margin-bottom: 20px;
        }
        .download-btn {
            background: linear-gradient(135deg, #D4AF37, #FFD700);
            color: #1a1a1a;
            padding: 20px 40px;
            border: none;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: 700;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin: 15px;
            transition: all 0.3s ease;
            min-width: 300px;
        }
        .download-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
        }
        .file-info {
            background: rgba(212, 175, 55, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            border: 1px solid #D4AF37;
        }
        .file-size {
            color: #D4AF37;
            font-weight: 600;
        }
        .instructions {
            text-align: left;
            background: #1a1a1a;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .instructions h3 {
            color: #D4AF37;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📁 Vos fichiers SELEZIONE</h1>
        <p>Cliquez sur les boutons ci-dessous pour télécharger vos fichiers PDF</p>
        
        <div class="file-info">
            <h3>📖 Ebook Complet</h3>
            <p>"L'Art du Prêt-à-Porter de Luxe" - 35+ pages</p>
            <p class="file-size">Taille: 0.76 MB</p>
            <a href="/ebook" class="download-btn">💎 TÉLÉCHARGER L'EBOOK PDF</a>
        </div>
        
        <div class="file-info">
            <h3>📧 Template Email</h3>
            <p>Guide pour envoyer l'ebook par email</p>
            <p class="file-size">Taille: 0.13 MB</p>
            <a href="/template" class="download-btn">📧 TÉLÉCHARGER LE TEMPLATE EMAIL</a>
        </div>
        
        <div class="instructions">
            <h3>📋 Instructions d'utilisation :</h3>
            <ol>
                <li><strong>Téléchargez les 2 fichiers</strong> en cliquant sur les boutons</li>
                <li><strong>Ouvrez le template email</strong> pour voir le format</li>
                <li><strong>Copiez le contenu</strong> et personnalisez avec vos clients</li>
                <li><strong>Attachez l'ebook PDF</strong> à vos emails de prospection</li>
                <li><strong>Envoyez et convertissez</strong> vos prospects ! 🚀</li>
            </ol>
        </div>
        
        <p style="margin-top: 30px; color: #888; font-size: 0.9rem;">
            © 2025 SELEZIONE • Milano, Italia<br>
            "11 ans d'expertise • 30+ fournisseurs • Votre succès garanti"
        </p>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(html.encode('utf-8'))
    
    def send_pdf(self, filepath, filename):
        if not os.path.exists(filepath):
            self.send_error(404, f"Fichier {filepath} non trouvé")
            return
        
        self.send_response(200)
        self.send_header('Content-Type', 'application/pdf')
        self.send_header('Content-Disposition', f'attachment; filename="{filename}"')
        self.send_header('Content-Length', str(os.path.getsize(filepath)))
        self.end_headers()
        
        with open(filepath, 'rb') as f:
            self.wfile.write(f.read())

def start_server():
    PORT = 8899
    try:
        with socketserver.TCPServer(("", PORT), SimpleDownloadHandler) as httpd:
            print(f"🌐 Serveur de téléchargement démarré !")
            print(f"📥 Ouvrez ce lien dans votre navigateur :")
            print(f"🔗 http://localhost:{PORT}")
            print(f"\n✅ Page de téléchargement prête !")
            print("⏹️  Appuyez sur Ctrl+C pour arrêter")
            httpd.serve_forever()
    except Exception as e:
        print(f"❌ Erreur : {e}")
        # Essayer un autre port
        PORT = 9999
        try:
            with socketserver.TCPServer(("", PORT), SimpleDownloadHandler) as httpd:
                print(f"🌐 Serveur démarré sur le port {PORT}")
                print(f"🔗 http://localhost:{PORT}")
                httpd.serve_forever()
        except Exception as e2:
            print(f"❌ Impossible de démarrer le serveur : {e2}")

if __name__ == "__main__":
    if os.path.exists('/app/ebook-selezione.pdf') and os.path.exists('/app/email-template-ebook.pdf'):
        start_server()
    else:
        print("❌ Fichiers PDF manquants")