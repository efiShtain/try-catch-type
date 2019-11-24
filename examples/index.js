const Catcher = require("../src");

function print(err, result) {
  console.log("Error: ", err, " Result: ", result);
}

async function run() {
  let catcher = new Catcher();

  catcher
    .catch(Error, err => `Error: ${err.message}`)
    .catch(RangeError, err => `RangeError: ${err.message}`);

  const [err, result] = await catcher.try(() => {
    throw new RangeError("range error motha fucka");
  });

  print(err, result);

  const [err2, result2] = await catcher.try(() => {
    throw new Error("This is an error");
  });
  print(err2, result2);

  const [err3, result3] = await catcher.try(() => {
    return "succeed";
  });

  print(err3, result3);
}

run();
