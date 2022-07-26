import * as express from 'express';
import errorMiddleware from './database/middleware/errorMiddleware';
import userRoute from './database/routes/userRoutes';
import teamsRoute from './database/routes/teamRoutes';
import matchRoute from './database/routes/matchRoutes';
import leaderboardRoute from './database/routes/leaderboardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use('/login', userRoute);
    this.app.use('/teams', teamsRoute);
    this.app.use('/matches', matchRoute);
    this.app.use('/leaderboard', leaderboardRoute);

    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
