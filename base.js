const run = input => {
    console.error("\n\n### RUN ###")
    console.error(input)
}

/*******
 * Read input from STDIN
 * Use: console.log()  to output your result.
 * Use: console.error() to output debug information into STDERR
 * ***/
var inputLines = [];

readline_object.on("line", (value) => { //Read input values
    inputLines.push(value);
})

readline_object.on("close", () => console.log(run(inputLines)));

