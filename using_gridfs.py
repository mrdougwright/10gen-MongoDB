import pymongo
import gridfs
import sys

# establish connection to the db
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to test database
db = connection.test
videos_meta = db.videos_meta

def main():
	grid = gridfs.GridFS(db, "videos")
	fin = open("test_video.mov", "r") # r is to open file as readable

	_id = grid.put(fin)
	fin.close()

	print "id of file is ", _id

	videos_meta.insert({'grid_id':_id, "filename":"test_video.mov"})

main()