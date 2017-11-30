package de.itemis.vuejstutorial.backend.task;

import de.itemis.vuejstutorial.backend.task.domain.AddTask;
import de.itemis.vuejstutorial.backend.task.domain.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.constraints.NotNull;

@Component
@Validated
public class TasksService {

    @Autowired
    private TaskRepository repository;


    public Flux<Task> list() {
        return repository.findAll();
    }

    public Mono<Task> addTask(@NotNull AddTask command) {
        return repository.insert(new Task(command.title));
    }
}
