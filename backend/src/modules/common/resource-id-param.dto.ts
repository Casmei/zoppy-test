import { ApiProperty } from '@nestjs/swagger';

export class ResourceIdParamDto {
  @ApiProperty({ description: 'Resource id', example: '1', type: 'number' })
  id: number;
}
