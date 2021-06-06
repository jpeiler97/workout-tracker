const router = require('express').Router();
const Workout = require('../models/Workout');

router.get('/api/workouts', (req, res) => {
	Workout.find()
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

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

router.post('/api/workouts/:id', ({ body }, res) => {
	const workout = new Workout(body);
	Workout.create(workout)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;
