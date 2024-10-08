import express, { request, response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { users } from './users'

import { CreateMessage, ReadMessage, updateMessage, DeleteMessage} from '../middlewares/validationNotes'

const router = express.Router()
export const messages = []


// Create message
router.post('/message', CreateMessage, (req, res) => {
    const { email, title, description,} = req.body

    const newMessage = {
        id: uuidv4(),
        title,
        description,
        email
    }

    messages.push(newMessage)

    return res.status(201).json({message: `Mensagem criada com sucesso! ${newMessage.description}`})
}) 


// Read message
router.get('/message/:email', ReadMessage, (req, res) => {
    const { email } = req.params 
    const existingUser = users.find(user => user.email === email)

    const filteredMessages = messages.filter(message => message.email === email)

    return res.status(200).json({
        message: `Seja bem-vinde!`,
        messages: filteredMessages.map(message => 
            `ID: ${message.id}, Título: ${message.title}, Descrição: ${message.description}`).join(' || ')
    });

})


// update message
router.put('/message/:id', updateMessage, (req, res) => {
    const { title, description } = req.body
    const { id } = req.params
    const messageIndex = messages.findIndex(note => note.id === id)

    return res.status(200).json({
        message: `Mensagem atualizada com sucesso!`,
        updatedMessage: messages[messageIndex]
    })
})


// Delete message
router.delete('/message/:id', DeleteMessage, (req, res) => {
    const { id } = req.params
    const messageIndex = messages.findIndex(note => note.id === id)
    const deletedNote = messages.splice(messageIndex, 1)

    return res.status(200).json({
        message: 'Recado excluído com sucesso!',
        note: deletedNote
    })
})

export default router