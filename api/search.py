import http.server
import json
from urllib.parse import urlparse, parse_qs

class SearchHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Enable CORS
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        # Parse the URL and get the query parameter
        parsed_url = urlparse(self.path)
        if parsed_url.path == '/search':
            query_params = parse_qs(parsed_url.query)
            search_query = query_params.get('q', [''])[0]

            # Sample data - simulating search results
            results = [
                {
                    'name': 'Coffee House',
                    'description': 'Cozy coffee shop with fast Wi-Fi and quiet workspace',
                    'rating': 4.5,
                    'distance': '0.5 km',
                    'address': '123 Main St'
                },
                {
                    'name': 'Book Haven',
                    'description': 'Bookstore with reading nooks and cafe',
                    'rating': 4.8,
                    'distance': '1.2 km',
                    'address': '456 Book Lane'
                },
                {
                    'name': 'Green Bistro',
                    'description': 'Eco-friendly restaurant with outdoor seating',
                    'rating': 4.3,
                    'distance': '0.8 km',
                    'address': '789 Green Ave'
                }
            ]

            # Send the JSON response
            self.wfile.write(json.dumps({'results': results}).encode())
        else:
            self.wfile.write(json.dumps({'error': 'Invalid endpoint'}).encode())

    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.end_headers()

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = http.server.HTTPServer(server_address, SearchHandler)
    print('Starting server on port 8000...')
    httpd.serve_forever()