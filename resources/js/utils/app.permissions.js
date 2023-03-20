export const PERMISSIONS = {
  // TENANTS
  "CREATE_TENANT": ['super-admin'],
  "VIEW_TENANT": ['super-admin'],
  "LIST_TENANTS": ['super-admin'],
  "EDIT_TENANT": ['super-admin'],
  "DELETE_TENANT": ['super-admin'],

  // ROLES
  "CREATE_ROLE": ['super-admin', 'manager'],
  "VIEW_ROLE": ['super-admin', 'manager'],
  "LIST_ROLES": ['super-admin', 'manager'],
  "EDIT_ROLE": ['super-admin', 'manager'],
  "DELETE_ROLE": ['super-admin', 'manager'],
  "ASSIGN_PERMISSIONS": ['super-admin', 'manager', 'assign-permission'],

  // USERS
  "CREATE_USER": ['super-admin', 'manager', 'create-user'],
  "VIEW_USER": ['super-admin', 'manager', 'view-user'],
  "LIST_USERS": ['super-admin', 'manager', 'list-users'],
  "EDIT_USER": ['super-admin', 'manager', 'edit-user'],
  "DELETE_USER": ['super-admin', 'manager', 'delete-user'],

  // EVENTS
  "CREATE_EVENT": ['manager', 'create-event'],
  "VIEW_EVENT": ['manager', 'view-event'],
  "LIST_EVENTS": ['manager', 'list-events'],
  "EDIT_EVENT": ['manager', 'edit-event'],
  "DELETE_EVENT": ['manager', 'delete-event'],

  // CONTRACTS
  "CREATE_CONTRACT": ['manager', 'create-contract'],
  "VIEW_CONTRACT": ['manager', 'view-contract'],
  "LIST_CONTRACTS": ['manager', 'list-contracts'],
  "EDIT_CONTRACT": ['manager', 'edit-contract'],
  "REMOVE_CONTRACT": ['manager', 'remove-contract'],
  "ADD_ONEFLOW": ['manager', 'add-oneflow'],
  "LIST_ONEFLOWS": ['super-admin', 'list-oneflows'],
};
