import { FilterParams, JoinEventDto } from 'features/browse-events/api/dtos';
import CommonService from './commonService';
import { CloseEventDto, CreateEventDto, UpdateEventDto } from 'features/event/api/dtos';
import { ChangeStatusDto, DeleteParticipantDto } from 'features/event-users/api/dtos';
import { SendReviewData } from 'features/review-event/api/dto';

export default class EventService extends CommonService {
  createEvent(data: CreateEventDto) {
    return this.post('/Event/CreateEvent', data);
  }

  updateEvent(eventId: string, data: UpdateEventDto) {
    return this.put('/Event/UpdateEvent/' + eventId, data);
  }

  closeEvent(data: CloseEventDto) {
    return this.post('/Event/CloseEvent', data);
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

  changeUserStatus(data: ChangeStatusDto) {
    return this.post('/Event/ChangeUserStatus', data);
  }

  deleteParticipant(data: DeleteParticipantDto) {
    return this.delete('/Event/DeleteParticipant', data);
  }

  sendReview(data: SendReviewData) {
    return this.post('/Event/PostReview', data);
  }
}
