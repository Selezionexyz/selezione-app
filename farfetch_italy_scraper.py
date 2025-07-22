#!/usr/bin/env python3
"""
Scraper pour récupérer toutes les boutiques partenaires Farfetch en Italie
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import csv
from datetime import datetime

class FarfetchItaliaScraper:
    def __init__(self):
        self.base_url = "https://www.farfetch.com"
        self.boutiques_url = "https://www.farfetch.com/fr/boutiques"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        })
        
    def get_boutiques_page(self):
        """Récupère le contenu de la page des boutiques"""
        try:
            response = self.session.get(self.boutiques_url, timeout=30)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Erreur lors de la récupération de la page : {e}")
            return None
    
    def extract_italy_boutiques(self, html_content):
        """Extrait toutes les boutiques situées en Italie"""
        if not html_content:
            return []
            
        soup = BeautifulSoup(html_content, 'html.parser')
        boutiques_italy = []
        
        # Rechercher tous les éléments contenant des informations de boutiques
        # Les sélecteurs peuvent varier selon la structure de la page
        possible_selectors = [
            '.boutique-item',
            '.store-item',
            '.partner-store',
            '[data-country="IT"]',
            '[data-country="Italy"]',
            '.boutique-card',
            '.store-card'
        ]
        
        boutique_elements = []
        for selector in possible_selectors:
            elements = soup.select(selector)
            if elements:
                boutique_elements.extend(elements)
                break
        
        # Si aucun sélecteur spécifique ne fonctionne, chercher dans tout le texte
        if not boutique_elements:
            # Rechercher par mots-clés italiens
            italian_cities = [
                'Milan', 'Rome', 'Florence', 'Venice', 'Bologna', 'Turin', 'Naples',
                'Milano', 'Roma', 'Firenze', 'Venezia', 'Torino', 'Napoli',
                'Palermo', 'Genoa', 'Bari', 'Catania', 'Verona', 'Messina',
                'Padova', 'Trieste', 'Brescia', 'Parma', 'Modena', 'Reggio Emilia',
                'Perugia', 'Ravenna', 'Livorno', 'Cagliari', 'Foggia', 'Salerno',
                'Ferrara', 'Rimini', 'Syracuse', 'Sassari', 'Monza', 'Bergamo',
                'Forlì', 'Trento', 'Vicenza', 'Terni', 'Bolzano', 'Novara',
                'Piacenza', 'Ancona', 'Andria', 'Arezzo', 'Udine', 'Cesena'
            ]
            
            # Rechercher dans tout le texte de la page
            page_text = soup.get_text()
            lines = page_text.split('\n')
            
            for line in lines:
                line = line.strip()
                if any(city.lower() in line.lower() for city in italian_cities):
                    # Essayer d'extraire le nom de la boutique et la ville
                    boutique_info = self.parse_boutique_line(line, italian_cities)
                    if boutique_info:
                        boutiques_italy.append(boutique_info)
        
        # Traitement des éléments trouvés avec les sélecteurs
        for element in boutique_elements:
            boutique_info = self.extract_boutique_info(element)
            if boutique_info and self.is_italian_boutique(boutique_info):
                boutiques_italy.append(boutique_info)
        
        return self.remove_duplicates(boutiques_italy)
    
    def parse_boutique_line(self, line, italian_cities):
        """Parse une ligne de texte pour extraire les infos de boutique"""
        for city in italian_cities:
            if city.lower() in line.lower():
                parts = line.split()
                # Heuristique simple pour extraire le nom
                if len(parts) >= 2:
                    # Le nom est probablement au début
                    boutique_name = ' '.join(parts[:3]).strip(',.-')
                    return {
                        'nom': boutique_name,
                        'ville': city,
                        'pays': 'Italie',
                        'adresse': line.strip(),
                        'contact': '',
                        'source': 'text_parsing'
                    }
        return None
    
    def extract_boutique_info(self, element):
        """Extrait les informations d'un élément boutique"""
        info = {
            'nom': '',
            'ville': '',
            'pays': '',
            'adresse': '',
            'contact': '',
            'source': 'element_parsing'
        }
        
        # Essayer différents sélecteurs pour le nom
        name_selectors = ['.name', '.title', '.boutique-name', '.store-name', 'h1', 'h2', 'h3']
        for selector in name_selectors:
            name_elem = element.select_one(selector)
            if name_elem:
                info['nom'] = name_elem.get_text(strip=True)
                break
        
        # Essayer différents sélecteurs pour l'adresse/ville
        location_selectors = ['.location', '.address', '.city', '.country']
        for selector in location_selectors:
            location_elem = element.select_one(selector)
            if location_elem:
                text = location_elem.get_text(strip=True)
                if 'italy' in text.lower() or 'italie' in text.lower():
                    info['pays'] = 'Italie'
                    info['adresse'] = text
                break
        
        # Si pas d'informations suffisantes, utiliser tout le texte
        if not info['nom']:
            text = element.get_text(strip=True)
            info['nom'] = text.split('\n')[0][:50]  # Première ligne, max 50 chars
        
        return info if info['nom'] else None
    
    def is_italian_boutique(self, boutique_info):
        """Vérifie si une boutique est en Italie"""
        italian_indicators = [
            'italy', 'italie', 'milano', 'milan', 'rome', 'roma',
            'florence', 'firenze', 'turin', 'torino', 'venice', 'venezia',
            'bologna', 'naples', 'napoli', 'palermo', 'genoa', 'genova'
        ]
        
        text_to_check = f"{boutique_info.get('ville', '')} {boutique_info.get('pays', '')} {boutique_info.get('adresse', '')}".lower()
        
        return any(indicator in text_to_check for indicator in italian_indicators)
    
    def remove_duplicates(self, boutiques):
        """Supprime les doublons basés sur le nom"""
        seen = set()
        unique_boutiques = []
        
        for boutique in boutiques:
            identifier = boutique['nom'].lower().strip()
            if identifier not in seen and identifier:
                seen.add(identifier)
                unique_boutiques.append(boutique)
        
        return unique_boutiques
    
    def save_to_json(self, boutiques, filename='farfetch_italy_boutiques.json'):
        """Sauvegarde les données en JSON"""
        data = {
            'extraction_date': datetime.now().isoformat(),
            'total_boutiques': len(boutiques),
            'boutiques': boutiques
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Données sauvegardées dans {filename}")
    
    def save_to_csv(self, boutiques, filename='farfetch_italy_boutiques.csv'):
        """Sauvegarde les données en CSV"""
        if not boutiques:
            print("❌ Aucune boutique à sauvegarder")
            return
        
        fieldnames = ['nom', 'ville', 'pays', 'adresse', 'contact', 'source']
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(boutiques)
        
        print(f"✅ Données CSV sauvegardées dans {filename}")
    
    def run(self):
        """Lance le scraping"""
        print("🚀 Début de l'extraction des boutiques Farfetch en Italie...")
        
        # Récupérer la page
        html_content = self.get_boutiques_page()
        if not html_content:
            print("❌ Impossible de récupérer la page")
            return []
        
        # Extraire les boutiques italiennes
        boutiques = self.extract_italy_boutiques(html_content)
        
        print(f"📊 {len(boutiques)} boutiques trouvées en Italie")
        
        # Afficher les résultats
        for i, boutique in enumerate(boutiques, 1):
            print(f"\n{i}. {boutique['nom']}")
            print(f"   📍 {boutique['ville']}")
            if boutique['adresse']:
                print(f"   🏠 {boutique['adresse']}")
            if boutique['contact']:
                print(f"   📞 {boutique['contact']}")
        
        # Sauvegarder
        if boutiques:
            self.save_to_json(boutiques)
            self.save_to_csv(boutiques)
        
        return boutiques

if __name__ == "__main__":
    scraper = FarfetchItaliaScraper()
    boutiques = scraper.run()
    
    if boutiques:
        print(f"\n🎉 Extraction terminée ! {len(boutiques)} boutiques Farfetch trouvées en Italie")
    else:
        print("\n⚠️  Aucune boutique trouvée ou erreur lors de l'extraction")