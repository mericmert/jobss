package com.obss.jobmanagement.repository;

import com.obss.jobmanagement.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    List<Post> findAll(Specification<Post> spec);
    Page<Post> findAll(Specification<Post> spec, Pageable pageable);
    Page<Post> findAll(Pageable pageable);

}
