import { FilterParams, JoinEventDto } from 'features/browse-events/api/dtos';
import CommonService from './commonService';
import { CreateEventDto, UpdateEventDto } from 'features/event/api/dtos';

export default class EventService extends CommonService {
  createEvent(data: CreateEventDto) {
    return this.post('/Event/CreateEvent', data);
  }

  updateEvent(eventId: string, data: UpdateEventDto) {
    return this.put('/Event/UpdateEvent/' + eventId, data);
  }

  getSportTypes() {
    return this.get('/Event/GetAvailableSportTypes');
  }

  getPositionsForSportType(sportTypeId: string) {
    return this.get('/Event/GetPositionsForSportType/' + sportTypeId);
  }

  getEventById(eventId: string) {
    return this.get('/Event/GetEvent/' + eventId);
  }

  getEvents(data: FilterParams) {
    return this.post('/Event/GetEvents', data);
  }

  joinEvent(data: JoinEventDto) {
    return this.post('/Event/JoinEvent', data);
  }
}
