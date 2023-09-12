package com.obss.jobss.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@Builder
public class Account {
    private String full_name;
    private String email;
    private String picture;

    public static Account fromMap(Map<String, Object> userDetails) {
        return Account.builder()
                .email((String) userDetails.get("email"))
                .full_name((String) userDetails.get("name"))
                .picture((String) userDetails.get("picture"))
                .build();
    }
}
