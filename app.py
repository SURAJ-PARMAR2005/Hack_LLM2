from fastapi import FastAPI
from pydantic import BaseModel
from transformers import T5Tokenizer, T5ForConditionalGeneration
from peft import PeftModel
from fastapi.middleware.cors import CORSMiddleware
import torch, os

MODEL_DIR = os.getenv("MODEL_DIR", "t5_lora_final")
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

app = FastAPI(title="LLM Inference")

# CORS (allow your Node or React origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load once, globally
tok = T5Tokenizer.from_pretrained("t5-small", legacy=True)
CONTROL = ["<information>", "<suggestion>", "<cause>", "<experience>", "<question>"]
tok.add_tokens(CONTROL, special_tokens=True)

base = T5ForConditionalGeneration.from_pretrained("t5-small")
base.resize_token_embeddings(len(tok))
model = PeftModel.from_pretrained(base, MODEL_DIR)
model.eval()

class SummarizeRequest(BaseModel):
    style: str  # e.g. "information" | "suggestion" | ...
    text: str
    max_new_tokens: int = 128
    beam_search: bool = True

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/summarize")
def summarize(req: SummarizeRequest):
    style = req.style.strip().lower()
    if style not in {"information","suggestion","cause","experience","question"}:
        style = "information"
    prompt = f"<{style}> summarize: {req.text}"

    inputs = tok(prompt, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        if req.beam_search:
            outputs = model.generate(**inputs, max_new_tokens=req.max_new_tokens, num_beams=4)
        else:
            outputs = model.generate(**inputs, max_new_tokens=req.max_new_tokens)
    summary = tok.decode(outputs[0], skip_special_tokens=True)
    return {"summary": summary}
