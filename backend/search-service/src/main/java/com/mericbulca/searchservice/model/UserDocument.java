package com.mericbulca.searchservice.model;

import lombok.Getter;
import lombok.Setter;
import org.apache.solr.client.solrj.beans.Field;
import org.springframework.data.annotation.Id;
import org.springframework.data.solr.core.mapping.Indexed;
import org.springframework.data.solr.core.mapping.SolrDocument;

@SolrDocument(collection = "user_document")
@Getter @Setter
public class UserDocument {
    @Id
    @Indexed
    private Long id;

    @Indexed
    @Field
    private String fullName;

    @Indexed
    @Field
    private String email;
}
