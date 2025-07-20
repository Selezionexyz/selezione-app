#!/usr/bin/env python3
"""
Backend Test Suite for Selezione Marketplace
Tests all backend APIs and functionality after PHASE 1 corrections
"""

import requests
import json
import sys
import time
from typing import Dict, Any

# Test configuration
BACKEND_URL = "http://localhost:8001"  # Local backend
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
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
        
    def test_backend_health(self):
        """Test 1: Backend Health Check"""
        try:
            # Test root endpoint
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "Selezione Backend API" in data.get("message", ""):
                    self.log_result("Backend Root", True, "Backend is running and responding")
                else:
                    self.log_result("Backend Root", False, f"Unexpected response: {data}")
            else:
                self.log_result("Backend Root", False, f"HTTP {response.status_code}")
                
            # Test health endpoint
            response = requests.get(f"{API_BASE}/health", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_result("Health Endpoint", True, "Health check passed")
                else:
                    self.log_result("Health Endpoint", False, f"Unhealthy status: {data}")
            else:
                self.log_result("Health Endpoint", False, f"HTTP {response.status_code}")
                
        except requests.exceptions.ConnectionError:
            self.log_result("Backend Connection", False, "Cannot connect to backend - is it running?")
        except Exception as e:
            self.log_result("Backend Health", False, f"Error: {str(e)}")
    
    def test_estimation_api(self):
        """Test 2: Estimation IA API - Priority Test"""
        print("\n🤖 Testing Estimation IA API (Priority Test)")
        
        # Test cases with different brands and products
        test_cases = [
            {
                "name": "Hermès Birkin",
                "data": {
                    "marque": "Hermès",
                    "modele": "Birkin 30",
                    "condition": "excellent état",
                    "couleur": "noir",
                    "taille": "30cm",
                    "annee": "2020",
                    "description": "Sac Hermès Birkin 30 en cuir Togo noir"
                }
            },
            {
                "name": "Chanel Classic Flap",
                "data": {
                    "marque": "Chanel",
                    "modele": "Classic Flap Medium",
                    "condition": "très bon état",
                    "couleur": "beige",
                    "annee": "2018"
                }
            },
            {
                "name": "Louis Vuitton Speedy",
                "data": {
                    "marque": "Louis Vuitton",
                    "modele": "Speedy 25",
                    "condition": "bon état",
                    "couleur": "monogram",
                    "annee": "2015"
                }
            },
            {
                "name": "Unknown Brand (Fallback Test)",
                "data": {
                    "marque": "TestBrand",
                    "modele": "TestModel",
                    "condition": "bon état"
                }
            }
        ]
        
        for test_case in test_cases:
            try:
                response = requests.post(
                    f"{API_BASE}/estimation",
                    json=test_case["data"],
                    timeout=15
                )
                
                if response.status_code == 200:
                    data = response.json()
                    required_fields = ["estimation_min", "estimation_max", "prix_moyen", "confiance"]
                    
                    if all(field in data for field in required_fields):
                        # Validate price ranges
                        if (data["estimation_min"] > 0 and 
                            data["estimation_max"] > data["estimation_min"] and
                            data["prix_moyen"] >= data["estimation_min"] and
                            data["prix_moyen"] <= data["estimation_max"]):
                            
                            self.log_result(
                                f"Estimation - {test_case['name']}", 
                                True, 
                                f"Price range: {data['estimation_min']}-{data['estimation_max']}€, Confidence: {data['confiance']}%",
                                data
                            )
                        else:
                            self.log_result(
                                f"Estimation - {test_case['name']}", 
                                False, 
                                f"Invalid price range: {data}"
                            )
                    else:
                        missing = [f for f in required_fields if f not in data]
                        self.log_result(
                            f"Estimation - {test_case['name']}", 
                            False, 
                            f"Missing fields: {missing}"
                        )
                elif response.status_code == 500:
                    self.log_result(
                        f"Estimation - {test_case['name']}", 
                        False, 
                        f"Server error 500 - API crashing: {response.text}"
                    )
                else:
                    self.log_result(
                        f"Estimation - {test_case['name']}", 
                        False, 
                        f"HTTP {response.status_code}: {response.text}"
                    )
                    
            except Exception as e:
                self.log_result(
                    f"Estimation - {test_case['name']}", 
                    False, 
                    f"Exception: {str(e)}"
                )
    
    def test_chat_api(self):
        """Test 3: Chat/Assistant API"""
        print("\n💬 Testing Chat API")
        
        test_messages = [
            {
                "name": "Authentication Question",
                "message": "Comment authentifier un sac Chanel?",
                "expected_keywords": ["authentifier", "coutures", "hardware"]
            },
            {
                "name": "Price Question", 
                "message": "Quel est le prix d'un Birkin?",
                "expected_keywords": ["prix", "Hermès", "Birkin"]
            },
            {
                "name": "Investment Question",
                "message": "Investir dans le luxe",
                "expected_keywords": ["investissement", "Hermès", "Chanel"]
            },
            {
                "name": "General Question",
                "message": "Bonjour, pouvez-vous m'aider?",
                "expected_keywords": ["Expert", "Selezione"]
            }
        ]
        
        for test_msg in test_messages:
            try:
                response = requests.post(
                    f"{API_BASE}/chat",
                    json={"message": test_msg["message"]},
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if "response" in data and data["response"]:
                        # Check if response contains expected keywords
                        response_text = data["response"].lower()
                        found_keywords = [kw for kw in test_msg["expected_keywords"] 
                                        if kw.lower() in response_text]
                        
                        if found_keywords:
                            self.log_result(
                                f"Chat - {test_msg['name']}", 
                                True, 
                                f"Relevant response received (keywords: {found_keywords})"
                            )
                        else:
                            self.log_result(
                                f"Chat - {test_msg['name']}", 
                                True, 
                                "Response received but may not be contextually relevant"
                            )
                    else:
                        self.log_result(
                            f"Chat - {test_msg['name']}", 
                            False, 
                            "Empty or missing response field"
                        )
                else:
                    self.log_result(
                        f"Chat - {test_msg['name']}", 
                        False, 
                        f"HTTP {response.status_code}: {response.text}"
                    )
                    
            except Exception as e:
                self.log_result(
                    f"Chat - {test_msg['name']}", 
                    False, 
                    f"Exception: {str(e)}"
                )
    
    def test_market_data_api(self):
        """Test 4: Market Data API (Dashboard)"""
        print("\n📊 Testing Market Data API")
        
        try:
            response = requests.get(f"{API_BASE}/market-data", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["luxury_index", "trend", "volume", "top_brand", "active_users"]
                
                if all(field in data for field in required_fields):
                    # Validate data types and ranges
                    valid_data = True
                    issues = []
                    
                    # Check luxury_index is a number
                    if not isinstance(data["luxury_index"], (int, float)):
                        valid_data = False
                        issues.append("luxury_index not numeric")
                    
                    # Check trend format
                    if not data["trend"].startswith(("+", "-")):
                        valid_data = False
                        issues.append("trend format invalid")
                    
                    # Check volume format
                    if not data["volume"].endswith("€"):
                        valid_data = False
                        issues.append("volume format invalid")
                    
                    if valid_data:
                        self.log_result(
                            "Market Data", 
                            True, 
                            f"All market data fields valid: Index {data['luxury_index']}, Trend {data['trend']}"
                        )
                    else:
                        self.log_result(
                            "Market Data", 
                            False, 
                            f"Data validation issues: {issues}"
                        )
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_result(
                        "Market Data", 
                        False, 
                        f"Missing fields: {missing}"
                    )
            else:
                self.log_result(
                    "Market Data", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Market Data", 
                False, 
                f"Exception: {str(e)}"
            )
    
    def test_marketplace_functionality(self):
        """Test 5: Marketplace-specific functionality"""
        print("\n🛍️ Testing Marketplace Functionality")
        
        # Test estimation with extreme values
        extreme_cases = [
            {
                "name": "Very Old Item (1970)",
                "data": {
                    "marque": "Hermès",
                    "modele": "Kelly",
                    "condition": "vintage",
                    "annee": "1970"
                }
            },
            {
                "name": "Future Item (2030)",
                "data": {
                    "marque": "Chanel",
                    "modele": "Classic Flap",
                    "condition": "neuf",
                    "annee": "2030"
                }
            },
            {
                "name": "Poor Condition Item",
                "data": {
                    "marque": "Louis Vuitton",
                    "modele": "Speedy",
                    "condition": "usagé",
                    "couleur": "monogram"
                }
            }
        ]
        
        for test_case in extreme_cases:
            try:
                response = requests.post(
                    f"{API_BASE}/estimation",
                    json=test_case["data"],
                    timeout=15
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if (data.get("estimation_min", 0) > 0 and 
                        data.get("estimation_max", 0) > data.get("estimation_min", 0)):
                        self.log_result(
                            f"Marketplace - {test_case['name']}", 
                            True, 
                            f"Handles extreme case: {data['estimation_min']}-{data['estimation_max']}€"
                        )
                    else:
                        self.log_result(
                            f"Marketplace - {test_case['name']}", 
                            False, 
                            f"Invalid price range for extreme case: {data}"
                        )
                else:
                    self.log_result(
                        f"Marketplace - {test_case['name']}", 
                        False, 
                        f"HTTP {response.status_code} for extreme case"
                    )
                    
            except Exception as e:
                self.log_result(
                    f"Marketplace - {test_case['name']}", 
                    False, 
                    f"Exception: {str(e)}"
                )
    
    def test_performance_stability(self):
        """Test 6: Performance and Stability"""
        print("\n⚡ Testing Performance and Stability")
        
        # Test multiple rapid requests (simulating high load)
        try:
            start_time = time.time()
            successful_requests = 0
            
            for i in range(5):  # 5 rapid requests
                response = requests.post(
                    f"{API_BASE}/estimation",
                    json={
                        "marque": "Chanel",
                        "modele": "Classic Flap",
                        "condition": "excellent état"
                    },
                    timeout=10
                )
                
                if response.status_code == 200:
                    successful_requests += 1
            
            end_time = time.time()
            total_time = end_time - start_time
            
            if successful_requests == 5:
                self.log_result(
                    "Performance - Rapid Requests", 
                    True, 
                    f"Handled 5 rapid requests in {total_time:.2f}s (avg: {total_time/5:.2f}s per request)"
                )
            else:
                self.log_result(
                    "Performance - Rapid Requests", 
                    False, 
                    f"Only {successful_requests}/5 requests succeeded"
                )
                
        except Exception as e:
            self.log_result(
                "Performance - Rapid Requests", 
                False, 
                f"Exception during load test: {str(e)}"
            )
        
        # Test API consistency (same input should give similar results)
        try:
            test_data = {
                "marque": "Hermès",
                "modele": "Birkin 30",
                "condition": "excellent état",
                "couleur": "noir",
                "annee": "2020"
            }
            
            results = []
            for i in range(3):
                response = requests.post(
                    f"{API_BASE}/estimation",
                    json=test_data,
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    results.append(data.get("prix_moyen", 0))
            
            if len(results) == 3:
                # Check if results are consistent (within 10% variance)
                avg_price = sum(results) / len(results)
                max_variance = max(abs(price - avg_price) for price in results)
                variance_percent = (max_variance / avg_price) * 100 if avg_price > 0 else 100
                
                if variance_percent <= 10:
                    self.log_result(
                        "Performance - Consistency", 
                        True, 
                        f"Results consistent: {results} (variance: {variance_percent:.1f}%)"
                    )
                else:
                    self.log_result(
                        "Performance - Consistency", 
                        False, 
                        f"Results inconsistent: {results} (variance: {variance_percent:.1f}%)"
                    )
            else:
                self.log_result(
                    "Performance - Consistency", 
                    False, 
                    f"Could not complete consistency test: {len(results)}/3 requests succeeded"
                )
                
        except Exception as e:
            self.log_result(
                "Performance - Consistency", 
                False, 
                f"Exception during consistency test: {str(e)}"
            )
    
    def test_new_professional_apis(self):
        """Test 7: NEW PROFESSIONAL APIs - Real Data Sources"""
        print("\n🔥 Testing NEW PROFESSIONAL APIs (Real Data)")
        
        # Test 1: Barcode Scanner API
        print("\n📱 Testing Barcode Scanner API")
        barcode_tests = [
            {
                "name": "Chanel Perfume Barcode",
                "barcode": "3386460065436",
                "expected_luxury": True
            },
            {
                "name": "Dior Perfume Barcode", 
                "barcode": "3348901419372",
                "expected_luxury": True
            },
            {
                "name": "Unknown Barcode",
                "barcode": "1234567890123",
                "expected_luxury": False
            }
        ]
        
        for test in barcode_tests:
            try:
                response = requests.post(
                    f"{API_BASE}/scan-barcode",
                    json={"barcode": test["barcode"]},
                    timeout=15
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("found"):
                        product = data.get("product", {})
                        if product.get("name") and product.get("brand"):
                            self.log_result(
                                f"Barcode Scanner - {test['name']}", 
                                True, 
                                f"Found: {product['brand']} - {product['name']}"
                            )
                        else:
                            self.log_result(
                                f"Barcode Scanner - {test['name']}", 
                                False, 
                                "Product found but missing name/brand"
                            )
                    else:
                        # Not found is OK for unknown barcodes
                        if test["expected_luxury"]:
                            self.log_result(
                                f"Barcode Scanner - {test['name']}", 
                                False, 
                                f"Expected luxury product not found: {data.get('message', 'No message')}"
                            )
                        else:
                            self.log_result(
                                f"Barcode Scanner - {test['name']}", 
                                True, 
                                f"Correctly handled unknown barcode: {data.get('message', 'Not found')}"
                            )
                else:
                    self.log_result(
                        f"Barcode Scanner - {test['name']}", 
                        False, 
                        f"HTTP {response.status_code}: {response.text}"
                    )
                    
            except Exception as e:
                self.log_result(
                    f"Barcode Scanner - {test['name']}", 
                    False, 
                    f"Exception: {str(e)}"
                )
        
        # Test 2: Luxury News API
        print("\n📰 Testing Luxury News API")
        try:
            response = requests.get(f"{API_BASE}/luxury-news", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                news_items = data.get("news", [])
                sources = data.get("sources", [])
                
                if news_items and len(news_items) > 0:
                    # Check news structure
                    first_news = news_items[0]
                    required_fields = ["title", "summary", "source", "time", "category"]
                    
                    if all(field in first_news for field in required_fields):
                        # Check if sources are professional
                        professional_sources = ["Les Échos", "Business of Fashion", "Vogue Business", "Fashion Network"]
                        has_professional_sources = any(source in str(sources) for source in professional_sources)
                        
                        if has_professional_sources:
                            self.log_result(
                                "Luxury News API", 
                                True, 
                                f"Retrieved {len(news_items)} news items from professional sources: {sources}"
                            )
                        else:
                            self.log_result(
                                "Luxury News API", 
                                False, 
                                f"Sources not professional enough: {sources}"
                            )
                    else:
                        missing = [f for f in required_fields if f not in first_news]
                        self.log_result(
                            "Luxury News API", 
                            False, 
                            f"News items missing required fields: {missing}"
                        )
                else:
                    self.log_result(
                        "Luxury News API", 
                        False, 
                        "No news items returned"
                    )
            else:
                self.log_result(
                    "Luxury News API", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Luxury News API", 
                False, 
                f"Exception: {str(e)}"
            )
        
        # Test 3: Market Indices API (Real Stock Data)
        print("\n📈 Testing Market Indices API")
        try:
            response = requests.get(f"{API_BASE}/market-indices", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                indices = data.get("indices", {})
                
                # Check for real luxury companies
                expected_companies = ["LVMH", "Hermès", "Kering"]
                found_companies = [company for company in expected_companies if company in indices]
                
                if len(found_companies) == len(expected_companies):
                    # Validate data structure
                    valid_data = True
                    for company, data_point in indices.items():
                        if not all(key in data_point for key in ["price", "change", "volume"]):
                            valid_data = False
                            break
                        
                        # Check if price is realistic (LVMH should be 400-800€, Hermès 1500-2500€)
                        price = data_point.get("price", 0)
                        if company == "LVMH" and not (400 <= price <= 800):
                            valid_data = False
                        elif company == "Hermès" and not (1500 <= price <= 2500):
                            valid_data = False
                        elif company == "Kering" and not (300 <= price <= 700):
                            valid_data = False
                    
                    if valid_data:
                        self.log_result(
                            "Market Indices API", 
                            True, 
                            f"Real stock data for {found_companies}: LVMH={indices['LVMH']['price']}€, Hermès={indices['Hermès']['price']}€"
                        )
                    else:
                        self.log_result(
                            "Market Indices API", 
                            False, 
                            "Stock prices seem unrealistic or data structure invalid"
                        )
                else:
                    self.log_result(
                        "Market Indices API", 
                        False, 
                        f"Missing luxury companies. Found: {found_companies}, Expected: {expected_companies}"
                    )
            else:
                self.log_result(
                    "Market Indices API", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Market Indices API", 
                False, 
                f"Exception: {str(e)}"
            )
        
        # Test 4: Trending Products API
        print("\n🔥 Testing Trending Products API")
        try:
            response = requests.get(f"{API_BASE}/trending-products", timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                trending_products = data.get("trending_products", [])
                
                if trending_products and len(trending_products) > 0:
                    # Check product structure
                    first_product = trending_products[0]
                    required_fields = ["brand", "product", "trend_score", "category", "estimated_price"]
                    
                    if all(field in first_product for field in required_fields):
                        # Check if brands are luxury
                        luxury_brands = ["Hermès", "Chanel", "Louis Vuitton", "Dior", "Gucci"]
                        found_luxury = [p for p in trending_products if p.get("brand") in luxury_brands]
                        
                        if found_luxury:
                            self.log_result(
                                "Trending Products API", 
                                True, 
                                f"Retrieved {len(trending_products)} trending products from luxury brands: {[p['brand'] for p in found_luxury]}"
                            )
                        else:
                            self.log_result(
                                "Trending Products API", 
                                False, 
                                f"No luxury brands found in trending products: {[p.get('brand') for p in trending_products]}"
                            )
                    else:
                        missing = [f for f in required_fields if f not in first_product]
                        self.log_result(
                            "Trending Products API", 
                            False, 
                            f"Trending products missing required fields: {missing}"
                        )
                else:
                    self.log_result(
                        "Trending Products API", 
                        False, 
                        "No trending products returned"
                    )
            else:
                self.log_result(
                    "Trending Products API", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                
        except Exception as e:
            self.log_result(
                "Trending Products API", 
                False, 
                f"Exception: {str(e)}"
            )

    def test_error_handling(self):
        """Test 8: Error Handling"""
        print("\n🚨 Testing Error Handling")
        
        # Test invalid estimation request
        try:
            response = requests.post(
                f"{API_BASE}/estimation",
                json={},  # Empty request
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error expected
                self.log_result(
                    "Error Handling - Invalid Estimation", 
                    True, 
                    "Properly returns 422 for invalid request"
                )
            elif response.status_code == 500:
                self.log_result(
                    "Error Handling - Invalid Estimation", 
                    False, 
                    "Returns 500 instead of proper validation error"
                )
            else:
                self.log_result(
                    "Error Handling - Invalid Estimation", 
                    False, 
                    f"Unexpected status code: {response.status_code}"
                )
                
        except Exception as e:
            self.log_result(
                "Error Handling - Invalid Estimation", 
                False, 
                f"Exception: {str(e)}"
            )
        
        # Test non-existent endpoint
        try:
            response = requests.get(f"{API_BASE}/nonexistent", timeout=10)
            
            if response.status_code == 404:
                self.log_result(
                    "Error Handling - 404", 
                    True, 
                    "Properly returns 404 for non-existent endpoint"
                )
            else:
                self.log_result(
                    "Error Handling - 404", 
                    False, 
                    f"Expected 404, got {response.status_code}"
                )
                
        except Exception as e:
            self.log_result(
                "Error Handling - 404", 
                False, 
                f"Exception: {str(e)}"
            )
        
        # Test invalid barcode request
        try:
            response = requests.post(
                f"{API_BASE}/scan-barcode",
                json={},  # Empty request
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error expected
                self.log_result(
                    "Error Handling - Invalid Barcode", 
                    True, 
                    "Properly returns 422 for invalid barcode request"
                )
            else:
                self.log_result(
                    "Error Handling - Invalid Barcode", 
                    False, 
                    f"Expected 422, got {response.status_code}"
                )
                
        except Exception as e:
            self.log_result(
                "Error Handling - Invalid Barcode", 
                False, 
                f"Exception: {str(e)}"
            )
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend Test Suite for Selezione Marketplace")
        print("=" * 60)
        
        # Run tests in priority order
        self.test_backend_health()
        self.test_estimation_api()  # Priority test
        self.test_chat_api()
        self.test_market_data_api()
        self.test_marketplace_functionality()
        self.test_performance_stability()
        self.test_new_professional_apis()  # NEW PROFESSIONAL APIs
        self.test_error_handling()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📋 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.total_tests}")
        print(f"✅ Passed: {self.passed_tests}")
        print(f"❌ Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests*100):.1f}%")
        
        # Show critical failures
        critical_failures = [r for r in self.results if "❌" in r["status"] and 
                           any(keyword in r["test"].lower() for keyword in ["estimation", "backend", "health"])]
        
        if critical_failures:
            print("\n🚨 CRITICAL FAILURES:")
            for failure in critical_failures:
                print(f"  - {failure['test']}: {failure['message']}")
        
        # Show all results
        print(f"\n📊 DETAILED RESULTS:")
        for result in self.results:
            print(f"  {result['status']} {result['test']}: {result['message']}")
        
        return self.failed_tests == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! Backend is stable for PHASE 2.")
        sys.exit(0)
    else:
        print(f"\n⚠️  {tester.failed_tests} test(s) failed. Review issues before PHASE 2.")
        sys.exit(1)