package org.mericbulca.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ApplicationUpdateRequest {
    private String school;
    private String major;
    private String cover_letter;
    private String status;
}
