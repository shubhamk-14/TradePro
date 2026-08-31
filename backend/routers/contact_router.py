from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/api/contact", tags=["Contact Us"])

@router.post("")
def send_contact_message(msg: schemas.ContactCreate, db: Session = Depends(get_db)):
    new_msg = models.ContactMessage(
        name=msg.name,
        email=msg.email,
        subject=msg.subject,
        message=msg.message
    )
    db.add(new_msg)
    db.commit()
    return {"message": "Thank you! Your message has been received."}
