use test
db.products.aggregate([
	{$group:
		{
			_id:"$manufacturer",
			num_products:{$sum:1}
		}
	}
])

//aggregate $sum
db.products.aggregate([ 
	{$group: 
		{
			_id:"$category",
			num_products:{$sum:1}
		}
	}
])


db.zips.aggregate([
  {"$group":
   {_id:"$state",
   "population":{"$sum":"$pop"}  
   }
  }
])

// $avg
db.products.aggregate([
	{$group:
		{
			_id:{
				"category":"$category"
			},
			avg_price:{$avg:"$price"}
		}
	}
])

db.zips.aggregate([
	{$group:
		{
			_id:"$state",
			"average_pop":{$avg:"$pop"}
		}}
])

// $addToSet
db.zips.aggregate([
	{$group:
		{
			_id:"$city",
			"postal_codes":{$addToSet:"$_id"}
		}
	}
])

// $push
db.products.aggregate([
	{$group:
		{
			_id:{
				"maker":"$manufacturer"
			},
			categories:{$push:"$category"}
		}
	}
])

// $max and $min
db.zips.aggregate([
	{$group:
		{
			_id:"$_id",
			pop:{$max:"$pop"}
		}}
])

// $group stages
db.grades.aggregate([
	{$group:{
		_id:{class_id:"$class_id", student_id:"$student_id"},
		'average':{"$avg":"$score"}
		}
	},
	{$group:{_id:"$_id.class_id", 'average':{"$avg":"$average"}}}
])

// $project
db.zips.aggregate([
	{$project:
		{
			_id:0,
			"city":{$toLower:"$city"},
			"pop":"$pop",
			"state":"$state",
			"zip":"$_id"
		}
	}
])  //or:
db.zips.aggregate([
	{$project:
		{
			_id:0,
			"city":{"$toLower":"$city"},
			pop:1,
			state:1,
			"zip":"$_id"
		}
	}
])

// $match
db.zips.aggregate([
	{$match:
		{
			state:"NY"
		}
	},
	{$group:
		{
			_id: "$city",
			population: {$sum:"$pop"},
			zip_codes: {$addToSet: "$_id"}
		}
	},
	{$project:
		{
			_id:0,
			city: "$_id",
			population: "$population", //or population:1
			zip_codes:1
		}
	}
])

db.zips.aggregate([
	{$match:
		{
			pop:{$gt:100000}
		}
	}
])

// $sort
db.zips.aggregate([
	{$sort:
		{
			state:1,
			city:1
		}
	}
])

// using $match, $group, $project, $sort, $skip, $limit
db.zips.aggregate([
	{$match:
		{
			state:"NY"
		}
	},
	{$group:
		{
			_id:"$city",
			population: {$sum:"$pop"}
		}
	},
	{$project:
		{
			_id:0,
			city:"$_id",
			population:1,
		}
	},
	{$sort:
		{
			population:-1
		}
	},
	{$skip: 10},
	{$limit: 5}
])

// get the population of every city in every state
db.zips.aggregate([
	{$group:
		{
			_id: {state:"$state", city:"$city"},
			population: {$sum:"$pop"},
		}
	},
	//sort by state, population
	{$sort:
		{"_id.state":1, "population":-1}
	},
	// group by state, get first item in each group
	{$group:
		{
			_id:"$_id.state",
			city: {$first: "$_id.city"},
			population: {$first:"$population"}
		}
	},
	{$sort: {population:1}}
])

// $unwind to unjoin data
// {a:1,b:[A1,B1]} would become:
// {a:1,b:A1}
// {a:1,b:B1}
// $push is like the opposite to $unwind




