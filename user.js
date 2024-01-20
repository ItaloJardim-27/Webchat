const sql = require('mssql')

let pool;

async function getUser(userName, password){
  var check = false;
  if(!pool) {
    pool = await sql.connect({
      server: "DESKTOP-F31R5MH",
      user: "sa",
      password: "12345",
      database: "webchat",
      options: {
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1'
      }
      }
    }) 
      const result = await pool.query("SELECT * FROM tblusers WHERE name like '" +userName+"' and chat_password like '"+password+"'");

      if(result.recordset.length > 1){
        check = true;
      }
    console.log(result)
   /* for(var i = 0; i < result.recordset.length; i++){ // recordset é o array que retorna os input
      console.log(result.recordset.at(i).name)
    }*/
  }
//return pool;
return pool;
} 

getUser("TesteRepetido", "54321");
async function setUser(userName, password, birthday, email, phone){
  if(!pool) {
    pool = await sql.connect({
      server: "DESKTOP-F31R5MH",
      user: "sa",
      password: "12345",
      database: "webchat",
      options: {
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1'
      }
      }
    });
      pool.query("INSERT tblusers values ('"+ userName+"', '"+password+"', '"+ birthday+"', '"+email+"', '"+phone+"')")

   /* for(var i = 0; i < result.recordset.length; i++){ // recordset é o array que retorna os input
      console.log(result.recordset.at(i).name)
    }*/
  }
return pool;
}
setUser("NodeJs", "102040", "2020-05-20", "nodejs@gmail.com", "(11) 94244-7777")
module.exports = {
  getUser,
  setUser
};
