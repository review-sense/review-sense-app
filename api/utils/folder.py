import os
import shutil


def clean_up_folder(folder_path):
    try:
        # List all files and subdirectories in the folder
        folder_contents = os.listdir(folder_path)

        # Remove files and subdirectories
        for item in folder_contents:
            item_path = os.path.join(folder_path, item)
            if os.path.isfile(item_path):
                os.remove(item_path)
            elif os.path.isdir(item_path):
                shutil.rmtree(item_path)
    except Exception as e:
        pass
