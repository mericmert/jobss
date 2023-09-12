package com.obss.jobss.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserDTO {
    private Long id;
    private String username;
    private String full_name;
    private String role;
    private String picture;
    private String email;
    private boolean blacklisted;

    public static UserDTO fromEntity(User user){
       return UserDTO.builder()
               .id(user.getId())
               .username(user.getUsername())
               .full_name(user.getFull_name())
               .picture(user.getPicture())
               .blacklisted(user.isBlacklisted())
               .email(user.getEmail())
               .role(user.getRole().name())
               .build();
    }
}
