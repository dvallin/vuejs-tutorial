package de.itemis.vuejstutorial.backend.task.domain.model;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class Task {
    @Id
    public final UUID id;
    
    public final String title;

    public Task(final String title) {
        this.id = UUID.randomUUID();
        this.title = title;
    }
}
