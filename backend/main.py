from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import cv2
import numpy as np
from PIL import Image
import io

app = FastAPI()

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/verify")
async def verify_image(file: UploadFile = File(...)):
    # Read the file content
    contents = await file.read()
    
    # Check if we can open it with PIL
    try:
        image = Image.open(io.BytesIO(contents))
        # Convert to numpy array to ensure libraries are working together
        img_np = np.array(image)
        
        # Basic check with OpenCV (just getting dimensions)
        height, width = img_np.shape[:2]
        
        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "width": width,
            "height": height,
            "verification_status": "received"
        }
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
