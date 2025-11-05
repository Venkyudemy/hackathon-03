package com.smartcity.events.service;

import com.smartcity.events.dto.EventDTO;
import com.smartcity.events.dto.NormalizedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventIngestionService {
    
    private final EventNormalizationService normalizationService;
    private final KafkaTemplate<String, NormalizedEvent> kafkaTemplate;
    private static final String KAFKA_TOPIC = "smartcity-events";
    
    @Transactional
    public EventDTO ingestEvent(EventDTO eventDTO) {
        // Generate event ID if not provided
        if (eventDTO.getId() == null || eventDTO.getId().isEmpty()) {
            eventDTO.setId("EVT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        
        // Set timestamp if not provided
        if (eventDTO.getTimestamp() == null) {
            eventDTO.setTimestamp(LocalDateTime.now());
        }
        
        // Normalize the event
        NormalizedEvent normalizedEvent = normalizationService.normalize(eventDTO);
        
        // Publish to Kafka (if available)
        try {
            kafkaTemplate.send(KAFKA_TOPIC, normalizedEvent.getEventId(), normalizedEvent);
        } catch (Exception e) {
            // Kafka not available - log but continue
            System.err.println("Warning: Could not publish to Kafka: " + e.getMessage());
            // Event ingestion still succeeds even if Kafka publish fails
        }
        
        // Trigger Step Functions workflow if it's an incident
        if (isIncidentEvent(normalizedEvent)) {
            triggerWorkflow(normalizedEvent);
        }
        
        return eventDTO;
    }
    
    private boolean isIncidentEvent(NormalizedEvent event) {
        return "emergency".equals(event.getEventType()) || 
               "critical".equals(event.getSeverity()) ||
               "high".equals(event.getSeverity());
    }
    
    private void triggerWorkflow(NormalizedEvent event) {
        // TODO: Implement AWS Step Functions trigger
        // This would trigger a workflow like: incident -> assign -> dispatch
        System.out.println("Triggering workflow for event: " + event.getEventId());
    }
}

