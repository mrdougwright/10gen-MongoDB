import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to the reddit database
db=connection.school
people = db.people

def insert():

	print "insert, reporting for duty"

	richard = {"name":"Richard Kreuter", "company":"10gen",
							"interests":['horses','skydiving','fencing']} # no underscore ID
	andrew = {"_id":"erlichson", "name":"Andrew Erlichson", "company":"10gen",
							"interests":['running','cycling','photography']} # has ID

	try:
		people.insert(richard)
		people.insert(andrew)

	except:
		print "Unexpected error:", sys.exc_info()[0]

	print(richard)
	print(andrew)

insert()


