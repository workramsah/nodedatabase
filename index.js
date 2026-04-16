const express = require('express')
const { PrismaClient } = require('@prisma/client')
const app = express()
const prisma = new PrismaClient()
const port = 3000

// Middleware
app.use(express.json())
app.use(express.static('public'))

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// GET single user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) }
    })
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// POST create new user
app.post('/api/users', async (req, res) => {
  try {
    const { name, age } = req.body
    if (!name || !age) {
      return res.status(400).json({ error: 'Name and age are required' })
    }
    const user = await prisma.user.create({
      data: {
        name: name,
        age: parseInt(age)
      }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// UPDATE user
app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, age } = req.body
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: name || undefined,
        age: age ? parseInt(age) : undefined
      }
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' })
  }
})

// DELETE user
app.delete('/api/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    })
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
