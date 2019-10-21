# IMPORTS

from flask import Flask, g
from flask_cors import CORS
import models

DEBUG = True
PORT = 8000

app = Flask(__name__)
app.secret_key = 'kljasdfjdsfklkjldejkl342kljew423'


@app.before_request
def before_request():
    g.db = models.DATABASE
    g.db.connect()


@app.after_request
def after_request(response):
    g.db.close()
    return response


if __name__ == "__main__":
    models.initialize()
    app.run(debug=DEBUG, port=PORT)
