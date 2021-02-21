const { Wall } = require("../dist");
const b = new Wall();

async function aa() {
    const cok = await b.get({ search: "rent a girlfriend", page: 2 });
    return console.log(cok)
}

aa()