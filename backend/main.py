from flask import request, jsonify
from config import app, db
from models import Task

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    json_tasks = list(map(lambda t: t.to_json(), tasks))
    return jsonify({'tasks': json_tasks})


@app.route("/create_task", methods=['POST'])
def create_task():
    data = request.json
    title = data.get('title')
    done = data.get('done', False)
    
    if not title:
        return jsonify({'message': 'Title is required'}), 400
    
    new_task = Task(title=title, done=done)
    
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error creating task: {str(e)}")
        return jsonify({'message': 'An error occurred while creating the task'}), 500
    
    return jsonify({'message': 'Task created successfully', 'task': new_task.to_json()}), 201

@app.route("/update_task/<int:task_id>", methods=['PATCH'])

def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"message": "Task not found"}), 404
    
    data = request.json 
    task.title = data.get("title", task.title)
    task.done = data.get("done", task.done)
    
    db.session.commit()
    
    return jsonify({"message": "Task updated"}), 200

@app.route("/delete_task/<int:task_id>", methods=['DELETE'])

def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"message": "Task not found"}), 404
    
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({"message": "Task deleted"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
    app.run(debug=True)
