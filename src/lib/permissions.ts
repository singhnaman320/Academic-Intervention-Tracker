import type { SessionUser, UserRole } from "@/lib/types";

export function hasRole(user: SessionUser, roles: UserRole[]) {
  return roles.includes(user.role);
}

export function canManageUsers(user: SessionUser) {
  return user.role === "admin";
}

export function canManageStudents(user: SessionUser) {
  return ["admin", "teacher", "counselor"].includes(user.role);
}

export function canCreateStudents(user: SessionUser) {
  return ["admin", "teacher"].includes(user.role);
}

export function canDeleteStudents(user: SessionUser) {
  return ["admin", "teacher"].includes(user.role);
}

export function canEditStudentAcademicFields(user: SessionUser) {
  return ["admin", "teacher"].includes(user.role);
}

export function canEditStudentSupportFields(user: SessionUser) {
  return ["admin", "teacher", "counselor"].includes(user.role);
}

export function canManageInterventions(user: SessionUser) {
  return ["admin", "teacher", "counselor"].includes(user.role);
}

export function canEditAnyIntervention(user: SessionUser) {
  return user.role === "admin";
}

export function canManageOwnedIntervention(user: SessionUser, ownerId: string) {
  return canEditAnyIntervention(user) || user.id === ownerId;
}

export function canAdjustInterventionImpact(user: SessionUser) {
  return ["admin", "teacher"].includes(user.role);
}

export function canImportStudents(user: SessionUser) {
  return ["admin", "teacher"].includes(user.role);
}
