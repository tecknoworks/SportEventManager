import CommonService from './commonService';

export default class ChatService extends CommonService {
  getChatsDetails() {
    return this.get('/Chat/GetChatsDetails');
  }

  getChatMessages(chatId: string, pageNumber: number, pageSize: number) {
    return this.get(`/Chat/GetChatMessages/${chatId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
