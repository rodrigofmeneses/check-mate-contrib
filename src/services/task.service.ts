import { taskRepository } from '../repositories/task.repository'
import { CreateTask } from '../schemas/create-task.schema'
import { NotFoundError } from '../utils/api-errors'

export class TaskService {
  async list() {
    return taskRepository.find({
      order: {
        created_at: 'DESC',
      },
    })
  }

  async create(task: CreateTask) {
    return taskRepository.save(task)
  }

  async finish(id: number) {
    const task = await taskRepository.findOneBy({ id })

    if (!task) {
      throw new NotFoundError('Task not found')
    }
    task.deleted_at = new Date()

    await taskRepository.save(task)
    return task
  }
}
