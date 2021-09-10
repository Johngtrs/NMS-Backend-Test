import MovieDAO from "../daos/movie.dao";
import { CreateMovieDTO } from "../dtos/create.movie.dto";
import { PatchMovieDTO } from "../dtos/patch.movie.dto";
import { PutMovieDTO } from "../dtos/put.movie.dto";
import debug from 'debug';

const log: debug.IDebugger = debug('app:movie-service');
class MovieService {
    public async list() {
        return MovieDAO.getMovies();
    }
}

export default new MovieService();