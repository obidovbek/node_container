import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ConfigService } from "./config/config.service";
import { PostgresService } from "./database/postgres.service";
import { ExeptionFilter } from "./errors/exeption.filter";
import { TYPES } from "./types";

export interface IBootstrapReturn{
    appContainer: Container,
    app:App
}
const appBindings = new ContainerModule((bind: interfaces.Bind)=>{
    bind<App>(TYPES.Application).to(App),
    bind<ConfigService>(TYPES.ConfigService).to(ConfigService),
    bind<ExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter),
    bind<PostgresService>(TYPES.PostgresService).to(PostgresService)
})
async function bootstrap():Promise<IBootstrapReturn>{
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    await app.init();
    return {app, appContainer}
}

const boot = bootstrap();