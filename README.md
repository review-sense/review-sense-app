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