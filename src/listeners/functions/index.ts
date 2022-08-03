import { App } from '@slack/bolt';
import reverseStringCallback from "./reverse-string";

const register = (app: App) => {
  //@ts-ignore
  app.function('reverse', reverseStringCallback);
};

export default { register };