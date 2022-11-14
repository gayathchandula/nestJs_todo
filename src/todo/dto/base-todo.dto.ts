import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseTodoDto {
  @ApiProperty({
    type: String,
    description: 'title is a required property',
  })
  @IsNotEmpty()
  title: string;
  @ApiPropertyOptional({
    type: String,
    description: 'description is an optional property',
  })
  description?: string;
}
