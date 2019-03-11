import ReactGA from 'react-ga';

export function sendGAEvent(category, action) {
  ReactGA.event({
    category: category,
    action: action
  });
}