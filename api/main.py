#!/usr/bin/env python

from flask import Flask, Response, request
from flup.server.fcgi import WSGIServer
from functools import wraps
import sys
import json
import words
import instructions

app = Flask(__name__)
app.debug = True

def json_response(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        ret = func(*args, **kwargs)
        if isinstance(ret, tuple) and len(ret) == 2:
            resp = Response(json.dumps(ret[0]), status=ret[1], mimetype="application/json")
        else:
            resp = Response(json.dumps(ret[0]), status=200, mimetype="application/json")
        return resp
    return wrapper

@app.route("/api/instructions")
@json_response
def get_instructions():
    ins = instructions.get_instructions()
    print >>sys.stderr, ins
    return ins, 200

@app.route("/api/words")
@json_response
def get_words():
    wordlist = words.get_word_blocks()
    return wordlist, 200

@app.route("/api/words/submit_response", methods=["POST"])
@json_response
def submit_response():
    print >>sys.stderr, request.form
    return "ok", 200

if __name__ == "__main__":
    SOCK = "/home/dev/sockets/turk.fcgi.sock"
    WSGIServer(app, bindAddress=SOCK, umask=777).run()
