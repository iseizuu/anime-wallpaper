const { Wall } = require("../dist");
const b = new Wall();

async function aa() {
    const cok = await b.get({ search: "rikka takarada" });
    return console.log(cok)
}

aa()