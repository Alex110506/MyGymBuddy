export const trainingPlans = [
    {
        type: "Strength",
        plans: [
            {
                workoutId: 1,
                daysPerWeek: 5,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Bench Press", sets: 4 }, { exerciseName: "Incline Bench Press", sets: 3 }, { exerciseName: "Tricep Dip", sets: 3 }] },
                    { day: 2, exercises: [{ exerciseName: "Deadlift", sets: 4 }, { exerciseName: "T-Bar Row", sets: 3 }, { exerciseName: "Lat Pulldown", sets: 3 }] },
                    { day: 3, exercises: [{ exerciseName: "Barbell Squat", sets: 4 }, { exerciseName: "Leg Press", sets: 3 }, { exerciseName: "Calf Raise", sets: 4 }] },
                    { day: 4, exercises: [{ exerciseName: "Overhead Press", sets: 4 }, { exerciseName: "Lateral Raise", sets: 3 }, { exerciseName: "Front Raise", sets: 3 }] },
                    { day: 5, exercises: [{ exerciseName: "Pull-Up", sets: 4 }, { exerciseName: "Biceps Curl", sets: 3 }, { exerciseName: "Triceps Extension", sets: 3 }] }
                ]
            },
            {
                workoutId: 2,
                daysPerWeek: 4,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Bench Press", sets: 4 }, { exerciseName: "Dumbbell Fly", sets: 3 }, { exerciseName: "Push-Up", sets: 3 }] },
                    { day: 2, exercises: [{ exerciseName: "Deadlift", sets: 4 }, { exerciseName: "Pull-Up", sets: 3 }, { exerciseName: "T-Bar Row", sets: 3 }] },
                    { day: 3, exercises: [{ exerciseName: "Barbell Squat", sets: 4 }, { exerciseName: "Leg Curl", sets: 3 }, { exerciseName: "Step-Up", sets: 3 }] },
                    { day: 4, exercises: [{ exerciseName: "Shoulder Press", sets: 4 }, { exerciseName: "Front Raise", sets: 3 }, { exerciseName: "Dumbbell Shrug", sets: 3 }] }
                ]
            },
            {
                workoutId: 3,
                daysPerWeek: 3,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Bench Press", sets: 5 }, { exerciseName: "Pull-Up", sets: 4 }, { exerciseName: "Tricep Dip", sets: 3 }] },
                    { day: 2, exercises: [{ exerciseName: "Romanian Deadlift", sets: 4 }, { exerciseName: "Barbell Squat", sets: 4 }, { exerciseName: "Leg Press", sets: 3 }] },
                    { day: 3, exercises: [{ exerciseName: "Cable Tricep Pushdown", sets: 4 }, { exerciseName: "Overhead Press", sets: 3 }, { exerciseName: "Biceps Curl", sets: 3 }] }
                ]
            },
            {
                workoutId: 4,
                daysPerWeek: 2,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Bench Press", sets: 5 }, { exerciseName: "Deadlift", sets: 4 }, { exerciseName: "Pull-ups", sets: 3 }] },
                    { day: 2, exercises: [{ exerciseName: "Tricep Dip", sets: 4 }, { exerciseName: "Squats", sets: 4 }, { exerciseName: "Ab Roller", sets: 3 }] }
                ]
            },
            {
                workoutId: 5,
                daysPerWeek: 1,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Pull-Up", sets: 5 }, { exerciseName: "Bench Press", sets: 4 }, { exerciseName: "Deadlift", sets: 4 }] }
                ]
            }
        ]
    },
    {
        type: "Endurance",
        plans: [
            {
                workoutId: 6,
                daysPerWeek: 5,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Treadmill Running", sets: 20 }, { exerciseName: "Jump Rope", sets: 5 }, { exerciseName: "Rowing Machine", sets: 5 }] },
                    { day: 2, exercises: [{ exerciseName: "High Knees", sets: 4 }, { exerciseName: "Power Walking", sets: 4 }, { exerciseName: "Mountain Climber", sets: 5 }] },
                    { day: 3, exercises: [{ exerciseName: "Swimming (Freestyle)", sets: 4 }, { exerciseName: "Jumping Jacks", sets: 4 }, { exerciseName: "Sprinting", sets: 5 }] },
                    { day: 4, exercises: [{ exerciseName: "Cycling (High Intensity)", sets: 5 }, { exerciseName: "Battle Ropes", sets: 4 }, { exerciseName: "Rowing Machine", sets: 5 }] },
                    { day: 5, exercises: [{ exerciseName: "Sprinting", sets: 5 }, { exerciseName: "Jump Rope", sets: 5 }, { exerciseName: "Treadmill Walking", sets: 5 }] }
                ]
            },
            {
                workoutId: 7,
                daysPerWeek: 4,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Treadmill Running", sets: 20 }, { exerciseName: "Cycling (High Intensity)", sets: 10 }, { exerciseName: "Jump Rope", sets: 5 }] },
                    { day: 2, exercises: [{ exerciseName: "High Knees", sets: 4 }, { exerciseName: "Jumping Jacks", sets: 4 }, { exerciseName: "Power Walking", sets: 3 }] },
                    { day: 3, exercises: [{ exerciseName: "Rowing Machine", sets: 5 }, { exerciseName: "Jump Rope", sets: 5 }, { exerciseName: "Mountain Climber", sets: 5 }] },
                    { day: 4, exercises: [{ exerciseName: "Battle Ropes", sets: 4 }, { exerciseName: "Swimming (Freestyle)", sets: 4 }, { exerciseName: "Jumping Jacks", sets: 6 }] }
                ]
            },
            {
                workoutId: 8,
                daysPerWeek: 3,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Running", sets: 5 }, { exerciseName: "Jump Rope", sets: 5 }, { exerciseName: "High Knees", sets: 4 }] },
                    { day: 2, exercises: [{ exerciseName: "Swimming (Freestyle)", sets: 4 }, { exerciseName: "Jumping Jacks", sets: 4 }, { exerciseName: "Mountain Climber", sets: 5 }] },
                    { day: 3, exercises: [{ exerciseName: "Cycling (Low Intensity)", sets: 5 }, { exerciseName: "Battle Ropes", sets: 4 }, { exerciseName: "Stair Climbing", sets: 3 }] }
                ]
            },
            {
                workoutId: 9,
                daysPerWeek: 2,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Treadmill Running", sets: 5 }, { exerciseName: "Jump Rope", sets: 5 }, { exerciseName: "Mountain Climber", sets: 5 }] },
                    { day: 2, exercises: [{ exerciseName: "Rowing Machine", sets: 5 }, { exerciseName: "Jumping Jacks", sets: 4 }, { exerciseName: "Stair Climbing", sets: 4 }] }
                ]
            },
            {
                workoutId: 10,
                daysPerWeek: 1,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Swimming (Freestyle)", sets: 5 }, { exerciseName: "Jumping Jacks", sets: 5 }, { exerciseName: "Jump Rope", sets: 6 }] }
                ]
            }
        ]
    },
    {
        type: "Muscle Building",
        plans: [
            {
                workoutId: 11,
                daysPerWeek: 5,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Bench Press", sets: 4 }, { exerciseName: "Incline Bench Press", sets: 4 }, { exerciseName: "Chest Fly", sets: 3 }] },
                    { day: 2, exercises: [{ exerciseName: "Deadlift", sets: 4 }, { exerciseName: "Lat Pulldown", sets: 4 }, { exerciseName: "Seated Row", sets: 3 }] },
                    { day: 3, exercises: [{ exerciseName: "Barbell Squat", sets: 4 }, { exerciseName: "Leg Press", sets: 4 }, { exerciseName: "Calf Raise", sets: 3 }] },
                    { day: 4, exercises: [{ exerciseName: "Shoulder Press", sets: 4 }, { exerciseName: "Lateral Raise", sets: 3 }, { exerciseName: "Front Raise", sets: 3 }] },
                    { day: 5, exercises: [{ exerciseName: "Biceps Curl", sets: 4 }, { exerciseName: "Hammer Curl", sets: 4 }, { exerciseName: "Tricep Dip", sets: 3 }] }
                ]
            },
            {
                workoutId: 12,
                daysPerWeek: 4,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Bench Press", sets: 4 }, { exerciseName: "Push-Up", sets: 4 }, { exerciseName: "Tricep Dip", sets: 3 }] },
                    { day: 2, exercises: [{ exerciseName: "Deadlift", sets: 4 }, { exerciseName: "Pull-Up", sets: 4 }, { exerciseName: "Seated Row", sets: 3 }] },
                    { day: 3, exercises: [{ exerciseName: "Barbell Squat", sets: 4 }, { exerciseName: "Lunge", sets: 4 }, { exerciseName: "Calf Raise", sets: 3 }] },
                    { day: 4, exercises: [{ exerciseName: "Overhead Press", sets: 4 }, { exerciseName: "Front Raise", sets: 3 }, { exerciseName: "Dumbbell Shrug", sets: 3 }] }
                ]
            },
            {
                workoutId: 13,
                daysPerWeek: 3,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Bench Press", sets: 5 }, { exerciseName: "Pull-Up", sets: 4 }, { exerciseName: "Tricep Dip", sets: 3 }] },
                    { day: 2, exercises: [{ exerciseName: "Romanian Deadlift", sets: 4 }, { exerciseName: "Barbell Squat", sets: 4 }, { exerciseName: "Leg Press", sets: 3 }] },
                    { day: 3, exercises: [{ exerciseName: "Lateral Raise", sets: 4 }, { exerciseName: "Overhead Press", sets: 3 }, { exerciseName: "Biceps Curl", sets: 3 }] }
                ]
            },
            {
                workoutId: 14,
                daysPerWeek: 2,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Cable Tricep Pushdown", sets: 5 }, { exerciseName: "Bench Press", sets: 4 }, { exerciseName: "Tricep Dip", sets: 3 }] },
                    { day: 2, exercises: [{ exerciseName: "Lat Pulldown", sets: 5 }, { exerciseName: "Deadlift", sets: 4 }, { exerciseName: "Pull-Up", sets: 3 }] }
                ]
            },
            {
                workoutId: 15,
                daysPerWeek: 1,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Bench Press", sets: 5 }, { exerciseName: "Barbell Squat", sets: 4 }, { exerciseName: "Deadlift", sets: 4 }] }
                ]
            }
        ]
    },
    {
        type: "Losing Weight",
        plans: [
            {
                workoutId: 16,
                daysPerWeek: 5,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Treadmill Running", sets: 6 }, { exerciseName: "Jump Rope", sets: 5 }, { exerciseName: "Jumping Jacks", sets: 4 }] },
                    { day: 2, exercises: [{ exerciseName: "Cycling (High Intensity)", sets: 5 }, { exerciseName: "Burpees", sets: 4 }, { exerciseName: "Sprinting", sets: 5 }] },
                    { day: 3, exercises: [{ exerciseName: "Rowing Machine", sets: 5 }, { exerciseName: "Jump Rope", sets: 4 }, { exerciseName: "Battle Ropes", sets: 5 }] },
                    { day: 4, exercises: [{ exerciseName: "Swimming (Freestyle)", sets: 5 }, { exerciseName: "Mountain Climber", sets: 5 }, { exerciseName: "Power Walking", sets: 4 }] },
                    { day: 5, exercises: [{ exerciseName: "Treadmill Running", sets: 5 }, { exerciseName: "Stair Climbing", sets: 4 }, { exerciseName: "Jump Rope", sets: 6 }] }
                ]
            },
            {
                workoutId: 17,
                daysPerWeek: 4,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Running", sets: 5 }, { exerciseName: "Jump Rope", sets: 5 }, { exerciseName: "Mountain Climber", sets: 5 }] },
                    { day: 2, exercises: [{ exerciseName: "Jumping Jacks", sets: 4 }, { exerciseName: "Jump Rope", sets: 4 }, { exerciseName: "Burpees", sets: 3 }] },
                    { day: 3, exercises: [{ exerciseName: "Rowing Machine", sets: 5 }, { exerciseName: "Jump Rope", sets: 5 }, { exerciseName: "Power Walking", sets: 5 }] },
                    { day: 4, exercises: [{ exerciseName: "Battle Ropes", sets: 4 }, { exerciseName: "Swimming (Freestyle)", sets: 4 }, { exerciseName: "Jumping Jacks", sets: 6 }] }
                ]
            },
            {
                workoutId: 18,
                daysPerWeek: 3,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Sprinting", sets: 5 }, { exerciseName: "Jumping Jacks", sets: 5 }, { exerciseName: "Jump Rope", sets: 6 }] },
                    { day: 2, exercises: [{ exerciseName: "Cycling (High Intensity)", sets: 5 }, { exerciseName: "Power Walking", sets: 5 }, { exerciseName: "Mountain Climber", sets: 5 }] },
                    { day: 3, exercises: [{ exerciseName: "Battle Ropes", sets: 5 }, { exerciseName: "Jump Rope", sets: 4 }, { exerciseName: "Stair Climbing", sets: 4 }] }
                ]
            },
            {
                workoutId: 19,
                daysPerWeek: 2,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Treadmill Running", sets: 5 }, { exerciseName: "Jumping Jacks", sets: 4 }, { exerciseName: "Jump Rope", sets: 5 }] },
                    { day: 2, exercises: [{ exerciseName: "Swimming (Freestyle)", sets: 5 }, { exerciseName: "Battle Ropes", sets: 4 }, { exerciseName: "Mountain Climber", sets: 5 }] }
                ]
            },
            {
                workoutId: 20,
                daysPerWeek: 1,
                exercises: [
                    { day: 1, exercises: [{ exerciseName: "Treadmill Running", sets: 6 }, { exerciseName: "Jump Rope", sets: 5 }, { exerciseName: "Jumping Jacks", sets: 5 }] }
                ]
            }        
        ]
    }
];

