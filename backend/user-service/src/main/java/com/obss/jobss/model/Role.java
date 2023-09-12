package com.obss.jobss.model;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;

import static com.obss.jobss.model.Permission.*;

@RequiredArgsConstructor
public enum Role {
    ADMIN(
        Set.of(
                ADMIN_READ,
                ADMIN_CREATE,
                ADMIN_UPDATE,
                ADMIN_DELETE
    )),
    HR(
        Set.of(
                HR_READ,
                HR_CREATE,
                HR_UPDATE,
                HR_DELETE
    )),
    USER(
        Set.of(
                USER_READ,
                USER_CREATE,
                USER_UPDATE,
                USER_DELETE
    ));

    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = permissions.stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .toList();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }

}
