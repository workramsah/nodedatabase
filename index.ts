import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { UplaodImage } from "./lib/uplaod-img";
import path from 'path'
import cors from 'cors';
import multer from 'multer';

const app = express()
const prisma = new PrismaClient()
const port = 3000
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors())
// Middleware
app.use(express.json())
app.use(express.static('public'))

// GET all users
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// GET single user by ID
app.get('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
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
app.post('/api/users', async (req: Request, res: Response) => {
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


// GET all form
app.get('/api/form', async (req: Request, res: Response) => {
  try {
    const users = await prisma.form.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form' })
  }
})

app.post('/api/form', async (req: Request, res: Response) => {
  try {
    const { fristname, lastname, phone, email, company, companysize, overview, refund, country } = req.body

    const user = await prisma.form.create({
      data: {
        fristname: fristname,
        lastname: lastname,
        phone: phone,
        companysize: companysize,
        company: company,
        email: email,
        overview: overview,
        refund: refund,
        country: country,

      }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// UPDATE user
app.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const { name, age } = req.body
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
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
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    await prisma.user.delete({
      where: { id: parseInt(id) }
    })
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// company
app.post('/api/company', async (req: Request, res: Response) => {
  try {
    const { companyname, phone, email, sector } = req.body

    const user = await prisma.company.create({
      data: {
        companyname: companyname,
        phone: phone,
        email: email,
        sector: sector

      }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' })
  }
})


// GET all company
app.get('/api/company', async (req: Request, res: Response) => {
  try {
    const users = await prisma.company.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form' })
  }
})

// get single company
app.get('/api/company/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const user = await prisma.company.findUnique({
      where: { id: parseInt(id) }
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

app.put('/api/company/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const { companyname, phone, email, sector } = req.body
    const user = await prisma.company.update({
      where: { id: parseInt(id) },
      data: {
        companyname: companyname,
        phone: phone,
        email: email,
        sector: sector

      }
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' })
  }
})


// DELETE user
app.delete('/api/company/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    await prisma.company.delete({
      where: { id: parseInt(id) }
    })
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

//GET image
app.get('/api/image', async (req: Request, res: Response) => {
  try {
    const users = await prisma.image.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form' })
  }
})



// POST create new user image
app.post('/api/image', upload.single('img'), async (req: Request, res: Response) => {
  try {
    const { name, age } = req.body
    const image = (req as any).file;

    if (!image) {
      return res.status(400).json({ message: "uploaded Fail" });
    }

    const uploadResult: any = await UplaodImage(
      image,
      "nextjs-imagegallery"
    );

    const savedImage = await prisma.image.create({
      data: {
        image_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        name: name,
        age: age
      },
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: savedImage,
    });

  } catch (error: any) {
    console.error('Image upload error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create user' });
  }
});



//image upload and company data
app.post('/api/companys', upload.single('img'), async (req: Request, res: Response) => {
  try {
    const { companyname, phone, email, sector } = req.body
    const image = (req as any).file;

    if (!image) {
      return res.status(400).json({ message: "uploaded Fail" });
    }

    const uploadResult: any = await UplaodImage(
      image,
      "nextjs-imagegallery"
    );

    const savedImage = await prisma.companys.create({
      data: {
        image_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        companyname: companyname,
        phone: phone,
        email: email,
        sector: sector
      },
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: savedImage,
    });

  } catch (error: any) {
    console.error('Image upload error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create user' });
  }
});


app.get('/api/companys', async (req: Request, res: Response) => {
  try {
    const users = await prisma.companys.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form' })
  }
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})


//URL schema

app.get('/api/url', async (req: Request, res: Response) => {
  try {
    const users = await prisma.url.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch form' })
  }
})

app.post('/api/url', async (req: Request, res: Response) => {
  try {
    const { compurl } = req.body

    const user = await prisma.url.create({
      data: {
        compurl: compurl,
      }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' })
  }
})