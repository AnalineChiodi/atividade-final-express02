import { users } from '../routes/users'


export function validationRegistration(req, res, next) {
    const { name, email, password} = req.body
    const existingUser = users.find(user => user.email === email)

    if (!name) {
        return res.status(400).json({error: "Por favor, verifique se passou o nome ."})
    }
    if (!email) {
        return res.status(400).json({error: "Por favor, verifique se passou o email ."})
    } 
    if (existingUser){
        return res.status(400).json({error: "Email já cadastrado, insira outro ."})
    } 
    if (!password) {
        return res.status(400).json({error: "Por favor, verifique se passou a senha ."})
    } 

    next()
}


export function validationLogin(req, res, next) {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({error: "Insira um e-mail válido"})
    }

    if (!password) {
        return res.status(400).json({error: "Insira uma senha válida"})
    }
    
    const existingUser = users.find(user => user.email === email)
    if (!existingUser) {
        return res.status(400).json({error: "Email não encontrado no sistema, verifique ou crie uma conta"})
    }

    

    next()
}