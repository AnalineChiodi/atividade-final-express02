import express  from "express"

const router = express.Router()


//  Welcome
router.get('/', (req, res) => {
    return res.status(200).json({ message: "Bem vindo à aplicação"})
})

export default router