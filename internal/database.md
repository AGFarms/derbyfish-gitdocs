# Database

DerbyFish uses Supabase (PostgreSQL) with Row Level Security (RLS) on all tables.

## Core Tables

| Table | Purpose |
|-------|---------|
| profile | User profiles |
| captain | Bridge table marking profiles as captains |
| derby | Derby definitions |
| rankboard | Leaderboards for derbies |
| media | Uploaded photos and videos |
| bait_transaction | BAIT currency transactions |

## Upgrade Steps

The schema is organized into numbered upgrade steps. Each step adds a feature set:

| Step | Feature | Status |
|------|---------|--------|
| 01 | BAIT currency | Live (partial) |
| 02 | Shops | Pending migration |
| 03 | Tickets & Pools | Pending migration |
| 04 | Prizes | Pending migration |
| 05 | Crew | Not started |
| 06 | Levels & Achievements | Not started |
| 07 | Data Points | Not started |
| 08 | Fish Cards | Not started |
| 09 | Outings | Live |
| 10 | Seasons | Pending migration |
| 11 | Sponsors | Live |
| 12 | Leagues & Clout | Not started |

## Key Design Decisions

- **Trophies, Achievements, Badges** are three separate systems with no foreign keys between them
- **`shop` table** has `captain_id` FK to `captain` table, not `owner_profile_id`. RLS goes through `captain.auth_id`
- **BAIT transactions** use a `category` enum with 12 values
- **`compute_points_ranking()`** in step-03 depends on `submission_data_point` from step-07

## RLS Pattern

Most tables use RLS policies that chain through the captain table:

```
table.captain_id → captain.id → captain.auth_id = auth.uid()
```

This ensures captains can only see and modify their own data.
