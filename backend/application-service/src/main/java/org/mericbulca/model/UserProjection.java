package org.mericbulca.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProjection extends BaseEntity{

    @Id
    private Long id;
    private boolean blacklisted;
    private String email;
}
