const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "moviesData.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
const f1 = (i) => {
  return { movieName: i.movie_name, };
};
//API1
app.get("/movies/", async (request, response) => {
  const firstQuery = `SELECT movie_name FROM movie;`;
  const firstResult = await db.all(firstQuery);
  response.send(firstResult.map((j) => f1(j)));
});

//API2
app.post("/movies/", async (request, response) => {
  const { directorId, movieName, leadActor } = request.body;
  const secondQuery = `INSERT INTO movie(director_id,movie_name,lead_actor)
    VALUES (${directorId},"${movieName}","${leadActor}");
        `;
  await db.run(secondQuery);
  response.send("Movie Successfully Added");
});

//API3 
const f2=(j)=>{
    movieId:j.movie_id,directorId:j.director_id,movieName:j.movie_name,
    leadActor:j.lead_actor,
};
app.get("/movies/:movieId/",async(request,response)=>{
    const {movieId}=request.params;
    const thirdQuery=`SELECT * FROM movie
    WHERE movie_id=${movieId};`;
    const thirdResult=await db.get(thirdQuery);
    response.send(f2(thirdResult));
});

//API4
app.put("/movies/:movieId/",async(request,response)=>{
    const{directorId,movieName,leadActor}=request.body;
    const{movieId}=request.params;
    const fourthQuery=`UPDATE movie SET
     director_id=${directorId},movie-name="${movieName}",
        lead_actor="${leadActor}"  
        WHERE movie_id=${movieId};`;
        await db.run(fourthQuery);
        response.send("Movie Details Updated");
});
//API5
app.delete("/movies/:movieId/",async(request,response)=>{
    const {movieId}=request.params;
    const fifthQuery=`DELETE FROM movie WHERE movie_id=${movieId};`;
    await db.run(fifthQuery);
    response.send("Movie Removed");
});
//API6
const f3=(k)=>{
    return {directorId:k.director_id,directorName:k.director_name};
};
app.get("/directors/",async(request,response)=>{
    const sixthQuery=`SELECT * FROM director;`;
    const sixthResult=await db.all(sixthQuery);
    response.send(sixthResult.map((x)=>f3(x)));
});
//API7 
app.get("/directors/:directorId/movies/",async(request,response)=>{
    const{directorId}=request.params;
    const seventhQuery=`SELECT movie_name FROM movie
     WHERE director_id="${directorId}";`;
     const seventhResult=await db.all(seventhQuery);
     response.send(seventhResult.map((y)=>f1(y)));
});
module.exports = app;



const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "moviesData.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
const f1 = (i) => {
  return { movieName: i.movie_name, };
};
//API1
app.get("/movies/", async (request, response) => {
  const firstQuery = `SELECT movie_name FROM movie;`;
  const firstResult = await db.all(firstQuery);
  response.send(firstResult.map((j) => f1(j)));
});

//API2
app.post("/movies/", async (request, response) => {
  const { directorId, movieName, leadActor } = request.body;
  const secondQuery = `INSERT INTO movie(director_id,movie_name,lead_actor)
    VALUES (${directorId},"${movieName}","${leadActor}");
        `;
  await db.run(secondQuery);
  response.send("Movie Successfully Added");
});

//API3 
const f2=(j)=>{
    movieId:j.movie_id,directorId:j.director_id,movieName:j.movie_name,
    leadActor:j.lead_actor,
};
app.get("/movies/:movieId/",async(request,response)=>{
    const {movieId}=request.params;
    const thirdQuery=`SELECT * FROM movie
    WHERE movie_id=${movieId};`;
    const thirdResult=await db.get(thirdQuery);
    response.send(f2(thirdResult));
});

//API4
app.put("/movies/:movieId/",async(request,response)=>{
    const{directorId,movieName,leadActor}=request.body;
    const{movieId}=request.params;
    const fourthQuery=`UPDATE movie SET
     director_id=${directorId},movie-name="${movieName}",
        lead_actor="${leadActor}"  
        WHERE movie_id=${movieId};`;
        await db.run(fourthQuery);
        response.send("Movie Details Updated");
});
//API5
app.delete("/movies/:movieId/",async(request,response)=>{
    const {movieId}=request.params;
    const fifthQuery=`DELETE FROM movie WHERE movie_id=${movieId};`;
    await db.run(fifthQuery);
    response.send("Movie Removed");
});
//API6
const f3=(k)=>{
    return {directorId:k.director_id,directorName:k.director_name};
};
app.get("/directors/",async(request,response)=>{
    const sixthQuery=`SELECT * FROM director;`;
    const sixthResult=await db.all(sixthQuery);
    response.send(sixthResult.map((x)=>f3(x)));
});
//API7 
app.get("/directors/:directorId/movies/",async(request,response)=>{
    const{directorId}=request.params;
    const seventhQuery=`SELECT movie_name FROM movie
     WHERE director_id="${directorId}";`;
     const seventhResult=await db.all(seventhQuery);
     response.send(seventhResult.map((y)=>f1(y)));
});
module.exports = app;



