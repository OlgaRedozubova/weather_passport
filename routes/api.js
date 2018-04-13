const express = require('express');
const router = express.Router();

const fs = require('fs');

const Promise = require('bluebird');
const rp = require('request-promise');

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const uriWeather = "http://openweathermap.org/data/2.5/weather";
const appid = "b6907d289e10d714a6e88b30761fae22";

//-----------
const _ = require("lodash");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const users = [
    {
        id: 1,
        name: 'jonathanmh',
        password: '%2yx4'
    },
    {
        id: 2,
        name: 'test',
        password: 'test'
    }
];

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json());


// routerWeather.route("/")
//     .get(function(req, res){
//         const request = require('request');
//         const city = "Kiev";
//
//         // request("http://samples.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid,//b6907d289e10d714a6e88b30761fae22',
//         //     function (error, response, body) {
//         //         let weatherData = JSON.parse(body);
//         //         console.log(weatherData, typeof weatherData);
//         //         if(!error){
//         //             return res.status(200).json(weatherData); // res.end, res.send, res.status(200), res.json, res.sendFile
//         //         } else {
//         //             return res.json(error);
//         //         }
//         //     });
//
//         rp({
//             uri: uriWeather,
//             qs: {
//                 q: 'Kiev',
//                 appid: appid
//             },
//             headers: {
//                 'User-Agent': 'Request-Promise'
//             },
//             json: true,
//
//         })
//         .then(function(responseData){
//             return res.json(responseData);
//         })
//         .catch(function(err){
//             return res.json(err);
//         });
//
//     });
///

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

router.route('/login').post(jsonParser, (req, res) => {
    console.log('login');
    if (!req.body) return res.sendStatus(400);
    if(req.body.name && req.body.password){
        const name = req.body.name;
        const password = req.body.password;
    }
    const user = users[_.findIndex(users, {name: name})];

    if( ! user ){
        res.status(401).json({message:"no such user found"});
    }

    if(user.password === req.body.password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        const payload = {id: user.id};
        //const token = jwt.sign({user}, 'my_secret_key');
        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.json({message: "ok", token: token});
    } else {
        res.status(401).json({message:"passwords did not match"});
    }

    // const user = req.body;
    //
    // console.log('userName', user.user);
    // console.log('userPassword', user.password);
    //
    // const token = jwt.sign({user}, 'my_secret_key');
    // res.json({
    //     token: token
    // });
    // console.log('token', token);
    // const user = {
    //     user: '',
    //     password: ''
    // }
});

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


router.route("/towns/")
    .get(function(req, res){

        const townsList = JSON.parse(fs.readFileSync("towns.json", "utf8"));
        res.send(townsList);
        console.log('get_towns');

    })
    .post(jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
         console.log('S_req_towns.body', req.body);
        const townName = req.body.name;

        fs.readFile("towns.json", "utf8", function(err, file){
            if(!err){
                const towns = JSON.parse(file);
                const ikey = FindTown(towns, town.name);
                if (!ikey) {

                    const town = {name: townName};

                    towns.push(town);
                    const newFile = JSON.stringify(towns);
                    fs.writeFile("towns.json", newFile, function (err) {
                        if (!err) {
                            const townsList = JSON.parse(fs.readFileSync("towns.json", "utf8"));
                            res.send(townsList);
                        }
                    });
                } else {
                    console.log('Town already exists id LikeList!', key)
                    res.sendStatus(204);
                }
            }
        });


        }
    );



module.exports = router;



