package de.itemis.vuejstutorial.backend;

import de.itemis.vuejstutorial.backend.task.TasksService;
import de.itemis.vuejstutorial.backend.task.domain.AddTask;
import de.itemis.vuejstutorial.backend.task.domain.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class TaskApi {
    private static final String BASE_REST_PATH = "/api";
    private static final String API_PATH = "/tasks";
    private static final String APPLICATION_JSON = "application/json; charset=UTF-8";

    @Autowired
    TasksService service;

    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(
            value = BASE_REST_PATH + API_PATH,
            method = RequestMethod.GET,
            produces = APPLICATION_JSON
    )
    public Flux<Task> list() {
        return this.service.list();
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(
            value = BASE_REST_PATH + API_PATH,
            method = RequestMethod.POST,
            consumes = APPLICATION_JSON,
            produces = APPLICATION_JSON
    )
    public Mono<Task> add(@RequestBody @Validated final AddTask title) {
        return this.service.addTask(title);
    }
}
