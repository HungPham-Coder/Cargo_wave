import { PartialType } from "@nestjs/mapped-types";
import { CreateRouteDto } from "./create-route-request.dto";

export class UpdateRouteDto extends PartialType(CreateRouteDto) {}