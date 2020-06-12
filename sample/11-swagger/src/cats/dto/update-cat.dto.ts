import { PartialType } from "@nestjs/swagger";
import { CreateCatDto } from "./create-cat.dto";
import { IsOptional } from "class-validator";

export class UpdateCatDto extends PartialType(CreateCatDto) {}

/* with belown dto worckin correctly */

// export class UpdateCatDto extends PartialType(CreateCatDto) {
//     @IsOptional()
//     name: string;

//     @IsOptional()
//     age: number;

//     @IsOptional()
//     breed: string;
// }