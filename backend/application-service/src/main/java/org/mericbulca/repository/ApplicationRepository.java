package org.mericbulca.repository;

import org.mericbulca.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    void deleteAllByUser_Id(Long userId);
    void deleteAllByJobPost_Id(Long postId);
    List<Application> findAllByUser_Id(Long userId);
    List<Application> findAllByJobPost_Id(Long postId);
}
