const conn = require('./user')

async function teste(){
    const result = await conn.query("SELECT * from tblusers");
    console.log(result);
}