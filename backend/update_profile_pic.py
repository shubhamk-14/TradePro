from database import engine, SessionLocal
import models

def update_pics():
    db = SessionLocal()
    stylish_male_pic = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"
    
    users = db.query(models.User).all()
    print(f"Found {len(users)} users. Updating profile pictures...")
    for u in users:
        u.profile_pic = stylish_male_pic
        print(f"Updated {u.email} -> {stylish_male_pic}")
    db.commit()
    db.close()
    print("Database profile pictures updated successfully!")

if __name__ == "__main__":
    update_pics()
