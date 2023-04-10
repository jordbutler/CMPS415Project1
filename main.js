const express = require('express')
const fs = require('fs')

const app = express()


app.use(express.json())

/* POST Method */
app.post('/user/add', (req, res) => {
    //get the existing user data
    const existUsers = getUserData()
    
    //get the new user data from post request
    const userData = req.body

    //User needs a fullname, age, username, and password
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

/* GET-all users Method */
app.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})

/* GET a User Method */
app.get('/user/:username', (req, res) => {
    //get the username from url
    const username = req.params.username

    //get the update data
    const userData = req.body

    //get the existing user data
    const existUsers = getUserData()

    //check if the username exist or not       
    const findExist = existUsers.find( user => user.username === username )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'username not exist'})
    }

   res.send(findExist)
})




/* util functions */

//read the user data from json file
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
