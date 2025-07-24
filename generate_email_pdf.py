#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour générer le PDF du template email
"""

import os
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

def generate_email_template_pdf():
    """Génère le PDF du template email"""
    
    # Chemins des fichiers
    html_file = '/app/email-template.html'
    pdf_file = '/app/email-template-ebook.pdf'
    
    print("🔄 Génération du template email PDF en cours...")
    
    try:
        # Configuration des polices
        font_config = FontConfiguration()
        
        # CSS optimisé pour le PDF
        pdf_css = CSS(string='''
            @page {
                size: A4;
                margin: 1.5cm;
                @bottom-center {
                    content: "Template Email - Ebook SELEZIONE";
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
                background: white;
            }
            
            .email-container {
                background: white;
                border: 1px solid #ddd;
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 20px;
            }
            
            .header {
                background: linear-gradient(135deg, #D4AF37, #FFD700);
                color: #1a1a1a;
                padding: 20px;
                text-align: center;
            }
            
            .template-info {
                background: #e8f4f8;
                border: 1px solid #5bc0de;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
                font-size: 0.9rem;
                page-break-inside: avoid;
            }
            
            .benefits-list {
                background: #f8f8f8;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #D4AF37;
                page-break-inside: avoid;
            }
            
            .stats-section {
                background: rgba(212, 175, 55, 0.1);
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin: 20px 0;
                page-break-inside: avoid;
            }
            
            .cta-section {
                background: linear-gradient(135deg, #D4AF37, #FFD700);
                color: #1a1a1a;
                padding: 25px;
                border-radius: 8px;
                text-align: center;
                margin: 25px 0;
                page-break-inside: avoid;
            }
            
            .contact-info {
                background: #f0f0f0;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                page-break-inside: avoid;
            }
            
            .ps-section {
                background: #fffaf0;
                border: 1px solid #D4AF37;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
                font-style: italic;
                page-break-inside: avoid;
            }
            
            .signature {
                border-top: 2px solid #D4AF37;
                padding-top: 20px;
                margin-top: 30px;
                page-break-inside: avoid;
            }
            
            h2 {
                color: #D4AF37;
                page-break-after: avoid;
            }
            
            h3 {
                page-break-after: avoid;
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
            print(f"✅ Template email PDF généré avec succès !")
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
    success = generate_email_template_pdf()
    if success:
        print("\n🎉 SUCCESS: Template email PDF prêt !")
        print("\n📧 UTILISATION:")
        print("1. Ouvrez le fichier /app/email-template-ebook.pdf")
        print("2. Copiez/adaptez le contenu pour vos emails")
        print("3. Personnalisez avec les noms de vos clients")
        print("4. Attachez l'ebook PDF à vos envois")
    else:
        print("\n❌ ÉCHEC: Impossible de générer le template PDF")