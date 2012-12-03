//hw 5.1
db.posts.aggregate([
	{"$unwind":"$comments"},
	{$group:
		{
			_id:"$comments.author",
			num_comments:{$sum:1}
		}
	},
	{$sort:
		{
			num_comments:1
		}
	}
])

// hw 5.2 - calculate ave population of cities in CA 
//and NY when over 25,000
db.zips.aggregate([
	{$match:
		{
			state:{$in:["NY","CA"]}
		}
	},
	{$group:
		{
			_id:{state:"$state",city:"$city"},
			"sum":{"$sum":"$pop"}
		}
	},
	{$match:
		{
			sum:{"$gt":25000}
		}
	},
	{$group:
		{
			_id:null,
			"average_pop":{$avg:"$sum"}
		}
	}
])

// hw 5.3
db.grades.aggregate([
	{$unwind:"$scores"},
	{$match:
		{
			type:{$ne:"$quiz"}
		}
	},
	{$group:
		{
			_id:"$class_id",
			"avg_score":{$avg:"$scores.score"}
		}
	},
	{$group:
		{
			_id:"$_id",
			"avg_for_class":{$avg:"$avg_score"}
		}
	},
	{$sort:{"avg_for_class":1}}
])

// hw 5.4
db.zips.aggregate([
	{$project:
		{
			first_char: {$substr: ["$city",0,1]},
			pop: "$pop",
			zipcode: "$_id"
		}
	},
	{$match:
		{
			first_char:{$in:["0","1","2","3","4","5","6","7","8","9"]}	
		}
	},
	{$group:
		{
			_id:0,
			"total":{$sum:"$pop"},
		}
	}
])

