package com.smartcity.usermanagement.config;

import com.smartcity.usermanagement.entity.Permission;
import com.smartcity.usermanagement.entity.Role;
import com.smartcity.usermanagement.entity.User;
import com.smartcity.usermanagement.repository.PermissionRepository;
import com.smartcity.usermanagement.repository.RoleRepository;
import com.smartcity.usermanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    @Transactional
    public void run(String... args) {
        log.info("Initializing default data...");
        
        // Create permissions
        Permission readUsers = createPermissionIfNotExists("READ_USERS", "Read users", "users", "read");
        Permission writeUsers = createPermissionIfNotExists("WRITE_USERS", "Write users", "users", "write");
        Permission adminUsers = createPermissionIfNotExists("ADMIN_USERS", "Admin users", "users", "admin");
        Permission readRoles = createPermissionIfNotExists("READ_ROLES", "Read roles", "roles", "read");
        Permission writeRoles = createPermissionIfNotExists("WRITE_ROLES", "Write roles", "roles", "write");
        
        // Create ADMIN role
        Role adminRole = createRoleIfNotExists("ADMIN", "System Administrator", 
            Set.of(readUsers, writeUsers, adminUsers, readRoles, writeRoles));
        
        // Create USER role
        Role userRole = createRoleIfNotExists("USER", "Regular User", 
            Set.of(readUsers));
        
        // Create admin user if it doesn't exist
        if (!userRepository.existsByEmail("admin@smartcity.ai")) {
            User adminUser = User.builder()
                    .email("admin@smartcity.ai")
                    .password(passwordEncoder.encode("password"))
                    .name("Administrator")
                    .enabled(true)
                    .roles(Set.of(adminRole))
                    .build();
            
            userRepository.save(adminUser);
            log.info("✅ Created default admin user: admin@smartcity.ai / password");
        } else {
            log.info("ℹ️  Admin user already exists");
        }
        
        log.info("✅ Data initialization complete");
    }
    
    private Permission createPermissionIfNotExists(String name, String description, String resource, String action) {
        return permissionRepository.findByName(name)
                .orElseGet(() -> {
                    Permission permission = Permission.builder()
                            .name(name)
                            .description(description)
                            .resource(resource)
                            .action(action)
                            .build();
                    return permissionRepository.save(permission);
                });
    }
    
    private Role createRoleIfNotExists(String name, String description, Set<Permission> permissions) {
        return roleRepository.findByName(name)
                .orElseGet(() -> {
                    Role role = Role.builder()
                            .name(name)
                            .description(description)
                            .permissions(permissions)
                            .build();
                    return roleRepository.save(role);
                });
    }
}

