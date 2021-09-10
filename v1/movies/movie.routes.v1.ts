import { RoutesConfig } from "../common/routes.config";
import express from "express";
import movieController from "./controllers/movie.controller";

export class MovieRoutesV1 extends RoutesConfig {
    public constructor(app: express.Application) {
        super(app, "MoviesRoutesV1");
    }

    protected configureRoutes(): express.Application {
        this.app.route(RoutesConfig.version + "/movies")
                .get(movieController.listMovies);
        return this.app;
    }
}