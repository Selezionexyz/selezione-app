#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour générer le PDF de l'ebook SELEZIONE
"""

import os
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

def generate_pdf_ebook():
    """Génère le PDF de l'ebook SELEZIONE"""
    
    # Chemins des fichiers
    html_file = '/app/ebook-selezione.html'
    pdf_file = '/app/ebook-selezione.pdf'
    
    print("🔄 Génération du PDF en cours...")
    
    try:
        # Configuration des polices
        font_config = FontConfiguration()
        
        # CSS optimisé pour le PDF
        pdf_css = CSS(string='''
            @page {
                size: A4;
                margin: 2cm 1.5cm;
                @bottom-center {
                    content: "L'Art du Prêt-à-Porter de Luxe - SELEZIONE";
                    font-size: 10px;
                    color: #888;
                }
                @bottom-right {
                    content: counter(page);
                    font-size: 10px;
                    color: #888;
                }
            }
            
            body {
                font-family: 'Arial', 'Helvetica', sans-serif;
                line-height: 1.6;
                color: #333;
                background: white !important;
            }
            
            .ebook-container {
                background: white !important;
                color: #333 !important;
            }
            
            .cover {
                background: linear-gradient(135deg, #D4AF37, #FFD700) !important;
                color: #1a1a1a !important;
                page-break-after: always;
                height: 80vh;
            }
            
            .chapter {
                background: #f8f8f8 !important;
                color: #333 !important;
                border-left: 5px solid #D4AF37;
                page-break-before: always;
                margin-top: 0;
            }
            
            .section {
                color: #333 !important;
            }
            
            .section h3, .section h4, .section h5 {
                color: #D4AF37 !important;
            }
            
            .chapter-title {
                color: #D4AF37 !important;
            }
            
            .info-box {
                background: rgba(212, 175, 55, 0.1) !important;
                border: 1px solid #D4AF37;
                color: #333 !important;
            }
            
            .info-box h4 {
                color: #D4AF37 !important;
            }
            
            .contact-section {
                background: linear-gradient(135deg, #D4AF37, #FFD700) !important;
                color: #1a1a1a !important;
            }
            
            .outlet-info, .platform-info, .business-model, .contact-card {
                background: #f0f0f0 !important;
                color: #333 !important;
                border-left: 3px solid #D4AF37;
            }
            
            .table {
                background: white !important;
                border: 1px solid #ddd;
            }
            
            .table th {
                background: #D4AF37 !important;
                color: #1a1a1a !important;
            }
            
            .table td {
                color: #333 !important;
                border-bottom: 1px solid #ddd;
            }
            
            .brand-tag {
                background: linear-gradient(135deg, #D4AF37, #FFD700) !important;
                color: #1a1a1a !important;
            }
            
            .highlight {
                background: linear-gradient(135deg, #D4AF37, #FFD700) !important;
                color: #1a1a1a !important;
            }
            
            .progress-bar {
                display: none !important;
            }
            
            p, li, td {
                color: #333 !important;
            }
            
            /* Éviter les coupures de page inappropriées */
            .info-box, .outlet-info, .platform-info, .business-model, .contact-card {
                page-break-inside: avoid;
            }
            
            .section h3 {
                page-break-after: avoid;
            }
            
            table {
                page-break-inside: avoid;
            }
        ''', font_config=font_config)
        
        # Lire le fichier HTML
        if not os.path.exists(html_file):
            print(f"❌ Erreur: Le fichier {html_file} n'existe pas")
            return False
        
        # Générer le PDF
        html_doc = HTML(filename=html_file)
        html_doc.write_pdf(pdf_file, stylesheets=[pdf_css], font_config=font_config)
        
        # Vérifier que le fichier a été créé
        if os.path.exists(pdf_file):
            file_size = os.path.getsize(pdf_file) / (1024 * 1024)  # Taille en MB
            print(f"✅ PDF généré avec succès !")
            print(f"📁 Fichier: {pdf_file}")
            print(f"📊 Taille: {file_size:.2f} MB")
            return True
        else:
            print("❌ Erreur: Le PDF n'a pas pu être créé")
            return False
            
    except Exception as e:
        print(f"❌ Erreur lors de la génération du PDF: {str(e)}")
        return False

if __name__ == "__main__":
    success = generate_pdf_ebook()
    if success:
        print("\n🎉 SUCCESS: Ebook PDF prêt pour l'envoi par email !")
        print("\n📧 UTILISATION:")
        print("1. Téléchargez le fichier /app/ebook-selezione.pdf")
        print("2. Attachez-le à vos emails clients")
        print("3. Envoyez avec un message personnalisé")
    else:
        print("\n❌ ÉCHEC: Impossible de générer le PDF")