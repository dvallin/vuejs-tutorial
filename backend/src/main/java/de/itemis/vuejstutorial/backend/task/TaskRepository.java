package de.itemis.vuejstutorial.backend.task;

import de.itemis.vuejstutorial.backend.task.domain.model.Task;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import java.util.UUID;

public interface TaskRepository extends ReactiveMongoRepository<Task, UUID> {
}
