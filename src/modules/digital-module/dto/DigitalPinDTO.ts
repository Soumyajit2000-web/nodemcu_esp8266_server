import { IsInt, IsIn, IsNotEmpty, IsEnum } from "class-validator";
import { DigitalPins } from "../../../ts/enum";

export class DigitalPinDTO {
  @IsEnum(DigitalPins, {
    message: "pin must be a valid DigitalPin enum value. It must be one these: 16 -> D0, 5 -> D1, 4 -> D2, 0 -> D3, 2 -> D4, 14 -> D5, 12 -> D6, 13 -> D7, 15 -> D8",
  })
  @IsNotEmpty()
  pin: DigitalPins;

  @IsInt()
  @IsIn([0, 1])
  @IsNotEmpty()
  status: number;
}
