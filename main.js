const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.json())

/* POST Method */
app.post('/tickets/add', (req, res) => {
    
    const existingTickets = getTicketData()
    
    const ticketData = req.body
    
    if (ticketData.id == null || ticketData.age == null || ticketData.username == null || ticketData.password == null) {
        return res.status(401).send({error: true, msg: 'Ticket data missing'})
    }
    
    //check if the username exist already
    const findExist = existingTickets.find( user => user.username === userData.username )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'Ticket already exist'})
    }
    
    existingTickets.push(ticketData)
    
    saveTicketData(existingTickets);
    res.send({success: true, msg: 'Ticket data added successfully'})
})

/* GET-All Method */
app.get('/tickets/list', (req, res) => {
    const tickets = getTicketData()
    res.send(tickets)
})

/* GET Method */
app.get('/tickets/:id', (req, res) => {
    
    const ticket = req.params.id
    
    const ticketData = req.body
    
    const existingTickets = getTicketData()
    
    //check if the ticket exist or not       
    const findExist = existingTickets.find( ticket => ticket.id === id )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'ticket does not exist'})
    }
    return res.send(findExist)
})



const saveTicketData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('tickets.json', stringifyData)
}
//get the user data from json file
const getTicketData = () => {
    const jsonData = fs.readFileSync('tickets.json')
    return JSON.parse(jsonData)    
}
/* util functions ends */
//configure the server port
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})
