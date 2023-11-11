import CommonService from './commonService';

export default class ChatService extends CommonService {
  getChatsDetails() {
    return this.get('/Chat/GetChatsDetails');
  }

  getChatMessages(chatId: string) {
    return this.get('/Chat/GetChatMessages/' + chatId);
  }
}
