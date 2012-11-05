import pymongo
import sys

connection = pymongo.Connection("mongodb://localhost", safe=True)

db = connection.test
users = db.users

j = {'firstname':'Andrew', 'last_name':'Wright'}
try:
	users.insert(j)
except:
	print "insert failed:", sys.exc_info()[0]

print j
try:
	users.insert(j)
except:
	print "insert failed:", sys.exc_info()[0]