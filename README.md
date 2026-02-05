# Data Transformation & Analytics Dashboard  
(Bronze → Silver → Gold Architecture)

Video Demos: 

https://github.com/user-attachments/assets/82677d79-7aab-4c68-9ea9-0aeffcd2197d
https://github.com/user-attachments/assets/f466857d-ac37-426e-9e92-d87cbadebac9




## Overview
This project demonstrates an end-to-end data transformation and analytics system built using a **Bronze–Silver–Gold** layered architecture.  
It focuses on real-world data engineering practices such as data cleaning, standardization, performance optimization, and backend-driven data access, along with a frontend dashboard for exploration.

---

## Architecture

### 🟤 Bronze Layer
- Raw data ingestion
- Minimal or no transformation
- Represents data as received from source systems

### ⚪ Silver Layer
In the Silver layer, raw data is cleaned and standardized to make it consistent, accurate, and suitable for analysis. This includes:
- Handling and removing invalid or null records
- Expanding coded values into human-readable formats  
  (e.g., gender, marital status)
- Correcting inconsistent or invalid dates
- Trimming extra spaces and normalizing strings

### 🟡 Gold Layer
- Business-ready curated data
- Dimension and fact views
- Exposes only relevant analytical columns
- Optimized for querying and reporting
- Serves as the single source of truth for the application

---

## Tech Stack

### Frontend
- React
- Axios

### Backend
- Node.js
- Express.js
- SQL Server
- REST APIs

### Data & Transformation
- SQL (Views, Joins, Aggregations)
- Python (Automated database and pipeline setup)

---

## Key Features

### Backend
- Layer-based data access (Bronze / Silver / Gold)
- Backend-driven pagination using `OFFSET / FETCH`
- Secure filtering with whitelisted columns
- Backend-driven sorting
- Aggregated summary endpoints
- Performance optimization using indexes on underlying Silver tables

### Frontend
- Layer-based navigation (Bronze, Silver, Gold)
- Tab-based views for Customers, Products, and Sales
- Backend-driven search and sort
- Load More pagination
- Clean UI focused on data exploration

---

## Performance Optimization
Instead of fetching entire tables:
- Pagination is applied at the database level
- Indexes are added on underlying Silver tables used by Gold views
- Views remain unindexed and schema-agnostic

This significantly improves query performance and scalability.

---

## Prerequisite: Data Pipeline Setup

This application depends on a separate data pipeline project that creates and populates the database using a Bronze → Silver → Gold architecture.

Before running this project, the data pipeline must be executed to:
- Create the database and required schemas
- Load raw data into the Bronze layer
- Apply transformations in the Silver layer
- Create curated Gold views used by this application

Data Pipeline Repository:  
👉 https://github.com/bhavya-rathore2025-source/sql-data-warehouse-project

Once the pipeline is completed, this application can be started normally.
