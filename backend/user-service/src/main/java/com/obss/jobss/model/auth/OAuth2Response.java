package com.obss.jobss.model.auth;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OAuth2Response {
    private String access_token;
    private Long expires_in;
    private String scope;
    private String token_type;
    private String id_token;
}
