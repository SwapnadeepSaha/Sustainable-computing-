# GreenCode API

This FastAPI service is a separate backend starter. GitHub Pages hosts only static frontend files, so deploy this service to a Python host such as Render if API functionality is needed.

## Run locally
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Before production, replace the permissive CORS origin in `main.py` with the exact GitHub Pages origin. This starter does not execute submitted code.
