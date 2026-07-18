from sqlalchemy.orm import Session

from app.database.models import User, Subject, Note


class DashboardService:

    @staticmethod
    def get_dashboard(db: Session):

        total_users = db.query(User).count()
        total_subjects = db.query(Subject).count()
        total_notes = db.query(Note).count()

        return {
            "total_users": total_users,
            "total_subjects": total_subjects,
            "total_notes": total_notes,
        }