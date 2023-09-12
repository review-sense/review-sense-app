# review-sense-app

1. Extensions to install:

- Black
- isort 
- Prettier 

2. Create a .vscode folder with settings.json file in it

```
{
  "[python]": {
   "editor.codeActionsOnSave": {
     "source.organizeImports": true
      }
    },
  "python.formatting.provider": "black",
  "isort.args": ["--profile", "black"],
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
}
```

3. In the api/ folder create .env.developement file 

```
MONGO_DB_LOCAL=""
SECRET_KEY=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
```

4. In the client/ folder create .env.developement file 

```
REACT_APP_AWS_ACCESS_KEY_ID=""
REACT_APP_AWS_SECRET_ACCESS_KEY=""
```

5. Set Up SSL Certificate
(for MacOS)
- ask dev lead for `certificates` folder
- once downloaded place it inside `api` folder
- open `certificates` folder, open `cert.pem` the following window will pop up:
<img width="538" alt="Screenshot 2023-08-08 at 8 40 53 PM" src="https://github.com/review-sense/review-sense-app/assets/100636075/9b306ec2-f638-467a-a5fa-e0340e2cea43">

- choose `System` for Keychain and click add
- make sure the certificate is trusted by opening the certificate, expanding `Trust` section and choosing `Always trust` for all settings:
<img width="506" alt="Screenshot 2023-09-11 at 5 38 57 PM" src="https://github.com/review-sense/review-sense-app/assets/100636075/c52fcc7c-e280-4437-92ce-6c55e9e298a3">

- start backend server by typing `python app.py` in terminal (`api` folder)
- after writing down the password the following will be prompted:
```
Enter PEM pass phrase:
```
- ask dev lead for pass phrase and type it there
- the same prompt might be asked several times - use same pass phrase

- after this api request should work - if not please restart your laptop

DEBUG:
- try adding the certificate to `login` Keychain
- to make sure SSL certificate is connected to the server go to the localhost where server is run:
  ```
   * Running on https://127.0.0.1:8000
  ```
- if you see a warning - click `Advanced` and then go to server
- click warning in the upper left corner. Then, click `Certificate is not valid`:
<img width="1305" alt="Screenshot 2023-08-08 at 8 50 06 PM" src="https://github.com/review-sense/review-sense-app/assets/100636075/aade5690-a6f2-49ba-803d-41f12f191350">

- you should see the following:
<img width="526" alt="Screenshot 2023-08-08 at 8 51 37 PM" src="https://github.com/review-sense/review-sense-app/assets/100636075/b36b1868-c6de-4b45-a0dc-fe8379dab6ae">


