package com.mericbulca.searchservice.repository;

import com.mericbulca.searchservice.model.UserDocument;
import org.springframework.data.solr.repository.SolrCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDocumentRepository extends SolrCrudRepository<UserDocument, Long> {
    Iterable<UserDocument> findByEmailContainingIgnoreCaseOrFullNameContainingIgnoreCase(String email, String fullName);
}
