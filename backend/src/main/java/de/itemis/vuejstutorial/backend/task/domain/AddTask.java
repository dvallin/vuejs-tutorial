package de.itemis.vuejstutorial.backend.task.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;

public class AddTask {
    @NotBlank(message = "Task title must not be blank!")
    public final String title;

    public AddTask(@JsonProperty("title") final String title) {
        this.title = title;
    }
}
