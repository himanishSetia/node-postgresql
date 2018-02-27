const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://root:2912040@localhost:5432/movieDB';
// const client = new pg.Client(connectionString);



var appRouter = function (app) {
    app.get('/login',(req,res,next) => {
        console.log("ENTERED ",req.body)
        const data= {username:req.query.username, password:req.query.password}
        const results = [];
        pg.connect(connectionString,(err,client,done) => {
            if(err){
                done();
                console.log("ERROR ",err);
                res.status(500).send({ data: [], success: false, message: "Invalid User" });
            }
            var q = "select * from login where username='"+data.username+"' and password='"+data.password+"'"
            console.log("QUERYYYYYYYYY ",q)
            const query = client.query(q)
    
            query.on('row',(row) => {
                results.push(row);
            })
    
            query.on('end',() => {
                done();
                res.status(200).send({ data: results, success: true, message: "Valid User" });
            })
        })
    })


    app.get('/createLoginTable',(req,res,next) => {
        console.log("createLoginTable")
        const results = []
        // const data= {text:req.body.text,complete : false}
        pg.connect(connectionString,(err,client,done)=>{
            if(err){
                done();
                console.log("ERROR ",err)
                res.status(500).send({ data: [], success: false, message: "Something went wrong" });
            }

            client.query("insert into login (username,firstname,lastname,email,contact,password) values('himanish_setia','Himanish','Setia','hsetia94@gmail.com','9999999999','setia123')")
            res.status(200).send({ data: [], success: true, message: "Success" });
        })
    })
}

module.exports = appRouter;