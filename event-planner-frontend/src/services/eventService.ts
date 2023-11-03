import CommonService from './commonService';
import { CreateEventDto } from 'features/event/api/dtos';

export default class EventService extends CommonService {
  createEvent(data: CreateEventDto) {
    return this.post('/Events/CreateEvent', data);
  }
}
