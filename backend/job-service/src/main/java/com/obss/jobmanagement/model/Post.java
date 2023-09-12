package com.obss.jobmanagement.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    @Column(length = 1024)
    private String description;
    private String requiredSkills;
    private String country;
    private String city;

    @Enumerated(EnumType.STRING)
    private Eligibility eligibility;

    @Enumerated(EnumType.STRING)
    private Level level;

    private boolean enabled;
    private Long activationTime;
    private Long deadline;

}
