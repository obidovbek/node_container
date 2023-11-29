import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ConfigService } from "./config/config.service";
import { IConfigService } from "./config/config.service.interface";
import { ExeptionFilter } from "./errors/exception.filter";
import { IExeptionFilter } from "./errors/exception.filter.interface";
import { TYPES } from "./types";

export interface IBootstrapReturn{
    appContainer: Container,
    app:App
}
const appBindings = new ContainerModule((bind:interfaces.Bind)=>{
    bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter),
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope(),
    bind<App>(TYPES.Application).to(App)
})
async function bootstrap(): Promise<IBootstrapReturn>{
    const appContainer = new Container();
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Application);
    await app.init();
    return {appContainer, app};
}

export const boot = bootstrap();