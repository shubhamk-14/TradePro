import os

target = r"e:\Tradivora\frontend\public\shubham.jpg"

if os.path.exists(target):
    os.remove(target)
    print("shubham.jpg successfully deleted from public directory!")
else:
    print("shubham.jpg does not exist.")
