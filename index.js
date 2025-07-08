const express=require('express');
const http=require('http')
const mysql=require('mysql');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
const path=require('path');
const session=require('express-session');
const multer=require('multer');
const socketIo=require('socket.io');
const cors=require('cors');
const cron=require('node-cron');
const { read } = require('fs');

dotenv.config({ path: './.env' });

const app = express();
const server=http.createServer(app);
const port = 5000;

const io=socketIo(server,{
    cors:{
        origin:'*',
        methods:["GET","POST"]
    }
})

app.use(session({
    secret:'your-secret-key',
    resave:false,
    saveUninitialized:true
}))

app.use(cors())
app.use(express.json());
// Middleware
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
    multipleStatements: true
});

db.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log("MYSQL Connected...");
    }
});

// Display the login page
app.get('/loginPage', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

//SIGNUP

function requireLogin(req, res, next) {
    if (!req.session.userId) return res.status(401).sendFile(__dirname+"/public/loginreq.html");
    next();
}


app.post('/signup', (req, res) => {
    const { username, Email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        const query1='SELECT * FROM usercredentials WHERE user=?'
        db.query(query1,[username],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                res.status(409).redirect('/loginPage?err=User already exists!');
            } else{
                const query = 'INSERT INTO usercredentials (user, email, password) VALUES (?, ?, ?)';
                db.query(query, [username, Email, hash], (err, result) => {
                    if (err){
                        throw err
                    };
                    req.session.userId = username;
                    res.status(200).redirect('/details')
                });
            }
        })
    });
});

app.post('/login', (req, res) => {
    const {usernamelog,passwordlog}=req.body;
    const query = 'SELECT * FROM usercredentials WHERE user=?';
    db.query(query,[usernamelog],(err, results) => {
        if (err) throw err;
        if (results.length>0) {
            const today=new Date().toString().slice(0,10);
            const lastReset=results[0].lastUpdated;
            bcrypt.compare(passwordlog,results[0].password,(err, match) => {
                if (match) {
                    if(today!==lastReset){
                        const resetQuery=`UPDATE usercredentials SET todayCal = 0,tdPro=0,tdFat=0,tdCarb=0,
                        burned=0,nrSets=0,nrMins=0, lastUpdated = ? WHERE user = ?`;
                        db.query(resetQuery,[today,usernamelog],(err, result) => {
                            if(err) throw err;
                        });
                        const query2='DELETE FROM usermeals WHERE user=?'
                        db.query(query2,[usernamelog],(err,result)=>{
                            if(err) throw err;
                        })
                        const query3='DELETE FROM userexercise WHERE user=?'
                        db.query(query3,[usernamelog],(err,result)=>{
                            if(err) throw err;
                        })
                    }
                    let day=new Date().getDay();
                    if(day===0)
                        day=6;
                    else{
                        day--;
                    }
                    const daysName=['mon','tue','wed','thu','fri','sat','sun']
                    for(let i=day+1 ; i<7 ; i++){
                        const query=`UPDATE usercredentials SET c${daysName[i]}=NULL WHERE user=?;`
                        db.query(query,[usernamelog],(err,result)=>{
                            if(err) res.status(500).send('There was an error in the database')
                        })
                        const query1=`UPDATE usercredentials SET ${daysName[i]}=NULL WHERE user=?;`
                        db.query(query1,[usernamelog],(err,result)=>{
                            if(err) res.status(500).send('There was an error in the database')
                        })
                    }
                    req.session.userId = usernamelog;
                    res.status(200).redirect('/home')
                } else {
                    res.status(401).redirect('/loginPage?err=Incorrect password');
                }
            });
        } else {
            res.status(404).redirect('/loginPage?err=User not found');
        }
    }); 
});

//LOGOUT

app.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.send(`There was an error while logging out: ${err}`)
        }
        res.clearCookie('connect.sid')
        res.status(200).redirect('/loginPage');
    })
})

//DETAILS

app.get('/details',(req,res)=>{
    res.sendFile(__dirname+'/public/fillcreds.html')
})

app.post('/details',(req,res)=>{
    const {stW,glW,ress,Gender}=req.body;
    const id=req.session.userId
    const query='UPDATE usercredentials SET calGoal=?, enterData=true, startW=? , goalW=? , todayBw=?,gender=? WHERE user=?';
    db.query(query, [ress,stW,glW,stW,Gender,id], (err, result) => {
        if (err) res.status(500).send(`There wa an error ${err}`);
        res.status(200).redirect('/home')
    });

})

//CHANGE PASSWORD

app.post('/changepass',(req,res)=>{
    const {passinp,passinpnew}=req.body;
    const user=req.session.userId;
    const query='SELECT * FROM usercredentials WHERE user=?';
    db.query(query,[user],(err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            bcrypt.compare(passinp, results[0].password, (err, match) => {
                if (match) {
                    bcrypt.hash(passinpnew,10,(err,hash)=>{
                        if(err) throw err;
                        const queryUpdate='UPDATE usercredentials SET password=? WHERE user=?'
                        db.query(queryUpdate,[hash,user],(err,result)=>{
                            if(err) throw err;
                            res.redirect('/settings')
                        })
                    })
                }else{
                    res.redirect('/settings?err=Incorrect password');
                }
            });
        }else{
            res.send('User not found!');
        }
    });
})

app.post('/deleteAcc',(req,res)=>{
    const user=req.session.userId;
    const query='DELETE FROM usercredentials WHERE user=?;'
    db.query(query,[user],(err,result)=>{
        if(err) throw err;
        req.session.destroy(err=>{
            if(err){
                return res.send(`There was an error while logging out: ${err}`)
            }
            res.clearCookie('connect.sid')
            res.status(200).redirect('/loginPage');
        })
    })
})

//MAIN PAGE

app.get('/home',requireLogin,(req,res)=>{
    res.sendFile(__dirname+'/public/mainpage.html')
})

app.get('/data',(req,res)=>{
    const query="SELECT * FROM usercredentials WHERE user=?"
    const id=req.session.userId
    db.query(query,[id],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            const data=result
            res.json(data) 
        }
        else{
            const data="no results"
            res.json(data)
        }
    })
})

app.get('/meals',(req,res)=>{
    const user=req.session.userId;
    const query='SELECT * FROM usermeals WHERE user=?';
    db.query(query,[user],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            const data=result;
            res.json(data);
        }else{
            const data='no results';
            res.json(data)
        }
    })
})
app.get('/exercise',(req,res)=>{
    const user=req.session.userId;
    const query='SELECT * FROM userexercise WHERE user=?'
    db.query(query,[user],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            const data=result;
            res.json(data)
        }else{
            const data='no result'
            res.json(data);
        }
    })
})

//MEAL PAGE

app.get('/diet',requireLogin,(req,res)=>{
    res.sendFile(__dirname+'/public/addmeals.html')
})

app.post('/addToCals',(req,res)=>{

    let day=new Date().getDay();
    if(day===0)
        day=6;
    else{
        day--;
    }
    const daysName=['cmon','ctue','cwed','cthu','cfri','csat','csun']

    const {foodName,nrcal,measureType,quantity,userCals,
        userPro,userFat,userCarb,tdPro,tdCarb,tdFat,timeOfDay}=req.body;
    const cals=Number(nrcal.split('k')[0])
    const pros=Number(tdPro.split('g')[0])
    const fats=Number(tdFat.split('g')[0])
    const carbs=Number(tdCarb.split('g')[0])
    let multi=1;
    if(measureType==='1')
        multi=0.01
    const quantity1=multi*quantity;
    const cal1=(Math.round(cals*quantity1*100)/100)
    const pro1=(Math.round(pros*quantity1*100)/100)
    const fat1=(Math.round(fats*quantity1*100)/100)
    const carb1=(Math.round(carbs*quantity1*100)/100)
    const timeDay=Number(timeOfDay);
    const calAdd=Number(userCals)+Number(multi)*Number(quantity)*cals;
    const proAdd=Number(userPro)+Number(multi)*Number(quantity)*pros;
    const fatAdd=Number(userFat)+Number(multi)*Number(quantity)*fats;
    const carbAdd=Number(userCarb)+Number(multi)*Number(quantity)*carbs;
    const user=req.session.userId;
    const query=`UPDATE usercredentials SET todayCal=?,tdPro=?,tdFat=?,tdCarb=?, ${daysName[day]}=?  WHERE user=?`
    db.query(query,[calAdd,proAdd,fatAdd,carbAdd,calAdd,user],(err,result)=>{
        if(err) throw err;
    })
    const query1=`INSERT INTO usermeals (user,name,cals,pro,fat,carb,timeOfDay) VALUES (?,?,?,?,?,?,?)`
    db.query(query1,[user,foodName,cal1,pro1,fat1,carb1,timeDay],(err,result)=>{
        if(err) throw err;
    })
    res.status(200).redirect('/diet');

})

app.post('/addExercise',(req,res)=>{
    const {burnCal,nrSet,nrMin,exName,setNrCurr,calBurnCurr,exType}=req.body;
    let sets=Number(nrSet)+Number(setNrCurr);
    let mins=Number(nrMin)+Number(setNrCurr);
    const calNr=Number(calBurnCurr.split('k')[0])
    let cals=Number(burnCal)+Number(calNr)*Number(setNrCurr);
    let val;
    let query='';
    const user=req.session.userId
    if(exType==='1'){
        query="UPDATE usercredentials SET burned=?, nrSets=? WHERE user=?"
        val=sets;
    }else{
        query="UPDATE usercredentials SET burned=?, nrMins=? WHERE user=?"
        val=mins;
    }
    const calsAdd=Number(calNr)*Number(setNrCurr);
    const setsAdd=Number(setNrCurr)
    const exTypeAdd=Number(exType)
    const query1='INSERT INTO userexercise (user,name,sets,cals,type) VALUES (?,?,?,?,?)'
    db.query(query,[cals,val,user],(err,result)=>{
        if(err) throw err;
    }) 
    db.query(query1,[user,exName,setNrCurr,calsAdd,exTypeAdd],(err,result)=>{
        if(err) throw err
    })
    res.status(200).redirect('/workout');
   //res.send('ok')
})

app.post('/resetCal')

//WORKOUT PAGE

app.get('/workout',requireLogin,(req,res)=>{
    res.sendFile(__dirname+'/public/workoutpage.html')
})

//SETTINGS PAGE

app.get('/settings',requireLogin,(req,res)=>{
    res.sendFile(__dirname+'/public/settings.html')
})

//GOALS PAGE

app.get('/goals',requireLogin,(req,res)=>{
    res.sendFile(__dirname+'/public/goalspage.html')
})

// PROFILE PICTURE

//setare folder unde se vor salva pozele + setare nume fisier

const storage=multer.diskStorage({
    destination:'./public/prfimgs/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
const upload=multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 20 },
    //filtru sa primeasca doar imagini
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
}).single('fileImg')

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.status(400).send('No file selected');
        }else{
            const filePath=`/public/prfimgs/${req.file.filename}`
            const user=req.session.userId;
            const query="UPDATE usercredentials SET image=? WHERE user=?"
            db.query(query,[req.file.filename,user],(error,result)=>{
                if(error) throw error;
                res.status(200).redirect('/settings');
            })
        }
    })
    
})

app.post('/deleteimg',(req,res)=>{
    user=req.session.userId;
    const query="UPDATE usercredentials SET image=NULL WHERE user=?";
    db.query(query,user,(error,result)=>{
        if(error) throw error;
        res.redirect('/settings');
    })
})

// set current weight
app.post('/getCurrWei',(req,res)=>{
    let day=new Date().getDay();
    if(day===0)
        day=6;
    else{
        day--;
    }
    const daysName=['mon','tue','wed','thu','fri','sat','sun']
    const {todayBw}=req.body;
    const user=req.session.userId;
    let query=`UPDATE usercredentials SET todayBw=? , ${daysName[day]}=? WHERE user=?;`
    db.query(query,[todayBw,todayBw,user],(error,result)=>{
        if(error) res.status(500).send('There was an error in the database');
    })
    
    
    res.status(200).redirect('/home')
})

//POST GOALS
app.post('/goalsPost',(req,res)=>{
    const user=req.session.userId;
    const {stW,glW,cal,dietType}=req.body;
    const query='UPDATE usercredentials SET startW=?, goalW=? , todayBw=?, calGoal=?, dietType=? WHERE user=?'
    db.query(query,[stW,glW,stW,cal,dietType,user],(err,result)=>{
        if(err) throw err;
        res.status(200).redirect('/goals')
    })
})

app.post('/postPlan',(req,res)=>{
    const {wrkId,daysId}=req.body;
    const user=req.session.userId
    const query='UPDATE usercredentials SET wrkId=?, wrkDays=? WHERE user=?'
    db.query(query,[wrkId,daysId,user],(err,result)=>{
        if(err) throw error;
        res.status(200).redirect('/goals')
    })
})

//Friend requests
app.get('/getfriends',(req,res)=>{
    const user=req.session.userId
    const query="SELECT * FROM friends WHERE (requester=? OR reciver=?) AND status='accepted'"
    db.query(query,[user,user],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            const data=result;
            res.status(200).json(data);
        }
        else{
            const data=false
            res.status(200).json(data);
        }
    })
})

app.get('/getrequests',(req,res)=>{
    const user=req.session.userId;
    const query="SELECT * FROM friends WHERE reciver=? AND status='pending'"
    db.query(query,[user],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            const data=result;
            res.status(200).json(data);
        }
        else{
            const data=false;
            res.status(200).json(data);
        }
    })
})

app.post('/sendreq',(req,res)=>{
    const user=req.session.userId;
    const {reciverAdd}=req.body;
    const query=`INSERT INTO friends (requester,reciver) VALUES (?,?)`
    const query1='SELECT * FROM usercredentials WHERE user=?'
    const query2=`SELECT * FROM friends WHERE ((reciver=? AND requester=?) OR (requester=? AND reciver=?))
     AND status='accepted'`
    if(users[reciverAdd]){
        console.log('finish');
        const message=`You recived a friend request from ${user}!`
        io.to(users[reciverAdd]).emit('reciveNotif',message);
        console.log(`sent notification to user ${user}: ${message}`)
    }
    db.query(query1,[reciverAdd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            db.query(query2,[reciverAdd,user,reciverAdd,user],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    res.status(200).redirect('/settings?result=Request already sent!')
                }else{
                    db.query(query,[user,reciverAdd],(err,result)=>{
                        if(err) throw err
                        res.status(200).redirect('/settings?result=Friend request sent successfully!')
                    })
                }
            })
        }else{
            res.status(200).redirect('/settings?result=User not found!')
        }
    })
})

app.post('/acceptreq',(req,res)=>{
    const user=req.session.userId;
    const {reqName}=req.body;
    if(req.body.hasOwnProperty("acc")){
        const query=`UPDATE friends SET status='accepted' WHERE requester=? AND reciver=?;
                    UPDATE usercredentials SET nrFriends = nrFriends+1 WHERE user=?;
                    UPDATE usercredentials SET nrFriends = nrFriends+1 WHERE user=?`
        db.query(query,[reqName,user,reqName,user],(err,result)=>{
            if(err) throw err;
            res.status(200).redirect('/settings')
        })
    }else{
        const query="UPDATE friends SET status='declined' WHERE requester=? AND reciver=?"
        db.query(query,[reqName,user],(err,result)=>{
            if(err) throw err;
            res.status(200).redirect('/settings')
        })
    }
   
})

app.post('/deletefriend',(req,res)=>{
    const user=req.session.userId
    const {delName}=req.body;
    const query=`DELETE FROM friends WHERE (reciver=? AND requester=?) OR (reciver=? AND requester=?);
                UPDATE usercredentials SET nrFriends=nrFriends-1 WHERE user=?;
                UPDATE usercredentials SET nrFriends=nrFriends-1 WHERE user=?;`;
    db.query(query,[user,delName,delName,user,delName,user],(err,result)=>{
        if(err) throw err;
        res.status(200).redirect('/settings');
    })
})

app.get('/friendprf',requireLogin,(req,res)=>{
    req.session.frV=req.query.name;
    res.sendFile(__dirname+'/public/friendprf.html')
})
app.get('/getFrData',(req,res)=>{
    const frName=req.session.frV;
    const user=req.session.userId;
    const query='SELECT user,image,calGoal,startW,goalW,todayBw,mon,tue,wed,thu,fri,sat,sun,cmon,ctue,cwed,cthu,cfri,csat,csun,wrkId,wrkDays,nrFriends,dietType FROM usercredentials WHERE user=?'
    db.query(query,[frName],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.status(200).json(result);
        }else{
            const message='user not found'
            res.status(404).json(message)
        }
    })
})


app.post('/syncWrk',(req,res)=>{
    const user=req.session.userId;
    const {frName}=req.body;
    const query='SELECT wrkId,wrkDays FROM usercredentials WHERE user=?';
    db.query(query,[frName],(err,result)=>{
        if(err) throw err;
        const {wrkId,wrkDays}=result[0];
        const query1='UPDATE usercredentials SET wrkId=?,wrkDays=? WHERE user=?';
        db.query(query1,[wrkId,wrkDays,user],(errr,resultt)=>{
            if(errr) throw errr;
            res.redirect(`/friendprf?name=${frName}`)
        })
    })
})

app.get('/mutualFrs',(req,res)=>{
    const user=req.session.userId;
    const frName=req.session.frV
    const query=`SELECT * FROM friends WHERE (requester=? OR reciver=?);
                SELECT * FROM friends WHERE (requester=? OR reciver=?)`
    db.query(query,[user,user,frName,frName],(err,result)=>{
        if(err) throw err;
        const dataToSend=[result,user,frName]
        res.status(200).json(dataToSend);
    })
})

app.post('/getMessage',(req,res)=>{
    const {usr1,usr2}=req.body;
    const query='SELECT * FROM messages WHERE (sender=? AND reciver=?) OR (sender=? AND reciver=?) ORDER BY id ASC'
    db.query(query,[usr1,usr2,usr2,usr1],(err,result)=>{
        if(err) throw err;
        res.json(result);
    }) 
})

app.post('/addMessage',(req,res)=>{
    const {sender,reciver,message}=req.body;
    const query='INSERT INTO messages (sender,reciver,message) VALUES (?,?,?)';
    db.query(query,[sender,reciver,message],(err,result)=>{
        if(err) throw err;
        res.status(200).json('we cool');
    })
})

// notif system

let users={};

io.on('connection',(socket)=>{

    console.log("A user connected ", socket.id)

    socket.on('join room',({username,room})=>{
        socket.join(room);
        users[socket.id]={username,room};
        console.log(username,room)
        socket.to(room).emit('system message',`${username} joined the chat`)
    })

    socket.on('chat message',(msg)=>{
        const user=users[socket.id];
        console.log(msg)
        if(user){
            io.to(user.room).emit('chat message',{text:msg,username:user.username})
        }
    })
    
    socket.on('register',(userId)=>{
        users[userId]=socket.id;
        console.log(`user ${userId} registered with the socket id of ${socket.id}`)
    })

    socket.on('sendNotif',(data)=>{
        const {userId,message}=data;
        console.log('start')
        if(users[userId]){
            console.log('finish');
            io.to(users[userId]).emit('reciveNotif',message);
            console.log(`sent notification to user ${userId}: ${message}`)
        }
    })
    
    socket.on('disconnect',(socket)=>{
        console.log('user disconnected:',socket.id)
        for(let userId in users){
            if(users[userId]===socket.id){
                delete users[userId];
                break;
            }
        }
    })
})

function sendScheduledNotif(message) {
    for (let userId in users) {
        io.to(users[userId]).emit("receiveNotification", message);
        console.log(`Sent scheduled notification to user ${userId}: ${message}`);
    }
}

cron.schedule("0 10 * * *", () => {
    sendScheduledNotif("You haven't logged your breakfast today! Would you like to do it now?");
});
// Schedule notifications
cron.schedule("0 13 * * *", () => {
    sendScheduledNotif("You haven't logged your lunch today! Would you like to do it now?");
});

cron.schedule("0 19 * * *", () => {
    sendScheduledNotif("You haven't logged your dinner today! Would you like to do it now?");
});

cron.schedule("0 8 * * *", () => {
    sendScheduledNotif("Good morning! Don't forget to update you current weight!");
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


//real time messaging

