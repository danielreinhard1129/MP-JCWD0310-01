import { createEventService } from "@/services/admin/create-event.service";
import { getEventService } from "@/services/admin/get-event.service";
import { getEventsByOrganizerService } from "@/services/admin/get-events-by-organizer.service";
import { getEventsService } from "@/services/admin/get-events.service";
import { NextFunction, Request, Response } from "express";

export class EventController {
  async createEventController(req: Request, res: Response,  next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      console.log(req.files)

      if (!files.length) {
        throw new Error('No File Uploaded');
      }
      const result = await createEventService(req.body, files[0]);

      return res.status(200).send(result);
    } catch (error) {
      next (error);
    }
  }

  async getEventsController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take : parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string ) || '',
      }
      const result = await getEventsService(query);
      
      return res.status(200).send(result);
    } catch (error) {
      throw (error);
    }
  }
  async getEventsByOrganizerController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        id:  parseInt(req.query.id as string),
        take : parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string ) || '',
      }
      const result = await getEventsByOrganizerService(query);
      
      return res.status(200).send(result);
    } catch (error) {
      throw (error);
    }
  }

  async getEventController(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('ini isi event');

      const id = req.params.id;
      const result = await getEventService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
