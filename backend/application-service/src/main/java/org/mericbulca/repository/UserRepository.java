package org.mericbulca.repository;

import org.mericbulca.model.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserProjection, Long> {

}
