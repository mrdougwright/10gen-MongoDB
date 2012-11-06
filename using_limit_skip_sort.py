import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to the reddit database
db=connection.school
scores = db.scores

def find():
	print "find, reporting for duty"

	query = {}

	try:
		cursor = scores.find(query).skip(4)
		cursor = cursor.limit(1)
		cursor = cursor.sort('student_id', pymongo.ASCENDING).skip(4).limit(1)
		#cursor = scores.find(query).sort('student_id', pymongo.ASCENDING).skip(4).limit(1)
		#cursor = cursor.sort([('student_id', pymongo.ASCENDING),('score',pymongo.DESCENDING)])

	except:
		print "Unexpected error:", sys.exc_info()[0]

	sanity = 0
	for doc in cursor:  # once you run through the query, this is when mongo begins sort, then skip, then limit
		print doc
		# sanity += 1
		# if (sanity > 10):
		# 	break

find()