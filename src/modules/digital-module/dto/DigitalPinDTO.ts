import { IsInt, IsIn, IsNotEmpty, IsEnum } from "class-validator";
import { DigitalPins } from "../../../ts/enum";

export class DigitalPinDTO {
  @IsEnum(DigitalPins, {
    message: "pin must be a valid DigitalPin enum value",
  })
  @IsNotEmpty()
  pin: DigitalPins;

  @IsInt()
  @IsIn([0, 1])
  @IsNotEmpty()
  status: number;
}
