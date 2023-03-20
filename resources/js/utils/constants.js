export const EMITTERS = {
  "RELOAD_DATATABLE": "reload-datatable",
  "SET_CALENDAR_LOCALE": "set-calendar-locale",
  "ADD_EVENT_EXCLUSION": "add-event-exclusion",
  "RELOAD_MAINTENANCE": "reload-maintenances",
  "GET_DATA": "get-data",
  "CLOSE_MODAL": "close-modal",
};

export const EVENT_RECURRING_TYPES = {
  "NO_REPEAT": "NO REPEAT",
  "REPEAT": "REPEAT",
  "CUSTOM": "CUSTOM",
};

export const EVENT_OCCURRENCES = {
  "DAILY": "DAILY",
  "WEEKLY": "WEEKLY",
  "MONTHLY": "MONTHLY",
};

export const MAINTENANCE_PRIORITIES = {
  "LOW": "LOW",
  "MEDIUM": "MEDIUM",
  "HIGH": "HIGH",
  "URGENT": "URGENT",
};

export const SELECT_EVENT_RECURRING_TYPES = [
  {
    "id": 0,
    "name": "Does not repeat",
    "value": EVENT_RECURRING_TYPES.NO_REPEAT,
  },
  {
    "id": 1,
    "name": "Repeat",
    "value": EVENT_RECURRING_TYPES.REPEAT,
  },
  {
    "id": 2,
    "name": "Custom Dates",
    "value": EVENT_RECURRING_TYPES.CUSTOM,
  },
];

export const SELECT_EVENT_OCCURRENCES = [
  {
    "id": 0,
    "name": "Daily",
    "value": EVENT_OCCURRENCES.DAILY,
  },
  {
    "id": 1,
    "name": "Weekly",
    "value": EVENT_OCCURRENCES.WEEKLY,
  },
  {
    "id": 2,
    "name": "Monthly",
    "value": EVENT_OCCURRENCES.MONTHLY,
  },
];

export const SELECT_MAINTENANCE_PRIORITIES = [
  {
    "id": 0,
    "name": "Low",
    "value": MAINTENANCE_PRIORITIES.LOW,
  },
  {
    "id": 1,
    "name": "Medium",
    "value": MAINTENANCE_PRIORITIES.MEDIUM,
  },
  {
    "id": 2,
    "name": "High",
    "value": MAINTENANCE_PRIORITIES.HIGH,
  },
  {
    "id": 3,
    "name": "Urgent",
    "value": MAINTENANCE_PRIORITIES.URGENT,
  },
];
