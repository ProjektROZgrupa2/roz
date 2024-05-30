import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import json

# Define the Google Drive API scopes and service account file path
SCOPES = ['https://www.googleapis.com/auth/drive']
SERVICE_ACCOUNT_FILE = "./credentials.json"

# Create credentials using the service account file
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)

# Build the Google Drive service
drive_service = build('drive', 'v3', credentials=credentials)

def create_folder(folder_name, parent_folder_id=None):
    """Create a folder in Google Drive and return its ID."""
    folder_metadata = {
        'name': folder_name,
        "mimeType": "application/vnd.google-apps.folder",
        'parents': [parent_folder_id] if parent_folder_id else []
    }

    created_folder = drive_service.files().create(
        body=folder_metadata,
        fields='id'
    ).execute()

    print(f'Created Folder ID: {created_folder["id"]}')
    return created_folder["id"]


def upload_file(data: dict):
    new_data = data.copy()
    if "image" in new_data:
        del new_data["image"]

    with open('data.txt', 'w') as convert_file: 
        #convert_file.write(json.dumps(new_data))
        convert_file.write(
            f"Name: {new_data['name']}\nSurname: {new_data['surname']}\nDateOfBirth: {new_data['date_of_birth']}\nPlaceOfBirth: {new_data['place_of_bitrh']}\nDateOfAdmission: {new_data['date_of_admission']}\nReferralNumber: {new_data['referral_number']}\nMother: {new_data['mother']}\nFather: {new_data['father']}\nLegalGuardian: {new_data['legal_guardian']}\nSiblings: {new_data['siblings']}\n\nNote: {new_data['notes']}\n"
        )

    file_metadata = {
        "name": f"{data['name']}{data['surname']}.txt",
        "parents": ["1__NXmH6_sEqvdTw1IvJC0T_PW02XFjlC"]
    }
    media = MediaFileUpload(f"data.txt", mimetype="text/plain")
    # pylint: disable=maybe-no-member
    file = (
        drive_service.files()
        .create(body=file_metadata, media_body=media, fields="id")
        .execute()
    )

    permission = {
        'type': 'user',
        'role': 'writer',
        'emailAddress': 'truongtramyy@gmail.com',
    }
    drive_service.permissions().create(fileId=file.get("id"), body=permission, sendNotificationEmail=None).execute()

    print(f'File ID: {file.get("id")}')