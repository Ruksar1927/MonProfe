from fastapi import FastAPI

app = FastAPI(
    title="AI Exam Coach",
    version="1.0.0"
) #fastapi creates web application instance 


@app.get("/") # it defines what happens when someone visits the home page.
def home():
    return {"message": "Welcome to AI Exam Coach"}



