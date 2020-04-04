# Dealing with secrets

### This example demonstrates how to load secrets into your program using dotenv
  * populate a `.env` with secrets in the format `SECRET=SECRETVALUE`
  *  calling `require(dotenv).config()` from node will load all enviroment variables from your `.env` file into a variable called `process.env`.
* env Variables may be accesed at `process.env.varName` 
* This is why you often see `port = process.env.PORT || 3000`
  * That line is setting the `port` variable to be equal to an environment variable called `PORT`
  * or if `PORT` is not defined choose 3000.
