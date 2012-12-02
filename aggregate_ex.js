use test
db.products.aggregate([
	{$group:
		{
			_id:"$manufacturer",
			num_products:{$sum:1}
		}
	}
])

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
   { "_id":{"stateD":"$state"},
   "population":{"$sum":"$pop"}  
   }
  }


  db.zips.aggregate([
  {"$group":
   {_id:"$state",
   "population":{"$sum":"$pop"}  
   }
  }
])

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