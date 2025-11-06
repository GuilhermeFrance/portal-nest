import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { ClientFromJwt } from 'src/auth/models/ClientFromJwt';

@ApiTags('Solicitações')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Get('all')
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '8',
    @Query('filter') filter?: string,
    @Query('statusKey') statusKey?: string,
  ) {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    console.log(pageNumber, limitNumber, filter, statusKey);
    return this.requestsService.findAllPaginated(
      pageNumber,
      limitNumber,
      statusKey,
      filter,
      undefined,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-requests')
  getMyRequests(
    @Req() req: { user: ClientFromJwt },
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('filter') filter?: string,
    @Query('statusKey') statusKey?: string,
  ) {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const clientId = req.user.id;

    return this.requestsService.findAllPaginated(
      pageNumber,
      limitNumber,
      statusKey,
      filter,
      clientId,
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
  @Delete('my-requests/:id')
  removeCurrent(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
