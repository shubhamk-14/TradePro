from database import engine, Base
import models
from seed_data import seed_database

print("Dropping all tables...")
try:
    Base.metadata.drop_all(bind=engine)
except Exception as e:
    print("Drop error:", e)

print("Recreating all tables...")
Base.metadata.create_all(bind=engine)

print("Seeding database...")
seed_database()
print("Database reset & seeded successfully!")
