package org.mericbulca.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class JobProjection extends BaseEntity {

    @Id
    private Long id;
    private String job_title;
}
