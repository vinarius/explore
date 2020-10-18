const fs = require('fs');
const imTired = [];

function helpLydia(times) {
    for (let i=0; i<times; i++) {
      const arr = [
        'Free',
        'Get active in an unusual place',
        '20+ minutes cardio',
        'Try a protein drink & share your favorite shake recipe',
        'Find health/fitness article & share a summary',
        '"15,000 steps"',
        '25+ minute walk',
        '15 minute core strength workout',
        'Three home cooked healthy meals',
        'Make a healthy breakfast',
        'Yoga routine',
        '15 minute HIIT circuit',
        'Max tricep dips',
        '30+ minutes resistance training',
        '30+ minutes resistance training',
        '30+ minutes resistance training',
        'No added sugar for the day',
        'Eat a healthy salad',
        'Log your water intake (aim for 100+ oz)',
        '30+ minutes cardio',
        'Train with a buddy',
        '"10,000 steps"',
        '45+ minutes resistance training',
        'No processed foods',
        'Track your calories'
      ];
  
      const activities = [];
      function randomize(_arr) {
        const randomActivity = Math.floor(Math.random() * arr.length);
        const activity = arr.splice(randomActivity, 1)[0];
        activities.push(activity);
        if(arr.length > 0) randomize(_arr);
      }
  
      randomize(arr);

      const middleSpot = Math.floor(activities.length / 2);
      const index = activities.indexOf('Free');
      if(index !== middleSpot) {
          const value = activities[middleSpot];
          activities[middleSpot] = 'Free';
          activities[index] = value;
      }

      for(let j=0; j<activities.length; j++){
          if((j+1) % 5 === 0 && j !== 0) {
              activities[j] += '\n';
          }
      }

      imTired.push(activities.join(','));
      imTired.push('\n');
    }
  }
  
  helpLydia(10);

  fs.writeFileSync('fall_fitness_data.csv', imTired, 'utf-8');