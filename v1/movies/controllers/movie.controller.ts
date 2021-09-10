import express, { NextFunction } from "express";
import MovieService from "../services/movie.service";
import debug from "debug";
import { HttpError } from "../../common/http.error";


const log: debug.IDebugger = debug('app:movie-controller');
class MovieController {
    public async listMovies(req: express.Request, res: express.Response, next: NextFunction) {
        try {
            const movies = await MovieService.list();
            res.status(200).send(movies);
        } catch (err) {
              if (err) next(err);
        }
    }
}

export default new MovieController();