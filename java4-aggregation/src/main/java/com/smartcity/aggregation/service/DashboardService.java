package com.smartcity.aggregation.service;

import com.smartcity.aggregation.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {
    
    private final KPIService kpiService;
    private final AnalyticsService analyticsService;
    
    public DashboardDTO getDashboardData() {
        KPIDTO kpis = kpiService.getKPIs();
        List<MetricDTO> metrics = buildMetrics(kpis);
        List<IncidentSummaryDTO> recentIncidents = getRecentIncidents();
        Map<String, Object> analyticsData = analyticsService.getAnalyticsData();
        
        return DashboardDTO.builder()
                .metrics(metrics)
                .recentIncidents(recentIncidents)
                .analyticsData(analyticsData)
                .kpis(kpis)
                .build();
    }
    
    private List<MetricDTO> buildMetrics(KPIDTO kpis) {
        List<MetricDTO> metrics = new ArrayList<>();
        
        metrics.add(MetricDTO.builder()
                .label("Traffic Flow")
                .value(kpis.getTrafficFlowPercentage() + "%")
                .change(5.2)
                .status(kpis.getTrafficFlowPercentage() > 80 ? "good" : "warning")
                .build());
        
        metrics.add(MetricDTO.builder()
                .label("Air Quality Index")
                .value(String.valueOf(kpis.getAirQualityIndex()))
                .change(-8.1)
                .status(kpis.getAirQualityIndex() < 50 ? "good" : "warning")
                .build());
        
        metrics.add(MetricDTO.builder()
                .label("Energy Usage")
                .value(kpis.getEnergyUsageGW() + " GW")
                .change(-3.5)
                .status("good")
                .build());
        
        metrics.add(MetricDTO.builder()
                .label("Active Incidents")
                .value(String.valueOf(kpis.getOpenIncidents()))
                .change(15.3)
                .status(kpis.getOpenIncidents() > 10 ? "warning" : "good")
                .build());
        
        return metrics;
    }
    
    private List<IncidentSummaryDTO> getRecentIncidents() {
        List<IncidentSummaryDTO> incidents = new ArrayList<>();

        incidents.add(IncidentSummaryDTO.builder()
                .id("INC-001")
                .type("traffic")
                .severity("high")
                .status("open")
                .location("Highway 101 North")
                .description("Heavy congestion detected, estimated 45min delay")
                .latitude(37.7749)
                .longitude(-122.4194)
                .timestamp(LocalDateTime.now().minusMinutes(15))
                .assignedTo("Traffic Dept.")
                .build());

        incidents.add(IncidentSummaryDTO.builder()
                .id("INC-002")
                .type("emergency")
                .severity("critical")
                .status("in-progress")
                .location("Downtown Plaza")
                .description("Fire alarm triggered at commercial building")
                .latitude(37.7849)
                .longitude(-122.4094)
                .timestamp(LocalDateTime.now().minusMinutes(5))
                .assignedTo("Fire Dept.")
                .build());

        incidents.add(IncidentSummaryDTO.builder()
                .id("INC-003")
                .type("pollution")
                .severity("medium")
                .status("open")
                .location("Industrial District")
                .description("Elevated particulate matter levels detected")
                .latitude(37.7649)
                .longitude(-122.4294)
                .timestamp(LocalDateTime.now().minusHours(2))
                .build());

        incidents.add(IncidentSummaryDTO.builder()
                .id("INC-004")
                .type("infrastructure")
                .severity("low")
                .status("resolved")
                .location("Water Treatment Plant 3")
                .description("Pump maintenance completed")
                .latitude(37.7549)
                .longitude(-122.4394)
                .timestamp(LocalDateTime.now().minusHours(4))
                .assignedTo("Utilities")
                .build());

        return incidents;
    }
}

