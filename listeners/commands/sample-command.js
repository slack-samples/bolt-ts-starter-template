const sampleCommandCallback = async ({ ack, respond }) => {
  try {
    await ack();
    await respond('Responding to the sample command!');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleCommandCallback };
