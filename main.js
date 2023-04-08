const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.json())

/* POST Method */
app.post('/user/add', (req, res) => {
    
    const existUsers = getUserData()
    
    const userData = req.body
    
    if (userData.fullname == null || userData.age == null || userData.username == null || userData.password == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }
    
    //check if the username exist already
    const findExist = existUsers.find( user => user.username === userData.username )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'username already exist'})
    }
    
    existUsers.push(userData)
    
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})

/* GET-All Method */
app.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})

/* GET Method */
app.get('/user/:username', (req, res) => {
    
    const username = req.params.username
    
    const userData = req.body
    
    const existUsers = getUserData()
    
    //check if the username exist or not       
    const findExist = existUsers.find( user => user.username === username )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'username not exist'})
    }
    return res.send(findExist)
})



const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}
//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('users.json')
    return JSON.parse(jsonData)    
}
/* util functions ends */
//configure the server port
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})
