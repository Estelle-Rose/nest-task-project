import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ConfigValidationSchema } from "./config.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: ConfigValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get("STAGE") === "prod";
        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: "postgres",
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get("DB_HOST"),
          database: configService.get("DB_DATABASE"),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          port: configService.get("DB_PORT"),
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
