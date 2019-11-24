# Try Catch Type

async await brought try catch to asyncrounous javascript, problem is that it is ugly and verbose. Having to write lots of try catch blocks for fine grained error handling is not so much fun, and it makes the code harder to read. 

Try-catch-type tries to solve it in a more elegant way, it allows you to catch errors by type and handle them fluently

## Install
```
npm install @efi.shtain/try-catch-type
```

## Usage
```
const Catcher = require("@efi.shtain/try-catch-type");


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

  // prints: Error:  RangeError: range error motha fucka  Result:  undefined
  print(err, result);

  const [err2, result2] = await catcher.try(() => {
    throw new Error("This is an error");
  });

  // prints: Error:  Error: This is an error  Result:  undefined
  print(err2, result2);

  const [err3, result3] = await catcher.try(() => {
    return "succeed";
  });

  // prints: Error:  null  Result:  succeed
  print(err3, result3);
}

run();
```

