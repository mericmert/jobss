package com.obss.jobss.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_CREATE("admin:create"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_DELETE("admin:delete"),
    HR_READ("hr:read"),
    HR_CREATE("hr:create"),
    HR_UPDATE("hr:update"),
    HR_DELETE("hr:delete"),
    USER_READ("user:read"),
    USER_CREATE("user:create"),
    USER_UPDATE("user:update"),
    USER_DELETE("user:delete");

    private final String permission;
}
