const {MongoClient} = require('mongodb');
require('dotenv').config({path:  '/Users/james/OF-COURSE/server/.env'});

async function main(){
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try{
        await client.connect();
        //await listDatabases(client);
        await updateDataTypes(client);

    } catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases (client){
    const dbList = await client.db().admin().listDatabases();
    
    console.log("Databases");
    dbList.databases.forEach(db =>{
        console.log(`- ${db.name}`);
    })
}

async function updateDataTypes(client) {
    await client.db("test").collection("courses").updateMany({},{$pull: {"courseTime":""}});
    await client.db("test").collection("courses").updateMany({},{$pull: {"enrolledID":""}});
    await client.db("test").collection("courses").updateMany({},{$pull: {"prerequisiteCourseID":""}});
    await  client.db("test").collection("courses").updateMany({},{$pull: {"forbiddenCourseID":""}});
    //client.db("test").collection("courses").updateMany({},{$set: {"comment.$[element].userID":null}},{arrayFilters: [{"element":0}]});
    //client.db("test").collection("testingaa").updateMany({'enrolledID':""},{$set: {"enrolledID.$[element]":null}},{arrayFilters: [ {"element":""}]});
    //client.db("test").collection("courses").updateMany({'enrolledID':""},{$set: {"enrolledID.$[element]":null},{arrayFilters: [ {"element":""}]})
    await client.db("test").collection("courses").updateMany(
        {"tutorialInfo.tutorialTime": ""},
        { $pull: { tutorialInfo: { tutorialTime: "" }} },
        { multi: true }
      );
    await client.db("test").collection("courses").updateMany({},{$pull: {"tutorialInfo.$[].enrolledID":""}});  
      //client.db("test").collection("courses").updateMany({},{$addFields:{"comment.0.date":{$toDate: "$comment.0.date"}}});


}