import { OpenAIMessage } from '../api/dtos/dtos';

export function createDefaultOpenAIMessage(): OpenAIMessage {
  return {
    id: '',
    object: '',
    created_at: Date.now(),
    thread_id: '',
    role: '',
    content: [
      {
        type: '',
        text: {
          value: '',
          annotations: [],
        },
      },
    ],
    file_ids: [],
    assistant_id: '',
    run_id: '',
    metadata: {},
  };
}
