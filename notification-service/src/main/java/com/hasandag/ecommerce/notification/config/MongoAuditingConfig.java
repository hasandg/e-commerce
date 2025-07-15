package com.hasandag.ecommerce.notification.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

/**
 * Configuration class for enabling MongoDB auditing support.
 * This enables automatic population of @CreatedDate and @LastModifiedDate fields.
 */
@Configuration
@EnableMongoAuditing
public class MongoAuditingConfig {
} 