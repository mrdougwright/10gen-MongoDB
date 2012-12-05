# Write a program in the language of your choice that will 
# remove the lowest homework score for each student. Since 
# there is a single document for each student containing an 
# array of scores, you will need to update the scores array 
# and remove the homework.
import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# new pymongo syntax:
connection = pymongo.MongoClient(host="mongodb://localhost:27017", w=1, j=True)

# get a handle to the school databse
db=connection.school
students = db.students

def remove_lowest_homework():

	try:
		student_docs = students.find({})

	except:
		print "Unexpected error:", sys.exc_info()[0]

	for doc in student_docs:  # look at every document in student collection
														# sanity check -> print doc['name']
		doc["scores"].sort() 						#	sort each document, ascending to highest score
		for hw in doc["scores"]: 				# look at every document for each student
			if hw['type'] == 'homework':	# grab first doc which is 'homework'
				id_curr = doc["_id"]  			# set id of document
																		# pull that document out of the array
				students.update({"_id":id_curr},{"$pull":{'scores':hw}})
				break  # exit the loop

remove_lowest_homework()

