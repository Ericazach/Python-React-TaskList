from config import db

class Task(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(100), unique=False, nullable=False)
	description = db.Column(db.String(200), unique=False, nullable=False)
	done = db.Column(db.Boolean)

	def to_json(self):
		return {
			"id": self.id,
			"title": self.title,
			"description": self.description,
			"done": self.done
		}
  
