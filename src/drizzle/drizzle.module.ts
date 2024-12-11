import { Module } from "@nestjs/common";
import { DrizzleService } from "../db";

@Module({
    providers: [DrizzleService],
    exports: [DrizzleService]
})
export class DrizzleModule { }