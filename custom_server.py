from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import sys
import os
from backend.app.index import handle_api_request
class MyHandler(SimpleHTTPRequestHandler):

    def do_GET(self):
        if self.path.startswith("/api"):
            api_response = handle_api_request(self.path)
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(api_response).encode('utf-8'))
        else:
            f = open('routing.json')
            data = json.load(f)
            for i in data['routes']:
                if self.path == i['path']:
                    print(i['path'] + "   " + i['component'])
                    self.path = "src/components/" + i['component']
                    print(self.path)
                    
            f.close()
            return SimpleHTTPRequestHandler.do_GET(self)
            

def run_custom_server(port):
    handler = MyHandler
    server = HTTPServer(('localhost', port), handler)
    print(f"Server started on port {port}")
    server.serve_forever()

if __name__ == "__main__":
    # Get the port from the command-line arguments
    if len(sys.argv) < 2:
        print("Usage: python custom_server.py <port>")
        sys.exit(1)
    port = int(sys.argv[1])

    run_custom_server(port)
