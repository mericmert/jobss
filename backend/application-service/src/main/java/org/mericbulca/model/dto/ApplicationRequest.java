package org.mericbulca.model.dto;

import lombok.Data;

@Data
public class ApplicationRequest {
    private String full_name;
    private String school;
    private String major;
    private String cover_letter;
    private Long user_id;
    private Long post_id;
}
