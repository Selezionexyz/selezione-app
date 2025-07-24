# CODE POUR RE-GÉNÉRER VOS PDF AILLEURS
# =====================================

# 1. COPIEZ CE CODE dans un fichier Python sur votre ordinateur
# 2. INSTALLEZ weasyprint : pip install weasyprint  
# 3. LANCEZ le script : python generer_pdf.py

import os
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

# Contenu HTML de l'ebook (vous devez copier le contenu du fichier ebook-selezione.html)
EBOOK_HTML = '''
<!-- ICI, COLLEZ TOUT LE CONTENU DE ebook-selezione.html -->
<!-- Le fichier fait plusieurs milliers de lignes -->
<!-- Vous pouvez le récupérer en affichant ebook-selezione.html dans le chat -->
'''

# Contenu HTML du template email  
TEMPLATE_HTML = '''
<!-- ICI, COLLEZ TOUT LE CONTENU DE email-template.html -->
<!-- Le fichier fait quelques centaines de lignes -->
'''

def generer_pdfs():
    print("🔄 Génération des PDF...")
    
    # Configuration
    font_config = FontConfiguration()
    
    # CSS pour PDF
    css = CSS(string='''
        @page { size: A4; margin: 2cm; }
        body { font-family: Arial, sans-serif; color: #333; }
        .cover { page-break-after: always; }
        .chapter { page-break-before: always; }
    ''', font_config=font_config)
    
    # Générer ebook PDF
    if EBOOK_HTML.strip():
        HTML(string=EBOOK_HTML).write_pdf('ebook-selezione.pdf', stylesheets=[css])
        print("✅ Ebook PDF généré : ebook-selezione.pdf")
    
    # Générer template PDF
    if TEMPLATE_HTML.strip():
        HTML(string=TEMPLATE_HTML).write_pdf('template-email.pdf', stylesheets=[css])
        print("✅ Template PDF généré : template-email.pdf")
    
    print("🎉 Terminé !")

if __name__ == "__main__":
    generer_pdfs()