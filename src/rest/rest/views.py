from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']


#logging.basicConfig(level=logging.NOTSET)  

class TodoListView(APIView):

    def __init__(self):
        self.todos = db['todoList_final']
    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        try:
            data = self.todos.find()
            task = []
            if data:
                for doc in data:
                    task.append({"task": doc['task']})
            return Response(task, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Exception at get: {e}")

    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        body = None
        try:
            body = json.loads(request.body)
            todo = {"task": body['task']}
            todoId = self.todos.insert_one(todo).inserted_id

        except Exception as e:  
            print(e)
        return Response({}, status=status.HTTP_200_OK)