import { openaiAxiosInstance } from 'common/api/setAxiosInstance';
import { CreateMessage } from 'features/chat/api/dtos/dtos';

export default class OpenAIService {
  test() {
    return openaiAxiosInstance.get('/test');
  }

  createAssistant() {
    return openaiAxiosInstance.post('/assistants');
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

  deleteThread(threadId: string) {
    return openaiAxiosInstance.delete(`/threads/${threadId}`);
  }

  deleteAssistant(assistantId: string) {
    return openaiAxiosInstance.delete(`/assistants/${assistantId}`);
  }
}
