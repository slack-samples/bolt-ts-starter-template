import { AllSlackFunctionExecutedMiddlewareArgs } from "@slack/bolt";

// For more information about functions: https://api.slack.com/future/functions
const reverseString = async ({ event, completeSuccess, completeError }: AllSlackFunctionExecutedMiddlewareArgs) => {
    const { stringToReverse }: any = event.inputs;
    const reversed = stringToReverse.split('').reverse().join('');
    try {
      // let slack know your function completed successfully!
      await completeSuccess({ reverseString: reversed });
    } catch (err) {
      // let slack know your function encountered an error
      await completeError(`There was an issue ${err}`);
    }
  };
  
  export default reverseString;
  