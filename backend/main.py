from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def health_check():
    return {"status": "mystateai backend running"}