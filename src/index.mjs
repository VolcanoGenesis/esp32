import express from 'express';

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id: 1, username: 'John Doe', displayName: 'John'},
    {id: 2, username: 'Jane Doe', displayName: 'Jane'},
    {id: 3, username: 'John Smith', displayName: 'Smith'},
    {id: 4, username: 'Jane Laura', displayName: 'Laura'},
    {id: 5, username: 'Adi Ranjan', displayName: 'Adi'},
    {id: 6, username: 'marilyn', displayName: 'Marilyn'},
];
app.get('/', (req, res)=>{
    res.status(201).send('Hello World');
});

app.get('/api/users', (req, res)=> {
    console.log(req.query);
    const{query: {filter, value},
} = req;
    if(!filter && ! value) return res.send(mockUsers);
    // if filter an d value dont exist return all users 
    if(filter && value) return res.send(
        mockUsers.filter((user) => user[filter].includes(value))
    )
    // when both exist return the filtered users
    return res.status(400).send('Invalid Filter');
});// req query is used to filter the users

app.get('/api/users/:id', (req, res)=> {
    console.log(req.params);
    const parsedID = parseInt(req.params.id);
    console.log(parsedID);
    if(isNaN(parsedID)) return res.status(400).send('Invalid ID');

    const findUser = mockUsers.find(user => user.id === parsedID);
    if(!findUser) return res.sendStatus(404);
    return res.send(findUser);
});// req params is used to get the id of the user

app.post('/api/users', (req, res)=> {
    console.log(req.body);
    const newUser = {id: mockUsers[mockUsers.length - 1].id + 1, ...req.body};
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
})// req body is used to add a new user

app.get('/api/products', (req, res)=> {
    res.send([{id: 1, product: 'Laptop'},
            {id: 2, product: 'Phone'},
            {id: 3, product: 'Tablet'},
    ])
})

app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`);
}); 