import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  // Gestion de la connexion d'un client
  handleConnection(client: Socket) {
    console.log(`Client connecté : ${client.id}`);
  }

  // Gestion de la déconnexion d'un client
  handleDisconnect(client: Socket) {
    console.log(`Client déconnecté : ${client.id}`);
  }

  // Écoute l'événement 'sendMessage' pour recevoir un message du client
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const savedMessage = await this.messagesService.create(createMessageDto);

    // Émet le message à tous les clients connectés
    this.server.emit('newMessage', savedMessage);
    return savedMessage;
  }
}
