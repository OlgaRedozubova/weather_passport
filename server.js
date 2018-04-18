const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
//const jwt = require('jsonwebtoken');
const jwt = require("jwt-simple");

const auth = require("./auth.js")(); //passport/ passport-jwt
const users = require("./db/users.js"); //users
const config = require("./config/config.js");


const router = express.Router();
const fs = require('fs');

const Promise = require('bluebird');
const rp = require('request-promise');


const server = express();
const uriWeather = "http://openweathermap.org/data/2.5/weather";
const appid = "b6907d289e10d714a6e88b30761fae22";
//---------------
//const api = require('./routes/api');
const port = process.env.PORT || 5000;


const _ = require("lodash");


server.use(bodyParser.json());
server.use(auth.initialize());


server.get("/api/user", auth.authenticate(), function(req, res) {
    console.log('server-users', users);
    for (key in users) {
      if (users[key].id === req.user.id) {
        console.log('users[key]', users[key]);
        res.json(users[key]);
      }
    }
    //console.log('server-req-user', req.user);
//    res.json(users[req.user.id]);
});

//возвращает token и id user
server.post("/api/token", function(req, res) {
    console.log('Server, token');
    if (req.body.name && req.body.password) {
        var userName = req.body.name;
        var password = req.body.password;
        var user = users.find(function(u) {
            return u.name === userName && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id
            };
            console.log('id', payload.id);
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
                token: token
            });
        } else {
            console.log('res.sendStatus(401)');
            res.status(401).json({message: "passwords did not match"});
         //   res.sendStatus(401);
        }
    } else {
        console.log('res.sendStatus(401)');
        res.sendStatus(401);
    }
});


//const passport = require("passport");
//const passportJWT = require("passport-jwt");

//const ExtractJwt = passportJWT.ExtractJwt;
//const JwtStrategy = passportJWT.Strategy;

// const users = [
//     {
//         id: 1,
//         name: 'jonathanmh',
//         password: '%2yx4'
//     },
//     {
//         id: 2,
//         name: 'test',
//         password: 'test'
//     }
// ];

// const jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
// jwtOptions.secretOrKey = 'tasmanianDevil';
//
// const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
//     console.log('payload received', jwt_payload);
//     // usually this would be a database call:
//     const user = users[_.findIndex(users, {id: jwt_payload.id})];
//     if (user) {
//         next(null, user);
//     } else {
//         next(null, false);
//     }
// });

// passport.use(strategy);
// server.use(passport.initialize());
//
//
// server.use(bodyParser.urlencoded({
//     extended: true
// }));

// parse application/json
//server.use(bodyParser.json());

// parse application/json
// server.use(bodyParser.json());
// app.use(bodyParser.json())
// app.get("/", function(req, res) {
//     res.json({message: "Express is up!"});
// });

//server.use(express.static('client'));

// app.get("/", function(req, res) {
//     res.sendFile(process.cwd() + '/public/index.html');
// });



function getWeatherTowns(townsList, req, res) { console.log('getWeatherTowns1')
    const promiseList =[];
    townsList.map((item) => (
        promiseList.push(
            rp({
                uri: uriWeather,
                qs: {
                    q: item.name,
                    appid: appid
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true,
            })
                .then(function(responseData){
                    return responseData;
                })
                .catch(function(err){
                    return res.json(err);
                })
        )
    ));

    Promise.all(promiseList)
        .then(value => {
            return res.json(value);
        });
};


function FindTown (towns, name){
    for (key in towns) {
        if (towns[key].name.toUpperCase() === name.toUpperCase()) {
            return  key;
        }
    }
};

router.route("/weather/")
    .get(function(req, res){
        const townsList = JSON.parse(fs.readFileSync("towns.json", "utf8"));
        getWeatherTowns(townsList, req, res);
    })
    .post(jsonParser, (req, res) => {
            if (!req.body) return res.sendStatus(400);
            console.log('S_req.body', req.body);

            const town = req.body;//{name: townName};
            fs.readFile("towns.json", "utf8", function(err, file){
                if(!err){
                    const towns = JSON.parse(file);
                    const ikey = FindTown(towns, town.name);
                    if (!ikey) {
                        towns.push(town);
                        const newFile = JSON.stringify(towns);
                        fs.writeFile("towns.json", newFile, function (err) {
                            if (!err) {
                                getWeatherTowns(towns, req, res);
                                console.log('Ok', towns);
                                //  res.send(towns);
                            }
                        });
                    } else {
                        console.log('Town already exists id LikeList!', key);
                        res.writeHead(403, key);
                        res.end(key);
                        //   res.status(403).send('Sorry');// sendStatus(204);
                    }
                }
            });
        }
    )
    .delete(jsonParser, (req,res) => {
            if (!req.body) return res.setStatus(400);
            const town = req.body;

            fs.readFile("towns.json", "utf8", function(err, file){
                if(!err){
                    const towns = JSON.parse(file);
                    const newArr = [];
                    //-----------------------------
                    for (key in towns) {
                        if (towns[key].name.toUpperCase() !== town.name.toUpperCase()) {
                            newArr.push(towns[key]);
                        }
                    }
                    //-----------------------------
                    const newFile = JSON.stringify(newArr);
                    fs.writeFile("towns.json", newFile, function (err) {
                        if (!err) {
                            getWeatherTowns(newArr, req, res);
                        }
                    });
                }
            });
        }
    );


// router.route('/login').post(jsonParser, (req, res) => {
//     console.log('login');
//     if (!req.body) return res.sendStatus(400);
//
//
//     if(req.body.name && req.body.password){
//         var name = req.body.name;
//         var password = req.body.password;
//     }
//
//     const findIndex = _.findIndex(users, {name: name});
//     console.log('name', name);
//     console.log('findIndex', findIndex);
//     const user = users[findIndex];
//
//     if( ! user ){
//         res.status(401).json({message:"no such user found"});
//     }else {
//         console.log('user', user);
//
//         if (user.password === password) {
//             // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
//             const payload = {id: user.id};
//             //const token = jwt.sign({user}, 'my_secret_key');
//             const token = jwt.sign(payload, jwtOptions.secretOrKey);
//             console.log('token', token);
//             res.json({message: "ok", token: token});
//         } else {
//             res.status(401).json({message: "passwords did not match"});
//         }
//     }
//
//     // const user = req.body;
//     //
//     // console.log('userName', user.user);
//     // console.log('userPassword', user.password);
//     //
//     // const token = jwt.sign({user}, 'my_secret_key');
//     // res.json({
//     //     token: token
//     // });
//     // console.log('token', token);
//     // const user = {
//     //     user: '',
//     //     password: ''
//     // }
// });


// router.route("/secret")
//     .get(
//         passport.authenticate('jwt', { session: false }),
//         function(req, res){
//         console.log('req', req);
//     res.json({message: "Success! You can not see this without a token"});
//     })
//     .post(jsonParser, (req, res) => {
//         console.log('post');
//         console.log(req.get('Authorization'));
//         const a = passport.authenticate('jwt', { session: false });
//         console.log('a',a);
//
//     }
//
//     );

// server.post("/api/secret",
//     (req, res)=>{
//     console.log('post');
//         console.log(req.get('Authorization'));
//     });

// server.get("/api/secret", passport.authenticate('jwt', { session: false }), function(req, res){
//     res.json({message: "Success! You can not see this without a token"});
// });
//
// router.route("/secretDebug")
//     .get(function(req, res, next){
//         console.log(req.get('Authorization'));
//         next();
//     }, function(req, res){
//         res.json("debugging");
//     });

router.route("/weather/:id")
    .get( function (req, res) {
        rp({
            uri: uriWeather,
            qs: {
                q: req.params.id,
                appid: appid
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true,

        })
            .then(function(responseData){
                console.log('1',req);
                //return res.json(responseData);
                if (responseData.cod !== 200){
                    console.log(304);
                    //return
                    return res.sendStatus(304);
                }else {
                    return res.json(responseData);}

            })
            .catch(function(err){
                console.log('3',err);
                return res.json(err);
            })
            .finally(() => {console.log('OK', res.statusCode)});
    });



server.use('/api', router);
//server.use('/api', api);




server.listen(port, () => console.log(`Listening on port ${port}`));

