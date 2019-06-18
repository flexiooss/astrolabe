# @flexio-oss/astrolabe

### generator of js date

Indexed calendar structure to load and get dates of a year, a month or a week

Instantiate with : 
ComponentAstrolabeBuilder
    .build(APP : HotBalloonApplication, startingDay : DaysEnum) : ComponentAstrolabePublic

```javascript
DaysEnum = {
  'SUN': 0,  
  'MON': 1,  
  'TUE': 2,  
  'WED': 3,  
  'THU': 4,  
  'FRI': 5,  
  'SAT': 6  
}
```

- addYear(year: number)
- addMonth(year: number, month: number)
- addWeek(year: number, weekNumber: number)
- getYear(year: number) : Year
- getMonth(year: number, month: number) : Month
- getWeek(year: number, weekNumber: number) : DayList

```yaml
Year:
    year: int
    months: MonthList -> Map\<Month>

Month:
    year: int
    month: int
    weeks: WeekList -> Map\<Week>

Week:
    year: int
    month: int
    week: int
    days: DayList -> Map\<DateExtended>

```
