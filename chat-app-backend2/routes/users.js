import router from "express";

const router = Router();

const users = 
[
    {
        "id": 1,
        "username": "user1",
        "password": "pass123",
        "telefonnummer": "+49 123 456789",
        "geburtstdatum": "1990-05-15"
      },
      {
        "id": 2,
        "username": "user2",
        "password": "securePass",
        "telefonnummer": "+49 987 654321",
        "geburtstdatum": "1985-08-22"
      },
      {
        "id": 3,
        "username": "user3",
        "password": "myp@ssw0rd",
        "telefonnummer": "+49 567 123456",
        "geburtstdatum": "1993-12-10"
      },
      {
        "id": 4,
        "username": "user4",
        "password": "secret123",
        "telefonnummer": "+49 234 567890",
        "geburtstdatum": "1987-03-27"
      },
      {
        "id": 5,
        "username": "user5",
        "password": "strongPass",
        "telefonnummer": "+49 345 678901",
        "geburtstdatum": "1992-09-03"
      }
  ];

router.get('/', (req, res) => {
    res.send(users);
})

router.get('/:name', (request, response) => {
    const name = request.params.name;
    const user = users.find((user) => user.name == name);
    if (!user) {
        response.sendStatus(400);
    }
    response.send(user);
});

router.post('/', (request, response) => {
    const newUser = request.body;
    users.push(newUser);
    response.sendStatus(201);
    console.log(newUser);
})

router.delete("/:name", (request, response) => {
    const name = request.params.name;
    if (users.find(u => u.name == name)) {
        users.delete(name)
    }
    response.sendStatus(204)
});

export default router;





