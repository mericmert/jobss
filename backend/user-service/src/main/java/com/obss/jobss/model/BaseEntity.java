package com.obss.jobss.model;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@MappedSuperclass
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public abstract class BaseEntity {

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    private void onPrePersist() {
        setCreatedAt(LocalDateTime.now());
        setUpdatedAt(LocalDateTime.now());
    }

    @PreUpdate
    private void onPreUpdate() {
        setUpdatedAt(LocalDateTime.now());
    }

}
