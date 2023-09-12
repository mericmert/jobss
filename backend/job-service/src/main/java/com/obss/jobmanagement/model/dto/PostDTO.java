package com.obss.jobmanagement.model.dto;

import com.obss.jobmanagement.model.Eligibility;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class PostDTO {
    @NotBlank(message = "Title can't be blank!")
    private String title;
    private String description;
    private String requiredSkills;
    private String eligibility;
    private String level;
    private String country;
    private String city;
    private Long activationDate;
    private Long deadline;
    private boolean enabled;
}
