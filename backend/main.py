"""GreenCode API starter. Arbitrary user code is never executed."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="GreenCode API", version="1.0.0")

# Restrict this list to your deployed frontend origin before production use.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with the exact Pages URL before production.
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

class AnalysisRequest(BaseModel):
    source: str = Field(min_length=1, max_length=20000)

@app.get("/")
def health():
    return {"service": "GreenCode API", "status": "ok"}

@app.post("/analyze")
def analyze(request: AnalysisRequest):
    """Safe starter endpoint: reports source size, does not execute the code."""
    lines = request.source.splitlines()
    return {
        "line_count": len(lines),
        "character_count": len(request.source),
        "notice": "Static starter analysis only; submitted code was not executed."
    }
