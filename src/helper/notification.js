// import config from '@ROOT/config/app';

// import toastr from 'toastr';

// const {
//   BASE_URL,
// } = config;

// function subscribe(subscription) {
//   fetch(`${BASE_URL}/notification/subscribe`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     credentials: 'same-origin',
//     body: JSON.stringify(subscription),
//   });
// }

// export function subscribeUser(isFromIntervalRunner = false) {
//   const subscription = navigator.serviceWorker.customizedContent === undefined ? null : navigator.serviceWorker.customizedContent.subscription;
//   // Check first if there is an ongoing subscription
//   fetch(`${BASE_URL}/notification/subscription`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     method: 'GET',
//     credentials: 'same-origin',
//   }).then(response => response.json()).then((subscriptionStatus) => {
//     if (subscriptionStatus.subscriptionStatus === 'Unsubscribed') {
//       toastr.info('Current subscription status is not subscribed.. subscribing...', 'Notification Registration');
//       if (isFromIntervalRunner) {
//         subscribe(subscription);
//       }
//     } else {
//       toastr.info('Ongoing subscription detected');
//     }

//     // FIXME: calling subscription regardless of existing subscription, to see if it resolves the issue on mobile
//     if (!isFromIntervalRunner) {
//       subscribe(subscription);
//     }
//   });
// }
// import config from '@ROOT/config/app';

// import toastr from 'toastr';

// const {
//   BASE_URL,
// } = config;

// function subscribe(subscription) {
//   fetch(`${BASE_URL}/notification/subscribe`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     credentials: 'same-origin',
//     body: JSON.stringify(subscription),
//   });
// }

// export function subscribeUser(isFromIntervalRunner = false) {
//   const subscription = navigator.serviceWorker.customizedContent === undefined ? null : navigator.serviceWorker.customizedContent.subscription;
//   // Check first if there is an ongoing subscription
//   fetch(`${BASE_URL}/notification/subscription`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     method: 'GET',
//     credentials: 'same-origin',
//   }).then(response => response.json()).then((subscriptionStatus) => {
//     if (subscriptionStatus.subscriptionStatus === 'Unsubscribed') {
//       toastr.info('Current subscription status is not subscribed.. subscribing...', 'Notification Registration');
//       if (isFromIntervalRunner) {
//         subscribe(subscription);
//       }
//     } else {
//       toastr.info('Ongoing subscription detected');
//     }

//     // FIXME: calling subscription regardless of existing subscription, to see if it resolves the issue on mobile
//     if (!isFromIntervalRunner) {
//       subscribe(subscription);
//     }
//   });
// }
