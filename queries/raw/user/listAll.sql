SELECT
	CONCAT(firstName, ' ', lastName) as name,
	roles.name as role,
	hoursWeek as hours,
	users.email,
	users.active,
	users.deactivatedAt,
	users.createdAt
FROM users
LEFT JOIN roles ON roles.id = users.roleId
WHERE users.roleId IS NOT NULL