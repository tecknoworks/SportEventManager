import { openaiAxiosInstance } from 'common/api/setAxiosInstance';
import { CreateAssistant, CreateMessage } from 'features/chat/api/dtos/dtos';

export default class OpenAIService {
  test() {
    return openaiAxiosInstance.get('/test');
  }

  createAssistant(data: CreateAssistant) {
    return openaiAxiosInstance.post('/assistants', data);
  }

  createThread() {
    return openaiAxiosInstance.post('/threads');
  }

  getThreadMessages(threadId: string) {
    return openaiAxiosInstance.get(`/threads/${threadId}/messages`);
  }

  createMessage(data: CreateMessage) {
    return openaiAxiosInstance.post(`/assistants/${data.assistantId}/threads/${data.threadId}`, {
      userQuestion: data.userQuestion,
    });
  }
}
