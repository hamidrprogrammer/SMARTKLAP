// torchWorker.js
import { self } from 'react-native-threads';
import Torch from 'react-native-torch';

self.onmessage = (message) => {
  const chantContent = message.chantContent;
  const time = message.time;
  const intervals = [];

  chantContent?.chant_Light_List?.forEach((element, index) => {
    if (element?.repeatCount === 0) {
      const intervalTrue = setTimeout(() => {
        if (message.platform !== 'ios') {
          Torch.switchState(true); // Turn ON
        }
      }, element?.startTime_ms - time);
      intervals.push(intervalTrue);
    } else {
      const intervalTrue = setTimeout(() => {
        for (let i = 1; i <= element?.repeatCount; i++) {
          const intervalTrueRe = setTimeout(() => {
            if (message.platform !== 'ios') {
              Torch.switchState(true); // Turn ON
            }
          }, (200 * i) - time);
          intervals.push(intervalTrueRe);

          const intervalFalseRe = setTimeout(() => {
            if (message.platform !== 'ios') {
              Torch.switchState(false); // Turn OFF
            }
          }, (180 * (i + 1)) - time);
          intervals.push(intervalFalseRe);
        }
      }, element?.startTime_ms - time);
      intervals.push(intervalTrue);
    }

    let intervalFalse;
    if (element?.repeatCount === 0) {
      intervalFalse = setTimeout(() => {
        if (message.platform !== 'ios') {
          Torch.switchState(false); // Turn OFF
        }
      }, (element?.startTime_ms + element?.duration_ms + 200) - time);
      intervals.push(intervalFalse);
    }
  });

  // Send intervals back if needed
  self.postMessage({ intervals });
};
