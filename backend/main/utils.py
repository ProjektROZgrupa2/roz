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

def get_all_files(credentials_json):
    credentials_info = json.loads(credentials_json)
    credentials = service_account.Credentials.from_service_account_info(credentials_info)
    service = build('drive', 'v3', credentials=credentials)

    query = "mimeType != 'application/vnd.google-apps.folder' and trashed=false"
    results = service.files().list(q=query, spaces='drive', fields='files(id, name, parents)').execute()
    files = results.get('files', [])

    folders = service.files().list(q="mimeType='application/vnd.google-apps.folder' and trashed=false",
                                   spaces='drive', fields='files(id, name, parents)').execute()
    folder_dict = {folder['id']: folder['name'] for folder in folders.get('files', [])}

    files_with_folders = []
    for file in files:
        folder_name = 'No Folder'
        if 'parents' in file and file['parents']:
            folder_name = folder_dict.get(file['parents'][0], 'No Folder')
        if folder_name != 'No Folder':
            files_with_folders.append({'file': file['name'], 'folder': folder_name})

    return files_with_folders

import logging

logger = logging.getLogger(__name__)
def get_files_for_child(child_name, credentials_json):
    credentials_info = json.loads(credentials_json)
    credentials = service_account.Credentials.from_service_account_info(credentials_info)
    service = build('drive', 'v3', credentials=credentials)

    query = f"name='{child_name}' and mimeType='application/vnd.google-apps.folder' and trashed=false"
    results = service.files().list(q=query, spaces='drive', fields='files(id)').execute()
    folders = results.get('files', [])

    if not folders:
        return []

    folder_id = folders[0]['id']
    query = f"'{folder_id}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed=false"
    results = service.files().list(q=query, spaces='drive', fields='files(id, name)').execute()
    files = results.get('files', [])

    return [{'file': file['name'], 'id': file['id'], 'folder': child_name} for file in files]