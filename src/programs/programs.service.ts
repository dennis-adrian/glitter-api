import { Injectable } from '@nestjs/common';
import { ProgramsList } from './utils/programsList';
import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';

@Injectable()
export class ProgramsService {
  private programs = new ProgramsList().programs;

  findAll(): Program[] {
    return this.programs;
  }

  findOne(id: number): Program {
    return this.programs.find((program) => program.id === id);
  }

  create(payload: CreateProgramDto): Program {
    const program = { id: 99, ...payload };
    this.programs.push(program);
    return program;
  }
}
