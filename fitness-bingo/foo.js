const fs = require('fs');
const imTired = [];

function helpLydia(times) {
    for (let i=0; i<times; i++) {
      const arr = [
        'Get active in an unusual place',
        '20+ minutes cardio',
        'Try a protein drink & share your favorite shake recipe',
        '30+ minutes resistance training',
        '"15,000 steps"',
        '30+ minutes resistance training',
        '25+ minute walk',
        '15 minute core strength workout',
        'Three home cooked healthy meals',
        'Time your best plank',
        'Yoga routine',
        '',
        '15 minute HIIT circuit',
        'Max tricep dips',
        '30+ minutes resistance training',
        'Max push ups',
        '30+ minutes resistance training',
        'Eat a healthy salad',
        'Log your water intake (aim for 100+ oz)',
        '30+ minutes cardio',
        'Train with a buddy',
        '"10,000 steps"',
        '45+ minutes resistance training',
        'No processed foods',
        '"Go out of your way to get extra exercise (take stairs, park in back of lot, etc.)"'
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
      const index = activities.indexOf('');
      if(index !== middleSpot) {
          const value = activities[middleSpot];
          activities[middleSpot] = '';
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
  
  helpLydia(20);

  fs.writeFileSync('fall_fitness_data.csv', imTired, 'utf-8');