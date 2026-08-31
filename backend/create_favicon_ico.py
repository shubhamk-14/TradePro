import shutil
import os

src = r"e:\Tradivora\frontend\public\favicon.svg"
dst = r"e:\Tradivora\frontend\public\favicon.ico"

shutil.copy(src, dst)
print("Copied favicon.svg to favicon.ico!")
