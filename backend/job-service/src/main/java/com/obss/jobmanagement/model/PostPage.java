package com.obss.jobmanagement.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostPage {
    private List<Post> postList;
    private Long totalCount;
    private Integer totalPages;


    public PostPage(List<Post> postList, Long totalCount, Integer totalPages) {
        this.postList = postList;
        this.totalCount = totalCount;
        this.totalPages = totalPages;
    }
}
