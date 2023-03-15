const {MongoClient} = require('mongodb');

async function main(){
    const uri = "mongodb+srv://admin:admin@cluster0.brap3r8.mongodb.net/test";
    const client = new MongoClient(uri);
    try{
        await client.connect();
        //await listDatabases(client);
        await updateDataTypes(client);

    } catch(e){
        console.error(e);
    }finally{
        //await client.close();
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
    client.db("test").collection("testingaa").update({'prerequisiteCourseID':"N/A"},{$pull: {"prerequisiteCourseID":"N/A"}});
    client.db("test").collection("testingaa").updateMany({'enrolledID':""},{$pull: {"enrolledID":""}});
    //client.db("test").collection("testingaa").updateMany({'enrolledID':""},{$set: {"enrolledID.$[element]":null}},{arrayFilters: [ {"element":""}]});
    //client.db("test").collection("courses").updateMany({'enrolledID':""},{$set: {"enrolledID.$[element]":null},{arrayFilters: [ {"element":""}]})
}