import { NestFactory } from "@nestjs/core";
import { AppModule } from "./agenda/app.module";
import { AppService } from "./agenda/app.service";
import { Agenda } from "@hokify/agenda";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);
  const mongoConnectionString = "mongodb://mongo:27017/agenda";
  const agenda = new Agenda({ db: { address: mongoConnectionString } });

  agenda.define("Fetch Movie Data", async () => {
    await appService.agendaJob();
  });
    await agenda.start();
    await agenda.every("60 minutes", "Fetch Movie Data");
}
bootstrap();
