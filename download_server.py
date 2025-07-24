#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Serveur de téléchargement pour l'ebook PDF SELEZIONE
"""

import os
import http.server
import socketserver
from urllib.parse import unquote
import threading
import time

class PDFDownloadHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='/app', **kwargs)
    
    def do_GET(self):
        if self.path == '/download-ebook':
            self.send_ebook_pdf()
        elif self.path == '/':
            self.send_download_page()
        else:
            super().do_GET()
    
    def send_download_page(self):
        """Page d'accueil avec lien de téléchargement"""
        html_content = """
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Télécharger l'Ebook SELEZIONE</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
            color: #f5f5f5;
            margin: 0;
            padding: 2rem;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: #2d2d2d;
            padding: 3rem;
            border-radius: 20px;
            border-left: 5px solid #D4AF37;
            text-align: center;
            max-width: 600px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 {
            color: #D4AF37;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-family: 'Times', serif;
        }
        .subtitle {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .download-btn {
            background: linear-gradient(135deg, #D4AF37, #FFD700);
            color: #1a1a1a;
            padding: 1.5rem 3rem;
            border: none;
            border-radius: 15px;
            font-size: 1.3rem;
            font-weight: 700;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            margin: 1rem 0;
        }
        .download-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
        }
        .info {
            background: rgba(212, 175, 55, 0.1);
            padding: 1.5rem;
            border-radius: 10px;
            margin: 2rem 0;
            border: 1px solid #D4AF37;
        }
        .stats {
            display: flex;
            justify-content: space-around;
            margin: 1.5rem 0;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .stat {
            text-align: center;
        }
        .stat-number {
            font-size: 1.8rem;
            font-weight: 700;
            color: #D4AF37;
        }
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        .footer {
            margin-top: 2rem;
            font-size: 0.9rem;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📖 L'ART DU PRÊT-À-PORTER DE LUXE</h1>
        <p class="subtitle">Guide Complet par SELEZIONE</p>
        
        <div class="info">
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">35+</div>
                    <div class="stat-label">Pages</div>
                </div>
                <div class="stat">
                    <div class="stat-number">0.76</div>
                    <div class="stat-label">MB</div>
                </div>
                <div class="stat">
                    <div class="stat-number">11</div>
                    <div class="stat-label">Chapitres</div>
                </div>
            </div>
            
            <p><strong>✅ Contenu complet disponible</strong></p>
            <p>180+ outlets européens • Stratégies rentabilité • Tendances 2025-2030</p>
        </div>
        
        <a href="/download-ebook" class="download-btn">
            💎 TÉLÉCHARGER LE PDF MAINTENANT
        </a>
        
        <div class="footer">
            <p>© 2025 SELEZIONE • Milano, Italia</p>
            <p>Guide professionnel pour entrepreneurs du luxe</p>
        </div>
    </div>
    
    <script>
        // Auto-scroll smooth
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    </script>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(html_content.encode('utf-8'))
    
    def send_ebook_pdf(self):
        """Envoie le fichier PDF en téléchargement"""
        pdf_path = '/app/ebook-selezione.pdf'
        
        if not os.path.exists(pdf_path):
            self.send_error(404, "Fichier PDF non trouvé")
            return
        
        # Headers pour forcer le téléchargement
        self.send_response(200)
        self.send_header('Content-Type', 'application/pdf')
        self.send_header('Content-Disposition', 'attachment; filename="L_Art_du_Pret_a_Porter_de_Luxe_SELEZIONE.pdf"')
        self.send_header('Content-Length', str(os.path.getsize(pdf_path)))
        self.end_headers()
        
        # Envoie le fichier
        with open(pdf_path, 'rb') as f:
            self.wfile.write(f.read())

def start_download_server(port=8080):
    """Démarre le serveur de téléchargement"""
    try:
        with socketserver.TCPServer(("", port), PDFDownloadHandler) as httpd:
            print(f"🌐 Serveur de téléchargement démarré sur le port {port}")
            print(f"📥 Lien de téléchargement : http://localhost:{port}")
            print(f"📁 Téléchargement direct : http://localhost:{port}/download-ebook")
            print("\n✅ Serveur prêt ! Cliquez sur les liens ci-dessus pour télécharger.")
            print("⏹️  Appuyez sur Ctrl+C pour arrêter le serveur")
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Serveur arrêté par l'utilisateur")
    except Exception as e:
        print(f"❌ Erreur serveur : {e}")

if __name__ == "__main__":
    # Vérifier que le PDF existe
    if os.path.exists('/app/ebook-selezione.pdf'):
        print("📖 Ebook PDF trouvé !")
        start_download_server()
    else:
        print("❌ Erreur : Fichier PDF non trouvé à /app/ebook-selezione.pdf")