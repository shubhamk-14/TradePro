import shutil
import os

src = r"C:\Users\sk974\.gemini\antigravity\brain\36137045-701c-4179-9cbe-a0f4ca99995a\.user_uploaded\media__1788209615039.jpg"
dst = r"e:\Tradivora\frontend\public\shubham.jpg"

os.makedirs(os.path.dirname(dst), exist_ok=True)
shutil.copy(src, dst)
print("Photo successfully copied to public/shubham.jpg!")
