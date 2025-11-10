package com.smartcity.aggregation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncidentSummaryDTO {
    private String id;
    private String type;
    private String severity;
    private String status;
    private String location;
    private String description;
    private Double latitude;
    private Double longitude;
    private LocalDateTime timestamp;
    private String assignedTo;
}

