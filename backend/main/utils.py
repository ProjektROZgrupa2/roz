from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.oauth2 import service_account
import tempfile
import os
import json
from decouple import config

def upload_to_google_drive(file, folder_id, credentials_json, title):
    credentials_info = json.loads(credentials_json)
    
    with tempfile.NamedTemporaryFile(delete=False) as temp_credentials_file:
        temp_credentials_file.write(json.dumps(credentials_info).encode())
        temp_credentials_file.flush()
        temp_credentials_path = temp_credentials_file.name

    credentials = service_account.Credentials.from_service_account_file(temp_credentials_path)
    service = build('drive', 'v3', credentials=credentials)

    query = f"'{folder_id}' in parents and mimeType='application/vnd.google-apps.folder' and name='{title}' and trashed=false"
    results = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    items = results.get('files', [])

    if not items:
        file_metadata = {
            'name': title,
            'mimeType': 'application/vnd.google-apps.folder',
            'parents': [folder_id]
        }
        folder = service.files().create(body=file_metadata, fields='id').execute()
        folder_id = folder.get('id')
    else:
        folder_id = items[0].get('id')

    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        for chunk in file.chunks():
            temp_file.write(chunk)
        temp_file_path = temp_file.name

    file_metadata = {
        'name': file.name,
        'parents': [folder_id]
    }
    media = MediaFileUpload(temp_file_path, resumable=True)
    uploaded_file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()

    os.remove(temp_file_path)
    os.remove(temp_credentials_path)

    return uploaded_file.get('id')
