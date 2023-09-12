package org.mericbulca.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "job_id"}))
public class Application extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserProjection user;
    private String fullName;
    private String school;
    private String major;
    @Column(length = 1024)
    private String coverLetter;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private JobProjection jobPost;

    @Enumerated(EnumType.STRING)
    private Status status;

    private boolean enabled;
}

