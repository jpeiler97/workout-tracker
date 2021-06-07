const router = require('express').Router();
const Workout = require('../models/Workout');

//Route that gets workouts from database
router.get('/api/workouts', (req, res) => {
	//Aggregate function that sums the durations from each exercise and adds it to a new field "totalDuration"
	Workout.aggregate([ 
		{$addFields: {
			totalDuration: 
				{
					$sum: '$exercises.duration'
				}
		}}
	])
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Route that adds workouts to database
router.post('/api/workouts', ({ body }, res) => {
	const workout = new Workout(body);
	Workout.create(workout)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Route that removes workouts from database
router.delete('/api/workouts/:id', (req, res) => {
	Workout.findByIdAndRemove(req.params.id)
		.then((dbWorkout) => {
			console.log(dbWorkout)
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Route that updates a specific workout by pushing a new exercise
router.put('/api/workouts/:id', (req, res) => {
	Workout.findByIdAndUpdate(req.params.id , {$push: { exercises: req.body }}, {new: true})
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});


//Route that gets a 7-day range of workouts, used for the dashboard
router.get('/api/workouts/range', (req, res) => {
	//Aggregate function that sums the durations from each exercise and adds it to a new field "totalDuration"
	Workout.aggregate([ 
		{$addFields: {
			totalDuration: 
			{
				$sum: '$exercises.duration'
			}
		}}
	])
	//Sorts workouts in descending order and only gets the first 7
	.sort({_id: -1})
	.limit(7)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});


module.exports = router;
