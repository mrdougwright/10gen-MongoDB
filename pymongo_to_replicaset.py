import pymongo
import sys

c = pymongo.MongoClient(host=["mongodb://localhost:21017",
							  "mongodb://localhost:21018",
							  "mongodb://localhost:21019"],
							  replicaSet="rs1",
							  w=1, j=True)

# or:
# c = pymongo.MongoClient(host="mongodb://localhost:21017",
# 							  replicaSet="rs1",
#							  w=1, j=True)
db = c.m101
people = db.people

try:
	print "inserting"
	people.insert({"name":"Andrew Erlichson", "favorite_color":"blue"})
	print "inserting"
	people.insert({"name":"Richard Krueter", "favorite_color":"red"})
	print "inserting"
	people.insert({"name":"Dwight Merriman", "favorite_color":"green"})
except:
	print "Unexpected error:", sys.exc_info()[0]
print "completed the inserts"