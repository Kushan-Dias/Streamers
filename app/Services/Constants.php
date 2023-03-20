<?php

namespace App\Services;

class Constants
{
  // Status
  const ACTIVE = "ACTIVE";
  const INACTIVE = "INACTIVE";
  const DELETED = "DELETED";
  const RESTRICTED = "RESTRICTED";

  // Event Status
  const CANCELED = "CANCELLED";
  const POSTPONED = "POSTPONED";

  // Maintenance Statuses
  const REQUESTED = "REQUESTED";
  const ASSIGNED = "ASSIGNED";
  const PROCESSING = "PROCESSING";
  const RESOLVED = "RESOLVED";
  const REOPENED = "REOPENED";
  const CONFIRMED = "CONFIRMED";

  // Maintenance Priorities
  const LOW = "LOW";
  const MEDIUM = "MEDIUM";
  const HIGH = "HIGH";
  const URGENT = "URGENT";

  // Event Recurring Type
  const NO_REPEAT = "NO REPEAT";
  const REPEAT = "REPEAT";
  const CUSTOM = "CUSTOM";

  // Event Occurrence
  const REPEAT_DAILY = "DAILY";
  const REPEAT_WEEKLY = "WEEKLY";
  const REPEAT_MONTHLY = "MONTHLY";

  // Emails
  const DEFAULT_EMAIL_VIEW = 'emails.default';

  // Plans
  const BASIC = "BASIC";
  const STANDARD = "STANDARD";
  const PREMIUM = "PREMIUM";

  // File Names
  const MODULE_STATUSES = 'modules_statuses.json';
  const MODULE_STATUSES_TENANT = 'modules_statuses_tenant.json';

  // Arrays
  const TENANT_STATUSES = [self::ACTIVE, self::INACTIVE, self::DELETED, self::RESTRICTED];
  const TENANT_PLANS = [self::BASIC, self::STANDARD, self::PREMIUM];

  const USER_STATUSES = [self::ACTIVE, self::INACTIVE, self::DELETED, self::RESTRICTED];

  const EMAIL_STATUSES = [self::ACTIVE, self::INACTIVE];

  const EVENT_STATUSES = [self::ACTIVE, self::INACTIVE, self::CANCELED, self::POSTPONED];
  const EVENT_RECURRING_TYPES = [self::NO_REPEAT, self::REPEAT, self::CUSTOM];
  const EVENT_OCCURRENCES = [self::REPEAT_DAILY, self::REPEAT_WEEKLY, self::REPEAT_MONTHLY];

  const CONTRACT_STATUSES = [self::ACTIVE, self::INACTIVE];

  const ONEFLOW_STATUSES = [self::ACTIVE, self::INACTIVE];

  const MAINTENANCE_STATUSES = [self::REQUESTED, self::ASSIGNED, self::PROCESSING, self::RESOLVED, self::REOPENED, self::CONFIRMED, self::CANCELED];
  const MAINTENANCE_PRIORITIES = [self::LOW, self::MEDIUM, self::HIGH, self::URGENT];

  // OneFlow API
  const ONEFLOW_API_BASE_URL = "https://api.oneflow.com/v1";
}
