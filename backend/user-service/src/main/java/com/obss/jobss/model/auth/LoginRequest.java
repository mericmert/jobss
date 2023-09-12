package com.obss.jobss.model.auth;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginRequest {

    private String username;
    private String password;

}
