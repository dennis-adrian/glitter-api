import { Injectable, NotFoundException } from '@nestjs/common';
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
    const program = this.programs.find((program) => program.id === id);
    if (!program) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return program;
  }

  create(payload: CreateProgramDto): Program {
    const program = { id: 99, ...payload };
    this.programs.push(program);
    return program;
  }
}
