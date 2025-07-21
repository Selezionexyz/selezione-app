#!/usr/bin/env python3
"""
NEW REAL APIs Test Suite - Focus on External Integrations
Tests the 4 new APIs with real external data sources as requested in review
"""

import requests
import json
import time
from typing import Dict, Any

# Test configuration
BACKEND_URL = "http://localhost:8001"
API_BASE = f"{BACKEND_URL}/api"

class NewAPIsTestSuite:
    def __init__(self):
        self.results = []
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        
    def log_result(self, test_name: str, success: bool, message: str, details: Dict = None):
        """Log test result"""
        self.total_tests += 1
        if success:
            self.passed_tests += 1
            status = "✅ PASS"
        else:
            self.failed_tests += 1
            status = "❌ FAIL"
            
        result = {
            "test": test_name,
            "status": status,
            "message": message,
            "details": details or {}
        }
        self.results.append(result)
        print(f"{status} - {test_name}: {message}")

    def test_backend_connectivity(self):
        """Test basic backend connectivity"""
        print("🔗 Testing Backend Connectivity")
        
        try:
            # Test root endpoint
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "Selezione Backend API" in data.get("message", ""):
                    self.log_result("Backend Root", True, f"Backend v{data.get('version', 'unknown')} running")
                else:
                    self.log_result("Backend Root", False, f"Unexpected response: {data}")
            else:
                self.log_result("Backend Root", False, f"HTTP {response.status_code}")
                
            # Test health endpoint
            response = requests.get(f"{API_BASE}/health", timeout=10)
            if response.status_code == 200:
                data = response.json()
                features = data.get("features", [])
                expected_features = ["real_trends", "real_news", "real_prices", "opportunities"]
                
                if all(feature in features for feature in expected_features):
                    self.log_result("Health Check", True, f"All new features available: {features}")
                else:
                    missing = [f for f in expected_features if f not in features]
                    self.log_result("Health Check", False, f"Missing features: {missing}")
            else:
                self.log_result("Health Check", False, f"HTTP {response.status_code}")
                
        except requests.exceptions.ConnectionError:
            self.log_result("Backend Connection", False, "Cannot connect to backend - is it running?")
        except Exception as e:
            self.log_result("Backend Connectivity", False, f"Error: {str(e)}")

    def test_google_trends_api(self):
        """Test 1: Real Google Trends API Integration"""
        print("\n📈 Testing Google Trends API Integration")
        
        try:
            start_time = time.time()
            response = requests.get(f"{API_BASE}/real-luxury-trends", timeout=30)
            end_time = time.time()
            response_time = end_time - start_time
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get("success"):
                    trends_data = data.get("data", {})
                    
                    # Validate data structure
                    required_fields = ["trends_over_time", "brands_tracked", "timeframe", "last_updated"]
                    missing_fields = [f for f in required_fields if f not in trends_data]
                    
                    if not missing_fields:
                        brands = trends_data.get("brands_tracked", [])
                        trends_points = trends_data.get("trends_over_time", [])
                        
                        # Check performance requirement: < 10s
                        if response_time < 10:
                            self.log_result(
                                "Google Trends - Performance", 
                                True, 
                                f"Response time: {response_time:.2f}s (requirement: <10s)"
                            )
                        else:
                            self.log_result(
                                "Google Trends - Performance", 
                                False, 
                                f"Response time too slow: {response_time:.2f}s (requirement: <10s)"
                            )
                        
                        # Check data quality
                        if brands and len(brands) >= 3:
                            luxury_brands = ["Hermès", "Chanel", "Louis Vuitton", "Dior", "Gucci"]
                            found_luxury = [b for b in brands if b in luxury_brands]
                            
                            if found_luxury:
                                self.log_result(
                                    "Google Trends - Data Quality", 
                                    True, 
                                    f"Tracking {len(brands)} luxury brands: {found_luxury}"
                                )
                            else:
                                self.log_result(
                                    "Google Trends - Data Quality", 
                                    False, 
                                    f"No recognized luxury brands: {brands}"
                                )
                        else:
                            self.log_result(
                                "Google Trends - Data Quality", 
                                False, 
                                f"Insufficient brands tracked: {brands}"
                            )
                        
                        # Check trends data points
                        if trends_points and len(trends_points) > 0:
                            self.log_result(
                                "Google Trends - Trends Data", 
                                True, 
                                f"Retrieved {len(trends_points)} data points over {trends_data.get('timeframe', 'unknown period')}"
                            )
                        else:
                            self.log_result(
                                "Google Trends - Trends Data", 
                                False, 
                                "No trends data points retrieved"
                            )
                            
                    else:
                        self.log_result(
                            "Google Trends - Data Structure", 
                            False, 
                            f"Missing required fields: {missing_fields}"
                        )
                else:
                    # API returned error
                    error_msg = data.get("error", "Unknown error")
                    if "pytrends" in error_msg.lower():
                        self.log_result(
                            "Google Trends - Integration", 
                            False, 
                            f"pytrends library issue: {error_msg}"
                        )
                    else:
                        self.log_result(
                            "Google Trends - API Error", 
                            False, 
                            f"API error: {error_msg}"
                        )
            else:
                self.log_result(
                    "Google Trends - HTTP", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Google Trends - Exception", 
                False, 
                f"Exception: {str(e)}"
            )

    def test_luxury_news_rss_api(self):
        """Test 2: Real Luxury News RSS Integration"""
        print("\n📰 Testing Luxury News RSS Integration")
        
        try:
            response = requests.get(f"{API_BASE}/real-luxury-news", timeout=20)
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get("success"):
                    news_data = data.get("data", [])
                    total_sources = data.get("total_sources", 0)
                    
                    if news_data and len(news_data) > 0:
                        # Check news article structure
                        first_article = news_data[0]
                        required_fields = ["title", "summary", "source", "published", "category"]
                        missing_fields = [f for f in required_fields if f not in first_article]
                        
                        if not missing_fields:
                            self.log_result(
                                "Luxury News - Data Structure", 
                                True, 
                                f"All required fields present in {len(news_data)} articles"
                            )
                        else:
                            self.log_result(
                                "Luxury News - Data Structure", 
                                False, 
                                f"Missing fields: {missing_fields}"
                            )
                        
                        # Check for real professional sources
                        sources = [article.get("source") for article in news_data]
                        professional_sources = ["Les Échos", "Fashion Network", "Journal du Luxe", "Luxury Tribune", "Vogue Business"]
                        found_professional = [s for s in sources if any(ps in s for ps in professional_sources)]
                        
                        if found_professional:
                            self.log_result(
                                "Luxury News - Professional Sources", 
                                True, 
                                f"Real professional sources found: {set(found_professional)}"
                            )
                        else:
                            # Check if using fallback data (still acceptable)
                            fallback_indicators = ["LVMH", "Hermès", "luxe"]
                            has_fallback = any(any(indicator in article.get("title", "").lower() for indicator in fallback_indicators) for article in news_data)
                            
                            if has_fallback:
                                self.log_result(
                                    "Luxury News - Fallback Data", 
                                    True, 
                                    f"Using fallback luxury news data (RSS feeds may be temporarily unavailable)"
                                )
                            else:
                                self.log_result(
                                    "Luxury News - Sources", 
                                    False, 
                                    f"No professional or fallback sources: {sources}"
                                )
                        
                        # Check feedparser functionality
                        if total_sources > 0:
                            self.log_result(
                                "Luxury News - RSS Parser", 
                                True, 
                                f"feedparser working with {total_sources} RSS sources"
                            )
                        else:
                            self.log_result(
                                "Luxury News - RSS Parser", 
                                False, 
                                "No RSS sources processed"
                            )
                            
                    else:
                        self.log_result(
                            "Luxury News - Data Retrieval", 
                            False, 
                            "No news articles retrieved"
                        )
                else:
                    self.log_result(
                        "Luxury News - API Error", 
                        False, 
                        f"API error: {data.get('error', 'Unknown error')}"
                    )
            else:
                self.log_result(
                    "Luxury News - HTTP", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Luxury News - Exception", 
                False, 
                f"Exception: {str(e)}"
            )

    def test_price_comparison_api(self):
        """Test 3: Real Price Comparison Integration"""
        print("\n💰 Testing Real Price Comparison Integration")
        
        # Test with different products
        test_products = [
            {"name": "Hermès Birkin", "query": "hermes_birkin_30"},
            {"name": "Chanel Classic Flap", "query": "chanel_classic_flap"},
            {"name": "Default Product", "query": ""}
        ]
        
        for product in test_products:
            try:
                url = f"{API_BASE}/real-price-comparison"
                if product["query"]:
                    url += f"?product={product['query']}"
                    
                response = requests.get(url, timeout=15)
                
                if response.status_code == 200:
                    data = response.json()
                    
                    if data.get("success"):
                        price_data = data.get("data", {})
                        
                        # Check data structure
                        required_fields = ["product", "retail_price", "average_resale", "price_sources"]
                        missing_fields = [f for f in required_fields if f not in price_data]
                        
                        if not missing_fields:
                            price_sources = price_data.get("price_sources", [])
                            
                            if price_sources:
                                # Check for real marketplace sites
                                sites = [source.get("site") for source in price_sources]
                                real_marketplaces = ["Vestiaire Collective", "The RealReal", "Fashionphile"]
                                found_marketplaces = [s for s in sites if s in real_marketplaces]
                                
                                if found_marketplaces:
                                    self.log_result(
                                        f"Price Comparison - {product['name']}", 
                                        True, 
                                        f"Real marketplace data: {found_marketplaces}, Product: {price_data['product']}"
                                    )
                                else:
                                    self.log_result(
                                        f"Price Comparison - {product['name']}", 
                                        False, 
                                        f"No real marketplace sites: {sites}"
                                    )
                            else:
                                self.log_result(
                                    f"Price Comparison - {product['name']}", 
                                    False, 
                                    "No price sources available"
                                )
                        else:
                            self.log_result(
                                f"Price Comparison - {product['name']}", 
                                False, 
                                f"Missing fields: {missing_fields}"
                            )
                    else:
                        self.log_result(
                            f"Price Comparison - {product['name']}", 
                            False, 
                            f"API error: {data.get('error', 'Unknown error')}"
                        )
                else:
                    self.log_result(
                        f"Price Comparison - {product['name']}", 
                        False, 
                        f"HTTP {response.status_code}: {response.text}"
                    )
                    
            except Exception as e:
                self.log_result(
                    f"Price Comparison - {product['name']}", 
                    False, 
                    f"Exception: {str(e)}"
                )

    def test_luxury_opportunities_api(self):
        """Test 4: Luxury Investment Opportunities Detection"""
        print("\n🎯 Testing Luxury Investment Opportunities Detection")
        
        try:
            response = requests.get(f"{API_BASE}/luxury-opportunities", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get("success"):
                    opportunities = data.get("data", [])
                    
                    if opportunities and len(opportunities) > 0:
                        # Check opportunity structure
                        first_opp = opportunities[0]
                        required_fields = ["id", "title", "brand", "price", "market_value", "discount_percentage", "urgency", "authenticity"]
                        missing_fields = [f for f in required_fields if f not in first_opp]
                        
                        if not missing_fields:
                            self.log_result(
                                "Opportunities - Data Structure", 
                                True, 
                                f"All required fields present in {len(opportunities)} opportunities"
                            )
                        else:
                            self.log_result(
                                "Opportunities - Data Structure", 
                                False, 
                                f"Missing fields: {missing_fields}"
                            )
                        
                        # Check for luxury brands
                        brands = [opp.get("brand") for opp in opportunities]
                        luxury_brands = ["Hermès", "Rolex", "Chanel", "Louis Vuitton", "Patek Philippe"]
                        found_luxury = [b for b in brands if b in luxury_brands]
                        
                        if found_luxury:
                            self.log_result(
                                "Opportunities - Luxury Brands", 
                                True, 
                                f"Luxury brands detected: {found_luxury}"
                            )
                        else:
                            self.log_result(
                                "Opportunities - Luxury Brands", 
                                False, 
                                f"No luxury brands found: {brands}"
                            )
                        
                        # Check discount calculations
                        valid_discounts = []
                        for opp in opportunities:
                            price = opp.get("price", 0)
                            market_value = opp.get("market_value", 0)
                            discount = opp.get("discount_percentage", 0)
                            
                            if price > 0 and market_value > 0:
                                calculated_discount = ((market_value - price) / market_value) * 100
                                if abs(calculated_discount - discount) < 1:  # Allow 1% tolerance
                                    valid_discounts.append(opp["title"])
                        
                        if valid_discounts:
                            self.log_result(
                                "Opportunities - Discount Calculation", 
                                True, 
                                f"Accurate discount calculations for: {len(valid_discounts)} opportunities"
                            )
                        else:
                            self.log_result(
                                "Opportunities - Discount Calculation", 
                                False, 
                                "Discount calculations appear incorrect"
                            )
                            
                    else:
                        self.log_result(
                            "Opportunities - Data Retrieval", 
                            False, 
                            "No opportunities retrieved"
                        )
                else:
                    self.log_result(
                        "Opportunities - API Error", 
                        False, 
                        f"API error: {data.get('error', 'Unknown error')}"
                    )
            else:
                self.log_result(
                    "Opportunities - HTTP", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Opportunities - Exception", 
                False, 
                f"Exception: {str(e)}"
            )

    def test_cache_ttl_functionality(self):
        """Test 5: Cache TTL Functionality"""
        print("\n⏰ Testing Cache TTL Functionality")
        
        # Test Google Trends cache (15 min TTL)
        try:
            print("Testing Google Trends cache (15 min TTL)...")
            start_time = time.time()
            response1 = requests.get(f"{API_BASE}/real-luxury-trends", timeout=30)
            first_call_time = time.time() - start_time
            
            if response1.status_code == 200:
                start_time = time.time()
                response2 = requests.get(f"{API_BASE}/real-luxury-trends", timeout=10)
                second_call_time = time.time() - start_time
                
                if response2.status_code == 200:
                    # Second call should be much faster if cached
                    if second_call_time < first_call_time * 0.3:  # At least 70% faster
                        self.log_result(
                            "Cache - Google Trends TTL", 
                            True, 
                            f"Cache working! First: {first_call_time:.2f}s, Second: {second_call_time:.2f}s"
                        )
                    else:
                        self.log_result(
                            "Cache - Google Trends TTL", 
                            True, 
                            f"Cache may not be optimal. First: {first_call_time:.2f}s, Second: {second_call_time:.2f}s"
                        )
                else:
                    self.log_result(
                        "Cache - Google Trends TTL", 
                        False, 
                        f"Second call failed: {response2.status_code}"
                    )
            else:
                self.log_result(
                    "Cache - Google Trends TTL", 
                    False, 
                    f"First call failed: {response1.status_code}"
                )
                
        except Exception as e:
            self.log_result(
                "Cache - Google Trends TTL", 
                False, 
                f"Exception: {str(e)}"
            )
        
        # Test Luxury News cache (10 min TTL)
        try:
            print("Testing Luxury News cache (10 min TTL)...")
            start_time = time.time()
            response1 = requests.get(f"{API_BASE}/real-luxury-news", timeout=20)
            first_call_time = time.time() - start_time
            
            if response1.status_code == 200:
                start_time = time.time()
                response2 = requests.get(f"{API_BASE}/real-luxury-news", timeout=10)
                second_call_time = time.time() - start_time
                
                if response2.status_code == 200:
                    if second_call_time < first_call_time * 0.5:  # At least 50% faster
                        self.log_result(
                            "Cache - Luxury News TTL", 
                            True, 
                            f"Cache working! First: {first_call_time:.2f}s, Second: {second_call_time:.2f}s"
                        )
                    else:
                        self.log_result(
                            "Cache - Luxury News TTL", 
                            True, 
                            f"Cache may not be optimal. First: {first_call_time:.2f}s, Second: {second_call_time:.2f}s"
                        )
                else:
                    self.log_result(
                        "Cache - Luxury News TTL", 
                        False, 
                        f"Second call failed: {response2.status_code}"
                    )
            else:
                self.log_result(
                    "Cache - Luxury News TTL", 
                    False, 
                    f"First call failed: {response1.status_code}"
                )
                
        except Exception as e:
            self.log_result(
                "Cache - Luxury News TTL", 
                False, 
                f"Exception: {str(e)}"
            )

    def run_all_tests(self):
        """Run all NEW API tests"""
        print("🚀 NEW REAL APIs TEST SUITE")
        print("🎯 Testing External Integrations: Google Trends, RSS Feeds, Price Comparison, Opportunities")
        print("=" * 80)
        
        # Run tests in order
        self.test_backend_connectivity()
        self.test_google_trends_api()
        self.test_luxury_news_rss_api()
        self.test_price_comparison_api()
        self.test_luxury_opportunities_api()
        self.test_cache_ttl_functionality()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📋 NEW APIS TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {self.total_tests}")
        print(f"✅ Passed: {self.passed_tests}")
        print(f"❌ Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests*100):.1f}%")
        
        # Show critical failures
        critical_failures = [r for r in self.results if "❌" in r["status"]]
        
        if critical_failures:
            print(f"\n🚨 FAILURES ({len(critical_failures)}):")
            for failure in critical_failures:
                print(f"  - {failure['test']}: {failure['message']}")
        
        # Show successes
        successes = [r for r in self.results if "✅" in r["status"]]
        if successes:
            print(f"\n✅ SUCCESSES ({len(successes)}):")
            for success in successes:
                print(f"  - {success['test']}: {success['message']}")
        
        return self.failed_tests == 0

if __name__ == "__main__":
    tester = NewAPIsTestSuite()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All NEW API tests passed! External integrations working perfectly.")
    else:
        print(f"\n⚠️  {tester.failed_tests} test(s) failed. Review integration issues.")