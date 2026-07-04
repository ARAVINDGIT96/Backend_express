# SQL Fundamentals Documentation

A comprehensive guide to SQL fundamentals, including SQL commands, data types, constraints, aggregate functions, joins, Window Functions and Additional questions.

---
1. [Introduction](Introduction)
# 1. Introduction

SQL (Structured Query Language) is a standard language used to communicate with relational databases.

It is used to:

- Create databases
- Create tables
- Insert records
- Retrieve records
- Update records
- Delete records
- Manage permissions

Popular Databases:

- MySQL
- Oracle
- PostgreSQL
- SQL Server
- SQLite

---

# 2. SQL Categories

## DDL (Data Definition Language)

Used to define and modify database structures.

### CREATE

```sql
CREATE TABLE Employee(
    EmpID INT,
    Name VARCHAR(50),
    Salary DECIMAL(10,2)
);
```

### ALTER

```sql
ALTER TABLE Employee
ADD Email VARCHAR(100);
```

### DROP

```sql
DROP TABLE Employee;
```

### TRUNCATE

```sql
TRUNCATE TABLE Employee;
```

---

## DML (Data Manipulation Language)

### INSERT

```sql
INSERT INTO Employee
VALUES (101,'Aravind',50000);
```

### UPDATE

```sql
UPDATE Employee
SET Salary = 60000
WHERE EmpID = 101;
```

### DELETE

```sql
DELETE FROM Employee
WHERE EmpID = 101;
```

---

## DQL (Data Query Language)

### SELECT

```sql
SELECT * FROM Employee;
```

### WHERE

```sql
SELECT *
FROM Employee
WHERE Salary > 50000;
```

### ORDER BY

```sql
SELECT *
FROM Employee
ORDER BY Salary DESC;
```

---

## DCL (Data Control Language)

### GRANT

```sql
GRANT SELECT, INSERT
ON Employee
TO user1;
```

### REVOKE

```sql
REVOKE INSERT
ON Employee
FROM user1;
```

---

## TCL (Transaction Control Language)

### COMMIT

```sql
COMMIT;
```

### ROLLBACK

```sql
ROLLBACK;
```

### SAVEPOINT

```sql
SAVEPOINT sp1;
```

---

# 3. SQL Data Types

## Numeric

| Data Type | Description |
|------------|-------------|
| INT | Integer |
| BIGINT | Large Integer |
| FLOAT | Floating Point |
| DECIMAL | Fixed Precision |

Example

```sql
Salary DECIMAL(10,2);
```

---

## Character

| Data Type | Description |
|------------|-------------|
| CHAR(n) | Fixed Length |
| VARCHAR(n) | Variable Length |
| TEXT | Large Text |

Example

```sql
Name VARCHAR(50);
```

---

## Date & Time

| Data Type | Description |
|------------|-------------|
| DATE | Date |
| TIME | Time |
| DATETIME | Date and Time |
| TIMESTAMP | Timestamp |

Example

```sql
JoinDate DATE;
```

---

# 4. Constraints

## PRIMARY KEY

```sql
EmpID INT PRIMARY KEY
```

## NOT NULL

```sql
Name VARCHAR(50) NOT NULL
```

## UNIQUE

```sql
Email VARCHAR(100) UNIQUE
```

## CHECK

```sql
Salary INT CHECK(Salary>0)
```

## DEFAULT

```sql
Country VARCHAR(20) DEFAULT 'India'
```

## FOREIGN KEY

```sql
FOREIGN KEY(DeptID)
REFERENCES Department(DeptID)
```

---

# 5. Aggregate Functions

## COUNT()

```sql
SELECT COUNT(*) FROM Employee;
```

Counts all rows.

---

## SUM()

```sql
SELECT SUM(Salary)
FROM Employee;
```

---

## AVG()

```sql
SELECT AVG(Salary)
FROM Employee;
```

---

## MAX()

```sql
SELECT MAX(Salary)
FROM Employee;
```

---

## MIN()

```sql
SELECT MIN(Salary)
FROM Employee;
```

---

# 6. SQL Joins

## INNER JOIN

```sql
SELECT E.Name,D.DeptName
FROM Employee E
INNER JOIN Department D
ON E.DeptID=D.DeptID;
```

---

## LEFT JOIN

```sql
SELECT E.Name,D.DeptName
FROM Employee E
LEFT JOIN Department D
ON E.DeptID=D.DeptID;
```

---

## RIGHT JOIN

```sql
SELECT E.Name,D.DeptName
FROM Employee E
RIGHT JOIN Department D
ON E.DeptID=D.DeptID;
```

---

## FULL OUTER JOIN

```sql
SELECT E.Name,D.DeptName
FROM Employee E
FULL OUTER JOIN Department D
ON E.DeptID=D.DeptID;
```

---

## CROSS JOIN

```sql
SELECT A.Name,B.Name
FROM Employee A
CROSS JOIN Employee B;
```

---

# 7. Frequently Used SQL Queries

```sql
SELECT * FROM Employee;
```

```sql
SELECT Name,Salary
FROM Employee;
```

```sql
SELECT *
FROM Employee
WHERE Salary>50000;
```

```sql
SELECT DeptID,COUNT(*)
FROM Employee
GROUP BY DeptID;
```

```sql
SELECT *
FROM Employee
ORDER BY Salary DESC;
```

---

# 8. Additional Practice

## DELETE vs TRUNCATE vs DROP

| DELETE | TRUNCATE | DROP |
|---------|----------|------|
| Removes rows | Removes all rows | Deletes table |
| Rollback possible | Cannot rollback | Removes structure |
| WHERE allowed | WHERE not allowed | Table removed |

---

## CHAR vs VARCHAR

| CHAR | VARCHAR |
|------|----------|
| Fixed Length | Variable Length |
| Faster | Saves Memory |

---

## PRIMARY KEY vs UNIQUE

| PRIMARY KEY | UNIQUE |
|-------------|---------|
| No NULL | Allows one NULL |
| One per table | Multiple allowed |

---

## COUNT() Interview Trap

| Query | Counts |
|-------|---------|
| COUNT(*) | All rows |
| COUNT(1) | All rows |
| COUNT(-1) | All rows |
| COUNT(column_name) | Only Non-NULL values |

---

# 9. SQL Window Functions

## Introduction

A **Window Function** is a special SQL function that performs calculations across a set of rows related to the current row **without combining the rows into a single row**.

Unlike `GROUP BY`, Window Functions **keep all rows** in the result and add the calculated value to each row.

### Why do we use Window Functions?

Window Functions are mainly used to:

- Assign rankings to records
- Find Top N records
- Compare current row with previous or next row
- Calculate running totals
- Calculate department-wise averages while keeping employee details
- Perform analytical calculations without grouping records

---

## OVER() Clause

The `OVER()` clause defines the **window (set of rows)** on which the function operates.

### Syntax

```sql
Function_Name() OVER(
    PARTITION BY column_name
    ORDER BY column_name
)
```

Example

```sql
SELECT Name,
       Salary,
       ROW_NUMBER() OVER(ORDER BY Salary DESC)
FROM Employee;
```

---

## Sample Employee Table

| EmpID | Name | Dept | Salary |
|-------|------|------|--------|
|101|Aravind|IT|50000|
|102|Rahul|IT|60000|
|103|Priya|HR|45000|
|104|Kiran|HR|70000|

---

# Ranking Window Functions

## ROW_NUMBER()

### Definition

Assigns a **unique number** to every row.

Even if two values are the same, each row receives a different number.

### Example

```sql
SELECT Name,
       Salary,
       ROW_NUMBER() OVER(ORDER BY Salary DESC) AS Row_No
FROM Employee;
```

### Output

| Name | Salary | Row_No |
|------|--------|--------|
|Kiran|70000|1|
|Rahul|60000|2|
|Aravind|50000|3|
|Priya|45000|4|

---

## RANK()

### Definition

Assigns the same rank to duplicate values.

The next rank is skipped.

### Example

```sql
SELECT Name,
       Salary,
       RANK() OVER(ORDER BY Salary DESC) AS Rank_No
FROM Employee;
```

Example Output

| Salary | Rank |
|--------|------|
|70000|1|
|60000|2|
|60000|2|
|50000|4|

Notice:

Rank **3** is skipped.

---

## DENSE_RANK()

### Definition

Assigns the same rank to duplicate values.

The next rank is **not skipped**.

### Example

```sql
SELECT Name,
       Salary,
       DENSE_RANK() OVER(ORDER BY Salary DESC) AS Dense_Rank
FROM Employee;
```

Output

| Salary | Rank |
|--------|------|
|70000|1|
|60000|2|
|60000|2|
|50000|3|

---

## Difference Between ROW_NUMBER(), RANK() and DENSE_RANK()

| Function | Duplicate Rank | Skip Rank |
|----------|----------------|-----------|
| ROW_NUMBER() | No | No |
| RANK() | Yes | Yes |
| DENSE_RANK() | Yes | No |

---

# Value Window Functions

## LAG()

### Definition

Returns the **previous row's value**.

### Example

```sql
SELECT Name,
       Salary,
       LAG(Salary) OVER(ORDER BY Salary) AS Previous_Salary
FROM Employee;
```

### Output

| Name | Salary | Previous Salary |
|------|--------|-----------------|
|Priya|45000|NULL|
|Aravind|50000|45000|
|Rahul|60000|50000|
|Kiran|70000|60000|

---

## LEAD()

### Definition

Returns the **next row's value**.

### Example

```sql
SELECT Name,
       Salary,
       LEAD(Salary) OVER(ORDER BY Salary) AS Next_Salary
FROM Employee;
```

### Output

| Name | Salary | Next Salary |
|------|--------|-------------|
|Priya|45000|50000|
|Aravind|50000|60000|
|Rahul|60000|70000|
|Kiran|70000|NULL|

---

## FIRST_VALUE()

### Definition

Returns the **first value** from the window.

### Example

```sql
SELECT Name,
       Salary,
       FIRST_VALUE(Salary)
       OVER(ORDER BY Salary) AS FirstSalary
FROM Employee;
```

---

## LAST_VALUE()

### Definition

Returns the **last value** from the window.

### Example

```sql
SELECT Name,
       Salary,
       LAST_VALUE(Salary)
       OVER(
       ORDER BY Salary
       ROWS BETWEEN UNBOUNDED PRECEDING
       AND UNBOUNDED FOLLOWING
       ) AS LastSalary
FROM Employee;
```

---

# Aggregate Window Functions

## SUM() OVER()

Calculates the total salary while displaying every employee.

```sql
SELECT Name,
       Salary,
       SUM(Salary) OVER() AS TotalSalary
FROM Employee;
```

---

## AVG() OVER()

Calculates the average salary while displaying every employee.

```sql
SELECT Name,
       Salary,
       AVG(Salary) OVER() AS AverageSalary
FROM Employee;
```

---

## COUNT() OVER()

Returns the total number of rows while displaying every row.

```sql
SELECT Name,
       COUNT(*) OVER() AS TotalEmployees
FROM Employee;
```

---

## MIN() OVER()

Returns the minimum salary.

```sql
SELECT Name,
       Salary,
       MIN(Salary) OVER() AS MinimumSalary
FROM Employee;
```

---

## MAX() OVER()

Returns the maximum salary.

```sql
SELECT Name,
       Salary,
       MAX(Salary) OVER() AS MaximumSalary
FROM Employee;
```

---

# PARTITION BY

`PARTITION BY` divides rows into groups without removing rows.

### Example

```sql
SELECT Name,
       Dept,
       Salary,
       AVG(Salary)
       OVER(PARTITION BY Dept) AS AvgSalary
FROM Employee;
```

---

# GROUP BY vs Window Functions

| GROUP BY | Window Function |
|----------|-----------------|
| Combines rows | Keeps all rows |
| Returns one row per group | Returns every row |
| Uses GROUP BY | Uses OVER() |
| Cannot display individual rows | Displays every row |

---

# Common Questions

### Difference between ROW_NUMBER(), RANK() and DENSE_RANK()?

| Function | Duplicate Rank | Skip Rank |
|----------|----------------|-----------|
| ROW_NUMBER() | No | No |
| RANK() | Yes | Yes |
| DENSE_RANK() | Yes | No |

---

### Difference between GROUP BY and PARTITION BY?

| GROUP BY | PARTITION BY |
|----------|--------------|
| Groups rows | Divides rows into partitions |
| Returns one row per group | Returns every row |
| Used with Aggregate Functions | Used with Window Functions |

---

### Why do we use Window Functions?

Window Functions are used to perform calculations across related rows **without removing individual rows**, making them ideal for ranking, running totals, comparisons, and analytical reporting.

---

# 10. Conclusion

SQL is the foundation of every relational database.

Learning the following topics is essential for interviews and real-world projects:

- SQL Commands
- Data Types
- Constraints
- Aggregate Functions
- Joins
- GROUP BY
- ORDER BY
- SQL Interview Questions
- Practice Problems

Mastering these concepts will help you in Data Engineering, Backend Development, and Database Administration.

---

