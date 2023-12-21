import json

def handle_api_request(path):
    # Handle API requests here
    if path == "/api/data":
        return {'message': 'Hello from API!'}
    else:
        return {'error': 'Endpoint not found'}