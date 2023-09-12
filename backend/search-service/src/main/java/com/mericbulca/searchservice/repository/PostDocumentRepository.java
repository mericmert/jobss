package com.mericbulca.searchservice.repository;

import com.mericbulca.searchservice.model.PostDocument;
import org.springframework.data.solr.repository.SolrCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostDocumentRepository extends SolrCrudRepository<PostDocument, Long> {
    Iterable<PostDocument> findByDescriptionContainingIgnoreCaseOrTitleContainingIgnoreCase(String description, String title);
}
