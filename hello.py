import bottle
import pymongo

#this is the handler for the root address of the web server
@bottle.route('/')
def index():
	from pymongo import Connection
	connection = Connection('localhost', 27017) # get a connection to the database

	db = connection.test # attach to test database

	names = db.names # get a handle for the names collection

	item = names.find_one()  # find a single item from names

	return '<b>Hello %s!</b>' % item['name']


bottle.run(host='localhost', port=8082)

