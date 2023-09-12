package org.mericbulca.repository;

import org.mericbulca.model.JobProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<JobProjection, Long> {

}
