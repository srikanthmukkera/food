import moment from 'moment';

function getGreeting() {
  const currentHour = moment().hour();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}

export const greeting = getGreeting();
