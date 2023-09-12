package com.mericbulca.searchservice.service;

import com.mericbulca.searchservice.model.PostDocument;
import com.mericbulca.searchservice.model.UserDocument;
import com.mericbulca.searchservice.repository.PostDocumentRepository;
import com.mericbulca.searchservice.repository.UserDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final UserDocumentRepository userDocumentRepository;
    private final PostDocumentRepository postDocumentRepository;

    public Map<String, List<?>> search(String query) {
        Map<String, List<?>> results = new HashMap<>();

        List<UserDocument> userList = new ArrayList<>();
        Iterable<UserDocument> userResults = userDocumentRepository.findByEmailContainingIgnoreCaseOrFullNameContainingIgnoreCase(query, query);
        userResults.forEach(userList::add);

        List<PostDocument> postList = new ArrayList<>();
        Iterable<PostDocument> postResults = postDocumentRepository.findByDescriptionContainingIgnoreCaseOrTitleContainingIgnoreCase(query, query);
        postResults.forEach(postList::add);

        results.put("users", userList);
        results.put("posts", postList);
        return results;
    }
}
